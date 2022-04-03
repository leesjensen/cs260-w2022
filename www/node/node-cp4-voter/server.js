const express = require('express');
const path = require('path');
const app = express();
const fs = require('fs');
const { WebSocketServer } = require('ws');
const { candidate } = require('./finalists.js');

app.use(express.json());

app.get('/api/candidate', (req, res) => {
  res.send({ candidate: candidate });
});

let users = {};
let nextId = 0;

app.put('/api/login', (req, res) => {
  const email = req.body.email;
  let user = users[email];
  if (!user) {
    user = {
      email: email,
      id: nextId++,
      votes: [],
    };
    users[email] = user;
  }
  res.cookie('voter', nextId);
  res.send(user);
});

// Get the API version.
app.get('/api/version', (req, res) => {
  fs.readFile(
    path.join(path.dirname(__filename), 'version.txt'),
    (err, data) => {
      const version = err ? 'unknown' : String.fromCharCode(...data);
      res.send({ version: version });
    }
  );
});

app.get(/^[^\.]+$/, (req, res) => {
  res.sendFile(path.join(__dirname, './public/index.html'));
});

// Serve up our application UI
app.use(express.static(path.join(__dirname, './public')));

function updateCandidates(buffer) {
  //    { user: {user}, id: candidateId, addVote: addVote }
  const msg = JSON.parse(buffer.toString());
  const updated = candidate.find((c) => c.id === msg.id);
  if (updated) {
    users[msg.user.email] = msg.user;
    console.log(users);

    msg.addVote ? updated.votes++ : updated.votes--;
  }
}

server = app.listen(20400, () => {
  console.log(`Listening on 20400`);
});

// Create a websocket object
const wss = new WebSocketServer({ noServer: true });

// Handle the protocol upgrade from HTTP to WebSocket
server.on('upgrade', (request, socket, head) => {
  wss.handleUpgrade(request, socket, head, function done(ws) {
    wss.emit('connection', ws, request);
  });
});

// Keep track of all the connections so we can forward messages
let connections = [];

wss.on('connection', (ws) => {
  const connection = { id: connections.length + 1, alive: true, ws: ws };
  connections.push(connection);

  // Forward messages to everyone except the sender
  ws.on('message', function message(data) {
    updateCandidates(data);
    connections.forEach((c) => {
      if (c.id !== connection.id) {
        c.ws.send(data);
      }
    });
  });

  // Remove the closed connection so we don't try to forward anymore
  ws.on('close', () => {
    connections.findIndex((o, i) => {
      if (o.id === connection.id) {
        connections.splice(i, 1);
        return true;
      }
    });
  });

  // Respond to pong messages by marking the connection alive
  ws.on('pong', () => {
    connection.alive = true;
  });
});

// Keep active connections alive
setInterval(() => {
  connections.forEach((c) => {
    // Kill any connection that didn't respond to the ping last time
    if (!c.alive) {
      c.ws.terminate();
    } else {
      c.alive = false;
      c.ws.ping();
    }
  });
}, 10000);

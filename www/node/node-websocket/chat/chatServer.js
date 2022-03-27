const express = require('express');
const path = require('path');
const app = express();
const { WebSocketServer } = require('ws');

// Server up our webSocket client HTML
app.use(express.static(path.join(__dirname, './public')));

server = app.listen(5090, () => {
  console.log(`Listening on port 5090`);
});

// Create a websocket object
const wss = new WebSocketServer({ noServer: true });

// Handle the protocol upgrade from HTTP to WebSocket
server.on('upgrade', (request, socket, head) => {
  wss.handleUpgrade(request, socket, head, function done(ws) {
    wss.emit('connection', ws, request);
  });
});

// Keep track of all the connections so we can forward messages.
let connections = [];

// Use a simple counter for the connection ID.
let nextId = 0;

wss.on('connection', (ws) => {
  const connectionId = ++nextId;
  connections.push({ id: connectionId, conn: ws });

  // Forward messages to everyone except the sender.
  ws.on('message', function message(data) {
    connections.forEach((client) => {
      if (client.id !== connectionId) {
        client.conn.send(data);
      }
    });
  });

  // Remove the closed connection so we don't try to forward anymore.
  ws.on('close', () => {
    var index = connections.findIndex(function (o) {
      return o.id === connectionId;
    });
    if (index !== -1) connections.splice(index, 1);
  });
});

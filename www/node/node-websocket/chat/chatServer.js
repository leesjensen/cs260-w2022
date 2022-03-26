const express = require('express');
const path = require('path');
const app = express();

app.use(express.static(path.join(__dirname, './public')));

app.listen(5090, () => {
  console.log(`Listening on port 5090`);
});

const { WebSocketServer } = require('ws');

const wss = new WebSocketServer({ port: 8080 });

let connections = [];

wss.on('connection', function connection(ws) {
  const connectionId = getConnectionID();
  connections.push({ id: connectionId, conn: ws });
  ws.on('message', function message(data) {
    const msg = String.fromCharCode(...data);
    connections.forEach((client) => {
      if (client.id !== connectionId) {
        client.conn.send(msg);
      }
    });
  });
});

let nextId = 0;
function getConnectionID() {
  return ++nextId;
}

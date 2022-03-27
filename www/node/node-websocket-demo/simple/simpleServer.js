const express = require('express');
const path = require('path');
const app = express();

app.use(express.static(path.join(__dirname, './public')));

app.listen(5090, () => {
  console.log(`Listening on port 5090`);
});

const { WebSocketServer } = require('ws');
const wss = new WebSocketServer({ port: 8080 });

wss.on('connection', (ws) => {
  ws.on('message', (data) => {
    setTimeout(() => ws.send(`I heard you browser`), 3000);
  });

  ws.send('Hi browser!');
});

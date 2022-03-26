const socket = new WebSocket('ws://localhost:8080');

socket.onmessage = (event) => {
  console.log('received: ', event.data);
};

socket.send('Hello webSocket');

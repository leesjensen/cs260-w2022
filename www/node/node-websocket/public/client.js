// Create WebSocket connection.
const socket = new WebSocket('ws://localhost:8080');

// Listen for messages
socket.addEventListener('message', function (event) {
  document.querySelector('#response').textContent = event.data;
});

// Connection opened
socket.addEventListener('open', function (event) {
  socket.send('Hello Server!');
});

function sendSomething() {
  const msg = document.querySelector('#request').value;
  socket.send(msg);
}

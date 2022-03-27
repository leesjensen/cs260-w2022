// Create WebSocket connection.
const socket = new WebSocket('ws://localhost:8080');

let chatCount = 0;

// Listen for messages
socket.onmessage = (event) => {
  const serverMsg = event.data;
  appendMsg('server', serverMsg);

  if (++chatCount < 5) {
    setTimeout(() => {
      const browserMsg = `I heard you server`;
      socket.send(browserMsg);
      appendMsg('browser', browserMsg);
    }, 2000);
  } else {
    socket.close();
    appendMsg('browser', `Goodbye server`);
  }
};

function appendMsg(from, msg) {
  const chatText = document.querySelector('#chat-text');
  chatText.innerHTML += `<div><span class="${from}">${from}</span>: ${msg}</div>`;
}

const socket = new WebSocket('ws://localhost:8080');

socket.onopen = (event) => {
  appendMsg('system', 'websocket', 'connected');
  enableChat(true);
};

socket.onclose = (event) => {
  appendMsg('system', 'websocket', 'disconnected');
  enableChat(false);
};

socket.onmessage = (event) => {
  [friendName, ...friendMsg] = event.data.split(' ');
  appendMsg('friend', friendName, friendMsg.join(' '));
};

function sendMessage() {
  const msgEl = document.querySelector('#new-msg');
  const msg = msgEl.value;
  if (!!msg) {
    appendMsg('me', 'me', msg);
    const name = getMyName();
    socket.send(`${name} ${msg}`);
    msgEl.value = '';
  }
}

function appendMsg(cls, from, msg) {
  const chatText = document.querySelector('#chat-text');
  chatText.innerHTML += `<div><span class="${cls}">${from}</span>: ${msg}</div>`;
}

function getMyName() {
  const myName = document.querySelector('#my-name').value;
  return myName.replace(/\s/g, '_');
}

const input = document.querySelector('#new-msg');
input.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') {
    sendMessage();
  }
});

const chatControls = document.querySelector('#chat-controls');
const myName = document.querySelector('#my-name');
myName.addEventListener('keyup', (e) => {
  console.log(myName.value);
  chatControls.disabled = myName.value === '';
});

function enableChat(enabled) {
  document.querySelector('#name-controls').disabled = !enabled;
  document.querySelector('#chat-controls').disabled = true;
  document.querySelector('#my-name').value = '';
  document.querySelector('#new-msg').value = '';
}

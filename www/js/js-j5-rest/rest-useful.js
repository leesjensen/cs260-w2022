'use strict';

function useful() {
  outputResult(`Looking up your public IP address`);

  const url = `https://api.ipify.org?format=json`;
  fetch(url)
    .then((response) => response.json())
    .then((json) => {
      outputResult(`<pre>${json.ip}</pre>`);
    })
    .catch((error) => {
      outputResult(error);
    });
}

function outputResult(result) {
  document.getElementById('output').innerHTML = result;
}

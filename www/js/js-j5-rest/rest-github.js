'use strict';

function gitHub() {
  let query = document.getElementById('gitField').value;
  if (!!query) {
    outputResult(`Looking up GitHub user '${query}'`);

    const url = `https://api.github.com/users/${query}`;
    fetch(url)
      .then((response) => response.json())
      .then((json) => {
        const html = JSON.stringify(json, null, 2);
        outputResult(`<pre>${html}</pre>`);
      })
      .catch((error) => {
        outputResult(error);
      });
  }
}

function outputResult(result) {
  document.getElementById('output').innerHTML = result;
}

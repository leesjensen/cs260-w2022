'use strict';

function genericFetch(url) {
  fetch(url)
    .then((response) => {
      if (response.status === 200) {
        return response.json();
      }
      throw `Invalid response: [${response.status}] ${response.statusText}`;
    })
    .then((json) => {
      const result = JSON.stringify(json, null, 2);
      document.getElementById('output').innerHTML = `<pre>${result}</pre>`;
    })
    .catch((error) => {
      document.getElementById('output').innerHTML = error;
    });
}

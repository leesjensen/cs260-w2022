'use strict';

function genericJsonFetch(url) {
  fetch(url)
    .then((response) => {
      if (response.ok) {
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

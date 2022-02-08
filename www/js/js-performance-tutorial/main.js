'use strict';

function startup() {
  let count = 0;
  setInterval(() => {
    const loadElement = document.querySelector('#loadComplete');
    if (loadElement) {
      for (var i = Math.pow(15, 7); i >= 0; i--) {
        Math.atan(i) * Math.tan(i);
      }

      console.log('loading background content');
      loadElement.innerText = 'load completed ' + count++;
    }
  }, 1000);
}

function getWords() {
  const definitionElement = document.querySelector('#definition');
  fetch('https://api.dictionaryapi.dev/api/v2/entries/en/cow').then((r) =>
    r.json().then((j) => {
      definitionElement.innerHTML = `<pre>${JSON.stringify(j, null, 2)}</pre>`;
    })
  );
}

'use strict';

// PEFORMANCE: Unnecessary repeating
// PERFORMANCE: Blocking calculation
function loadComponent() {
  setInterval(() => {
    const loadElement = document.querySelector('#loadComplete');
    if (loadElement) {
      loadElement.innerText = 'loading in process... ';
      for (var i = Math.pow(2, 32); i >= 0; i--) {
        Math.atan(i) * Math.tan(i);
      }

      loadElement.innerText = 'component loaded';
    }
  }, 1000);
}

// PERFORMANCE: Unnecessary listeners
function respondToAction() {
  const elements = document.querySelectorAll('*');
  for (const element of elements) {
    element.addEventListener('mouseover', (e) => {
      console.log(`mouse over ${e.target.tagName}`);
      if (e.target.tagName === 'IMG') {
        e.target.animate(
          [{ transform: 'rotate(2deg)' }, { transform: 'rotate(-4deg)' }],
          { duration: 200 }
        );
      }
    });
  }
}

// PERFORMANCE: Unnecessary pounding of service
async function getWords() {
  const words = ['cow', 'rat', 'dog', 'fish'];

  while (true) {
    for (let word of words) {
      try {
        const r = await fetch(
          `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`
        );
        if (r.status !== 200) throw r.status;

        displayWord(await r.json());
      } catch (error) {
        console.error(error);
      }
      // sleep(5000);
    }
  }
}

// PERFORMANCE: Blocking calculation
function sleep(sleepTime) {
  console.log('sleeping');
  var start = new Date().getTime();
  while (new Date().getTime() < start + sleepTime);
  //      await new Promise((resolve) => setTimeout(resolve, sleepTime));
  console.log('slept for ' + sleepTime);
}

function displayWord(wordInfo) {
  const word = wordInfo[0].word;
  const definition = wordInfo[0].meanings[0].definitions[0].definition;
  const definitionElement = document.querySelector('#definition');
  definitionElement.innerHTML = `<b>${word}</b>: ${definition}`;
  console.log('definition loaded');
}

// function loadComponent() {
//   const loadElement = document.querySelector('#loadComplete');
//   loadElement.innerText = 'loading in process... ';

//   window.onload = () => {
//     for (var i = Math.pow(2, 32); i >= 0; i--) {
//       Math.atan(i) * Math.tan(i);
//     }
//     loadElement.innerText = 'component loaded';
//   };
// }

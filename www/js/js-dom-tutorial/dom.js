'use strict';

function injectDOMHTML(title) {
  const parentElement = document.querySelector('#output');

  const funcText = stringifyFunction(injectDOMHTML);
  parentElement.innerHTML = `<h3>${title}</h3><pre>${funcText}</pre>`;
}

function injectDOMOperations(title) {
  const parentElement = document.getElementById('output');

  while (parentElement.firstChild) {
    parentElement.removeChild(parentElement.firstChild);
  }

  const h3 = document.createElement('h3');
  h3.innerText = title;
  parentElement.appendChild(h3);

  const pre = document.createElement('pre');
  pre.innerText = stringifyFunction(injectDOMOperations);
  parentElement.appendChild(pre);
}

function injectHTMLFromInput() {
  const inputElement = document.getElementById('html-text');
  const parentElement = document.getElementById('output');

  parentElement.innerHTML = inputElement.value;
}

function stringifyFunction(fn) {
  return `${fn}`
    .replace(/&/g, '&amp;')
    .replace(/>/g, '&gt;')
    .replace(/</g, '&lt;')
    .replace(/"/g, '&quot;');
}

'use strict';

function injectDOMHTML(title) {
  const parentElement = document.querySelector('#output');

  parentElement.innerHTML = `<h3>${title}</h3>`;
}

function injectDOMOperations(title) {
  const parentElement = document.getElementById('output');

  while (parentElement.firstChild) {
    parentElement.removeChild(parentElement.firstChild);
  }

  const newElement = document.createElement('h3');
  newElement.innerText = title;
  parentElement.appendChild(newElement);
}

function injectHTMLFromInput() {
  const inputElement = document.getElementById('html-text');
  const parentElement = document.getElementById('output');

  parentElement.innerHTML = inputElement.value;
}

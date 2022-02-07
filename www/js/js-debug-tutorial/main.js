'use strict';

function debugMe() {
  // Put a breakpoint on the line below by clicking to the left of the line.
  console.log('%c I am debugging!', 'color: red; font-size:1.5em;');

  let x = 3;
  x += 3;

  const headingElement = document.querySelector('h1');
  headingElement.innerText = `I am the debugging master! I have an X factor of ${x}`;
}

function calledFromHtml() {
  // Put a breakpoint on the line below and press the browser refresh button to break here on page load.
  console.log(
    '%c I was called when the HTML loaded',
    'color: yellow; font-size:1.5em;'
  );
}

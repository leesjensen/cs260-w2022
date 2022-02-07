'use strict';

function debugMe() {
  // Put a breakpoint on the line below by clicking to the left of the line.
  console.log('%c I am debugging!', 'color: red; font-size:2em;');

  let x = 3;
  x += 3;

  headingElement = document.querySelector('h1');
  headingElement.innerText = `I am the debugging master! I have an X factor of ${x}`;
}

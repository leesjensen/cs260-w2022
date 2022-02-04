// Use published attributes to find elements that this module works with and then callback
// on button action.
function buttonAction(action) {
  const actionButtons = document.querySelectorAll('button.moduleButton');
  for (let actionButton of actionButtons) {
    const outputText =
      actionButton.getAttribute('m-text') || 'clicked a button';
    const outputDiv = document.querySelector(
      `#${actionButton.getAttribute('m-output')}`
    );
    if (actionButton && outputDiv) {
      actionButton.addEventListener('click', () => {
        action(outputDiv, outputText);
      });
    }
  }
}

export { buttonAction };

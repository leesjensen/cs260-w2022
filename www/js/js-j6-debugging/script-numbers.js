function onClick(e) {
  e.preventDefault();
  // get form values
  let number = document.getElementById('number').value;
  let s = document.getElementById('selector');
  let type = s.options[s.selectedIndex].value;

  // check if number is empty
  if (number === '') {
    number = 'random';
  }

  // setup URL
  let url = 'http://numberapi.com/' + number + '/' + 'type' + '?json';
  // call API
  fetch(url)
    .then(function (response) {
      // make sure the request was successful
      if (response.status != 200) {
        return {
          text: 'Error calling the Numbers API service: ' + response.statusText,
        };
      }
      return response.json();
    })
    .then(function (json) {
      // update DOM with response
      updateResult(json.text);
    });
}

function updateResult(info) {
  document.getElementById('results').textContent = info;
}

document.getElementById('woo').addEventListener('click', onClick);

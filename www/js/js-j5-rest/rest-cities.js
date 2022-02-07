'use strict';

function cities() {
  let query = document.getElementById('cityField').value;
  query = normalizeQuery(query);

  const url = 'https://cs260.click/api/city?q=' + query;
  fetch(url)
    .then((response) => response.json())
    .then((json) => {
      var html = '';
      for (let i = 0; i < json.length; i++) {
        html += `<li>${json[i].city}</li>`;
      }
      document.getElementById('output').innerHTML = `<ul>${html}</ul>`;
    })
    .catch((error) => {
      document.getElementById('output').innerHTML = error;
    });
}

function normalizeQuery(query) {
  if (query) {
    const queryParts = query.split(' ');
    for (let i = 0; i < queryParts.length; i++) {
      queryParts[i] =
        queryParts[i].charAt(0).toUpperCase() + queryParts[i].slice(1);
    }

    return queryParts.join(' ');
  }
  return '.*';
}

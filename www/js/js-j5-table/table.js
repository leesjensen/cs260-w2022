'use strict';

// Build table by reading an array of object
// Column names from first object
// Right align cells that contain number values (text-align:right)

const SevenSummits = [
  { name: 'Everest', height: 8848, place: 'Nepal' },
  { name: 'Aconcagua', height: 6961, place: 'Argentina' },
  { name: 'Denali', height: 6194, place: 'United States' },
  { name: 'Kilimanjaro', height: 5895, place: 'Tanzania' },
  { name: 'Elbrus', height: 5642, place: 'Russia' },
  { name: 'Vinson', height: 4892, place: 'Antarctica' },
  { name: 'Puncak Jaya', height: 4884, place: 'Indonesia' },
];

const UtahCountySevenPeaks = [
  { name: 'Timpanogos', height: 11750, stars: 4.8 },
  { name: 'Santaquin', height: 10687, stars: 3.8 },
  { name: 'Lone Peak', height: 11253, stars: 5 },
  { name: 'Provo Peak', height: 11068, stars: 4.1 },
  { name: 'Cascade', height: 10908, stars: 3.2 },
  { name: 'Nebo', height: 11928, stars: 4.8 },
  { name: 'Spanish Fork', height: 10192, stars: 3.4 },
];

const JazzMusic = [
  { title: 'Take Five', artist: 'Dave Brubeck', stars: 4.8 },
  { title: 'So What', artist: 'Miles Davis', stars: 3.8 },
  { title: 'Take The A Train', artist: 'Duke Ellington', stars: 4.2 },
  { title: 'Round Midnight', artist: 'Thelonious Monk', stars: 3.1 },
  { title: 'My Favorite Things', artist: 'John Coltrane', stars: 3.0 },
];

let currentData = SevenSummits;
let sortDirection = 1;

function table(data = SevenSummits) {
  if (!!data && data.length > 1) {
    currentData = data;
    const headers = parseHeader(data);
    const tableElement = generateTable(headers, data);

    const output = document.getElementById('output');

    removeAllChildNodes(output);
    output.appendChild(tableElement);
  } else {
    outputData('invalid input', data);
  }
}

function parseHeader(data) {
  let headers = [];
  for (const [key, value] of Object.entries(data[0])) {
    headers.push({ name: key, type: typeof value });
  }
  return headers;
}

function generateTable(headers, data) {
  const tableElement = document.createElement('table');
  tableElement.classList.add('a');

  addTableStyles(headers);

  generateHeader(headers, tableElement);
  generateRows(data, tableElement);

  return tableElement;
}

function generateHeader(headers, tableElement) {
  const rowElement = document.createElement('tr');
  tableElement.appendChild(rowElement);

  headers.forEach((header) => {
    const cellElement = document.createElement('th');
    rowElement.appendChild(cellElement);
    cellElement.setAttribute('onclick', `sortColumn(this)`);
    const textNode = document.createTextNode(header.name);
    cellElement.appendChild(textNode);
  });
}

function generateRows(data, tableElement) {
  data.forEach((dataRow) => {
    const rowElement = document.createElement('tr');
    tableElement.appendChild(rowElement);
    for (const [, value] of Object.entries(dataRow)) {
      const cellElement = document.createElement('td');
      rowElement.appendChild(cellElement);
      const textNode = document.createTextNode(value);
      cellElement.appendChild(textNode);
    }
  });
}

function addTableStyles(headers) {
  insertRule('#output table {border-collapse: collapse;}');
  insertRule('#output th,td {border: solid white thin;padding:.25em;}');
  insertRule('.selected {background: white; color:black;}');
  headers.forEach((header, index) => {
    if (header.type === 'number') {
      insertRule(`#output tr td:nth-child(${index + 1}) {text-align:right;}`);
    }
  });
}

function insertRule(rule) {
  var sheet = window.document.styleSheets[0];
  sheet.insertRule(rule, sheet.cssRules.length);
}

function sortColumn(column) {
  sortDirection *= -1;
  const sortBy = column.innerText;
  const sortedData = currentData.sort(
    (a, b) => sortDirection * (a[sortBy] > b[sortBy] ? 1 : -1)
  );
  table(sortedData);
}

function removeAllChildNodes(parent) {
  while (parent.firstChild) {
    parent.removeChild(parent.firstChild);
  }
}

function outputData(title, data) {
  const output = document.getElementById('output');
  output.innerHTML = `<h3>${title}</h3><pre>${JSON.stringify(
    data,
    null,
    2
  )}</pre>`;
}

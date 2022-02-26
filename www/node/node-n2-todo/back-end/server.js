const express = require('express');
const bodyParser = require('body-parser');

const app = express();

// I can't image we are going to use this.
// // parse application/x-www-form-urlencoded
// app.use(
//   bodyParser.urlencoded({
//     extended: false,
//   })
// );

// parse application/json
app.use(bodyParser.json());

let items = [];
let id = 0;

app.get('/', (req, res) => {
  res.sendFile('index.html', { root: __dirname + '/public' });
});

app.get('/api/items', (req, res) => {
  res.send(items);
});

app.post('/api/items', (req, res) => {
  id = id + 1;
  let item = {
    id: id,
    text: req.body.text,
    completed: req.body.completed,
  };
  items.push(item);
  res.send(item);
});

app.put('/api/items/:id', (req, res) => {
  let id = parseInt(req.params.id);
  let itemsMap = items.map((item) => {
    return item.id;
  });
  let index = itemsMap.indexOf(id);
  if (index === -1) {
    res.status(404).send("Sorry, that item doesn't exist");
    return;
  }
  let item = items[index];
  item.text = req.body.text;
  item.completed = req.body.completed;
  res.send(item);
});

app.delete('/api/items/:id', (req, res) => {
  let id = parseInt(req.params.id);
  let removeIndex = items
    .map((item) => {
      return item.id;
    })
    .indexOf(id);
  if (removeIndex === -1) {
    res.status(404).send("Sorry, that item doesn't exist");
    return;
  }
  items.splice(removeIndex, 1);
  res.sendStatus(200);
});

app.use(express.static('public'));

app.listen(3000, () => console.log('Server listening on port 3000!'));

// curl -X POST -d '{"text":"get an A on the exam", "completed":false}' -H "Content-Type: application/json" localhost:3000/api/items
// curl -X POST -d '{"text":"party all night", "completed":false}' -H "Content-Type: application/json" localhost:3000/api/items
// curl -X GET localhost:3000/api/items

//fetch('http://localhost:3000/api/items', {method:'POST', body:'{"text":"lee","completed":"false"}',headers:{'Content-Type':'application/json'}}).then(r => r.json()).then(j => console.log(j))
//fetch('http://localhost:3000/api/items').then(r => r.json()).then(j => console.log(j))

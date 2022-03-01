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

app.use(express.static('front-end/dist'));

let items = [];
let id = 0;

app.get('/', (req, res) => {
  res.sendFile('index.html', { root: __dirname + 'front-end/dist' });
});

app.get('/api/n2/todo/items', (req, res) => {
  res.send(items);
});

app.post('/api/n2/todo/items', (req, res) => {
  id = id + 1;
  let item = {
    id: id,
    text: req.body.text,
    completed: req.body.completed,
  };
  items.push(item);
  res.send(item);
});

app.put('/api/n2/todo/items/:id', (req, res) => {
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

app.delete('/api/n2/todo/items/:id', (req, res) => {
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

app.listen(3102, () => console.log('Server listening on port 3102'));

// curl -X POST -d '{"text":"get an A on the exam", "completed":false}' -H "Content-Type: application/json" localhost:3102/api/n2/todo/items
// curl -X POST -d '{"text":"party all night", "completed":false}' -H "Content-Type: application/json" localhost:3102/api/n2/todo/items
// curl -X GET localhost:3102/api/n2/todo/items

//fetch('http://localhost:3102/api/n2/todo/items', {method:'POST', body:'{"text":"lee","completed":"false"}',headers:{'Content-Type':'application/json'}}).then(r => r.json()).then(j => console.log(j))
//fetch('http://localhost:3102/api/n2/todo/items').then(r => r.json()).then(j => console.log(j))

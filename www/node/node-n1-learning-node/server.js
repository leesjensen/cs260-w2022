const express = require('express');
const app = express();

// LESSON 1
app.get('/', (req, res) => {
  //  res.send({ msg: 'Hello Worlds and more!' });
  res.sendFile('index.html', { root: __dirname + '/front-end/dist' });
});

app.get('/api/n1/secret', (req, res) => {
  res.send({ msg: 'Psst. You are being watched.\n' });
});

app.get('/api/n1/user/1', (req, res) => {
  res.send({
    name: 'Amy Caprietti',
    avatar: '/avatars/supergirl.jpg',
    role: 'admin',
  });
});

app.post('/api/n1', (req, res) => {
  res.send({ msg: 'Here is the response to your POST, man!\n' });
});

app.put('api/n1', (req, res) => {
  res.send({ msg: 'I am updated.\n' });
});

app.delete('api/n1', (req, res) => {
  res.send({ msg: 'All my memories have been deleted. Are you happy now?\n' });
});

// LESSON 2

const bodyParser = require('body-parser');
app.use(bodyParser.json());

// I can't image we are going to use this.
// app.use(bodyParser.urlencoded({ extended: false }));

// Server up the front-end through the back-end server rather than
// hosting two servers like the exercise instructions say.
app.use(express.static('front-end/dist'));

let tickets = [];
let id = 0;

app.get('/api/n1/tickets', (req, res) => {
  res.send(tickets);
});

app.post('/api/n1/tickets', (req, res) => {
  id = id + 1;
  let ticket = {
    id: id,
    name: req.body.name,
    problem: req.body.problem,
  };
  tickets.push(ticket);
  res.send(ticket);
});

app.delete('/api/n1/tickets/:id', (req, res) => {
  let id = parseInt(req.params.id);
  let removeIndex = tickets
    .map((ticket) => {
      return ticket.id;
    })
    .indexOf(id);
  if (removeIndex === -1) {
    res.status(404).send({ error: "Sorry, that ticket doesn't exist" });
    return;
  }
  tickets.splice(removeIndex, 1);
  res.status(200).send({ msg: `Ticket ${id} was deleted` });
});

const port = 3101;

//fetch(`http://localhost:${port}/api/n1/tickets`, {method:'GET'}).then(x => x.json()).then(y => console.log(y))
//fetch(`http://localhost:${port}/api/n1/tickets`, {method:'POST', body:'{"name":"lee","problem":"out of gas"}',headers:{'Content-Type':'application/json'}}).then(x => x.json()).then(y => console.log(y))
//fetch(`http://localhost:${port}/api/n1/tickets/1`, {method:'DELETE'}).then(x => x.json()).then(y => console.log(y))

// curl -X POST http://localhost:3101/api/n1/tickets -d='{"name":"lee","problem":"flat tire"}'
// curl http://localhost:3101/api/n1/tickets/
// curl -X DELETE http://localhost:3101/api/n1/tickets/1

app.listen(3101, () => console.log('Server listening on port 3101'));

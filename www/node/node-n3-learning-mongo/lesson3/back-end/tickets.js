const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

// Not used
// app.use(bodyParser.urlencoded({
//   extended: false
// }));

// LSJ added for static frontend hosting on server port
app.use(express.static('../public/'));

const mongoose = require('mongoose');

const userName = process.env.MONGOUSER;
const password = process.env.MONGOPASSWORD;
const hostname = process.env.MONGOHOSTNAME;

// connect to the database
const url = `mongodb+srv://${userName}:${password}@${hostname}/n3`;
mongoose.connect(url, {
  useUnifiedTopology: true,
  useNewUrlParser: true,
});

const ticketSchema = new mongoose.Schema({
  name: String,
  problem: String,
});

// create a virtual paramter that turns the default _id field into id
ticketSchema.virtual('id').get(function () {
  return this._id.toHexString();
});

// Ensure virtual fields are serialised when we turn this into a JSON object
ticketSchema.set('toJSON', {
  virtuals: true,
});

// create a model for tickets
const Ticket = mongoose.model('Ticket', ticketSchema);

app.get('/api/tickets', async (req, res) => {
  try {
    let tickets = await Ticket.find();
    res.send({
      tickets: tickets,
    });
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

app.post('/api/tickets', async (req, res) => {
  const ticket = new Ticket({
    name: req.body.name,
    problem: req.body.problem,
  });
  try {
    await ticket.save();
    res.send({
      ticket: ticket,
    });
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

app.delete('/api/tickets/:id', async (req, res) => {
  try {
    await Ticket.deleteOne({
      _id: req.params.id,
    });
    res.sendStatus(200);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

app.listen(3000, () => console.log('Server listening on port 3000!'));

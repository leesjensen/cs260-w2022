const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();
const users = require('./users.js');

//
// Tickets
//

const User = users.model;
const validUser = users.valid;

// This is the schema for a ticket
const ticketSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
  },
  problem: String,
  status: {
    type: String,
    default: 'open',
  },
  response: {
    type: String,
    default: '',
  },
  created: {
    type: Date,
    default: Date.now,
  },
});

// The model for a ticket
const Ticket = mongoose.model('Ticket', ticketSchema);

// get tickets -- will list tickets that a user has submitted
router.get('/', validUser, async (req, res) => {
  let tickets = [];
  try {
    if (req.user.role === 'admin') {
      tickets = await Ticket.find().sort({
        created: -1,
      });
    } else {
      tickets = await Ticket.find({
        user: req.user,
      }).sort({
        created: -1,
      });
    }
    return res.send({
      tickets: tickets,
    });
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
});

// create a ticket
router.post('/', validUser, async (req, res) => {
  const ticket = new Ticket({
    user: req.user,
    problem: req.body.problem,
  });
  try {
    await ticket.save();
    return res.send({
      ticket: ticket,
    });
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
});

// edit a ticket -- only edits status and response
router.put('/:id', validUser, async (req, res) => {
  // can only do this if an administrator
  if (req.user.role !== 'admin') {
    return res.sendStatus(403);
  }
  if (!req.body.status || !req.body.response) {
    return res.status(400).send({
      message: 'status and response are required',
    });
  }
  try {
    ticket = await Ticket.findOne({
      _id: req.params.id,
    });
    ticket.status = req.body.status;
    ticket.response = req.body.response;
    await ticket.save();
    return res.send({
      ticket: ticket,
    });
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
});

module.exports = {
  routes: router,
};

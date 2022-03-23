const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

// setup express
const app = express();

const cookieParser = require('cookie-parser');
app.use(cookieParser());

const cookieSession = require('cookie-session');
app.use(
  cookieSession({
    name: 'session',
    keys: ['secretValue'],
    cookie: {
      maxAge: 24 * 60 * 60 * 1000, // 24 hours
    },
  })
);

// setup body parser middleware to conver to JSON and handle URL encoded forms
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: false,
  })
);

// import the users module and setup its API path
const users = require('./users.js');
app.use('/api/users', users.routes);

// import the tickets module and setup its API path
const tickets = require('./tickets.js');
app.use('/api/tickets', tickets.routes);

// connect to the mongodb database
mongoose.connect(
  'mongodb+srv://cs260mongo:eFyT6SaX6ElqMqsx@cluster0.2iaao.mongodb.net/pagliaccio',
  {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  }
);

// listen on port 3000
app.listen(3000, () => console.log('Server listening on port 3000!'));

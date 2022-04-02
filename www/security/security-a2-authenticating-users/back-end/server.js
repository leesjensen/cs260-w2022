const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const path = require('path');

// setup express
const app = express();

app.use(
  express.static(path.join(path.dirname(__filename), '../front-end/dist'))
);

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

const userName = process.env.MONGOUSER;
const password = process.env.MONGOPASSWORD;
const hostname = process.env.MONGOHOSTNAME;
const dbName = 'pagliaccio';

const url = `mongodb+srv://${userName}:${password}@${hostname}/${dbName}`;

// connect to the mongodb database
mongoose.connect(url, {
  useUnifiedTopology: true,
  useNewUrlParser: true,
});

app.listen(6020, () => console.log('listening on port 6020'));

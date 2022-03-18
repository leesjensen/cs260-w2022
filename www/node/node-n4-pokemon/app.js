const express = require('express');
const path = require('path');

const routes = require('./routes/index');

const app = express();

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  res.status(404).send('A page you have lost. Here it is not found.');
});

module.exports = app;

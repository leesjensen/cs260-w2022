var express = require('express');
var path = require('path');

var app = express();

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

var indexRouter = require('./routes/index');
app.use('/', indexRouter);

// If nothing else responds then send HTTP status 404
app.use(function (req, res, next) {
  res.status(404).send('Not found');
});

module.exports = app;

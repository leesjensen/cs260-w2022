var express = require('express');
var path = require('path');
// var favicon = require('serve-favicon');
// var logger = require('morgan');
// var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var app = express();

// view engine setup
// No views. janky to process HTML on the server
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
// app.use(logger('dev'));

// Simplify the body parsing of application/json content types
app.use(bodyParser.json());

app.use(function (req, res, next) {
  if (!res.getHeader('Access-Control-Allow-Origin')) {
    res.setHeader('Access-Control-Allow-Origin', '*');
  }
  next();
});

// Not doing URLEncoded requests
// app.use(bodyParser.urlencoded({ extended: false }));

// No cookies
// app.use(cookieParser());

// Need this for serving up files from public dir
app.use(express.static(path.join(__dirname, 'public')));

// This sets up to use the routes defined in ./routes/index.js
var routes = require('./routes/index');
app.use('/', routes);

// Unnecessary express template code
//var users = require('./routes/users');
//app.use('/users', users);

// Declared after all other routes to catch 404 and forward to error handler
app.use(function (req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// development error handler will print stacktrace
// env parameter is actually an environment variable.
//because this is declared before the production one and doesn't call next it will not chain.
if (app.get('env') === 'development') {
  app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.json({ error: err.message, stack: err.stack });
  });
}

// production error handler
app.use(function (err, req, res, next) {
  res.status(err.status || 500);
  res.json({ error: err.message });
});

module.exports = app;

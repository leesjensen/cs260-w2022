const express = require('express');

const mongoose = require('mongoose');

const userName = process.env.MONGOUSER;
const password = process.env.MONGOPASSWORD;
const hostname = process.env.MONGOHOSTNAME;
const dbName = 'n5';

// Replace the connection string if you are not running MongoDB
// on the machine you are running this code from.
const dbURL = `mongodb+srv://${userName}:${password}@${hostname}/${dbName}`;
mongoose.connect(dbURL);

const Comments = require('../models/Comments');
const Comment = mongoose.model('Comment');

const router = express.Router();
router.get('/', function (req, res, next) {
  res.send('hello ');
});

// List all comments
router.get('/comments', function (req, res, next) {
  Comment.find(function (err, comments) {
    if (err) {
      return next(err);
    }
    res.json(comments);
  });
});

// Get a specific comment
router.get('/comments/:comment', function (req, res) {
  res.json(req.comment);
});

// Create a new comment
router.post('/comments', function (req, res, next) {
  const comment = new Comment(req.body);
  comment.save(function (err, comment) {
    if (err) {
      return next(err);
    }
    res.json(comment);
  });
});

// Upvote a comment
router.put('/comments/:comment/upvote', function (req, res, next) {
  req.comment.upvote(function (err, comment) {
    if (err) {
      return next(err);
    }
    res.json(comment);
  });
});

// Convert the parameter ID to an actual object from the database
router.param('comment', function (req, res, next, id) {
  const query = Comment.findById(id);
  query.exec(function (err, comment) {
    if (err || !comment) {
      return next(new Error(`can't find comment with id ${id}`));
    }
    req.comment = comment;
    return next();
  });
});

module.exports = router;

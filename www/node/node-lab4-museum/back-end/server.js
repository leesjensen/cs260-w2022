const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: false,
  })
);

const mongoose = require('mongoose');

const userName = process.env.MONGOUSER;
const password = process.env.MONGOPASSWORD;
const hostname = process.env.MONGOHOSTNAME;
const dbName = 'museum';

const url = `mongodb+srv://${userName}:${password}@${hostname}/${dbName}`;

// connect to the database
mongoose.connect(url, {
  useNewUrlParser: true,
});

// Create a scheme for items in the museum: a title and a path to an image.
const itemSchema = new mongoose.Schema({
  title: String,
  path: String,
});

// Create a model for items in the museum.
const Item = mongoose.model('Item', itemSchema);

// Configure multer so that it will upload to '../front-end/public/images'
const multer = require('multer');
const upload = multer({
  dest: path.join(path.dirname(__filename), '../front-end/public/images/'),
  limits: {
    fileSize: 10000000,
  },
});

const u = upload.single('photo');

// Upload a photo. Uses the multer middleware for the upload and then returns
// the path where the photo is stored in the file system.
app.post('/api/photos', u, async (req, res, next) => {
  // Just a safety check
  if (!req.file) {
    return res.sendStatus(400);
  }
  res.send({
    path: '/images/' + req.file.filename,
  });
});

// Create a new item in the museum: takes a title and a path to an image.
app.post('/api/items', async (req, res) => {
  const item = new Item({
    title: req.body.title,
    path: req.body.path,
  });
  try {
    await item.save();
    res.send(item);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

// Get a list of all of the items in the museum.
app.get('/api/items', async (req, res) => {
  try {
    let items = await Item.find();
    res.send(items);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

// Get a list of all of the items in the museum.
app.delete('/api/items/:id', async (req, res) => {
  try {
    await Item.deleteOne({ _id: req.params.id });
    res.send({ action: 'deleted', id: req.params.id });
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

app.listen(3000, () => console.log('Server listening on port 3000!'));

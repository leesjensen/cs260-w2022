const express = require('express');
const path = require('path');
const pokemonRoutes = require('./pokemon');

const app = express();

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', pokemonRoutes);

app.use(function (req, res, next) {
  res.status(404).send('A page you have lost. Here it is not found.');
});

app.listen(5040, () => console.log('listening port 5040'));

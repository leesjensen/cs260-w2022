var express = require('express');
const axios = require('axios');
var router = express.Router();

/* GET home page. */
// router.get('/', function(req, res, next) {
//   res.render('index', { title: 'Express' });
// });
router.get('/', function (req, res) {
  res.sendFile('index.html', { root: 'public' });
});

router.get('/pokemon', function (req, res) {
  res.send(pokemon);
});

router.post('/pokemon', function (req, res) {
  console.log('In Pokemon Post');
  console.log(req.body);
  pokemon.push(req.body);
  res.end('{"success" : "Updated Successfully", "status" : 200}');
});

var politics = 'https://zlzlap7j50.execute-api.us-east-1.amazonaws.com/prod';
router.get('/politics', function (req, res) {
  axios
    .get(politics)
    .then((r) => {
      res.send(r.data);
    })
    .catch((error) => console.log(error));
});

module.exports = router;

var pokemon = [
  {
    name: 'Pikachu',
    avatarUrl: 'https://assets.pokemon.com/assets/cms2/img/pokedex/full/025.png',
  },
  {
    name: 'Charmander',
    avatarUrl: 'http://24.media.tumblr.com/tumblr_ma0tijLFPg1rfjowdo1_500.gif',
  },
  {
    name: 'Mew',
    avatarUrl: 'http://media3.giphy.com/media/J5JrPT8r1xGda/giphy.gif',
  },
  {
    name: 'Cubone',
    avatarUrl: 'https://assets.pokemon.com/assets/cms2/img/pokedex/full/104.png',
  },
  {
    name: 'Cleffa',
    avatarUrl: 'http://media1.giphy.com/media/pTh2K2xTJ1nag/giphy.gif',
  },
  {
    name: 'Gengar',
    avatarUrl: 'https://s-media-cache-ak0.pinimg.com/originals/7e/3b/67/7e3b67c53469cc4302035be70a7f2d60.gif',
  },
];

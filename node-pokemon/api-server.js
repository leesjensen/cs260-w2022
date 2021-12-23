/**
 * This array of pokemon will represent a piece of data in our 'database'
 */
var pokemon = [
  {
    name: 'Pikachu',
    avatarUrl: 'https://assets.pokemon.com/assets/cms2/img/pokedex/full/025.png'
  },
  {
    name: 'Charmander',
    avatarUrl: 'http://24.media.tumblr.com/tumblr_ma0tijLFPg1rfjowdo1_500.gif'

  },
  {
    name: 'Mew',
    avatarUrl: 'http://media3.giphy.com/media/J5JrPT8r1xGda/giphy.gif'
  },
  {
    name: 'Cubone',
    avatarUrl: 'https://assets.pokemon.com/assets/cms2/img/pokedex/full/104.png'
  },
  {
    name: 'Cleffa',
    avatarUrl: 'http://media1.giphy.com/media/pTh2K2xTJ1nag/giphy.gif'
  },
  {
    name: 'Gengar',
    avatarUrl: 'https://s-media-cache-ak0.pinimg.com/originals/7e/3b/67/7e3b67c53469cc4302035be70a7f2d60.gif'
  }
];

var http = require('http');
var url = require('url');
var fs = require('fs');
var ROOT_DIR = "src/";
var port = 4000;

http.createServer(function (req, res) {
  var urlObj = url.parse(req.url, true, false);

  if (urlObj.pathname === '/pokemon') {

    /**
     * TODO: return the array of pokemon above as a string
     * with an header status of 'ok'
     */

  } else {

    /**
     * Here is where we return all requests for files in our 'src' directory
     */
    fs.readFile(ROOT_DIR + urlObj.pathname, function (err, data) {
      if (err) {
        res.writeHead(404);
        res.end(JSON.stringify(err));
        return;
      }
      res.writeHead(200);
      res.end(data);
    });
  }

}).listen(port);

console.log('app is now running on port: ' + port)


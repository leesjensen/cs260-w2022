var express = require('express');
var router = express.Router();
var mongodb = require('mongodb');

// We need to work with "MongoClient" interface in order to connect to a mongodb server.
var MongoClient = mongodb.MongoClient;

const userName = process.env.MONGOUSER;
const password = process.env.MONGOPASSWORD;
const hostname = process.env.MONGOHOSTNAME;
const dbName = 'pokemon';
const colName = 'poke';

// connect to the database
const dbUrl = `mongodb+srv://${userName}:${password}@${hostname}/${colName}`;
var collection;

// Use connect method to connect to the Server
MongoClient.connect(
  dbUrl,
  { useUnifiedTopology: true, useNewUrlParser: true },
  function (err, client) {
    if (err) {
      console.log('Unable to connect to the mongoDB server. Error:', err);
    } else {
      var db = client.db('pokemon');

      // const exists = await client
      //   .db(dbName)
      //   .listCollections({ name: colName })
      //   .hasNext();
      // if (!exists) {
      //   await client.db(dbName).collection(colName).insertMany(docs);
      // }

      db.createCollection('poke', function (err, result) {
        if (err) {
          collection = db.collection('poke');
          return; // the database is likely filled anyway, so not worth checking to add to the collection
        }
        collection = result;

        collection.stats(function (err, stats) {
          if (err) {
            console.log(err);
          }
          if (stats.count == 0) {
            // If we havent inserted before, put the default in
            collection.insertMany(pokemon, function (err, result) {
              if (err) {
                console.log(err);
              } else {
                console.log(
                  'Inserted documents into the "poke" collection. The documents inserted with "_id" are:',
                  result.length,
                  result
                );
              }
            });
          }
        });
      });
    }
  }
);

/* GET home page. */
router.get('/', function (req, res) {
  res.sendFile('index.html', { root: 'public' });
});

router.get('/pokemon', function (req, res) {
  collection.find().toArray(function (err, result) {
    if (err) {
      console.log(err);
    } else if (result.length) {
      res.send(result);
    }
  });
});
router.post('/pokemon', function (req, res) {
  collection.insertOne(req.body, function (err, result) {
    if (err) {
      console.log(err);
    } else {
      console.log('Inserted document into the "pokemon" collection.');
      res.end('{"success" : "Updated Successfully", "status" : 200}');
    }
  });
});
module.exports = router;

var pokemon = [
  {
    name: 'Pikachu',
    avatarUrl:
      'https://www.pokemoncenter.com/wcsstore/PokemonCatalogAssetStore/images/catalog/products/P4828/701-03127/P4828_701-03127_01.jpg',
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
    avatarUrl:
      'https://assets.pokemon.com/assets/cms2/img/pokedex/full/104.png',
  },
  {
    name: 'Cleffa',
    avatarUrl: 'http://media1.giphy.com/media/pTh2K2xTJ1nag/giphy.gif',
  },
  {
    name: 'Gengar',
    avatarUrl:
      'https://s-media-cache-ak0.pinimg.com/originals/7e/3b/67/7e3b67c53469cc4302035be70a7f2d60.gif',
  },
];

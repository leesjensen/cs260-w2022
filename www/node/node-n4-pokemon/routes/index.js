const express = require('express');
const router = express.Router();
const mongodb = require('mongodb');

// Set up the database
const userName = process.env.MONGOUSER;
const password = process.env.MONGOPASSWORD;
const hostname = process.env.MONGOHOSTNAME;
const dbName = 'pokemon';
const colName = 'poke';

const dbUrl = `mongodb+srv://${userName}:${password}@${hostname}/${colName}`;
const client = new mongodb.MongoClient(dbUrl);
const collection = client.db(dbName).collection(colName);

async function loadDatabase() {
  await client.connect();

  const exists = await client
    .db(dbName)
    .listCollections({ name: colName })
    .hasNext();
  if (!exists) {
    await collection.insertMany(defaultPokemonData);
  }
}

loadDatabase().catch(console.error);

// Set up the routes
router.get('/', function (req, res) {
  res.sendFile('index.html', { root: 'public' });
});

router.get('/pokemon', async function (req, res) {
  const result = await collection.find().toArray();
  res.send(result);
});

router.post('/pokemon', async function (req, res) {
  await collection.insertOne(req.body);
  res.end('{"success" : "Updated Successfully", "status" : 200}');
});
module.exports = router;

// Default data
var defaultPokemonData = [
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

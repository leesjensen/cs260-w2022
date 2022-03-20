const express = require('express');
const mongodb = require('mongodb');
const defaultPokemonData = require('./pokedata');

// Set up the database
const userName = process.env.MONGOUSER;
const password = process.env.MONGOPASSWORD;
const hostname = process.env.MONGOHOSTNAME;
const dbName = 'pokemon';
const colName = 'poke';

const dbUrl = `mongodb+srv://${userName}:${password}@${hostname}/${dbName}`;
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
}

loadDatabase().catch(console.error);

// Set up the routes
const router = express.Router();

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

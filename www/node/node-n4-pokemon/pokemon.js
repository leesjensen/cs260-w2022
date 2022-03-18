const express = require('express');
const mongodb = require('mongodb');
const defaultPokemonData = require('./pokedata');

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

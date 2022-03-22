const { MongoClient } = require('mongodb');
const data = require('./listingData');

const userName = process.env.MONGOUSER;
const password = process.env.MONGOPASSWORD;
const hostname = process.env.MONGOHOSTNAME;
const dbName = 'bnb';
const colName = 'listings';

const url = `mongodb+srv://${userName}:${password}@${hostname}/${dbName}`;

async function main() {
  const client = new MongoClient(url);

  try {
    await client.connect();

    const result = await client.db(dbName).collection(colName).insertMany(data);

    console.log(`Inserted ${result.insertedCount} docs`);
  } finally {
    await client.close();
  }
}

main().catch(console.error);

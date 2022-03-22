const { MongoClient } = require('mongodb');

const userName = process.env.MONGOUSER;
const password = process.env.MONGOPASSWORD;
const hostname = process.env.MONGOHOSTNAME;

const dbName = 'astro';
const colName = 'nebulae';

const docs = [
  { ngc: 'NGC 7293', name: 'Helix', type: 'planetary', location: 'Aquila' },
  { ngc: 'NGC 6543', name: "Cat's Eye", type: 'planetary', location: 'Draco' },
  { ngc: 'NGC 1952', name: 'Crab', type: 'supernova', location: 'Taurus' },
];

async function main() {
  const url = `mongodb+srv://${userName}:${password}@${hostname}/${dbName}`;
  console.log(url);
  const client = new MongoClient(url);

  try {
    await client.connect();

    // Create the collection if it don't exist
    const exists = await client
      .db(dbName)
      .listCollections({ name: colName })
      .hasNext();
    if (!exists) {
      await client.db(dbName).collection(colName).insertMany(docs);
    }

    // Do a query
    const result = await client
      .db(dbName)
      .collection(colName)
      .findOne({ type: 'supernova' });
    console.log('Found', result);
  } finally {
    await client.close();
  }
}

main().catch(console.error);

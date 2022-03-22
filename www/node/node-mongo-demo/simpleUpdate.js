const { MongoClient } = require('mongodb');

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

    const col = client.db(dbName).collection(colName);
    const result = await col.updateMany(
      { state: { $ne: 'occupied' } },
      { $set: { state: 'occupied' } }
    );
    console.log(`Updated: ${result.modifiedCount}`);
  } finally {
    await client.close();
  }
}

main().catch(console.error);

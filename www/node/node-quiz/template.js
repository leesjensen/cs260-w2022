const { MongoClient } = require('mongodb');

const userName = process.env.MONGOUSER;
const password = process.env.MONGOPASSWORD;
const hostname = process.env.MONGOHOSTNAME;

async function main() {
  const url = `mongodb+srv://${userName}:${password}@${hostname}/admin`;
  const client = new MongoClient(url);

  try {
    await client.connect();

    console.log('do stuff here');
  } finally {
    await client.close();
  }
}

main().catch(console.error);

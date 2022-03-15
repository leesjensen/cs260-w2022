const { MongoClient } = require('mongodb');

const userName = process.env.MONGOUSER;
const password = process.env.MONGOPASSWORD;

async function main() {
  const url = `mongodb+srv://${userName}:${password}@cluster0.2iaao.mongodb.net/x`;
  const client = new MongoClient(url);

  try {
    await client.connect();
    // Put your stuff here!
  } finally {
    await client.close();
  }
}

main().catch(console.error);

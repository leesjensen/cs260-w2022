const { MongoClient } = require('mongodb');

const userName = process.env.MONGOUSER;
const password = process.env.MONGOPASSWORD;
const hostname = process.env.MONGOHOSTNAME;
const dbName = 'bnb';
const colName = 'listings';

const url = `mongodb+srv://${userName}:${password}@${hostname}/${dbName}`;

function main() {
  const client = new MongoClient(url);

  client.connect(function (err, client) {
    if (err) throw err;

    let db = client.db(dbName);
    db.collection(colName)
      .find()
      .toArray(function (err, result) {
        if (err) throw err;

        result.forEach((i) => console.log(i));
        client.close();
      });
  });
}

main();

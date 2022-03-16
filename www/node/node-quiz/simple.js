const MongoClient = require('mongodb').MongoClient;

const userName = process.env.MONGOUSER;
const password = process.env.MONGOPASSWORD;
const hostname = process.env.MONGOHOSTNAME;

MongoClient.connect(
  `mongodb://${userName}:${password}@${hostname}/admin`,
  function (err, client) {
    if (err) throw err;

    let db = client.db('university');
    const j = db
      .collection('students')
      .find()
      .toArray(function (err, result) {
        if (err) throw err;
        result.forEach((i) => {
          console.log(i);
        });
        client.close();
      });
  }
);

const MongoClient = require('mongodb').MongoClient;

const userName = process.env.MONGOUSER;
const password = process.env.MONGOPASSWORD;

MongoClient.connect(
  //  `mongodb://${userName}:${password}@cs260.click:27017/admin`,
  `mongodb+srv://${userName}:${password}@cluster0.2iaao.mongodb.net/x`,
  function (err, client) {
    if (err) throw err;

    let db = client.db('university');
    db.collection('students')
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

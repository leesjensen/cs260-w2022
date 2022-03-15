const MongoClient = require('mongodb').MongoClient;

const userName = process.env.MONGOUSER;
const password = process.env.MONGOPASSWORD;

MongoClient.connect(
  //  `mongodb://${userName}:${password}@cs260.click:27017/admin`,
  `mongodb+srv://${userName}:${password}@cluster0.2iaao.mongodb.net/x`,
  function (err, client) {
    if (err) throw err;

    let db = client.db('university');
    const j = db
      .collection('students')
      .find()
      .then((res) => {
        res.toJSON();

        client.close();
      });
  }
);

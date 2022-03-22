var MongoClient = require('mongodb').MongoClient;

const userName = process.env.MONGOUSER;
const password = process.env.MONGOPASSWORD;
const hostname = process.env.MONGOHOSTNAME;

function addObject(collection, object) {
  collection.insert(object, function (err, result) {
    if (!err) {
      if (err) {
        throw new Error(err);
      }

      console.log('Inserted : ');
      console.log(result);
    }
  });
}
MongoClient.connect(
  `mongodb+srv://${userName}:${password}@${hostname}/admin`,
  function (err, db) {
    if (err) {
      throw new Error(err);
    }
    var myDB = db.db('astro');
    myDB.dropCollection('nebulae');
    myDB.createCollection('nebulae', function (err, nebulae) {
      if (err) {
        throw new Error(err);
      }
      addObject(nebulae, {
        ngc: 'NGC 7293',
        name: 'Helix',
        type: 'planetary',
        location: 'Aquila',
      });
      addObject(nebulae, {
        ngc: 'NGC 6543',
        name: "Cat's Eye",
        type: 'planetary',
        location: 'Draco',
      });
      addObject(nebulae, {
        ngc: 'NGC 1952',
        name: 'Crab',
        type: 'supernova',
        location: 'Taurus',
      });
    });
    setTimeout(function () {
      myDB
        .collection('nebulae')
        .findOne({ type: 'supernova' }, function (err, item) {
          if (err) {
            throw new Error(err);
          }
          console.log('Found One: ');
          console.log(item);

          db.close();
        });
    }, 3000);
  }
);

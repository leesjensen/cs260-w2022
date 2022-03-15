/*
This was derived from the tutorial found here:
https://mongoosejs.com/docs/index.html

However, it is really bad and so I rewrote it.
*/

const mongoose = require('mongoose');

const userName = process.env.MONGOUSER;
const password = process.env.MONGOPASSWORD;
const mongoHostname = 'cluster0.2iaao.mongodb.net';

async function main() {
  // Connect to the server and set the database to cats
  await mongoose.connect(
    `mongodb+srv://${userName}:${password}@${mongoHostname}/cats`
  );

  // Create a schema to represent the collection%
  const kittySchema = new mongoose.Schema({
    name: String,
  });

  // Create a function that is associated with the schema
  kittySchema.methods.speak = function speak() {
    console.log('Meow name is ' + (this.name || 'secret'));
  };

  // Bind the schema to a Mongo collection name
  const Kitten = mongoose.model('kitten', kittySchema);

  // Add some kittens
  await new Kitten({ name: 'hairball' }).save();
  await new Kitten({ name: 'fluffy' }).save();
  await new Kitten().save();

  // Do a query on the kitten colection and speak the name of each kitten that is found
  const kittens = await Kitten.find();
  kittens.forEach((kitten) => {
    kitten.speak();
  });
}

main().catch(console.error);

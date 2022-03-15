/*
This folows the tutorial found here:
https://mongoosejs.com/docs/index.html

Wow. really bad.
 */

const mongoose = require('mongoose');

main().catch((err) => console.log(err));

async function main() {
  await mongoose.connect(
    `mongodb+srv://${process.env.MONGOUSER}:${process.env.MONGOPASSWORD}@cluster0.2iaao.mongodb.net/myFirstDatabase`
  );

  const kittySchema = new mongoose.Schema({
    name: String,
  });

  kittySchema.methods.speak = function speak() {
    const greeting = this.name
      ? 'Meow name is ' + this.name
      : "I don't have a name";
    console.log(greeting);
  };

  const Kitten = mongoose.model('Kitten', kittySchema);

  const silence = new Kitten({ name: 'Silence' });
  console.log(silence.name); // 'Silence'

  const fluffy = new Kitten({ name: 'fluffy' });
  await fluffy.save();
  fluffy.speak();

  const kittens = await Kitten.find();
  console.log(kittens);
}

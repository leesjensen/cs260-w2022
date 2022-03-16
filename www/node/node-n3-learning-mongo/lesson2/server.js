const mongoose = require('mongoose');

// connect to the database
mongoose.connect('mongodb://localhost:27017/test', {
  useUnifiedTopology: true,
  useNewUrlParser: true
});

// Create a Model for a cat. This creates a MongoDB collection for cats
const Cat = mongoose.model('Cat', {
  name: String
});

// Create a document for a cat. This creates a document in the cats collection.
const kitty = new Cat({
  name: 'Morris'
});

async function work() {
  // save the kitty to the database in the Cats collection
  await kitty.save();
  console.log('meow');
  // find all the documents in the Cats collection
  let kitties = await Cat.find();
  console.log(kitties);
}

work();

# Lesson 2: Using Mongo with Node and Mongoose

We're going to use the [Mongoose](https://mongoosejs.com/) library with Node.
Mongoose provides an *object data model* for MongoDB, so that you can access
Mongo documents as if they were JavaScript objects.

Let's create a Node project so we can try this out:

```
mkdir lesson2
cd lesson2
npm init
```

Install Mongoose:

```
npm install mongoose
```

Now create `server.js` so that it contains:

```javascript
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/test', {
  useUnifiedTopology: true,
  useNewUrlParser: true
});

const Cat = mongoose.model('Cat', {
  name: String
});

const kitty = new Cat({
  name: 'Morris'
});

async function work() {
  await kitty.save();
  console.log('meow');
  let kitties = await Cat.find();
  console.log(kitties);
}

work();
```

The first few lines load the Mongo library and connect to the Mongo database.

We next create a model for a Cat. This creates a *collection* called cats.

Next we create a document for a cat.

Finally, we use an async function to save the document into the database and
then find all the documents in the Cat model (the cats collection).

You can run this code with `node server.js`. You can exit the code with `control-c`.

```
$ node server.js
meow
[ { _id: 5e6c055371824b0d73f6ab3f, name: 'Morris', __v: 0 } ]
^C
```

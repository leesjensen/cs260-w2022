# Lesson 3: Building a help ticket database

In this directory you will find a help ticket web application. This
is split into a front end and a back end.

The front end is in the `front-end` folder and is a Vue CLI application.
It is identical to the one from Lesson 2 in [Learning Node and Express](https://github.com/BYU-CS-260/learning-node-express). You can run this code with:

```
cd front-end
npm install
npm run serve
```

The back end is in the `back-end` folder. You can run this code with:

```
cd back-end
npm install
node tickets.js
```

This is identical to the ticket server from Lesson 2 in [Learning Node and Express](https://github.com/BYU-CS-260/learning-node-express), except it now uses Mongo with Mongoose.

This lesson will walk you through how the back end is built.
I recommend cloning this repository and then:

```
cd lesson3
cd back-end
rm package*
mv tickets.js tickets-orig.js
```

This will keep a copy of the working server and let you build your own.

## Initialize the project

Let's initialize a new project. You do this with `npm init`.

```
cd lesson3
npm init
```

Now we need to install the libraries we need:

```
npm install express mongoose
```

## Configure mongoose

We first need to configure Mongoose. Create a file called `tickets.js`
and add the following:

```javascript
const express = require('express');
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));

const mongoose = require('mongoose');

// connect to the database
mongoose.connect('mongodb://localhost:27017/test', {
  useUnifiedTopology: true,
  useNewUrlParser: true
});
```

This connects to the Mongo database server and creates or connects to
the database called `test.`.

## Create a model for tickets

Immediately after this, in `tickets.js`, create a model for a Ticket. We first
create a schema:

```javascript
const ticketSchema = new mongoose.Schema({
  name: String,
  problem: String,
});
```

This says that a ticket will include a `name` and a `problem`, both strings.

Next, we create a virtual parameter for the schema called `id`:

```javascript
ticketSchema.virtual('id')
  .get(function() {
    return this._id.toHexString();
  });
```

We're doing this because by default every document in Mongo has a property called `_id`,
but our Express API and our Vue code uses `id` instead. This lets us easily convert
`_id` into `id`.

We also ensure that when documents are serialized into JSON objects that virtual
properties are included:

```javascript
ticketSchema.set('toJSON', {
  virtuals: true
});
```

Finally, we create a model for tickets that uses this schema.

```javascript
const Ticket = mongoose.model('Ticket', ticketSchema);
```

You will see below that the `Ticket` model comes with some built in
functions.

## Reading tickets

We need to create an endpoint for reading tickets
from the database:

```javascript
app.get('/api/tickets', async (req, res) => {
  try {
    let tickets = await Ticket.find();
    res.send({tickets: tickets});
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});
```

When the server receives a GET request for `/api/tickets`, it will call
the function we supply. We use the async keyword when defining this function. This lets us call `await` for the Mongoose database query.

The function is pretty simple, it calls Mongoose using `Ticket.find()`,
which retrieves an array of all of the tickets in the Ticket collection.
All Mongoose functions are Promises, so you can either use the `then/catch`
syntax or use `await`. Note that when you use `await` you should wrap it in a `try/catch` block to
catch errors.

The function takes the array of tickets returned from the database and sends them to the front end using `res.send()`. We send back a JavaScript object, which is converted into JSON when sent.

If you look in the front end in `src/Home.vue`, you will see the front end calling this API:

```javascript
    let response = await axios.get("/api/tickets");
    this.tickets = response.data.tickets;
```

Because the server returns a JSON object, which is converted back into a JavaScript object, the front end can get the tickets using `response.data.tickets`.

## Creating tickets

We next make an endpoint for creating tickets, which adds tickets
to the database:

```javascript
app.post('/api/tickets', async (req, res) => {
    const ticket = new Ticket({
    name: req.body.name,
    problem: req.body.problem
  });
  try {
    await ticket.save();
    res.send({ticket:ticket});
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});
```

When the server receives a POST request for `/api/tickets`, it will call
the function we supply.

The function uses Mongoose to create a new `Ticket`, initializing it
with an object that includes a `name` and a `problem`. These are taken
from the request object `req` that is sent to the server by the front
end.

Next, the function calls `ticket.save()`, which saves the ticket into
the Mongo database. It also sends the ticket to the front end with
`res.send()`.

Note that our front end doesn't actually use the returned ticket. In `src/Create.vue`, it calls the API with:

```javascript
await axios.post("/api/tickets", {
    name: this.name,
    problem: this.problem
});
```

So the front end ignores any returned data.

## Deleting tickets

Finally, we make an endpoint for deleting tickets, which deletes
them from the database:

```javascript
app.delete('/api/tickets/:id', async (req, res) => {
  try {
    await Ticket.deleteOne({
      _id: req.params.id
    });
    res.sendStatus(200);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});
```

When the server receives a DELETE request for `/api/tickets`, it will call
the function we supply.

This function uses Mongoose to call `Ticket.deleteOne()`, which deletes one ticket matching the supplied object. The front end supplies the id of the ticket to be deleted in `req.params.id` (the virtual parameter we sent when reading tickets). We map this to `_id` when supplying an object to `deleteOne()`.

The function uses `res.sendStatus(200)`, which returns a 200 OK status code, but no other data to the front end. When we used `res.send()`
previously this also returned 200 OK for the status, but with some
data.

## Listening

The final line should be:

```javascript
app.listen(3000, () => console.log('Server listening on port 3000!'));
```

This tells the server to listen for incoming connections on port 3000.

## Test it

The application should be done! It now saves data to the database instead of
to a local array. Start the server with:

```
node tickets.js
```

Start the front end with:

```
npm run serve
```

Open the Network tab in the browser console and create a ticket. You should see the HTTP POST request and response:

![POST request](/screenshots/post-request.png)

![POST response](/screenshots/post-response.png)

If you then navigate to the home page you should see the HTTP GET request and response:

![GET response](/screenshots/get-response.png)

If you press the delete button you should see the HTTP DELETE request/response, followed by GET request/response:

![DELETE response](/screenshots/delete-response.png)

Take a look at the `src/Home.vue` component in the front end to see why it immediately sends a GET response after the DELETE succeeds.

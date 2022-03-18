# VueNodeMongoPoki
Simple introduction to attaching a mongo database to a Vue-Node project
If you are using your DigitalOcean server, then follow the instructions from "Activity N3: Learning MongoDB" which will set up nginx to run on port 8080.  Then use the command "export PORT=8080" to cause node to run on this port.
We will start with a simple Vue application that talks to a node back end.  We went through this tutorial before, but you may want to clone this repository to get started
<pre>
git clone https://github.com/BYUCS260/VueNodeMongoPoki
cd VueNodeMongoPoki
npm install
npm start
</pre>

And make sure the application displays pokemon defined in the routes/index.js back end.

## Connecting to MongoDB

##### 1. Get access to MongoDB in our javascript
We will need to use npm here to install the javascript library that helps us communicate with mongodb. 

`npm install --save mongodb`

Now, add the module to your routes/index.js file

```js
var mongodb = require('mongodb');
```

##### 2. Open a connection

Next we will open a connection to mongodb using our snazzy new javascript library. Feel free to paste the following right underneath where we declare the `mongodb` variable.

```js
// We need to work with "MongoClient" interface in order to connect to a mongodb server.
var MongoClient = mongodb.MongoClient;

// Connection URL. This is where your mongodb server is running.
var dbUrl = 'mongodb://localhost:27017/';

// we will use this variable later to insert and retrieve a "collection" of data
var collection

// Use connect method to connect to the Server
MongoClient.connect(dbUrl, { useUnifiedTopology: true, useNewUrlParser: true }, function(err, client) {
  if (err) {
    console.log('Unable to connect to the mongoDB server. Error:', err);
  }
  else {
    // HURRAY!! We are connected. :)
    console.log('Connection established to', dbUrl);
    
    /**
     * TODO: insert data here, once we've successfully connected
     */
  }
});

```

Go ahead and run `npm start` in your terminal again, and you should expect to see the `connection established` log.

## Inserting data

##### 1. Make a 'pokemon' collection
Let's put that collection variable we already declared to work. Notice that in the callback function we provided to `MongoClient.connect`, we expect to receive a `client` variable. We will use that to select the `pokemon` database and then create a `poke` collection like so:

```js
    var db = client.db('pokemon'); //Connect to the database
    db.createCollection('poke', function(err, result) {
      if (err) {
        collection = db.collection('poke');
        console.log(err); //optional, just so you can see the error
        return; // the database is likely filled anyway, so not worth checking to add to the collection
      }
      collection = result;
    });
```
##### 2. Insert data
Now we will use that collection object to insert the array `pokemon` like so:

```js
      // Only do the insert if the collection is empty
      collection.stats(function(err, stats) {
        if (err) { console.log(err) }
        if (stats.count == 0) { // If we havent inserted before, put the default in
          collection.insertMany(pokemon, function(err, result) {
            if (err) { console.log(err) }
            else {
              console.log('Inserted documents into the "poke" collection. The documents inserted with "_id" are:', result.length, result);
            }
          });
        }
      });
```

All said and done our code connecting to the db and inserting our array of pokemon into the database should look something like the following:

```js
// Use connect method to connect to the Server
MongoClient.connect(dbUrl, { useUnifiedTopology: true, useNewUrlParser: true }, function(err, client) {
  if (err) {
    console.log('Unable to connect to the mongoDB server. Error:', err);
  }
  else {
    // HURRAY!! We are connected. :)
    console.log('Connection established to', dbUrl);
    // do some work here with the database.
    var db = client.db('pokemon'); //Connect to the database
    db.createCollection('poke', function(err, result) {
      if (err) {
        collection = db.collection('poke');
        console.log(err); //optional, just so you can see the error
        return; // the database is likely filled anyway, so not worth checking to add to the collection
      }

      collection = result;

      collection.stats(function(err, stats) {
        if (err) { console.log(err) }
        if (stats.count == 0) { // If we havent inserted before, put the default in
          collection.insertMany(pokemon, function(err, result) {
            if (err) { console.log(err) }
            else {
              console.log('Inserted documents into the "poke" collection. The documents inserted with "_id" are:', result.length, result);
            }
          });
        }
      });
    }); // Get the collection
  }
});
```

If we run `npm start` we should expect a log telling us we have an established connection, and a log informing us we've inserted documents.

## Retrieving data

Now we need to have our `get` route use data from the database.

The current code just returns the pokimon array
```js
router.get('/pokemon', function(req, res) {
  console.log("In Pokemon");
  res.send(pokemon);
});
```
Replace it with a call to query the database
```js
router.get('/pokemon', function(req, res) {
  console.log("In Pokemon");
  collection.find().toArray(function(err, result) {
    if (err) { console.log(err); }
    else if (result.length) {
      console.log("Query Worked");
      console.log(result);
      res.send(result);
    }
    else {
      console.log("No Documents found");
    }
  });
});
```
Now we just need to modify the post to put the new pokemon from the form into the database.  We will replace
```js
router.post('/pokemon', function(req, res) {
    console.log("In Pokemon Post");
    console.log(req.body);
    pokemon.push(req.body);
    res.end('{"success" : "Updated Successfully", "status" : 200}');
});
```
with
```js
router.post('/pokemon', function(req, res) {
  console.log("In Pokemon Post");
  collection.insertOne(req.body, function(err, result) {
    if (err) {
      console.log(err);
    }
    else {
      console.log('Inserted document into the "pokemon" collection.');
      res.end('{"success" : "Updated Successfully", "status" : 200}');
    }
  });
});
```



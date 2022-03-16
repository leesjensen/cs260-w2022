# Lesson 1: Using the Mongo console

If you have MongoDB running, then you can type the following at the command line:

```
mongo
```

This will connect you to the MongoDB server.

To display the database you are using, type:

```
db
```

This should tell you that you are using the `test` database, which is the default.

To switch to a new database called `university`, you can type:

```
use university
```

This will create a new database if it doesn't already exist.

To insert a document into a new collection of students, type:

```
db.students.insertOne({  name: "Emma",
  age: 21,
  status: "active",
  clubs: ["Astronomy Students","Anime Monthly Movie"]
});
```

To find all the students in the collection:
db

```
db.getCollection("students").find();
```

You can also pretty-print this:

```
db.getCollection("students").find().pretty();
```

Let's insert some more records:

```
db.students.insertMany([
  { name: "Helen",
    status:"inactive" },
  { name:"Akshay",
    status:"active",
    clubs:["Film Students","Anime Monthly Movie"]}
]);
```

And do some queries:

```
db.getCollection("students").find().pretty();
db.getCollection("students").find({status:"active"}).pretty();
```

Now let's quit:

```
quit();
```

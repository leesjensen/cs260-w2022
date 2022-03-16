# Learning Mongo: Overview

[Mongo](https://www.mongodb.com/) is a document-oriented database. You can
store JSON-like documents in the database and perform queries on them.
Mongo is also a distributed database, meaning you can replicate it over
several machines and balance the load on the database across these machines.
We will be learning the basics of Mongo and running it on a single server.

## Documents

Mongo documents are composed of field and value pairs, similar to JSON objects.
The value of a field may be a basic type (e.g. integer, string, boolean),
an array, another documents, or an array of documents.

For example, a simple document for a database of students could contain:

```
{
  name: "Emma",
  age: 21,
  status: "active",
  clubs: ["Astronomy Students","Anime Monthly Movie"]
}
```

An example document for an insurance company database might be:

```
{
  first_name: "Paul",
  surname: "Miller",
  city: "London",
  location: [45.123,47.232],
  cars: [
    {
      model: "Bentley"”,
      year: 1973,
      value: 100000, ...
    },
    {
      model: "Rolls Royce",
      year: 1965,
      value: 330000, ...
    },
  ]
}
```

Documents can also have references to other documents.
For example, a database for a university might have a collection of documents for students:

```
{
  _id: <ObjectId1>,
  first_name: "Emma",
  last_name: "Davidson"
  classes: [<ObjectId14>,<ObjectId15>,...]
}
{
  _id: <ObjectId2>,
  first_name: "Ashkay",
  last_name: "Kumar"
  classes: [<ObjectId14>,<ObjectId22>,...]
}

```

and another collection of documents for classes:

```
{
  _id: <ObjectId14>,
  number: "CS 260",
  name: "Web Programming",
  instructor: "Daniel Zappala",
  students: [<ObjectId1>,<ObjectId2>,...]
}
{
  _id: <ObjectId15>,
  number: "Music 101",
  name: "Introduction to Music",
  instructor: "Jaren Hinckley",
  students: [<ObjectId1>,<ObjectId3,...]
}
```

Documents are organized into *collections*. The documents in a collection can have a *flexible schema*, meaning that not all documents need to have the same structure.

## Resources

The [MongoDB manual](https://docs.mongodb.com/manual/) contains some good information on:

* [CRUD operations](https://docs.mongodb.com/manual/crud/)
* [Aggregation](https://docs.mongodb.com/manual/aggregation/)
* [Data Modeling](https://docs.mongodb.com/manual/core/data-modeling-introduction/)

If you're interested in data modeling (deciding when to divide data among different documents), see this three-part series on [6 Rules of Thumb for MongoDB Schema Design](https://www.mongodb.com/blog/post/6-rules-of-thumb-for-mongodb-schema-design-part-1?_ga=2.173464736.2038315200.1552159589-1012387045.1552159589).

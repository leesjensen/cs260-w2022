# Valuable links

https://www.npmjs.com/package/mongoose
https://mongoosejs.com/docs/guide.html
https://www.mongodb.com/developer/quickstart/node-crud-tutorial/

# Mongo Examples

Run the following in order to set the connection information to get to the Atlas Database.

```sh
source ~/keys/mongoAtlas.js
```

I created several files to demonstrate different things about Mongo.

- **simpleInsert.js** - Minimal Mongo insertion of data.
- **simpleFind.js** - Minimal Mongo find using promises.
- **simpleFindCallback.js** - Minimal Mongo find using callbacks.
- **template.js** - Minimal Mongo template using async/await.
- **quiz/newquiz.js** - Rewrite of Quiz Mongo question.
- **quiz/oldquiz.js** - The original Quiz question in all of its `setTimeout` glory. The problem here is that it doesn't - **quiz/mongoose.js** - Rewrite of Quiz mongoose question. use async/await.
- **bnb.js** - Smaller version of this really good [tutorial](https://www.mongodb.com/developer/quickstart/node-crud-tutorial/) created by MongoDB

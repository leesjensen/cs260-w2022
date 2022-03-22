# FullStack

In this tutorial you will create an application that will implement comments for a blog. Users can create comments and then upvote other people's comments. The following steps will walk you through using Express Generator to set up your initial project, build a front end using Vue, and an HTTP server using Express to host your Vue application and to make database calls to a MongoDB.

## Creating the Web Application

First create an express project

```sh
express comment
cd comment
npm install
```

Let's look at the project structure that was created by the express generator. Remember that there is nothing special about the structure and you are free to modify it in order to simplify things.

- `app.js` - This file is the launching point for our app. We use it to call other JavaScript code, configure routes, and open database connections.
- `bin/` - This directory is used to contain useful executable scripts. By default it contains one called `www`. A quick peek inside reveals that this script actually imports `app.js` and starts the HTTP server.
- `node_modules/` - This directory is home to all external modules used in the project. These modules are installed when you run `npm install`. You should touch anything here.
- `package.json` - This file contains a JSON object that defines various properties of our project including things such as the name and version number. It can also define what versions are required and what modules our project depends on. A list of possible options can be found in the NPM documentation.
- `public/` - As the name alludes to, anything in this folder will be made publicly available by the server. This is where we are going to store HTML, CSS, and images we want to serve up as static content.
- `routes/` - This directory houses our Node controllers and is usually where most of the backend code will be stored.
- `views/` - This is for server side rendered content. We will not be using this.

You can start the HTTP server, on the default port 3000, with the following command in your terminal window.

```sh
npm start
```

Alternatively, if you are using VS Code, you can press F5 to start a debug session (complete with the ability to have breakpoints) and then select `Node.js` to start debugging your server when prompted.

Check to make sure you can view the generated content by pointing your browser to `http://localhost:3000`.

Stop the server by pressing `CTRL-C`, if you started your server from the terminal, or `SHIFT-F5` to stop it if you started it from VS Code.

Take a look at the JavaScript file `bin/www`. This code lanches our HTTP server and is what is called when you first run `npm start`. Files in the `public` directory will be served by the node server because we are using the `express.static` middleware defined in `app.js`.

```js
app.use(express.static(path.join(__dirname, 'public')));
```

## Add a Vue Instance

Let's add a simple Vue application by creating the file `index.html` inside of the `public` directory.

```html
<!DOCTYPE html>
<html>
  <head>
    <link rel="stylesheet" type="text/css" href="stylesheets/style.css" />
    <meta charset="utf-8" />
    <title>Comments</title>
  </head>

  <body>
    <div id="app"></div>
    <script src="https://cdn.jsdelivr.net/npm/vue@2.6.2/dist/vue.js"></script>
    <script src="vueApp.js"></script>
  </body>
</html>
```

Now create a JavaScript file containing your Vue application in "public/vueApp.js".

```js
const app = new Vue({
  el: '#app',
  data: {
    comments: [
      { title: 'Comment 1', upvotes: 5 },
      { title: 'Comment 2', upvotes: 6 },
      { title: 'Comment 3', upvotes: 1 },
      { title: 'Comment 4', upvotes: 4 },
      { title: 'Comment 5', upvotes: 3 },
    ],
  },
  created: function () {},
  methods: {},
});
```

This creates a simple Vue app that has some hard coded data representing comments.
Modify `index.html` so that the comments get displayed by replacing `<div id="app"></div>` with the following.

```html
<div id="app">
  <li v-for="item in comments">{{item.title}} - upvotes: {{item.upvotes}}</li>
</div>
```

Execute `npm start` and open your browser to `http://localhost:3000`. Verify that everything works. It should display the following:

```
Comment 1 - upvotes: 5
Comment 2 - upvotes: 6
Comment 3 - upvotes: 1
Comment 4 - upvotes: 4
Comment 5 - upvotes: 3
```

Next let's sort the comments based on popularity. To do this, include a computed function named `sortedComments` in your Vue application.

```js
computed: {
    sortedComments() {
        return this.comments.sort((a, b) => {
          return b.upvotes - a.upvotes;
        })
    }
},
```

And modify your `index.html` to use the computed property.

```html
<li v-for="item in sortedComments">
  {{item.title}} - upvotes: {{item.upvotes}}
</li>
```

Test your application to make sure the comments are sorted by upvotes.

Now that we have the list displayed, it would be nice to add comments to the list. First create a method in `vueApp.js` that will add an object to the comments array.

```js
methods: {
    addComment() {
        this.comments.push({ title: this.newComment, upvotes: 0 });
        this.newComment = "";
    },
},
```

And add a newComment variable to the Vue data.

```js
  data: {
    newComment: "",
```

Then add an input and button element to `index.html` that calls the `addComment` function with the user's input.

```html
<input type="text" v-model="newComment" />
<button @click="addComment">Add</button>
```

Make sure everything is working. After adding a new comment it should show up in your list.

Now that we have the ability to add comments, we can allow the user to upvote the comments. Next to each comment, we will place a click-able character that the user can select to increment the upvotes. Notice that the parameter to incrementUpvotes is passed by reference so the list is automatically rearranged.

First, modify the list html to have the clickable character: 👍.

```html
<li v-for="item in sortedComments">
  <span @click="incrementUpvotes(item)">&#128077; </span>
  {{item.title}} - upvotes: {{item.upvotes}}
</li>
```

Then add at method to `vueApp.js` to handle the click.

```js
incrementUpvotes(item){
    item.upvotes = item.upvotes+1;
}
```

Test the front end to make sure everything is working. Notice that clicking on 👍 in the browser changed the item upvotes, and that in turn causes the computed method `sortedComments` to recalculate the sort order.

If you are stuck, you might want to refer to the working code in this repository.

## Add Database Support

Now we will install Mongoose which will provide schema support and help us to talk to our MongoDB database. First install the `mongoose` package.

```sh
npm install mongoose
```

Now we are going to set up the mongo database using mongoose.

Add the following code to the top of your `routes/index.js` in order to connect your HTTP server to the MongoDB database server.

**Note**: _You must have a valid connection string for a running MongoDB server. If you have not yet set up a MongoDB server then go do that now._

```js
const mongoose = require('mongoose');

const dbURL = 'mongodb://localhost/comments';
mongoose.connect(dbURL);
```

If you are not connecting to a MongoDB that is running locally on your computer, then replace `mongodb://localhost` with the connection string for your MongoDB server.

Add a new folder named `models` to the root of the project. This will contain the models for our data as represented by modMongoose schema definitions.

```sh
mkdir models
```

Create the file `Comments.js` in the `models` folder with the following content.

```js
const mongoose = require('mongoose');
const CommentSchema = new mongoose.Schema({
  title: String,
  upvotes: { type: Number, default: 0 },
});
mongoose.model('Comment', CommentSchema);
```

Add the model to your `routes/index.js` file right after the mongoose.connect call.

```js
const Comments = require('../models/Comments');
const Comment = mongoose.model('Comment');
```

## Create Service Routes

Now we need to open up REST routes to access the database. We want the user to be able to perform the following tasks:

1. List Comments
1. Get Comment
1. Add Comment
1. Upvote Comment

These tasks correspond to the following routes:

```
GET /comments - Get a list of comments
GET /comments/:id - Get a specific comment
POST /comments - Add a new comment
PUT /comments/:id/upvote - Upvote a comment
```

Let's start by creating the `List Comments` route in `routes/index.js`.

```js
router.get('/comments', function (req, res, next) {
  Comment.find(function (err, comments) {
    if (err) {
      return next(err);
    }
    res.json(comments);
  });
});
```

Notice that the Comment variable refers to the Comment model we imported earlier.

Before we can test that the route works, we need data in the Mongo database, so let's create the `Add Comment` route in routes/index.js

```js
router.post('/comments', function (req, res, next) {
  const comment = new Comment(req.body);
  comment.save(function (err, comment) {
    if (err) {
      return next(err);
    }
    res.json(comment);
  });
});
```

Notice that we created a Comment object from the req.body and saved it to the mongo database using the mongoose connection to the mongo database. Now let's test the routes using `curl` from your terminal. First, make sure you are serving up the latest code by killing your HTTP server and restarted it as we described earlier. Then run this command from your terminal.

```sh
curl -X POST http://localhost:3000/comments --data 'title=test'
```

This should return something like this:

```sh
{"__v":0,"title":"test","_id":"563ba5ac1a761cf149c0b258","upvotes":0}
```

Run it multiple times to create multiple comments, and then call the `List Comments`.

```sh
curl http://localhost:3000/comments
```

This should return something like the following.

```js
[{ _id: '563ae37a13190ba93fc96a34', title: 'test', __v: 0, upvotes: 1 }];
```

You can also access the `List Comments` route through your browser. Test it to make sure everything is working.

For the `Upvoting Comment` route, the front end will need to provide the comment's ID. In order to make this easier, we can use Express's ability to manipulate parameters by creating a `param` mapping on our router in `routes/index.js`.

```js
router.param('comment', function (req, res, next, id) {
  const query = Comment.findById(id);
  query.exec(function (err, comment) {
    if (err || !comment) {
      return next(new Error(`can't find comment with id ${id}`));
    }
    req.comment = comment;
    return next();
  });
});
```

Now, whenever we create a route with a `:comment` parameter, this function will retrieve the comment object from the database, before the route handler is called, and place the comment object on the `req` object passed to the route handler.

With this in place we can create the `Get Comment` route and return an individual comment.

```js
router.get('/comments/:comment', function (req, res) {
  res.json(req.comment);
});
```

Since the :comment route parameter was automatically inserted into the `req.comment` object, all we have to do is to return the JSON back to the client in the `Get Comment` route.

Use curl to try it out and make sure it is working. You will need to restart your server to make sure the latest code is running. (_Note: your IDs will be different._)

```sh
➜  ~ curl http://localhost:3000/comments
[{"_id":"62363c3df2f16b1b9e5e7913","upvotes":0,"__v":0}]

➜  ~ curl http://localhost:3000/comments/62363c3df2f16b1b9e5e7913
```

Now let's implement the `Upvote Comment` route. This will use `:comment` parameter conversion again to get the comment object from the database, and then use a new schema method to add the upvote to the comment object.

Add the following upvote schema method to `models/Comments.js`. Make sure this goes before `mongoose.model('Comment', CommentSchema);` so that it is defined before the model is created.

```js
CommentSchema.methods.upvote = function (cb) {
  this.upvotes += 1;
  this.save(cb);
};
```

Then create the `Upvote Comment` route in routes/index.js

```js
router.put('/comments/:comment/upvote', function (req, res, next) {
  req.comment.upvote(function (err, comment) {
    if (err) {
      return next(err);
    }
    res.json(comment);
  });
});
```

Now we can call our `Upvote Comment` route using curl. Don't forget to restart your server. Then call the `List Comments` route to list all of the comments. Find the id of one of the comments, and use curl again to upvote it with the `Upvote Comment` route. Hit the upvote route multiple times to see the vote go up. (_Note: your IDs will be different_).

```sh
➜  ~ curl http://localhost:3000/comments
[{"_id":"62363c3df2f16b1b9e5e7913","upvotes":0,"__v":0}]

curl -X PUT http://localhost:3000/comments/62363c3df2f16b1b9e5e7913/upvote
{"_id":"62363c3df2f16b1b9e5e7913","upvotes":1,"__v":0}

curl -X PUT http://localhost:3000/comments/62363c3df2f16b1b9e5e7913/upvote
{"_id":"62363c3df2f16b1b9e5e7913","upvotes":2,"__v":0}
```

## Connect the Vue Application to the HTTP Service

With our HTTP service working, the final step is to wire it up to our Vue application. First create an new method called `getAll` on our Vue application in `vueApp.js`. This will call the `List Comments` route on our backend service.

```js
getAll() {
  const url = '/comments';
  fetch(url)
    .then((r) => r.json())
    .then((response) => {
      this.comments = response;
    });
},
```

We want to load all of the comments when we create our Vue application and so we call it from the `created` lifecycle event.

```js
created: function() {
    this.getAll();
},
```

Use your browser to make sure that this is all working correctly. If it is then you will see the data that you inserted while testing the backend routes.

Now that you have implemented one service request, the others should be easy. Let's modify the `addComment` method to call the service route that writes to the Mongo database.

```js
addComment() {
  const comment = { title: this.newComment, upvotes: 0 };
  fetch('/comments', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(comment),
  })
    .then((r) => r.json())
    .then((response) => {
      this.comments.push(response);
    });
},
```

When the call to the POST /comments is successful, a comment object, with an \_id field, will be returned in response. We then push the new comment object onto the comment array, so that it appears in the list of comments.

Test this to make sure you can create new comments and see them displayed. You should be able to refresh the page and still see them since it is reading the list of persisted comments from the database.

Finally, we just need to be able to upvote comments. Follow the same process of making a fetch request to the `Upvote Comment` route in the `incrementUpvotes` method. Since the database data is potentially changed by multiple users updating the data at the same time, we will replace our view of the number of upvotes with the response data so that we can see what other users have voted.

```js
incrementUpvotes(item) {
  fetch(`/comments/${item._id}/upvote`, {
    method: 'PUT',
  })
    .then((r) => r.json())
    .then((response) => {
      item.upvotes = response.upvotes;
    });
},
```

Restart your server and test to make sure the upvotes are maintained across refreshes.

## Conclusion

You just created a full stack application that includes a `web application` that reacts dynamically to changes in data, a `REST service` that provides multiple endpoints from an HTTP server, and a database that persists data.

👍 Way to go! Go get yourself some chocolate and celebrate success.

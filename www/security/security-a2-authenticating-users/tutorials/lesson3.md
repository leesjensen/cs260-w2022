# Lesson 3: Registration and Login

We are going to build registration and login functionality for our application. We will use the [argon2](https://github.com/ranisalt/node-argon2) for salting and hashing passwords. This is the library recommended by cryptographers.

## Back End

Let's start with the back end. Install some of the libraries required for this.

```
cd back-end
npm install express mongoose body-parser argon2
```

Now open `server.js` and put the following there:

```javascript
const express = require('express');
const bodyParser = require("body-parser");
const mongoose = require('mongoose');

// setup express
const app = express();

// setup body parser middleware to conver to JSON and handle URL encoded forms
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));

// connect to the mongodb database
mongoose.connect('mongodb://localhost:27017/pagliaccio', {
  useUnifiedTopology: true,
  useNewUrlParser: true
});

// listen on port 3000
app.listen(3000, () => console.log('Server listening on port 3000!'));
```

This is the usual boilerplate for a Node/Express/Mongo back end. Notice we are using a new database for this application, called `pagliaccio`.

### Schema and model

Our first step is to create a schema and a model for users.

In the `back-end` directory, create a new file called `users.js` and place the following there:

```javascript
const express = require("express");
const mongoose = require('mongoose');
const argon2 = require("argon2");

const router = express.Router();
```

This imports the libraries we will be using.

Next, add the following:

```javascript
// This is the schema. Users have usernames and passwords. We solemnly promise to
// salt and hash the password!
const userSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  username: String,
  password: String,
});
```

This creates a schema for user documents in the database. Each user will store a username and a password.

If we leave this alone, we will be storing passwords in plain text. **This is evil and wrong and we must repent.**

### Salting and hashing

To make sure we do the right thing, we will use a `save` hook in Mongoose. This hook will be called every time a user record is saved, allowing us to be sure to salt and hash the password first.

Here is the code for this hook:

```javascript
// This is a hook that will be called before a user record is saved,
// allowing us to be sure to salt and hash the password first.
userSchema.pre('save', async function(next) {
  // only hash the password if it has been modified (or is new)
  if (!this.isModified('password'))
    return next();

  try {
    // generate a hash. argon2 does the salting and hashing for us
    const hash = await argon2.hash(this.password);
    // override the plaintext password with the hashed one
    this.password = hash;
    next();
  } catch (error) {
    console.log(error);
    next(error);
  }
});
```

The `argon2.hash()` function generates a hash of the password we supply. Behind the scenes it also generates a random salt for the user. The return value, which we call a `hash`, also includes the salt and various configuration parameters. This allows `argon2` to hide a lot of the details from us to make security easier.

Note that this function is middleware for Mongoose. We use the `next` parameter to tell Mongoose to move on to the next piece of the middleware.

### Comparing Passwords

We also need a function to compare the password a user gives us with the hashed and salted password in the database. We can do this by adding a method to the schema:

```javascript
// This is a method that we can call on User objects to compare the hash of the
// password the browser sends with the has of the user's true password stored in
// the database.
userSchema.methods.comparePassword = async function(password) {
  try {
    // note that we supply the hash stored in the database (first argument) and
    // the plaintext password. argon2 will do the hashing and salting and
    // comparison for us.
    const isMatch = await argon2.verify(this.password, password);
    return isMatch;
  } catch (error) {
    return false;
  }
};
```

This method uses the `argon2.verify` function to compare the user's password with the hashed and salted password in the database. It will hash and salt the supplied password before checking for a match. Remember, the hashed and salted password in the database includes the salt, so this function has all it needs to do the comparison.

### Finish the schema and model

To wrap up, we do a few more things. First, we include a method that strips out the hashed and salted password whenever we create a user record to JSON. This prevents us from sending the password (even if it is salted and hashed) to anyone using our API.

```javascript
// This is a method that will be called automatically any time we convert a user
// object to JSON. It deletes the password hash from the object. This ensures
// that we never send password hashes over our API, to avoid giving away
// anything to an attacker.
userSchema.methods.toJSON = function() {
  var obj = this.toObject();
  delete obj.password;
  return obj;
}
```

Next, we create the model:

```javascript
// create a User model from the User schema
const User = mongoose.model('User', userSchema);
```

### Registration API

A browser will call our code to register a new user with our system. To do this, we create the following API endpoint:

```javascript
/* API Endpoints */

/* All of these endpoints start with "/" here, but will be configured by the
   module that imports this one to use a complete path, such as "/api/user" */

// create a new user
router.post('/', async (req, res) => {
  // Make sure that the form coming from the browser includes a username and a
  // passsword, otherwise return an error. A 400 error means the request was
  // malformed.
  if (!req.body.username || !req.body.password)
    return res.status(400).send({
      message: "username and password are required"
    });

  try {

    //  Check to see if username already exists and if not send a 403 error. A 403
    // error means permission denied.
    const existingUser = await User.findOne({
      username: req.body.username
    });
    if (existingUser)
      return res.status(403).send({
        message: "username already exists"
      });

    // create a new user and save it to the database
    const user = new User({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      username: req.body.username,
      password: req.body.password
    });
    await user.save();
    // send back a 200 OK response, along with the user that was created
    return res.send({
      user: user
    });
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
});
```

Notice we are using `router.post` here, because we are going to have our API inside of a module. We're also using a route of `/` because we will configure the prefix for this router below in `server.js`.

We first check if the HTTP request body contains a username and password. If either is empty, we return a 400 error.
The 400 code means the request was not formatted properly.

Next, we check if the username already exists. If it does, we return a 403 error. The 403 code means the request is not authorized.

Finally, we create a new user and save their record in the database. **When we call the save method, the save hook will automatically salt and hash the password.**

When we send a response back to the front end, we send a JSON object. This is good practice for an API, because we can then easily expand this at some later point to send back other information if needed, by adding a new property to the JSON.

### Login API

For the login API, add the following:

```javascript
// login a user
router.post('/login', async (req, res) => {
  // Make sure that the form coming from the browser includes a username and a
  // password, otherwise return an error.
  if (!req.body.username || !req.body.password)
    return res.sendStatus(400);

  try {
    //  lookup user record
    const user = await User.findOne({
      username: req.body.username
    });
    // Return an error if user does not exist.
    if (!user)
      return res.status(403).send({
        message: "username or password is wrong"
      });

    // Return the SAME error if the password is wrong. This ensure we don't
    // leak any information about which users exist.
    if (!await user.comparePassword(req.body.password))
      return res.status(403).send({
        message: "username or password is wrong"
      });

    return res.send({
      user: user
    });
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
});
```

The login endpoint is similar to the registration endpoint. One difficulty is we want to use POST (so we could reserve PUT for modifying a user), but we already have an endpoint for `/`. So we user `/login` instead.

We also need to look up the username to be sure it exists and then verify that the password matches.  To find a user we use the Mongoose `User.findOne()` function. To verify the password for this user we use the `comparePassword()` function on the User schema that we wrote earlier.

Notice that we return an identical error whether the username doesn't exist or the password doesn't match. This avoids leaking any information about which users exist in our system.

### Including the API

In `users.js`, at the very end, add the following:

```javascript
module.exports = {
  routes: router,
  model: User
};
```

This will export the router configuration and the model from this module.

Next, in `server.js`, add the following:

```javascript
// import the users module and setup its API path
const users = require("./users.js");
app.use("/api/users", users.routes);
```

Be sure to put this before the call to `listen()`.

This imports the `users` module and sets up its API endpoint.

### A important word on modules

If you examine your code in the `back-end` directory, you'll notice we have factored the server into separate modules.

Inside of `server.js`, we require the `users.js` module. Notice we have to give it a relative path by starting with the current directory, which is `.`

```javascript
const users = require("./users.js");
app.use("/api/users", users.routes);
```

We also call `app.use` to configure the API and in one place we declare that all endpoints regarding users will use the prefix `/api/users`.

Now, inside of `users.js`, we store all of our code related to the `users` schema, model, and API. It starts with:

```javascript
const express = require("express");
const router = express.Router();
```

We then define our routes like this:

```javascript
router.get(..)
router.post(..)
```

And then at the end we export the routes and the model:

```javascript
module.exports = {
  routes: router,
  model: User
};
```

Exporting the routes is what allows the server to include and then use them. Exporting the model allows other modules to refer to User as needed.

Organizing our back end code into modules will make it easier to maintain.

## Testing

Let's run the server:

```
node server.js
```

Then we can use curl to test registration:

```
curl -X POST -d '{"firstName": "Emma", "lastName": "Smith", "username": "clown", "password": "badpassword"}' -H "Content-Type: application/json" localhost:3000/api/users
```

You should see a response like this:

```
{"user":{"_id":"5e860d15c3f3a69537c5ae68","firstName":"Emma","lastName":"Smith","username":"clown","__v":0}}
```

Notice that the salted and hashed password is NOT included in the user record sent back to the front end, because we wrote a function to remove it.

Now use Robo 3T or Compass to see the salted and hashed password in the database:

![salted and hashed password in Mongo](/screenshots/robo.png)

Notice that if you retry this same POST you will get an error indicating that the username already exists.

Now let's use curl to test login:

```
curl -X POST -d '{"username": "clown", "password": "badpassword"}' -H "Content-Type: application/json" localhost:3000/api/users/login
```

You should get a response like this:

```
{"user":{"_id":"5e860d15c3f3a69537c5ae68","firstName":"Emma","lastName":"Smith","username":"clown","__v":0}}
```

You can try this same POST again and you should succeed because the login information is the same. But if you try a different username or password you will get an error.

It's always a good idea to test your back end separately from your front end like this.

## Front End

Let's build the front end for registering and logging in a user. We first need to install axios for the front end so it can use this library to send requests to the back end:

```
cd front-end
npm install axios
```

### Global data

Since we want to store the currently logged in user in global data, modify `main.js` so it has the following:

```javascript
let data = {
  user: null
}

new Vue({
  data,
  router,
  render: h => h(App)
}).$mount('#app')
```

### Registration event handler

Next, import `axios` at the start of `HomePage.vue`:

```javascript
<script>
import axios from 'axios';
```

Then, add an event handler in `HomePage.vue` for the registration form:

```javascript
  methods: {
    async register() {
      this.error = '';
      this.errorLogin = '';
      if (!this.firstName || !this.lastName || !this.username || !this.password)
        return;
      try {
        let response = await axios.post('/api/users', {
          firstName: this.firstName,
          lastName: this.lastName,
          username: this.username,
          password: this.password,
        });
        this.$root.$data.user = response.data.user;
      } catch (error) {
        this.error = error.response.data.message;
        this.$root.$data.user = null;
      }
    }
  }
```

This uses the `axios` library to POST the registration request to the back end, sending all the relevant information.

When we get a response from the back end, it will include a JSON object with the user in it. We can access this with `response.data.user`. We store it in a global data object.

Notice that we handle any errors by getting the error message returned from the back end, and we are also careful to change the current user's state to null.

### Login event handler

Now add a login event handler in `HomePage.vue`:

```javascript
async login() {
   this.error = '';
   this.errorLogin = '';
   if (!this.usernameLogin || !this.passwordLogin)
     return;
   try {
     let response = await axios.post('/api/users/login', {
       username: this.usernameLogin,
       password: this.passwordLogin,
     });
     this.$root.$data.user = response.data.user;
   } catch (error) {
     this.errorLogin = "Error: " + error.response.data.message;
     this.$root.$data.user = null;
   }
 }
```

This is very similar to the registration event handler.

### Connecting the front end and back end

For the front end to talk to the back end, we need to configure the Vue development server with a proxy. Create a file called `vue.config.js` that includes:

```javascript
module.exports = {
  devServer: {
    proxy: {
      '^/api': {
        target: 'http://localhost:3000',
      },
    }
  }
}
```

## Testing

Let's see if our front end is wired up with our back end correctly. Keep the back end server running in one terminal:

```
node server.js
```

Run the front end in another terminal:

```
npm run serve
```

In your browser, open the console and click on the Network tab so you can see the request being sent, along with the response from the server. Let's try registration first:

![registration test](/screenshots/registration-test.png)

You can see that the request is sent, with all the information in the form, including the user's password. **This is why using HTTPS is so important for websites -- anyone who can see plain HTTP traffic would be able to learn this user's username and password.**

The user's information is stored in the global data object:

![user data](/screenshots/user-data.png)


Notice that if a second person tries to register with the same username, they will get an error:

![registration falure](/screenshots/registration-failure.png)

Logging in should work too:

![login test](/screenshots/login-test.png)

## Navigating to a new page on login

When a user logs in, it is helpful to have their view change, so that they can easily recognize that they are logged in.

To accomplish this, create a new component called `MyTickets.vue`. This should go in the `components` directory.

Put this in the `template` section:

```javascript
<template>
<div class="main">
  <h2>Logged in as: {{user.firstName}} {{user.lastName}}</h2>
  <h1>My Tickets</h1>
</div>
</template>
```

This will eventually show the tickets for a particular user, and let users create new tickets. But for now, it acts as a placeholder to show that the user is logged in.

Put this in the `script` section:

```javascript
<script>
export default {
  name: 'MyTickets',
  computed: {
    user() {
      return this.$root.$data.user;
    }
  }
}
</script>
```

This gets the current user's information so we can display it in the template.

Now you can change `Home.vue` so that the template switches between these views:

```javascript
<div>
  <MyTickets v-if="user" />
  <HomePage v-else />
</div>
```

You will also need the `script` section of `Home.vue` so that it imports this component, lists it in the `components` property, and also has a computed property for the user:

```javascript
<script>
import HomePage from '@/components/HomePage.vue'
import MyTickets from '@/components/MyTickets.vue'
export default {
  name: 'home',
  components: {
    HomePage,
    MyTickets
  },
  computed: {
    user() {
      return this.$root.$data.user;
    }
  }
}
</script>
```

These changes should let you view a new page when a user logs in:

![logged in](/screenshots/logged-in.png)

Kindly proceed to [Lesson 4](/tutorials/lesson4.md).

# Lesson 4: Staying logged in with cookies

If you refresh the browser, you'll notice that you will lose all state about the user. We are going to use cookies to keep the user logged in. The cookie will store the user's login information, and they can present this at any time to the back end to prove that they are logged in. Browsers store cookies persistently, so they are not lost when the page is refreshed.

## Cookies

Cookies are used in HTTP to send small amounts of data from a web browser to a web server. For example, a cookie can contain an
identifier that is unique to that web browser, so the server can keep track of a shopping cart, a user account, or other state.

Setting a cookie is done by request of the web server. First, the web server tells the web browser to "set" a cookie. This request
includes an expiration time. Then, in every subsequent request it sends to the web server, the browser will include this data in a cookie
as long as it has not expired. The server can then use this data to find the state it associates with that browser.

Here is an example of a server sending a header in an HTTP request, asking the web browser to set a cookie:

```
Set-Cookie: qwerty=219ffwef9w0f; Domain=somecompany.com; Path=/; Expires=Wed, 30 Aug 2020 00:00:00 GMT
```

Here is what the web browser will send back every in every request it sends subsequently to the site, as long as the cookie is not expired:

```
Cookie: qwerty=219ffwef9w0f; Domain=somecompany.com; Path=/; Expires=Wed, 30 Aug 2019 00:00:00 GMT
```

In our case, the back end will first validate a user when they login with a username and password. On successful validation, the back end will set a cookie that stores a unique identifier. When the browser sends that cookie in subsequent API requests, the back end will use that identifier to look up the associated user record to confirm their identity.

## Back end

We are going to use some Express modules that make dealing with cookies really simple: the `cookie-parser` and `cookie-session` libraries:

```
cd back-end
npm install cookie-parser cookie-session
```

The `cookie-parser` library parses the cookies coming in on requests. The `cookie-session` library is a lightweight way to store session information in a cookie. A session is a persistent connection from a browser to your website. This module will automatically set cookies for us and allow us to use `req.session` to keep track of session state for each incoming request.

In `server.js`, include and use the libraries:

```javascript
// connect to the mongodb database
mongoose.connect('mongodb://localhost:27017/pagliaccio', {
  useNewUrlParser: true
});

const cookieParser = require("cookie-parser");
app.use(cookieParser());

const cookieSession = require('cookie-session');
app.use(cookieSession({
    name: 'session',
    keys: ['secretValue'],
    cookie: {
      maxAge: 24 * 60 * 60 * 1000 // 24 hours
    }
}));
```

### Middleware to authenticate users

Next, we're going to write a piece of middleware to validate Users with their session information. In `users.js`, find the start of the API endpoints. **After** the User model, but **before** the endpoints, add this function:

```javascript
/* Middleware */

// middleware function to check for logged-in users
const validUser = async (req, res, next) => {
  if (!req.session.userID)
    return res.status(403).send({
      message: "not logged in"
    });
  try {
    const user = await User.findOne({
      _id: req.session.userID
    });
    if (!user) {
      return res.status(403).send({
        message: "not logged in"
      });
    }
    // set the user field in the request
    req.user = user;
  } catch (error) {
    // Return an error if user does not exist.
    return res.status(403).send({
      message: "not logged in"
    });
  }

  // if everything succeeds, move to the next middleware
  next();
};
```

This middleware will receive an incoming request from a browser and check whether `req.session.userID` exists. If not, the user is not logged in, so it returns a 403 error. Then it uses this userID to find the user's document in the database. If that doesn't exist, it also returns a 403 errors. Otherwise, it sets `req.user` so that any endpoint can use this to get the current logged in user, then calls `next()`, which passes control to the next middleware.

### Logging in users (and setting cookies)

In `users.js`, find the registration endpoint (it uses POST and the `/` path), and modify it to include one additional line:

```javascript
// set user session info
req.session.userID = user._id;
// send back a 200 OK response, along with the user that was created
return res.send({
  user: user
});
```

This line saves the user's `_id` from the Mongo DB document into the session for this user.

Do the same thing in the login endpoint (it uses POST and the `/login` path):

```javascript
  // set user session info
  req.session.userID = user._id;
  return res.send({
    user: user
  });
```

Notice that we treat registration and login the same -- either way, the user is automatically logged in when done, and we keep track of their user document in their session state.

Now add a new endpoint:

```javascript
// get logged in user
router.get('/', validUser, async (req, res) => {
  try {
    res.send({
      user: req.user
    });
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
});
```  

When we use the middleware, `validUser` in this way, we are requiring users to be logged in before they can make this API call. Users who are not logged in will get a 403 error. Any user who *is* logged in will get their user document.

### Module exports

Last, modify the module exports to include the `validUser` middleware:

```javascript
module.exports = {
  routes: router,
  model: User,
  valid: validUser
};
```

This will allow other modules to use the middleware to check for valid users.

## Front End

To use this on the front end, first import `axios` in `Home.vue`:

```javascript
<script>
import axios from 'axios';
```

Then add a `created()` hook in `Home.vue`, right above the computed property:

```javascript
  async created() {
    try {
      let response = await axios.get('/api/users');
      this.$root.$data.user = response.data.user;
    } catch (error) {
      this.$root.$data.user = null;
    }
  },
```

This uses `axios` to access this new endpoint at `GET /api/users` to get the currently logged in user, and if found, set the user state in the global data storage so all components can use it.

**If you refresh the page, you should see that you can stay logged in.**

You can use the `Storage` tab on Firefox to see them:

![cookies](/screenshots/cookies.png)

If you right click on these you can delete them, refresh the page, and verify that you are no longer logged in.

Kindly proceed to [Lesson 5](/tutorials/lesson5.md).

# Lesson 5: Logging out

It's not particularly helpful to ask users to manually delete cookies when they want to log out. So let's build logout functionality.

## Back end

To logout, add a new endpoint in `users.js`. We'll use the DELETE method, but rather than deleting the user we'll log them out.

```javascript
// logout
router.delete("/", validUser, async (req, res) => {
  try {
    req.session = null;
    res.sendStatus(200);
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
});
```

Note that this method is protected by `auth.validUser`, so it can only be accessed by users who have logged in.

## Front end

Add a button to log the user out in `MyTickets.vue`:

```javascript
<h2>Logged in as: {{user.firstName}} {{user.lastName}} <button @click="logout" class="pure-button pure-button-primary">Logout</button></h2>
```

Note that we could put this in a menu that is shared across all pages in our app; we're being a bit lazy here.

Import `axios` in this component:

```javascript
<script>
import axios from 'axios';
```

Now add an event handler for this button:

```javascript
  methods: {
    async logout() {
      try {
        await axios.delete("/api/users");
        this.$root.$data.user = null;
      } catch (error) {
        this.$root.$data.user = null;
      }
    },
  }
```

That's all there is! You should be able to login and out as much as you like.

Kindly proceed to [Lesson 6](/tutorials/lesson6.md).

# Lesson 7: Administrators

Our final step is to add some functionality for administrators. They should be able to see all tickets and respond to them by changing their status and adding a text response.

## Back end

On the back end, we want to allow administrators to have special privileges.

### Adding roles

The first step is to add a role for users, so we can distinguish between regular users and administrators. Modify the schema in `users.js` so that it now has a role:

```javascript
const userSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  username: String,
  password: String,
  role: {
    type: String,
    default: ""
  }
});
```

### Listing all tickets

Administrators should be able to list all tickets. Modify the GET endpoint in `tickets.js`:

```javascript
  let tickets = [];
  try {
    if (req.user.role === "admin") {
      tickets = await Ticket.find().sort({
        created: -1
      });
    } else {
      tickets = await Ticket.find({
        user: req.user
      }).sort({
        created: -1
      });
    }
    return res.send({
      tickets: tickets
    });
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
```

We just need to check the user's role, and then use a different `find()` that gets *all* tickets.

### Modifying tickets

To allow administrators to edit tickets, create the following endpoint:

```javascript
// edit a ticket -- only edits status and response
router.put('/:id', validUser, async (req, res) => {
  // can only do this if an administrator
  if (req.user.role !== "admin") {
    return res.sendStatus(403);
  }
  if (!req.body.status || !req.body.response) {
    return res.status(400).send({
      message: "status and response are required"
    });
  }
  try {
    ticket = await Ticket.findOne({
      _id: req.params.id
    });
    ticket.status = req.body.status;
    ticket.response = req.body.response;
    await ticket.save();
    return res.send({
      ticket: ticket
    });
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
});
```

This endpoint only allows administrators to edit tickets -- through a combination of the middleware and a role check. Note, we could write additional middleware that does the admin user check for us.

This endpoint only lets the user edit the status and response fields of the ticket.

## Create admin user

Administrative users create a bit of a chicken-and-egg problem. We can't let just anyone make themselves an administrator, but we don't start out with any administrators.

A good way to solve this is to use a script to create an administrative user. Create a new file in the back end directory called `create-admin-user` and place the following there:

```javascript
const reader = require("readline-sync");
const mongoose = require('mongoose');
const users = require("./users.js");

const User = users.model;

// connect to Mongo
mongoose.connect('mongodb://localhost:27017/pagliaccio', {
  useUnifiedTopology: true,
  useNewUrlParser: true
});


// get the needed info
let firstName = reader.question("First name: ");
let lastName = reader.question("Last name: ");
let username = reader.question("Username: ");
const password = reader.question("Password: ", {
  hideEchoBack: true
});

if (firstName === "" || lastName === "" || username === "" || password === "") {
  console.log("You need to enter a first name, last name, username, and password");
  process.exit();
}

User.findOne({
  username: username
}).then((user) => {
  if (user) {
    console.log("That username already exists");
    process.exit();
  }
}).then(() => {
  let user = new User({
    firstName: firstName,
    lastName: lastName,
    username: username,
    password: password,
    role: "admin"
  });
  user.save().then(() => {
    console.log("OK, admin user created for", firstName, lastName, "with username", username);
    process.exit();
  });
}).catch(error => {
  console.log(error);
});
```

This script prompts you for a first name, last name, username, and password, then creates an administrative user. To run it, you first need to install a library it uses to read from the terminal:

```
npm install readline-sync
```

To run this script:

```
node create-admin-user.js
```

An important thing to note is that we can run more than just a server with Node. It can run any kind of JavaScript, in this case our script to create an admin.

For this script to work, it needs to use Mongoose (to talk to the Mongo database), but does *not* use Express, since it is not creating a REST API. It does need to use the User model so it can create and save users.

## Front end

For the front end, we need to make a new administrator view, separate from the view that regular users see.

### Admin ticket view

Start by creating a new component in `components/Ticket.vue`. We will use this to allow the administrator to modify tickets. Place this in the `template`:

```html
<template>
<div class="ticket">
  <div class="problem">
    <h3><label>{{ticket.status}}</label> Problem reported {{time(ticket.created)}}</h3>
    <p>{{ticket.problem}}</p>
    <p v-if="ticket.response"><i>{{ticket.response}}</i></p>
    <p v-else>
      <input v-model="response" placeholder="response">
      <button @click="respond" class="pure-button pure-button-primary">Close Ticket</button>
    </p>
    <p class="error" v-if="error">{{error}}</p>
  </div>
</div>
</template>
```

This displays a ticket and provides a place for an admin to enter a response if none is present yet.

Place this in the `script` section of this component:

```javascript
<script>
import axios from 'axios';
import moment from 'moment';
export default {
  name: "Ticket",
  props: {
    ticket: Object,
  },
  data() {
    return {
      response: '',
      error: ''
    }
  },
  methods: {
    time(d) {
      return moment(d).format('D MMMM YYYY, h:mm:ss a');
    },
    async respond() {
      try {
        let response = await axios.put('/api/tickets/' + this.ticket._id, {
          status: "closed",
          response: this.response,
        });
        this.ticket = response.data.ticket;
      } catch (error) {
        this.error = error.response.message;
      }
    }
  }
}
</script>
```

Some things to notice:

* We import the `axios` and `moment` libraries since we will need them here.

* We declare a `props` section to indicate that this component needs its caller to hand it a `ticket` object.

* We use `moment.js` to format the time, as with regular users.

* We use an async method to update the tickets, which accesses the `/api/tickets` PUT endpoint.

Put this in the `style` section:

```html
<style scoped>
h3 {
  font-size: 12px;
  font-weight: normal;
  background-color: #ccc;
  padding: 10px 20px;
}

label {
  background-color: #000;
  color: white;
  padding: 5px;
  border-radius: 30px;
  font-size: 12px;
  margin-right: 10px;
}

input {
  margin-right: 10px;
}
</style>
```

### Admin view

The admin view will use the ticket view to display a list of all the tickets in the system. Create a new component called `components/Admin.vue` and put this in the `template` section:

```html
<template>
<div class="main">
  <h2>Logged in as: {{user.firstName}} {{user.lastName}} <button @click="logout" class="pure-button pure-button-primary">Logout</button></h2>
  <h1>Administration</h1>
  <div v-for="ticket in tickets" v-bind:key="ticket.id">
    <Ticket :ticket="ticket" />
  </div>
</div>
</template>
```

This looks a lot like `MyTickets.vue`. It simply loops through a list of tickets. But this time it uses the `Ticket` component to show individual tickets. Ther is a good reason for this! When we are editing tickets, we need to build the response input to a `response` property. If there are many tickets, then we would need an arbitrary number of `response` properties. It's much easier (and cleaner) to have a single response property in the `Ticket` component.

Put this in the `script` section of this component:

```javascript
<script>
import axios from 'axios';
import Ticket from '@/components/Ticket.vue';
export default {
  name: 'Admin',
  components: {
    Ticket
  },
  data() {
    return {
      tickets: [],
    }
  },
  computed: {
    user() {
      return this.$root.$data.user;
    },
  },
  created() {
    this.getTickets();
  },
  methods: {
    async logout() {
      try {
        await axios.delete("/api/users");
        this.$root.$data.user = null;
      } catch (error) {
        this.$root.$data.user = null;
      }
    },
    async getTickets() {
      try {
        let response = await axios.get("/api/tickets");
        this.tickets = response.data.tickets;
        return true;
      } catch (error) {
        console.log(error);
      }
    },
  }
}
</script>
```

A few things to notice here:

* We import the `Ticket` component and list it as a child component in the `components` section.

* We use a `created()` hook to get the list of tickets, and this gets all tickets since we are an administrative user here.

How does the back end know we are an administrative user? It sets a cookie when we log in that contains our user ID. The middleware we wrote checks the session for our user ID, then looks up our user record and stores it with our request. Now the back end API can check the user record to see if we are an administrator. All this work is done on the back end, without code needed on the front end, thanks to cookies.

There is no `style` section for this component.

### Modifying the Home page

Now we just need to go to the view in `Home.vue` and tell it to use the `Admin.vue` for administrative users. First, modify the `template` in `Home.vue`:

```javascript
<template>
<div>
  <Admin v-if="user && user.role === 'admin'" />
  <MyTickets v-else-if="user" />
  <HomePage v-else />
</div>
</template>
```

We use an `if-then-else` to shown the admin view here.

Now modify the `script` section:

```javascript
import Admin from '@/components/Admin.vue';
...
  components: {
    HomePage,
    MyTickets,
    Admin
  },
```

We have imported the new component and added it to the `components` section.

## Testing

You should now be able to use the script we wrote to create an administrative user. Then login to the app as that user and modify the tickets:

![admin response](/screenshots/admin-response.png)

You can then logout and login as an ordinary user and see the ticket status has been changed.

![ticket-closed](/screenshots/ticket-closed.png)

Kindly proceed to [Lesson 8](/tutorials/lesson8.md).

# Lesson 6: Useful Functionality

It would be really nice if this app had some useful functionality! So it's time to build the rest of it, the part where we allow users to add tickets describing their problem.

## Back end

For the back end, create a file called `tickets.js`, and put the following there:

```javascript
const mongoose = require('mongoose');
const express = require("express");
const router = express.Router();
const users = require("./users.js");

//
// Tickets
//

const User = users.model;
const validUser = users.valid;
```

Notice that we are requiring the user module and using some of its exported values.

### Ticket schema

Now define the ticket schema:

```javascript
// This is the schema for a ticket
const ticketSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.ObjectId,
    ref: "User"
  },
  problem: String,
  status: {
    type: String,
    default: "open"
  },
  response: {
    type: String,
    default: ""
  },
  created: {
    type: Date,
    default: Date.now
  },
});
```

Mongoose allows us to define the schema properties using objects. This allows us to create default values, so that if we create a `Ticket` document without specifying all of its properties, the default values are filled in.

Mongoose also allows some properties to refer to a document in another collection. We want tickets to belong to users, so in the `Ticket` schema, we define a `user` property that refers to the `User` model. We had to import and define the `User` model earlier:

```javascript
const User = users.model;
```

### Ticket model

Now define the ticket model:

```javascript
// The model for a ticket
const Ticket = mongoose.model('Ticket', ticketSchema);
```

This model uses the ticket schema. We don't define any additional methods on this schema like we did for users.

### Getting tickets

We want an endpoint that allows logged in users to get their list of tickets. Here is an endpoint for that:

```javascript
// get tickets -- will list tickets that a user has submitted
router.get('/', validUser, async (req, res) => {
  try {
    let tickets = await Ticket.find({
      user: req.user
    }).sort({
      created: -1
    });
    return res.send({
      tickets: tickets
    });
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
});
```

We use the `validUser` middleware to ensure the user is logged in. Remember this also sets `req.user` to the current user's document. We can now use `Ticket.find()` and specify that the tickets must belong to this user. We also sort the responses in descending order of the time they were created (most recent ones first).

### Creating tickets

We also want to define an endpoint where users can create tickets:

```javascript
// create a ticket
router.post('/', validUser, async (req, res) => {
  const ticket = new Ticket({
    user: req.user,
    problem: req.body.problem,
  });
  try {
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

We again make sure the user is logged in with the `validUser` middleware. Then we create a ticket, linking it to the user's document with req.user. The `created` property and other properties we don't specify use their default values. We save the ticket to the database and then send it back to the front end.

### Exports

We finish by exporting the routes from this module so they can be imported by our main server file in `server.js`.

```javascript
module.exports = {
  routes: router
}
```

### Importing the tickets routes

To import the tickets routes, modify `server.js` so that this comes after the user routes:

```javascript
// import the tickets module and setup its API path
const tickets = require("./tickets.js");
app.use("/api/tickets", tickets.routes);
```

Remember, by doing this we convert the `/` route inside of `tickets.js` into `/api/tickets`.

## Front end

Now we want to modify the front end to allow users to create and list their tickets.

### HTML

To start, add the following to the template in `MyTickets.vue`:

```javascript
<div>
  <button @click="setCreating" class="pure-button button-xsmall">
    <i class="fas fa-plus" />
  </button>
</div>
<form class="pure-form" v-if="creating" @submit.prevent="addTicket">
  <legend>Describe your problem for us.</legend>
  <fieldset>
    <textarea v-model="problem"></textarea>
    <br />
    <button @click="cancelCreating" class="pure-button space-right">Cancel</button>
    <button class="pure-button pure-button-primary" type="submit">Submit</button>
  </fieldset>
</form>
<div v-for="ticket in tickets" v-bind:key="ticket.id">
  <div class="ticket">
    <div class="problem">
      <h3><label>{{ticket.status}}</label> Problem reported {{time(ticket.created)}}</h3>
      <p>{{ticket.problem}}</p>
      <p v-if="ticket.response"><i>{{ticket.response}}</i></p>
      <p v-else><i>No response yet</i></p>
    </div>
  </div>
</div>
```

This provides a form for users to create tickets. We're going to dynamically show the form when they want to add a ticket. We then use a for loop show all the tickets for this user.

### Libraries and data

Now install the [moment.js](https://momentjs.com/) library. We will use this for formatting the time a ticket was created:

```
cd front-end
npm install moment
```

In addition, import the library in the `script` section of `MyTickets.vue`:

```javascript
<script>
import axios from 'axios';
import moment from 'moment';
```

and add some data:

```javascript
export default {
  name: 'MyTickets',
  data() {
    return {
      creating: false,
      problem: '',
      tickets: [],
    }
  },
}
```

The `creating` property controls whether the form is displayed or not. The `problem` property is bound to the form where the user submits a problem. The `tickets` property will hold the tickets for this user.

### Getting tickets

To get tickets, we need a method that fetches them from the back end:

```javascript
  async getTickets() {
      try {
        let response = await axios.get("/api/tickets");
        this.tickets = response.data.tickets;
        return true;
      } catch (error) {
        console.log(error);
      }
    },
```

We call `axios.get()` using the `/api/tickets` endpoint and put the resulting tickets into the `tickets` property. Notice we use `response.data.tickets` because the endpoint returns a JSON object `{tickets: tickets}`. We use `async/await` because `axios.get()` returns a Promise.

We also want to get all the tickets when this page is first created, so we put this into the `created()` hook:

```javascript
  created() {
    this.getTickets();
  },
```

Finally, we want to display the time the ticket was created using the `moment.js` library, so we need a method for this:

```javascript
    time(d) {
      return moment(d).format('D MMMM YYYY, h:mm:ss a');
    },
```

### Creating a ticket

To show the form for a ticket, we need the following methods:

```javascript
  setCreating() {
    this.creating = true;
  },
  cancelCreating() {
    this.creating = false;
  },
```

To create a ticket we use this method:

```javascript
    async addTicket() {
      try {
        await axios.post("/api/tickets", {
          problem: this.problem
        });
        this.problem = "";
        this.creating = false;
        this.getTickets();
        return true;
      } catch (error) {
        console.log(error);
      }
    }
```

We post the problem to the `/api/tickets` end point. We are careful to use `async/await` since `axios.post()` returns a promise. When it is done, we clear some properties and then call `getTickets()` so we can refresh the list of tickets to include the one that was just created.

### CSS

Add the following CSS at the end of `MyTickets.vue`

```HTML
<style scoped>
textarea {
  width: 100%;
  max-width: 500px;
}

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

.ticket {}
</style>
```

## Testing

You should now be able to create and display tickets in the front end if you are logged in:

![tickets for adam](/screenshots/tickets-for-adam.png)

You can see that the tickets are associated with each user:

![tickets for emma](/screenshots/tickets-for-emma.png)

Kindly proceed to [Lesson 7](/tutorials/lesson7.md).

# Front End

The `front-end` directory contains a working front end written with Vue CLI. However,
it uses local data and doesn't talk to the back end. We'll be modifying it so that
it uses the front end to store data.

You'll see in the source code that we have just one view, `Home.vue`, and no
child components. We also have nothing really special happening in `App.vue`
since there is no global menu, header, or footer for the site.

To see what we have so far:

```
cd front-end
npm install
npm run serve
```

Navigate to `localhost:8080` to see the site. Add some items, make sure all the
functionality works. Refresh the screen and notice that any new items you added
are gone, since they are stored in the front end.

## Setup proxy configuration

We need to tell the front end to send API requests to the back end. Do this by
creating a file called `vue.config.js` in the `front-end` directory. This file
should contain:

```javascript
module.exports = {
  devServer: {
    proxy: 'http://localhost:3000',
  }
}
```

## Install Axios

We're going to be using the [Axios](https://github.com/axios/axios) library to
make API requests instead of fetch. Install this with:

```
npm install axios
```

Then, at the start of the `script` section in `src/views/Home.vue`, import this
library:

```javascript
<script>
import axios from 'axios';
```

## Creating and reading items

Currently, the front end in `src/Home.vue` initializes items in a local array
called `items`. We need to modify this so that it instead gets the list of items
from the back end. We also need to use the back end to create items.

Let's start by initializing the list to an empty array instead of having
hard-coded data there:

```javascript
  data() {
    return {
      items: [],
      text: '',
      show: 'all',
    }
  },
```

Now add a `created` section to the component, right after the `data()` function:

```javascript
created: function() {
  this.getItems();
},
```

This will call the `getItems` function when Vue is created. Add that function in
the `methods` section of the component:

```javascript
    async getItems() {
      try {
        const response = await axios.get("/api/items");
        this.items = response.data;
      } catch (error) {
        console.log(error);
      }
    },
```

This uses the axios library to get the items, then store them in the `items` property.

To add new items, let's modify the `addItems` function:

```javascript
    async addItem() {
      try {
        await axios.post("/api/items", {
          text: this.text,
          completed: false
        });
        this.text = "";
        this.getItems();
      } catch (error) {
        console.log(error);
      }
    },
```

This POSTs a new item to the server, and when it is done it fetches the list of
items again so that Vue will update the DOM with the new list.

You should be able to test this by running the back end in one terminal:

```
cd back-end
node server.js
```

And the front end should already be running in another terminal:

```
cd front-end
npm run serve
```

Visit `localhost:8080` in your browser. Notice that when you refresh the page,
items are not lost now, because they are stored on the server

## Updating items

To update items on the server, we need to add an event handler that gets called
whenever a checkbox is clicked to indicate an item has been completed. In the
`template` of `Home.vue`, modify the checkbox so it looks like this:

```html
          <input type="checkbox" v-model="item.completed" @click="completeItem(item)" />
```

Then, in the `methods` section, add the `completeItem` method:

```javascript
    async completeItem(item) {
      try {
        axios.put("/api/items/" + item.id, {
          text: item.text,
          completed: !item.completed,
        });
        this.getItems();
      } catch (error) {
        console.log(error);
      }
    },
```

This method uses `axios` to send the PUT request, with the required information
in the body of the request.

Notice that when we add an item or edit an item we call `getitems` when it is
done.  This enables us to be sure our copy of the data is in sync with the
server. A different way to do this is to modify our local copy of the data but
*only* if the API call succeeds. This would avoid fetching the entire list each
time it is changed, but requires you to be careful to keep the data in sync
properly.

You should be able to test this if you still have both your back end and front
end servers running.

## Deleting items

We need to modify the front end to call the API to delete an item. In
`Home.vue`, modify `deleteItem` as follows:

```
    async deleteItem(item) {
      try {
        await axios.delete("/api/items/" + item.id);
        this.getItems();
      } catch (error) {
        console.log(error);
      }
    },
```

Notice how we get the list after the API call succeeds, so we Vue can update the
DOM.

We also need to change `deleteCompleted`:

```javascript
    deleteCompleted() {
      this.items.forEach(item => {
        if (item.completed)
          this.deleteItem(item);
      });
    },
```

This loops through the items and sends a request to the server to delete each
completed item. These will each run asynchronously since `deleteItem` is an
async function!

You should be able to test this if you still have your back end and front end
server running.

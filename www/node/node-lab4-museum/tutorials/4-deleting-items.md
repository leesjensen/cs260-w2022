# Deleting Items

The admin page should also have the ability to delete items. We'll setup the
front end and then have you build the back end.

## Front End HTML

The trickiest part of deleting an item on the admin page is identifying which
item you want to delete. We'll build an input that lets the administrator type a
title, and then we'll use this to populate a dropdown menu they can choose from.

Add this in `Admin.vue`, at the end of the `admin` div:

```javascript
    <div class="heading">
      <div class="circle">2</div>
      <h2>Edit/Delete an Item</h2>
    </div>
    <div class="edit">
      <div class="form">
        <input v-model="findTitle" placeholder="Search">
        <div class="suggestions" v-if="suggestions.length > 0">
          <div class="suggestion" v-for="s in suggestions" :key="s.id" @click="selectItem(s)">{{s.title}}
          </div>
        </div>
      </div>
      <div class="upload" v-if="findItem">
        <input v-model="findItem.title">
        <p></p>
        <img :src="findItem.path" />
      </div>
      <div class="actions" v-if="findItem">
        <button @click="deleteItem(findItem)">Delete</button>
      </div>
    </div>
```

The first part of this provides a form where the administrator can type a title.
We use the `v-model` directive to bind this to the `findTitle` property.

We will display suggestions in a dropdown menu right below this input. We'll
simply list them in some div elements and use CSS to style it. We will setup a
`click` event handler for when the administrator clicks on one of these
suggestions and we'll call the `selectItem` method.

Below this, we setup a div to show the item they selected, along with a button
they can click to delete this item. The property `findItem` will be bound to the
item the user clicked on in the suggestions menu.

## Front End CSS

Add this CSS to `Admin.vue` to style the suggestions:

```css
/* Suggestions */
.suggestions {
  width: 200px;
  border: 1px solid #ccc;
}

.suggestion {
  min-height: 20px;
}

.suggestion:hover {
  background-color: #5BDEFF;
  color: #fff;
}
```

## Front End JavaScript

We now need to add code in Vue to create the list of suggestions. The first
thing we need to do is load in all of the items in the museum. We'll do this the
same way we did when displaying them on the front page.

In `Admin.vue`, add a new property to the data object:

```javascript
    items: [],
```

Then add the created method (I usually put this above the methods section):

```javascript
  created() {
    this.getItems();
  },
```

And add the `getItems` method:

```javascript
async getItems() {
  try {
    let response = await axios.get("/api/items");
    this.items = response.data;
    return true;
  } catch (error) {
    console.log(error);
  }
},
```

Now we need to calculate suggestions. First, add some more data properties:

```javascript
    findTitle: "",
    findItem: null,
```

We'll use `findTitle` for the title the administrator types in and `findItem`
for the item they click on in the suggestions list.

Now add a computed property (I usually put this right below the data object):

```javascript
  computed: {
    suggestions() {
      let items = this.items.filter(item => item.title.toLowerCase().startsWith(this.findTitle.toLowerCase()));
      return items.sort((a, b) => a.title > b.title);
    }
  },
```

This will be triggered whenever the `findTitle` property changes -- meaning the
administrator has typed something in the input field, even a single character.
We create a list of suggestions using the `filter` higher-order function. This
creates a new list of items that contains only items where the title starts with
the string the administrator has typed so far. We convert to lowercase when
doing the match to provide a case-insensitive match.

This list of suggestions is used to populate the dropdown menu for the user.

Now we need to define the `selectItem` method for when the administrator clicks
on a suggestion:

```javascript
    selectItem(item) {
      this.findTitle = "";
      this.findItem = item;
    },
```

This will clear the input field and set `findItem` to the item they selected.
Because this is not null, the HTML we setup will show the title and photo for
the item the administrator chose. The delete button will also be displayed.

The final step here is to define the `deleteItem` method:

```javascript
    async deleteItem(item) {
      try {
        await axios.delete("/api/items/" + item._id);
        this.findItem = null;
        this.getItems();
        return true;
      } catch (error) {
        console.log(error);
      }
    },
```

This will use `item._id` to format the REST API endpoint we want to call.
Remember, the Mongo database automatically adds an `_id` field to every document
in the database, and it contains a long hexadecimal value that uniquely
identifies the document.

## Back End

Your job is to fill in the back end by creating a REST API endpoint for deleting
items from the database. You can use `Item.deleteOne()` to delete an item from
the `items` collection in Mongo. You need to pass this method an object
containing the property you want to match, e.g. `{_id: 5}`. Don't hard-code a
value, you can get it from the endpoint: `/api/items/:id`. You can see how we
did this in Lesson 3 of [Learning
Mongo](https://github.com/BYU-CS-260/learning-mongo).

## Testing

You should be able to search for an item in the database, then press the delete
button and delete it. You can use the front page to see if it is deleted. Use
the Developer Tools and the Network and Console tabs to see if you are doing
this right. You can also use `console.log` in the back end to and check for
errors printed out from your Node server.

# Editing Items

The admin page should also have the ability to edit items. We'll setup the front
end and then have you build the back end.

## Front End HTML

There is very little to do. :-) You'll notice we setup the HTML so that when we
find an item we display an input field with the title, so it is already
editable. All we need to do is add an edit button in `Admin.vue` right after
the delete button:

```html
        <button @click="editItem(findItem)">Edit</button>
```

This calls the `editItem` method when it is clicked.

## Front End JavaScript

In `admin.js`, we just need to add the `editItem` method:

```javascript
    async editItem(item) {
      try {
        await axios.put("/api/items/" + item._id, {
          title: this.findItem.title,
        });
        this.findItem = null;
        this.getItems();
        return true;
      } catch (error) {
        console.log(error);
      }
    },
```

This will send a PUT request to the REST API endpoint at `/api/items/:id`. We
can again use `item._id` to get the right id. Since this is a PUT request, we
need to add in the new title that the user has edited.

## Back End

Your job is to fill in the back end by creating a REST API endpoint for editing
items from the database. You can use `Item.findOne()` to find an item from the
`items` collection in Mongo. You need to pass this method an object containing
the property you want to match, e.g. `{_id: 5}`. Don't hard-code a value, you
can get it from the endpoint: `/api/items/:id`, just like with the DELETE
endpoint.

The `Item.findOne()` method will return the item it finds, and you can store
this in a variable called `item`. To edit it, simply change its properties and
then call `item.save()`.

## Testing

You should be able to search for an item in the database, edit its title, then
press the edit button and save these edits. You can use the front page to see if
it is edited. Use the Developer Tools and the Network and Console tabs to see if
you are doing this right. You can also use `console.log` in the back end to and
check for errors printed out from your Node server.

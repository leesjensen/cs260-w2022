# Item Descriptions

A good museum will have an informative description for each item. Add this
functionality to the application.

Doing this will touch all the parts of our application. This will help ensure
that you know how all of this code is working.

## Adding an item

You will need to modify `Admin.vue` to include an item description. You will
want to use a `textarea`. You can bind the value of this box to a JavaScript
variable.

You will then need to modify `Admin.vue` to include this field when calling the
REST API to create an item in the database.

Finally, you will need to modify the back end so that the schema has this field
and so that the API for creating an item will include this.

## Editing an object

You will need to modify `Admin.vue` to include an item description when editing.
You will want to use a `textarea` again.

You will then need to modify `Admin.vue` to include this field when calling the
REST API to update an item in the database.

Finally, you will need to modify the back end so that the schema has this field
and so that the API for updating an item will include this.

## Displaying the description

You will need to modify `Home.vue` to display an item description. You may
need to modify the CSS to display this how you want.

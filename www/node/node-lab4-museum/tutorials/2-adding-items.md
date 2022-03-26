# Adding Items

The museum will display items on the front page, but we'll use a separate
administrative page to add items.

Let's start by building the administrative page.

## Front End HTML

To add items on the front end, edit `src/views/Admin.vue` so it contains this:

```html
    <h1>The Admin Page!</h1>
    <div class="heading">
      <div class="circle">1</div>
      <h2>Add an Item</h2>
    </div>
    <div class="add">
      <div class="form">
        <input v-model="title" placeholder="Title">
        <p></p>
        <input type="file" name="photo" @change="fileChanged">
        <button @click="upload">Upload</button>
      </div>
      <div class="upload" v-if="addItem">
        <h2>{{addItem.title}}</h2>
        <img :src="addItem.path" />
      </div>
    </div>
```

Every item in the museum will have two properties -- a title and a photo. So we
create one input for entering the title of the object and another input for
uploading a file with a photo.

We bind the title to a `title` model, for two-way data binding. We add an event
handler for the `change` event to the input for uploading a file. This lets us
keep track of which file the user selected. We also have an event handler for
the `click` event on an upload button, so that we can upload the photo to our
server.

Below this form we have a div that will show the title of the item and the photo
of the item that we uploaded. This will display only after the item is
successfully uploaded to the server.

## Front End CSS

Now add some CSS to `Admin.vue` make this look nice:

```html
<style scoped>
.image h2 {
  font-style: italic;
  font-size: 1em;
}

.heading {
  display: flex;
  margin-bottom: 20px;
  margin-top: 20px;
}

.heading h2 {
  margin-top: 8px;
  margin-left: 10px;
}

.add,
.edit {
  display: flex;
}

.circle {
  border-radius: 50%;
  width: 18px;
  height: 18px;
  padding: 8px;
  background: #333;
  color: #fff;
  text-align: center
}

/* Form */
input,
textarea,
select,
button {
  font-family: 'Montserrat', sans-serif;
  font-size: 1em;
}

.form {
  margin-right: 50px;
}

/* Uploaded images */
.upload h2 {
  margin: 0px;
}

.upload img {
  max-width: 300px;
}
</style>
```

## Front End JavaScript

Add the following to `Admin.vue` to provide an area for us to write some code for
this component:

```javascript
<script>
export default {
  name: 'Admin',
}
</script>
```

First we need to install [axios](https://github.com/axios/axios) to communicate
with the back end. Do this in the `front-end` directory:

```
npm install axios
```

Now, before the export statement, add an import statement:

```javascript
import axios from 'axios';
```

Next, beneath the name of the component, add some data:

```javascript
  data() {
    return {
      title: "",
      file: null,
      addItem: null,
    }
  }
```

We will use this to keep track of the properties for this component. Now add
the method for `fileChanged()`:

```javascript
  methods: {
    fileChanged(event) {
      this.file = event.target.files[0]
    },
  }
```

In the `fileChanged()` event handler, we use the event passed to us to find the
name of the file that the user selected, and we store this in `file`.

Below the `fileChanged` method, add a method for `upload()`:


```javascript
    async upload() {
      try {
        const formData = new FormData();
        formData.append('photo', this.file, this.file.name)
        let r1 = await axios.post('/api/photos', formData);
        let r2 = await axios.post('/api/items', {
          title: this.title,
          path: r1.data.path
        });
        this.addItem = r2.data;
      } catch (error) {
        console.log(error);
      }
    },
```

In the `upload` event handler, we create a `FormData` object and append some
information to it. This is built in to JavaScript and is what we use to send a
file to the server. This information includes the property `photo` that the
server will use to get the file from the form, the contents of the file, and the
file name.

We then post to `/api/photos` and include the `FormData` object.

Note that we use `await` to wait for this to finish, and we thus have made
`upload` an `async` method. The return value contains the path on the server
where the file is stored.

Once this first POST is done, we post to `/api/items` to create the item in our
museum, which includes the title and the path to the photo. We again use `await`
here.

Finally, we get back a response that contains the item we added, so we store it
in `addItem` and use that to display the item on the admin page, showing the
user that the upload was successful.

## Back End -- Uploading Photos

On the back end, we're going to use a library called
[multer](https://github.com/expressjs/multer) to upload images. First, we need
to configure multer in `server.js`:

```javascript
// Configure multer so that it will upload to '../front-end/public/images'
const multer = require('multer')
const upload = multer({
  dest: '../front-end/public/images/',
  limits: {
    fileSize: 10000000
  }
});
```

This tells multer to store images in `../front-end/public/images` 
and limits the maximum file size.

Now add the Mongoose scheme and model to `server.js`:

```javascript
// Create a scheme for items in the museum: a title and a path to an image.
const itemSchema = new mongoose.Schema({
  title: String,
  path: String,
});

// Create a model for items in the museum.
const Item = mongoose.model('Item', itemSchema);
```

The schema tells Mongoose what properties to use in each document. Here, we
create a scheme for museum items that has a title and a path, each using a
string for a data type.

The model tells Mongoose to create a collection called `items` that is mapped to
the model named `Item`.

Now we need to add support for uploading photos:

```javascript
// Upload a photo. Uses the multer middleware for the upload and then returns
// the path where the photo is stored in the file system.
app.post('/api/photos', upload.single('photo'), async (req, res) => {
  // Just a safety check
  if (!req.file) {
    return res.sendStatus(400);
  }
  res.send({
    path: "/images/" + req.file.filename
  });
});
```

This sets up a REST API endpoint at `/api/photos`. A POST to this endpoint will
first be given to the multer middleware. It will expect to find a file labeled
with the `photo` property. This property should match what you used when
creating the `formData` object. The multer middleware will automatically upload
this file and store it in the file system. It will setup `req.file` to contain
information about the uploaded file.

We check that the file was indeed uploaded and then return the full path to the
file.

## Back End -- creating items

Add the following to `server.js` in the back end after the "connect to the database" section:

```javascript
// Create a new item in the museum: takes a title and a path to an image.
app.post('/api/items', async (req, res) => {
  const item = new Item({
    title: req.body.title,
    path: req.body.path,
  });
  try {
    await item.save();
    res.send(item);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});
```

This sets up a REST API endpoint at `/api/items`. A POST to this endpoint will
setup `req.body` to contain the items sent in the POST request from the front end.
Notice that `req.body.title` and `req.body.path` match the `title` and `path`
sent with axios in `Admin.vue`.

This function creates a new `Item`, then calls its `save` method to save it to
the mongo database. It sends the saved item back to the front end in 200 OK
response.

If an error occurs, the function sends a 500 error response.

## Testing

You will need to quit the server with `control-c` and then restart it:

```
node server.js
```

Browse to `localhost:8080` and use the admin page to upload some photos. I have
placed some photos in the data folder of this repo for you. Turn on the
Developer Tools and use the Network tab to monitor what is happening. Then use
the `mongo` command line tool or a program like
[robomongo](https://robomongo.org/) or [MongoDB
Compass](https://www.mongodb.com/products/compass) to visualize your database
and see the data that is inserted.

This is what it looks like after I added 5 objects:

![robomongo](/screenshots/robomongo.png)

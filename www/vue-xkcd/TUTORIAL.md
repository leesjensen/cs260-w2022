# Tutorial

This tutorial will walk help you build a website for browsing the [xkcd comic](https://xkcd.com/).

## Loading data from an API

The first step is to load data from the XKCD API. We've done this with fetch in JavaScript before, but this time we're going to use the [axios](https://github.com/axios/axios) library. This is a popular library for sending AJAX requests.

One complication is that the [official XKCD API](https://xkcd.com/json.html) does not use CORS, so this will result in a CORS error. To avoid this, we'll use an [unofficial, but CORS-enabled XKCD API](https://github.com/mrmartineau/xkcd-api).

The first step is to modify `script.js` to setup our Vue instance and fetch the latest XKCD comic:

```
let app = new Vue({
  el: '#app',
  data: {
    number: '',
    current: {
      title: '',
      img: '',
      alt: ''
    },
  },
  created() {
    this.xkcd();
  },
  methods: {
    xkcd() {
      let url = 'https://xkcd.now.sh/?comic=';
      if (this.number === '') {
        url += 'latest';
      } else {
        url += this.number;
      }
      axios.get(url)
        .then(response => {
          this.current = response.data;
          return true;
        })
        .catch(error => {
          console.log(error)
        });
    }
  }
});
```

You should be familiar with most of this from our prior Vue tutorials. We create an instance of Vue, tell it to control the DOM inside the tag with the `#app` CSS id, and setup some variables.

We also create a method, called `xkcd` to fetch the comic. The `xkcd` API
uses URLs of the form `https://xkcd.now.sh/?comic=latest` or `https://xkcd.now.sh/?comic=number`, where `number` is a valid comic number. A variable
called `this.number` keeps track of the comic number we are browsing.

This method uses the axios library, JavaScript Promises, and the new function syntax in ES6.

One important thing to know is that `axios.get` returns a Promise, which gets resolved when the fetch completes. When it does, the code you place in `then` gets executed. This is what it means to have your JavaScript execute asynchronously. Anything placed after `axios.get` (after the final semicolon) is executed immediately after the call to `get`. The code inside `then` is executed only after the resource is actually fetched.

Once the `get` returns, we execute a function inside of `then`. This function takes one argument, `response`, and calls `response.json()` to convert it to JSON. Functions in a Promise chain must always return. The value that is returned is the parameters for the next `then` statement. Notice the second `then` also calls a function, which takes one argument, `json`, and uses this to update the value of `current`. This is called [Promise chaining](https://javascript.info/promise-chaining).

If you prefer, you can instead use the `async/await` syntax. Let's change our `xkcd` function to look like this:

```
async xkcd() {
  try {
    let url = 'https://xkcd.now.sh/?comic=';
    if (this.number === '') {
      url += 'latest';
    } else {
      url += this.number;
    }
    const response = await axios.get(url);
    this.current = response.data;
  } catch (error) {
    console.log(error);
  },
```

In this case, the browser waits until the `get` call returns, then stores the result in `response`.  This new syntax is supported by newer browsers. In future projects, we will show you how to package your code so that it will run on any browser.

Here's an example of what the JSON looks like that is returned from the API:

```
{
  "month":"2",
  "num":1958,
  "link":"",
  "year":"2018",
  "news":"",
  "safe_title":"Self-Driving Issues",
  "transcript":"",
  "alt":"If most people turn into muderers all of a sudden, we'll need to push out a firmware update or something.",
  "img":"https://imgs.xkcd.com/comics/self_driving_issues.png",
  "title":"Self-Driving Issues",
  "day":"21",
  "imgRetina":"https://imgs.xkcd.com/comics/self_driving_issues_2x.png"
 }
```

To use this JSON data, modify `index.html` to insert the following inside the `div` tag:

```
  <div id="app">
    <h2>{{current.safe_title}}</h2>
    <img v-bind:src="current.img" v-bind:alt="current.alt">
    <p>{{current.alt}}</p>
  </div>
```

This will bind the `title`, `src` and `alt` properties of the JSON to some HTML elements.

## Waiting to load content

When you load data asynchronously, it is a good idea to display a message to the user in case this takes a long time. In this step, we'll modify the code to do this.

First, in `script.js`, add a new `loading` variable to the data in the Vue instance. It should look like this:

```
  data: {
    number: '',
    current: {
      title: '',
      img: '',
      alt: ''
    },
    loading: true,
  },
```

Second, modify the `xkcd` function to set and clear this variable:

```
    async xkcd() {
      try {
        this.loading = true;
        let url = 'https://xkcd.now.sh/?comic=';
        if (this.number === '') {
          url += 'latest';
        } else {
          url += this.number;
        }
        const response = await axios.get(url);
        this.current = response.data;
        this.loading = false;
      } catch (error) {
        console.log(error);
      }
    },
```

Finally, modify `index.html` so that it uses this variable to show and hide a message:

```
    <div v-if="loading">
      <p>Loading...</p>
    </div>
    <div v-else>
      <h2>{{current.title}}</h2>
      <img v-bind:src="current.img" v-bind:alt="current.alt">
      <p>{{current.alt}}</p>
    </div>
```

You should now be able to (briefly) see the loading message as the comic is loaded.

## Showing additional information about the comic

We should show some additional information about the comic. We can do this just inside of `index.html`:

```
    <div v-if="loading">
      <p>Loading...</p>
    </div>
    <div v-else>
      <h2>{{current.safe_title}}</h2>
      <img v-bind:src="current.img" v-bind:alt="current.alt">
      <p>{{current.alt}}</p>
      <p><i>#{{current.num}}, drawn on {{current.month}}-{{current.day}}-{{current.year}}</i></p>
    </div>
```

We're also going to make a small change to the `xkcd` method in `script.js`, to keep track of the current comic number:

```
    async xkcd() {
      try {
        this.loading = true;
        let url = 'https://xkcd.now.sh/?comic=';
        if (this.number === '') {
          url += 'latest';
        } else {
          url += this.number;
        }
        const response = await axios.get(url);
        this.current = response.data;
        this.loading = false;
        this.number = response.data.num;
      } catch (error) {
        console.log(error);
      }
    },
```

Since we start with `number` being an empty string, this lets us set `number` to the current comic number once it is known.

We also want to compute a the name of the current month, since it is only given to us in numeric form. For this, we can use a computed property in `script.js`:

```
  computed: {
    month() {
      var month = new Array;
      if (this.current.month === undefined)
        return '';
      month[0] = "January";
      month[1] = "February";
      month[2] = "March";
      month[3] = "April";
      month[4] = "May";
      month[5] = "June";
      month[6] = "July";
      month[7] = "August";
      month[8] = "September";
      month[9] = "October";
      month[10] = "November";
      month[11] = "December";
      return month[this.current.month - 1];
    }
  },
```

This property simply translates the numeric representation of the month to a string representation. We can use it in `index.html` with a small change:

```
      <p><i>#{{current.num}}, drawn on {{current.day}} {{month}} {{current.year}}</i></p>
```

Your code should now show the comic title, number, and date.

## Navigating with buttons

We would like to be able to navigate to comics written on other days. To do this, add some buttons to `index.html`:

```
    <div v-else>
      <p>
        <button v-on:click="previousComic">Previous</button>
        <button v-on:click="nextComic">Next</button>
      </p>
      <h2>{{current.safe_title}}</h2>
```
To make these buttons work, add these methods to `script.js`:

```
    previousComic() {
      this.number = this.current.num - 1;
    },
    nextComic() {
      this.number = this.current.num + 1;
    },
```

Note how simple the `previousComic` and `nextComic` methods are. They just need to update `number`. However, we need to tell Vue to fetch the new comic whenever the number changes. To do this, add a watcher in `script.js`, right after the computed properties:

```
  watch: {
    number(value, oldvalue) {
      this.xkcd();
    },
  },
```

The watcher is called every time the value of `number` changes.

You should now have working navigation buttons.

## Navigating to a random comic

We'll now add another button to navigate to a random comic. To do this, add the button after the other buttons
in `index.html`:

```
	<button v-on:click="randomComic">Random</button>
```

This calls a method when clicked, and we need to add that method to `script.js`:

```
    getRandom(min, max) {
      min = Math.ceil(min);
      max = Math.floor(max);
      return Math.floor(Math.random() * (max - min + 1)) + min; //The maximum and minimum are inclusive
    },
    randomComic() {
      this.number = this.getRandom(1, this.max);
    },
```

This will choose a random integer between 1 and the maximum number supported by XKCD, and set `number` to this new number.
Given our previous logic, the new comic will be fetched automatically.

To make this work, we need to keep track of the `max`. Add that to the data:

```
  data: {
    number: '',
    max: '',
```

Then modify the watcher:

```
  watch: {
    number(value, oldvalue) {
      if (oldvalue === '') {
        this.max = value;
      } else {
        this.xkcd();
      }
    },
  },
```
The `max` is simply the number fetched the first time we load the page.

If you tested the previous code we wrote, you'll notice the Next button doesn't work well when we are viewing
the latest comic. This is because an error occurs when loading the comic (view the console).  Now that we have a maximum, we can also use it when an error occurs fetching the comic from the API:

```
      }).catch(error => {
	       this.number = this.max;
      });
```
We'll just load the comic with the largest available number.

We can also modify the `nextComic` method to check that we have not gone past the maximum. While we're there, we can modify `previousComic` to be sure we never go below 1.

```
    previousComic() {
      this.number = this.current.num - 1;
      if (this.number < 1)
        this.number = 1;
    },
    nextComic() {
      this.number = this.current.num + 1;
      if (this.number > this.max)
        this.number = this.max
    },
```

## Adding comments

The last feature we'll ad is the ability for people to add comments. We won't require people to login yet, because we haven't covered authentication yet and don't have a server to provide authentication of users. So we'll just build a commenting front end.

In `index.html`, add the following right after the comic, still inside the div with the `v-else`:

```
    <p><i>#{{current.num}}, drawn on {{current.day}} {{month}} {{current.year}}</i></p>
      <h3>Add a Comment</h3>
      <form v-on:submit.prevent="addComment">
        <input v-model="addedName" placeholder="Name"></p>
        <textarea v-model="addedComment"></textarea>
        <br />
        <button type="submit">Comment</button>
      </form>
      <h3>Comments</h3>
      <div v-for="comment in comments[number]">
        <hr>
        <p>{{comment.text}}</p>
        <p><i>-- {{comment.author}}</i></p>
      </div>

```
This adds a comment form, plus code to display all comments left for this comic. Notice that comments are going to use an object, with an array of comments for each comic number.

In `script.js`, add some new variables of data:

```
    loading: true,
    addedName: '',
    addedComment: '',
    comments: {},
```

The `addedName` and `addedComment` variables are used in the comment form. The `comments` variable is used to store all the comments.

Then add the `addComment` method:

```
    addComment() {
      if (!(this.number in this.comments))
        Vue.set(app.comments, this.number, new Array);
      this.comments[this.number].push({
        author: this.addedName,
        text: this.addedComment
      });
      this.addedName = '';
      this.addedComment = '';
    },
```

This method needs to add a new array to the `comments` object whenever the first comment is made for a given comic. We can't add it the usual way because Vue has to be able to track changes to `comments`. Instead, we have to use `Vue.set` to add the array.

Once this is done, we can use standard JavaScript to push the new comment into the array.

You should now have comments working, with separate comments for each comic. Note, the comments are not saved when you refresh the page. Later we'll use a server and a database to store important state.

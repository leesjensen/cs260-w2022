# Star ratings

For this feature, we are going to us a library. There are *many* libraries written in plain JavaScript and also many libraries customized for Vue or other front end frameworks. Vue itself is a library! We included it in our HTML with this line:

```HTML
  <script src="https://cdn.jsdelivr.net/npm/vue/dist/vue.js"></script>
```

Likewise, Axios is a library, which we included with:

```HTML
  <script src="https://unpkg.com/axios/dist/axios.min.js"></script>
```

When you use a library, you want to become familiar with its documentation, which can guide you in how to use the library.

Many libraries are hosted on a Content Distribution Network (CDN), which means that they are placed on servers around the world, and your browser automatically loads the library from the closest server. Your browser will also cache libraries. These two features combined can make your site load very quickly. Popular CDNs include [jsdeliver.com](https://www.jsdelivr.com), [unpkg.com](https://unpkg.com), and [cdnjs](https://cdnjs.com).

## The star rating library

We will use this [star rating library for Vue](https://github.com/craigh411/vue-star-rating). 



Read the [documentation](https://github.com/craigh411/vue-star-rating) and find the CDN method for loading the libary. You will see that for Vue 2.X you can put this in `index.html`:

```html
<script src="https://unpkg.com/vue-star-rating/dist/VueStarRating.umd.min.js"></script>`
```

In addition, you need to create a global Vue component at the top of `script.js`:

```js
Vue.component('star-rating', VueStarRating.default);
```

Once this is done, you can create a star rating element in `index.html`:
```js
<star-rating @rating-selected ="setRating"></star-rating>
```

This is using the shorthand for `v-on`, described at the bottom of the [Template Syntax](https://vuejs.org/v2/guide/syntax.html) page.

You can now create a method called `setRating` in `script.js`:

```js
methods: {
    setRating(rating){
      // Handle the rating
    }
  },
```

You should be able to refresh your page and see the star ratings in action, although our method is empty right now.

## Using ratings

To keep track of ratings, you should add a ratings object in `script.js`:

```js
    comments: {},
    ratings: {},
```

You can then set properties on this object inside of `setRating`:

```js
this.ratings[this.number].sum += rating;
this.ratings[this.number].total += 1;
```

To make this work, you need to check whether the object has a rating yet:

```js
      if (!(this.number in this.ratings))
        Vue.set(this.ratings, this.number, {
          sum: 0,
          total: 0
        });
      this.ratings[this.number].sum += rating;
      this.ratings[this.number].total += 1;
```

Just like with the comments, we need to use `Vue.set` to setup a new property in an object so that Vue will track it.

## On Your Own

You can now create a computed property that returns the average rating for the currently viewed comic. Once you have a computed average, you can show it in `index.html`.

You can also change the options on the star rating library so that it increments in steps of 0.5, does not show the current rating, and uses red stars. See [the props section in the Star Ratings docs](https://github.com/craigh411/vue-star-rating) for help and an example.

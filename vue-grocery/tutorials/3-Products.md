# Products

Any store needs a good listing of products. Normally, a store would keep a large
database listing its entire inventory of products. To make this project easier,
and since we're only building a front end, we will use some mock data to
represent the store's products.

You can find mock data in the `starter-code` directory. Copy this into your
project:

```
cp starter-code/mock-data.js src/
```

This defines a set of 50 products:

```
let mock = [{
    id: 1,
    name: "Egg Salad",
    price: "$5.62",
    country: "United States",
    image: 'egg-salad.jpg'
  },
  {
    id: 2,
    name: "Sweet Potato",
    price: "$2.41",
    country: "Brazil",
    image: "sweet-potato.jpg"
  },
  ...
```

Each product has a unique `id`, a `name`, a `price`, a `country` of origin, and
an associated `image`. When you copied in the images from a previous step, this
included all the product images, which should be located at `public/images/products`.

I generated this list of products using [Mockaroo](https://mockaroo.com/).
Note that the prices and countries of origin are fictional. So we may have some
interesting combinations in our data!

I downloaded all of the images from Google Images. I was *not* careful about
finding images that are marked as re-usable with [Creative Commons](https://creativecommons.org/)
licensing. If you're building any kind of real product, you should make sure to
do that. There are a variety of search engines that get you images with friendly
licensing. Since there is an exception in copyright law for fair use for educational
purposes, I feel this is OK.

<iframe width="560" height="315" src="https://www.youtube.com/embed/CJn_jC4FNDo" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

You will also see this at the end of `mock-data.js`:

```
export default mock;
```

This allows us to import this file with an `import` statement.

To use this mock data, edit `src/main.js` so that it reads as follows:

```
import mock from './mock-data.js'

let data = {
  products: mock,
  cart: []
}

new Vue({
  router,
  data,
  render: h => h(App)
}).$mount('#app')
```

The first line imports the mock data and stores it in a variable called `mock`.
Then we create a `data` object and pass this to the Vue instance when it is
created. This makes `this.$root.$data` available to all components in the application.

Any time you change `main.js` you will need to reload the app to see the changes.
If you reload and then use the Vue Developer Tools you should be able to see
the mock data is loaded:

![mock data](/screenshots/products.png)

## Next Tutorial

[Product List](/tutorials/4-Product-List.md)

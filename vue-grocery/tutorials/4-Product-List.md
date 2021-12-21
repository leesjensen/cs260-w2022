# Product List

Now that we have mock data for our products, we can build a home page that shows
the store products. Since we will have other pages that also show a list of products,
we're going to create a `ProductList` component that we can reuse.

## ProductList component

Create a new file called `components/ProductList.vue`. In this file, use the
following for the HTML template:

```
<template>
<div class="wrapper">
  <div class="products">
    <div class="product" v-for="product in products" :key="product.id">
      <div class="info">
        <h1>{{product.name}}</h1>
        <p>{{product.country}}</p>
      </div>
      <div class="image">
        <img :src="'/images/products/'+product.image">
      </div>
      <div class="price">
        <h2>{{product.price}}</h2>
        <button class="auto">Add to Cart</button>
      </div>
    </div>
  </div>
</div>
</template>
```

This template loops through an array of `products` using `v-for`. Notice that we
need to bind a `key` attribute to some unique identifier in this for loop, otherwise
Vue will raise an error indicating we need one. We can use the `product.id` for this.
Generally, whenever you loop through data, ensure that each data item has a unique
id like this.

We display each product's name, country of origin, image, and its price. Notice
that the `img` tag uses class binding so that the URL for the image is `/images/products/`
plus the image name. This is the syntax to use where you want to mix a Vue property
with other JavaScript, such as appending to a string.

Place the following below the template to create a script section for this component:

```
<script>
export default {
  name: 'ProductList',
  props: {
    products: Array
  }
}
</script>
```

The `export default` is like what we used for the mock data. This component is
exporting an object, with properties for its `name`  and `props`. The `props`
are contained in an object, listing property names and types. Here we are indicating
that the `ProductList` component has one prop, an array of `products`.

The last thing you need in this component is some CSS:

```
<style scoped>
.wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
}

.products {
  margin-top: 20px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
}

.product {
  margin: 10px;
  margin-top: 50px;
  width: 200px;
}

.product img {
  border: 2px solid #333;
  height: 250px;
  width: 200px;
  object-fit: cover;
}

.product .image {
  display: flex;
  justify-content: center;
  margin-bottom: 5px;
}

.info {
  background: #F2921D;
  color: #000;
  padding: 10px 30px;
  height: 80px;
}

.info h1 {
  font-size: 16px;
}

.info h2 {
  font-size: 14px;
}

.info p {
  margin: 0px;
  font-size: 10px;
}


.price {
  display: flex;
}

button {
  height: 50px;
  background: #000;
  color: white;
  border: none;
}

.auto {
  margin-left: auto;
}
</style>
```

This style is scoped so it affects only this component.

This uses some flexbox, so if you're still learning take a look at those areas where
`display` is set to `flex`.  One particular thing to make note of is that the
`price` div uses flexbox and then sets `margin-left` to `auto` for the "add to cart"
button. This makes that button float to the right when everything else is floated left
by default in the flexbox.

## Home Page

Now we need to use this component on the home page. Edit `src/views/Home.vue` and
change the template so it uses this:

```
<template>
<div>
  <ProductList :products="products" />
</div>
</template>
```

The `ProductList` component allows us to use a `<ProductList>` tag in the HTML
template. Remember this component has a `products` prop. We pass it data for this
prop using attribute binding `:products`. I bind this to a `products` variable, but
this variable could be called anything. The important thing is that the `:products`
attribute here matches the `products` prop defined inside of `ProductList.vue`.

The script portion of `Home.vue` should contain:

```
<script>
import ProductList from "../components/ProductList.vue"
export default {
  name: 'Home',
  components: {
    ProductList
  },
  data() {
    return {
    }
  },
  computed: {
    products() {
      return this.$root.$data.products;
    }
  },
}
</script>
```

The first line imports the `ProductList` component. Notice that the view is a component
so it also exports an object, like any other component. This is what allows us to
import it in `src/router/index.js`.

We use a computed property called `products` to get the list of products from
the global state variable defined in `src/main.js`.

We don't need any style because the `ProductList` component includes its own style.

Once you save your changes to `Home.vue` you should see the home page displaying
all of the products in the store:

![home page](/screenshots/home-page.png)

## Next Tutorial

[Product Search](/tutorials/5-Product-Search.md)

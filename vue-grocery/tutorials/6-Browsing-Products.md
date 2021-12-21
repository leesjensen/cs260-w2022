# Browsing Products

To show you the power of components, we're going to build a browsing page for the
store. This will also view a list of products, and we'll be able to reuse the
`ProductList` component that we built for the Home page.

## Browse View

Create a new file called `views/Browse.vue`. Use this for the HTML template:

```
<template>
<div>
  <div class="pure-menu pure-menu-horizontal">
    <ul class="pure-menu-list">
      <li class="pure-menu-item"><a @click="select('United States')" href="#" class="pure-menu-link">United States</a></li>
      <li class="pure-menu-item"><a @click="select('Canada')" href="#" class="pure-menu-link">Canada</a></li>
      <li class="pure-menu-item"><a @click="select('Mexico')" href="#" class="pure-menu-link">Mexico</a></li>
      <li class="pure-menu-item"><a @click="select('Brazil')" href="#" class="pure-menu-link">Brazil</a></li>
    </ul>
  </div>
  <ProductList :products="products" />
</div>
</template>
```

This looks a lot like the `Home.vue` we wrote. It also uses a `ProductList` at the
bottom. Instead of a search box, we have a menu built using [Pure CSS](https://purecss.io/).
The menu contains a list of countries, and then calls an event handler named `select`
when that menu item is clicked. We're using `a` for the links because these are not
handled by Vue Router, since they don't go to a new page.

This is what we'll use for the JavaScript section:

```
<script>
import ProductList from "../components/ProductList.vue"
export default {
  name: 'Browse',
  components: {
    ProductList
  },
  data() {
    return {
      country: '',
    }
  },
  computed: {
    products() {
      return this.$root.$data.products.filter(product => product.country === this.country);
    }
  },
  methods: {
    select(country) {
      this.country = country;
    }
  }
}
</script>
```

We import the `ProductList` component, just like with `Home.vue`. We likewise have
to list the `ProductList` in the `components` section. In the `data` section we use
the `country` property to keep track of the country the user is viewing. We
use a computed property `products()`, like in `Home.vue`, except this time the `filter`
method uses a function that compares `product.country` to the `country` property.
Finally, the `methods` section has a `select()` function that modifies the `country`
property when a menu item is clicked.

We don't need any custom styles for this component.

## Configure Vue Router

We now need to configure the Router to use this new view. Edit `router/index.js`
and import the new view:

```
import Home from '../views/Home.vue'
import Browse from '../views/Browse.vue'
```

Remove the route for `About` and replace it with the one for `Browse`:

```
{
  path: '/browse',
  name: 'Browse',
  component: Browse
},
```

Once you save this, you should be able to visit the Browse page and select a country:

![browsing products](/screenshots/browse.png)

## Next Tutorial

[Shopping Cart](/tutorials/7-Shopping-Cart.md)

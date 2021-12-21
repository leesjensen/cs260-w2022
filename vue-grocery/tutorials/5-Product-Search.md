# Product Search

Since the store may have a very large number of products, we're going to add a search
function on the home page to narrow down the list of products. We're going to make
this a "live" search so that the products are narrowed down as you type.

First, edit `src/views/Home.vue` so that the template now has a search box:

```
<template>
<div>
  <div class="wrapper">
    <div class="search">
      <form class="pure-form">
        <i class="fas fa-search"></i><input v-model="searchText" />
      </form>
    </div>
  </div>
  <ProductList :products="products" />
</div>
</template>
```

This is the same as before, but with an added `div` with a `wrapper` class. Inside
of that div is a form that includes an input for searching. We are using
CSS classes from [Pure CSS](https://purecss.io/) to style this.

We also need to modify the JavaScript for this component so that data portion
has a `searchText` property. This is bound to the input used for the search box:

```
  data() {
    return {
      searchText: '',
    }
  },
```

We also need to modify the computed property so that it does the searching for us:

```
computed: {
  products() {
    return this.$root.$data.products.filter(product => product.name.toLowerCase().search(this.searchText.toLowerCase()) >= 0);
  }
```

Notice that we are using a higher-order function, `filter` to filter the list of
products. This returns a new array that is a subset of the original array. It takes
one parameter, a function. This is an anonymous function since it has no name!
We are using the arrow syntax to define the function, so it takes one parameter,
`product` (one of the products from the array) and returns true or false based
on whether the product name contains the `searchText`.

We use `toLowerCase()` to first convert the product name to lowercase so that
the search is case insensitive. The `toLowerCase()` function returns a new
string without modifying the original. The `search()` function returns a
position in the string where the search is located, and -1 if it is not found,
so we just need to check if it returns something greater than or equal to zero.

Finally, we need some style for this search box:

```
<style scoped>
.wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
}

.search {
  border: 1px solid #ccc;
  border-radius: 4px;
  width: 50%;
}

form {
  display: table;
  width: 100%;
}

i {
  display: table-cell;
  padding-left: 10px;
  width: 1px;
}

input {
  display: table-cell;
  font-size: 20px;
  border: none !important;
  box-shadow: none !important;
  width: 100%;
  height: 40px;
}
</style>
```

This style is scoped so it affects only this component. Surprise, we're using flexbox
again! There are a few tricky things here. First, some of the styles on `input` need
to use `!important` to override settings in Pure CSS. Second, I want the search
input to take up all the rest of the containing div after the search icon, and a border
around both of them, instead of just around the input box. This takes a little bit of
creativity. We use a `.wrapper` div around the entire search box, and then format
them using `table` and `table-cell` to get them to behave the way we want. You'll
notice this looks a lot like the Google search box.

You should now see a working search box on the home page:

![search box](/screenshots/search-box.png)

How does this manage to search as you type? Recall that Vue uses data binding
to bind the input box with the `searchText` property. Every time the user types
a letter into the search box, it changes `searchText`. In addition, Vue computed
properties *automatically* find their dependencies and get re-evaluated if any
of their dependencies change. Since `products()` depends on `searchText`, it runs
every time `searchText` changes. To top it off, if `searchText` is an empty string,
the `filter` in `products()` still works because the empty string is present in
every product name.

## Next Tutorial

[Browsing Products](/tutorials/6-Browsing-Products.md)

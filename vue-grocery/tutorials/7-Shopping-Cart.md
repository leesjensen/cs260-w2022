# Shopping Cart

The last step is to build a shopping cart. This is the part you're going to
do on your own, so you can practice what you've learned. This will require:

* Modifying the "Add to Cart" button so that it adds the product to the cart.
There is already a cart property in the global data object that you can use to
store an array of products. Don't worry about quantities. We'll just assume that
users need to add the same product more than once in order to buy multiples.

  <details><summary>click for more tips</summary>
 
  * Since the "Add to Cart" button is in ProductList, you want to work there. 
  * Review previous code we have written if you don't remember how to run a function when a button is clicked.
  * Remember that the cart array is already part of the global data. Look for examples in the code of accessing products to see how to access cart.

</details>

 
* Modifying the menu so that it shows the number of items in the cart. You may
want to use a computed property in App.vue to do this.

  <details><summary>click for more tips</summary>
 
  * Since the menu is in App.vue, you want to work there. 
  * You will need to add a "script" section to this component since it doesn't have one already.
  * The number of items in the cart is currently hard-coded. How would you replace this with a calculation that uses the length of the cart array?
  </details>

* Adding a Cart view that is viewed when the user clicks on the Cart menu item.
This view should show all the products in the cart. It should include a Remove
button to remove items from the cart. It should also show a message when the cart
is empty. Don't use the `ProductList` here since you won't have an `Add to Cart`
button. And you should make the shopping cart view look different from the product
listing so that the user is not confused.

  <details><summary>click for more tips</summary>
 
  * Take a look at how the Browse view is configured. There is a menu item in `App.vue`. When this is clicked (router-link), it goes to `router/index.js` to find the matching path for `/browse` and is configured to use the `Browse.vue` component to handle that path. You need to do something similar for a Cart view. 
  * You can copy what is in Browse.vue and then modify it to work for `Cart.vue`.
  * You can likewise copy and then modify a configuration for a view in `router/index.vue` so you can link a path to `Cart.vue`.
  * In your cart view you need a list of items in the cart, similar to `ProductList`. You can create a similar `CartList` component.
  * When removing items from the cart, you can use a button similar to the `Add to Cart` button, but change it so it instead removes items. In JavaScript, you can use the `splice()` method to remove items from an Array.
    </details>

## Extra Credit

If you have time and want a challenge, make the cart keep track of quantities.
Remember, each product has a unique ID. So you could search the cart to see if a product
is already there, and then add a `quantity` property to items in the cart. You could
also use an object that is indexed by property ID.

## Next Tutorial

[Installing on Digital Ocean](/tutorials/8-Installing-on-Digital-Ocean.md)

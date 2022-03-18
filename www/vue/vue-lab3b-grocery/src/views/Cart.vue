<template>
  <div>
    <div v-if="hasItems">
      <div
        class="product"
        v-for="(product, index) in cartItems"
        :key="`product-${index}`"
      >
        <div class="image">
          <img :src="'images/products/' + product.image" />
        </div>
        <div class="info">{{ product.name }}</div>
        <div class="price">{{ format(product.price) }}</div>
        <div class="action">
          <button class="auto" v-on:click="removeFromCart(index)">
            Remove
          </button>
        </div>
      </div>
      <div class="totalPrice">Total: {{ format(totalCost) }}</div>
    </div>
    <div v-else>
      You don't have any items in your cart. Perhaps you should
      <a href="../browse">add some</a>?
    </div>
  </div>
</template>

<script>
export default {
  name: "Cart",
  data() {
    return {
      formatter: 90,
    };
  },
  computed: {
    cartItems() {
      return this.$root.$data.cart;
    },
    hasItems() {
      return this.$root.$data.cart.length !== 0;
    },
    totalCost() {
      if (this.hasItems) {
        const total = this.$root.$data.cart.reduce(
          (previous, current) => previous + current.price,
          0
        );
        return total;
      }
      return 0.0;
    },
  },
  created() {
    this.formatter = new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    });
  },
  methods: {
    removeFromCart(index) {
      console.log(this.cartItems[index].name);
      this.cartItems.splice(index, 1);
    },
    format(amount) {
      return this.formatter.format(amount);
    },
  },
};
</script>

<style scoped>
.product {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 10px;
  grid-auto-rows: minmax(50px, auto);
  border: thin solid black;
  padding: 10px;
  margin: 10px;
  border-radius: 10px;
}

.product img {
  height: 50px;
}

.totalPrice {
  font-weight: bolder;
}

.info {
  font-weight: bolder;
  color: blue;
}
</style>

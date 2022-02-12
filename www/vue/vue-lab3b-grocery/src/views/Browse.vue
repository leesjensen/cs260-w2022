<template>
  <div>
    <div class="pure-menu pure-menu-horizontal">
      <ul class="pure-menu-list">
        <li class="pure-menu-item">
          <a @click="select('United States')" href="#" class="pure-menu-link"
            >United States</a
          >
        </li>
        <li class="pure-menu-item">
          <a @click="select('Canada')" href="#" class="pure-menu-link"
            >Canada</a
          >
        </li>
        <li class="pure-menu-item">
          <a @click="select('Mexico')" href="#" class="pure-menu-link"
            >Mexico</a
          >
        </li>
        <li class="pure-menu-item">
          <a @click="select('Brazil')" href="#" class="pure-menu-link"
            >Brazil</a
          >
        </li>
      </ul>
    </div>
    <ProductList :products="products" />
  </div>
</template>

<script>
import ProductList from "../components/ProductList.vue";

export default {
  name: "Browse",
  components: {
    ProductList,
  },
  data() {
    return {
      country: "",
    };
  },
  computed: {
    products() {
      if (this.country === "") {
        return this.$root.$data.products;
      }
      return this.$root.$data.products.filter(
        (product) => product.country === this.country
      );
    },
  },
  methods: {
    select(country) {
      this.country = country;
    },
  },
};
</script>

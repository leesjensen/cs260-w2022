'use strict';

// Component that simulates HTML anchor elements with custom routing.
Vue.component('app-a', {
  template: `
    <a v-bind:href="href" v-bind:class="{ active: isActive }" v-on:click.prevent="go">
        <slot></slot>
    </a>`,
  data: function () {
    return {
      basePath: window.location.pathname.replace(/\/+$/, ''),
      router: null,
    };
  },
  props: {
    href: { type: String, required: true },
  },
  mounted() {
    this.router = this.$root.$router;
    this.isActive;
  },
  computed: {
    // Set the active class if this is the current route
    isActive() {
      return this.href === this.router?.currentRoute;
    },
  },
  methods: {
    // On the click event change the current route and update the browser history.
    go(event) {
      if (!this.isActive && this.router) {
        this.router.currentRoute = this.href;
        const path = `${this.basePath}${this.href}`;
        window.history.pushState(this.href, '', path);
      }
    },
  },
});

// Static content for our views. This could point to other components.
const Home = { template: '<p class="router-page">Home page</p>' };
const About = { template: '<p class="router-page">About page</p>' };
const Settings = { template: '<p class="router-page">Settings page</p>' };

// Define the map between paths and content.
const routes = {
  '/': Home,
  '/about': About,
  '/settings': Settings,
};

// The router dynamically loads the current component.
Vue.component('app-router', {
  template: ``,
  data: function () {
    return { currentRoute: '/' };
  },
  computed: {
    // Dynamically compute what is displayed by the router.
    ViewComponent() {
      let component = routes[this.currentRoute] || Home;
      component = `<main>${component.template}</main>`;
      return { template: component };
    },
  },
  created: function () {
    this.$root.$router = this;
    // Listen for the browser history back event and change the route.
    window.addEventListener('popstate', (event) => {
      this.currentRoute = event.state;
    });
  },
  render(h) {
    // Render the dynamically calculated component.
    return h(this.ViewComponent);
  },
});

// The Vue instance
const app = new Vue({
  el: '#app',
});

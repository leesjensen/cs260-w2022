'use strict';

const appFrame = `
  <nav class="nav-bar">
    <app-a href="/">Home</app-a> | 
    <app-a href="/about">About</app-a> | 
    <app-a href="/settings">Settings</app-a>
  </nav>
  <header><h1>Basic Router</h1></header>
`;

const Home = { template: '<p class="router-page">Home page</p>' };
const About = { template: '<p class="router-page">About page</p>' };
const Settings = { template: '<p class="router-page">Settings page</p>' };

const routes = {
  '/': Home,
  '/about': About,
  '/settings': Settings,
};

// Component that simulates HTML anchor elements with custom routing.
Vue.component('app-a', {
  template: `
      <a v-bind:href="href" v-bind:class="{ active: isActive }" v-on:click.prevent="go">
          <slot></slot>
      </a>`,
  props: {
    href: { type: String, required: true },
  },
  computed: {
    // Set the active class if this is the current route
    isActive() {
      return this.href === this.$root.currentRoute;
    },
  },
  methods: {
    // On the click event change the current route and update the browser history.
    go(event) {
      if (!this.isActive) {
        this.$root.currentRoute = this.href;
        const path = `${this.href}`;
        window.history.pushState(this.href, '', path);
      }
    },
  },
});

new Vue({
  el: '#app',
  data: {
    currentRoute: '/',
  },
  computed: {
    // Dynamically compute what is displayed by the router.
    ViewComponent() {
      let component = routes[this.currentRoute] || Home;
      component = `<main>${appFrame}${component.template}</main>`;
      return { template: component };
    },
  },
  created: function () {
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

'use strict';

// Simple components for our SPA views.
const Home = { template: '<p class="router-page home">Home</p>' };
const About = { template: '<p class="router-page about">About</p>' };
const Settings = {
  template: '<p class="router-page settings">Settings</p>',
};

// Provide the data for our router.
const Router = {
  currentRoute: '/',
  notFoundRoute: Home,
  basePath: window.location.pathname.replace(/\/+$/, ''),
  routes: {
    '/': Home,
    '/about': About,
    '/settings': Settings,
  },
};

// Component that simulates HTML anchor elements with custom routing.
Vue.component('app-a', {
  template: `
    <a v-bind:href="href" v-bind:class="{ active: isActive }" v-on:click.prevent="go">
        <slot></slot>
    </a>`,
  data: function () {
    return {
      router: Router,
    };
  },
  props: {
    href: { type: String, required: true },
  },
  computed: {
    // Set the active class if this is the current route
    isActive() {
      return this.href === this.router.currentRoute;
    },
  },
  methods: {
    // On the click event change the current route and update the browser history.
    go(event) {
      if (!this.isActive) {
        this.router.currentRoute = this.href;
        const path = `${this.router.basePath}${this.href}`;
        window.history.pushState(this.href, '', path);
      }
    },
  },
});

// The router dynamically loads the current component.
Vue.component('app-router', {
  data: function () {
    return { router: Router };
  },
  computed: {
    // Dynamically compute what is displayed by the router.
    ViewComponent() {
      let component =
        this.router.routes[this.router.currentRoute] ||
        this.router.notFoundRoute;
      component = `<main>${component.template}</main>`;
      return { template: component };
    },
  },
  created: function () {
    // Listen for the browser history back event and change the route.
    window.addEventListener('popstate', (event) => {
      this.router.currentRoute = event.state;
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

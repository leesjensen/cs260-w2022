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

Vue.component('app-a', {
  template: `
      <a v-bind:href="href" v-bind:class="{ active: isActive }" v-on:click="go">
          <slot></slot>
      </a>`,
  props: {
    href: {
      type: String,
      required: true,
    },
  },
  computed: {
    isActive() {
      console.log('isActive', this.href, this.$root.currentRoute);
      return this.href === this.$root.currentRoute;
    },
  },
  methods: {
    go(event) {
      event.preventDefault();
      if (!this.isActive) {
        this.$root.currentRoute = this.href;
        const path = `${this.$root.basePath}#${this.href}`;
        window.history.pushState(this.href, '', path);
      }
    },
  },
});

new Vue({
  el: '#app',
  data: {
    basePath: document.location.pathname,
    currentRoute: '/',
  },
  computed: {
    ViewComponent() {
      let component = routes[this.currentRoute] || Home;
      component = `<main>${appFrame}${component.template}</main>`;
      return { template: component };
    },
  },
  created: function () {
    window.addEventListener('popstate', (event) => {
      this.currentRoute = event.state;
    });
  },
  render(h) {
    return h(this.ViewComponent);
  },
});

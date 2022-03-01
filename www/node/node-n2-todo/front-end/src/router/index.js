import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';

Vue.use(VueRouter);

// LSJ: The router is really pointless since there are no routes.
// This just makes it hard to host in production under a deep website structure.
const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
];

console.log('loaded router');

const router = new VueRouter({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes,
});

export default router;

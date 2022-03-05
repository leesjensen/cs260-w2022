import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';

// ADD ROUTER PLUGIN
Vue.use(VueRouter);

// DEFINE ROUTES
const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/about',
    name: 'About',

    // ROUTE LEVEL CODE-SPLITTING WITH LAZY LOAD
    component: () =>
      import(/* webpackChunkName: "about" */ '../views/About.vue'),
  },
  {
    path: '/settings',
    name: 'Settings',
    component: () => import('../views/Settings.vue'),
  },
];

// MODES
// history or hash

const router = new VueRouter({
  mode: 'history',
  base: window.location.pathname.slice(0, -1),
  routes,
});

// const router = new VueRouter({
//   mode: 'hash',
//   routes,
// });

export default router;

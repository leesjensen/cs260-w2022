import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';
import Browse from '../views/Browse.vue';
import Cart from '../views/Cart.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/browse',
    name: 'Browse',
    component: Browse,
  },
  {
    path: '/cart',
    name: 'Cart',
    component: Cart,
  },
];

const router = new VueRouter({
  mode: 'history',
  base: window.location.pathname.replace(/\/+$/, ''),
  routes,
});

export default router;

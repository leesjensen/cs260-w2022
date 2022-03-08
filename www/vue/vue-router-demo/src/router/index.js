import Vue from 'vue';
import VueRouter from 'vue-router';
import LoginView from '../views/LoginView.vue';
import InfoView from '../views/InfoView.vue';
import UserView from '../views/User/UserView.vue';
import UserPostsView from '../views/User/UserPostsView.vue';
import UserProfileView from '../views/User/UserProfileView.vue';
import NotFoundView from '../views/NotFoundView.vue';

// Inject the router plugin
Vue.use(VueRouter);

const routes = [
  // Lazy load the root view
  {
    path: '/',
    component: () => import('../views/HomeView.vue'),
  },

  // Parameterize the path
  {
    path: '/info/:category',
    component: InfoView,
  },

  {
    path: '/login',
    component: LoginView,
  },

  // Named view with props
  {
    path: '/user/:userId',
    name: 'user',
    props: true,
    component: UserView,

    // Child routing
    children: [
      {
        path: 'profile',
        name: 'profile',
        props: true,
        component: UserProfileView,
      },
      {
        path: 'posts',
        name: 'posts',
        props: true,
        component: UserPostsView,
      },
    ],
  },

  // Default with wildcards
  {
    path: '*',
    name: 'notFound',
    component: NotFoundView,
  },
];

// Create a router
const router = new VueRouter({
  // Use history mode
  mode: 'history',
  // mode: 'hash',
  base: window.location.pathname.replace(/\/+$/, ''),
  routes,
});

export default router;

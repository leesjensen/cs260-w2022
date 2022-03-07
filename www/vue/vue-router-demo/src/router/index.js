import Vue from 'vue';
import VueRouter from 'vue-router';
import HomeView from '../views/HomeView.vue';
import InfoView from '../views/InfoView.vue';
import UserView from '../views/User/UserView.vue';
import UserPostsView from '../views/User/UserPostsView.vue';
import UserProfileView from '../views/User/UserProfileView.vue';
import NotFoundView from '../views/NotFoundView.vue';

// Inject the router plugin
Vue.use(VueRouter);

const routes = [
  // Root
  {
    path: '/',
    component: HomeView,
  },

  // Parameterize the path
  {
    path: '/info/:category',
    component: InfoView,
  },

  // Lazy load the view
  {
    path: '/login',
    component: () => import('../views/LoginView.vue'),
  },

  // Parameterize the path
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

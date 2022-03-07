import Vue from 'vue';
import VueRouter from 'vue-router';
import HomeView from '../views/HomeView.vue';
import InfoView from '../views/InfoView.vue';
import UserView from '../views/User/UserView.vue';
import UserPostsView from '../views/User/UserPostsView.vue';
import UserProfileView from '../views/User/UserProfileView.vue';
import NotFoundView from '../views/NotFoundView.vue';

Vue.use(VueRouter);

const routes = [
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
    name: 'login',
    props: true,
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

// Use history mode
const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;

import Vue from 'vue';
import App from './App.vue';
import router from './router';

Vue.config.productionTip = false;
console.log('loading vue');
new Vue({
  router,
  render: (h) => h(App),
}).$mount('#app');

import Vue from 'vue';
import App from './App.vue';
import router from './router';

let data = {
  currentID: 3,
  tickets: [
    {
      id: 1,
      problem: 'This app is not completely written yet.',
      name: 'Emma',
    },
    {
      id: 2,
      problem: 'another ticket.',
      name: 'Brigham',
    },
  ],
  getTickets() {
    return this.tickets;
  },
  addTicket(name, problem) {
    this.tickets.push({
      id: this.currentID,
      name: name,
      problem: problem,
    });
    this.currentID += 1;
  },
};

Vue.config.productionTip = false;

new Vue({
  router,
  data: data,
  render: (h) => h(App),
}).$mount('#app');

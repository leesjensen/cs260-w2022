<template>
  <div class="main">
    <h2>
      Logged in as: {{ user.firstName }} {{ user.lastName }}
      <button @click="logout" class="pure-button pure-button-primary">
        Logout
      </button>
    </h2>
    <h1>Administration</h1>
    <div v-for="ticket in tickets" v-bind:key="ticket.id">
      <Ticket :ticket="ticket" />
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import Ticket from '@/components/Ticket.vue';
export default {
  name: 'Admin',
  components: {
    Ticket,
  },
  data() {
    return {
      tickets: [],
    };
  },
  computed: {
    user() {
      return this.$root.$data.user;
    },
  },
  created() {
    this.getTickets();
  },
  methods: {
    async logout() {
      try {
        await axios.delete('api/users');
        this.$root.$data.user = null;
      } catch (error) {
        this.$root.$data.user = null;
      }
    },
    async getTickets() {
      try {
        let response = await axios.get('api/tickets');
        this.tickets = response.data.tickets;
        return true;
      } catch (error) {
        return false;
      }
    },
  },
};
</script>

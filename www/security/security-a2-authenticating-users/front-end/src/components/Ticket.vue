<template>
  <div class="ticket">
    <div class="problem">
      <h3>
        <label>{{ ticket.status }}</label> Problem reported
        {{ time(ticket.created) }}
      </h3>
      <p>{{ ticket.problem }}</p>
      <p v-if="ticket.response">
        <i>{{ ticket.response }}</i>
      </p>
      <p v-else>
        <input v-model="response" placeholder="response" />
        <button @click="respond" class="pure-button pure-button-primary">
          Close Ticket
        </button>
      </p>
      <p class="error" v-if="error">{{ error }}</p>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import moment from 'moment';
export default {
  name: 'Ticket',
  props: {
    ticket: Object,
  },
  data() {
    return {
      response: '',
      error: '',
    };
  },
  methods: {
    time(d) {
      return moment(d).format('D MMMM YYYY, h:mm:ss a');
    },
    async respond() {
      try {
        let response = await axios.put('/api/tickets/' + this.ticket._id, {
          status: 'closed',
          response: this.response,
        });
        this.ticket = response.data.ticket;
      } catch (error) {
        this.error = error.response.message;
      }
    },
  },
};
</script>

<style scoped>
h3 {
  font-size: 12px;
  font-weight: normal;
  background-color: #ccc;
  padding: 10px 20px;
}

label {
  background-color: #000;
  color: white;
  padding: 5px;
  border-radius: 30px;
  font-size: 12px;
  margin-right: 10px;
}

input {
  margin-right: 10px;
}
</style>

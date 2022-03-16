<template>
<div>
  <h1>Current Tickets</h1>
  <div v-for="ticket in tickets" v-bind:key="ticket.id">
    <hr>
    <div class="ticket">
      <div class="problem">
        <p>{{ticket.problem}}</p>
        <p><i>-- {{ticket.name}}</i></p>
      </div>
      <button @click="deleteTicket(ticket)">Delete</button>
    </div>
  </div>
</div>
</template>

<script>
import axios from 'axios';
export default {
  name: 'home',
  data() {
    return {
      tickets: [],
    }
  },
  created() {
    this.getTickets();
  },
  methods: {
    async getTickets() {
      try {
        let response = await axios.get("/api/tickets");
        this.tickets = response.data.tickets;
        return true;
      } catch (error) {
        console.log(error);
      }
    },
    async deleteTicket(ticket) {
      try {
        await axios.delete("/api/tickets/" + ticket.id);
        this.getTickets();
        return true;
      } catch (error) {
        console.log(error);
      }
    }
  }
}
</script>

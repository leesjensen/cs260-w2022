<template>
<div>
  <h1>Create a Ticket</h1>
  <form v-if="creating" @submit.prevent="addTicket">
    <input v-model="name" placeholder="Name">
    <p></p>
    <textarea v-model="problem"></textarea>
    <br />
    <button type="submit">Submit</button>
  </form>
  <div v-else>
    <p>Thank you for submitting a ticket! We will respond shortly.</p>
    <p><a @click="toggleForm" href="#">Submit another ticket</a></p>
  </div>
</div>
</template>

<script>
import axios from 'axios';
export default {
  name: 'create',
  data() {
    return {
      creating: true,
      name: '',
      problem: '',
    }
  },
  methods: {
    toggleForm() {
      this.creating = !this.creating;
    },
    async addTicket() {
      try {
        await axios.post("/api/tickets", {
          name: this.name,
          problem: this.problem
        });
        this.name = "";
        this.problem = "";
        this.creating = false;
        return true;
      } catch (error) {
        console.log(error);
      }

    },
  }
}
</script>

<style scoped>
input {
  font-size: 1.2em;
  height: 30px;
  width: 200px;
}

textarea {
  font-size: 1.6em;
  width: 100%;
  max-width: 500px;
  height: 100px;
}

button {
  margin-top: 20px;
  font-size: 1.2em;
}
</style>

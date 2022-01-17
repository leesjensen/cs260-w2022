<template>
  <div class="create component">
    <div>create view</div>

    <h1>Create a Ticket</h1>
    <form v-if="creating" @submit.prevent="addTicket">
      <input v-model="name" placeholder="Name" />
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
export default {
  name: 'create',
  data() {
    return {
      creating: true,
      name: '',
      problem: '',
    };
  },
  methods: {
    toggleForm() {
      this.creating = !this.creating;
    },
    addTicket() {
      this.$root.$data.addTicket(this.name, this.problem);
      this.name = '';
      this.problem = '';
      this.creating = false;
    },
  },
};
</script>

<template>
  <div class="home component">
    <div>Home view</div>

    <div>
      <h1>Current Tickets</h1>
      <div v-for="ticket in tickets" v-bind:key="ticket.id">
        <hr />
        <div class="ticket">
          <div class="problem">
            <p>{{ ticket.problem }}</p>
            <p>
              <i>-- {{ ticket.name }}</i>
            </p>
          </div>
        </div>
      </div>
    </div>

    <img alt="Vue logo" src="../assets/logo.png" />
    <HelloWorld msg="Param from parent of helloworld" />
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue';

export default {
  name: 'Home',
  components: {
    HelloWorld,
  },
  data() {
    return {};
  },
  computed: {
    tickets() {
      return this.$root.$data.getTickets();
    },
  },
};
</script>

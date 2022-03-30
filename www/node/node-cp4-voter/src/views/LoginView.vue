<template>
  <div class="login">
    <form @submit.prevent="login">
      <fieldset>
        <legend>Email</legend>
        <input v-model="userEmail" />
      </fieldset>
      <button type="submit">Login</button>
    </form>
  </div>
</template>

<script>
export default {
  name: 'LoginView',
  data: function () {
    return {
      userEmail: '',
    };
  },
  methods: {
    login() {
      window.location = '/voter';
    },
  },
};
</script>

<style scoped></style>

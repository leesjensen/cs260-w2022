<template>
  <div class="login">
    <form @submit.prevent="login">
      <fieldset>
        <legend>Email</legend>
        <input v-model="userEmail" />
        <div v-show="loginError">{{ loginError }}</div>
      </fieldset>
      <button type="submit" :disabled="!userEmail">Login</button>
    </form>
  </div>
</template>

<script>
import router from '@/router.js';
import userService from '@/model/user.js';
export default {
  name: 'LoginView',
  created: function () {
    this.userEmail = userService.user.email;
  },
  data: function () {
    return {
      userEmail: '',
      loginError: '',
    };
  },
  methods: {
    login() {
      try {
        userService.login(this.userEmail);
        router.push('/voter');
      } catch (error) {
        this.loginError = error;
      }
    },
  },
};
</script>

<style scoped></style>

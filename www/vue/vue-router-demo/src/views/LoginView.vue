<template>
  <div>
    <div class="login">
      <h2>Login</h2>
      <div>
        <label>
          User ID:
          <input type="edit" v-model="userId" :placeholder="userId" />
        </label>
        <button class="submit-btn" @click="submit" :disabled="!userId">
          Enter
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import Auth from "@/Authorization.js";
import Router from "@/router/index.js";

export default {
  name: "LoginView",
  data: function () {
    return { userId: "" };
  },
  methods: {
    submit() {
      console.log(this.userId);
      Auth.user = this.userId;
      Router.push(`/user/${Auth.user}/posts`);
    },
  },
};
</script>

<style scoped>
h2 {
  font-size: 2em;
  margin: 0;
}
.login {
  border: solid black thin;
  padding: 2em 1em;
}
.submit-btn {
  margin: 0 0.5em;
}
</style>
<template>
  <div>
    <div class="login">
      <h2>Login</h2>
      <div>
        <label>
          User ID:
          <input type="edit" v-model="enteredId" :placeholder="userId" />
        </label>
        <button class="submit-btn" @click="submit" :disabled="!enteredId">
          Enter
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "LoginView",
  props: ["userId"],
  data: function () {
    return { enteredId: "" };
  },
  methods: {
    submit() {
      console.log(this.enteredId);
      this.$root.$children[0].userId = this.enteredId;
      this.$root.$router.push(`/user/${this.enteredId}/posts`);
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
<template>
  <user-grid :userData="userData" :onClose="deleteUser" />
</template>

<script>
import userGrid from "./components/UserGrid";

export default {
  name: "App",
  components: {
    userGrid,
  },
  data: function () {
    return {
      count: 30,
      userData: [],
    };
  },
  created: function () {
    const randomUserURL = `https://randomuser.me/api/?results=${this.count}`;
    fetch(randomUserURL)
      .then((r) => r.json())
      .then((j) => {
        this.userData = j.results;
      });
  },
  methods: {
    deleteUser: function (user) {
      console.log(user.id);
      this.userData = this.userData.filter((n) => n.email !== user.email);
    },
  },
};
</script>

<style>
body {
  color: whitesmoke;
  background: #798584;
  box-sizing: border-box;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
}
</style>

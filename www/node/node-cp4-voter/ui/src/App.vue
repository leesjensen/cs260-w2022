<template>
  <div>
    <!-- <router-link class="nav-link" to="/">Login</router-link> |
    <router-link class="nav-link" to="/voter">Voter</router-link> |
    <router-link class="nav-link" to="/admin">Admin</router-link> -->
    <router-view />
    <div>Connected: {{ connected }}</div>
  </div>
</template>

<script>
import api from "@/api.js";
export default {
  data: function () {
    return {
      connected: false,
    };
  },
  created() {
    console.log("App created");
    api.onconnected((connected) => (this.connected = connected));
  },
};
</script>



<style>
* {
  font-family: Arial, Helvetica, sans-serif;
}

html {
  background: #313131;
  color: whitesmoke;
}

a {
  color: whitesmoke;
}
</style>

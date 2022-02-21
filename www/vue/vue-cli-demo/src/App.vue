<template>
  <div id="app">
    <CenteredDiv class="fill-screen" @click="clicked">I am simple.</CenteredDiv>
  </div>
</template>

<script>
import CenteredDiv from './components/CenteredDiv.vue';

export default {
  name: 'App',
  components: {
    CenteredDiv,
  },
  methods: {
    clicked() {
      console.log('clicked');
    },
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
}

.fill-screen {
  font-size: 3em;
  height: 100vh;
  color: whitesmoke;
  background: rgb(54, 87, 105);
}
</style>

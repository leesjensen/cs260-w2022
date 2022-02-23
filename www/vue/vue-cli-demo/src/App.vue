<template>
  <div id="app">
    <centered-div :class="['fill-view', {'highlight':clicked}]" @click="toggleClicked">I am simple.</centered-div>
  </div>
</template>

<script>
import CenteredDiv from './components/CenteredDiv';

export default {
  name: 'App',
  components: {
    CenteredDiv,
  },
  data: function() {
    return {
      clicked: false,
    }
  },
  methods: {
    toggleClicked() {
      this.clicked = !this.clicked;
    },
  },
};
</script>

<style>
body {
  padding: 0;
  margin: 0;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
}

.fill-view {
  font-size: 3em;
  height: 100vh;
  color: whitesmoke;
  background: rgb(54, 87, 105);
}

.highlight {
  color: orange;
}
</style>

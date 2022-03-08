<template>
  <div id="app">
    <div @click="replace('No way!')">{{ msg }}</div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";

@Component({
  components: {},
})
export default class App extends Vue {
  msg: string = "Typescript in Vue?";
  replace(msg: string) {
    this.msg = msg;
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
  font-size: 6em;
}
</style>

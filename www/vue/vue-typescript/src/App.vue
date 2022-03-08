<template>
  <div id="app">
    <div @click="replace('No way!')">{{ msg }}</div>
    <pre>
&lt;script lang="ts"&gt;
  import { Component, Vue } from "vue-property-decorator";

  @Component({
    components: {},
  })
  export default class App extends Vue {
    msg: string = "Typescript in Vue?";
    replace(msg: string) {
      this.msg = msg;
    }
  }
&lt;/script&gt;</pre
    >
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

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
#app div {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
  font-size: 6em;
}
pre {
  font-size: 1em;
  background: rgb(45, 45, 45);
  color: whitesmoke;
  padding: 1em;
  margin: 1em;
  font-family: "Courier New", Courier, monospace;
}
</style>

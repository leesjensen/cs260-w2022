<template>
  <div class="hello">
    <h1>HelloWorld Component</h1>
    <p>MSG Param: {{ msg }}</p>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  props: {
    msg: String,
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
.hello {
  background-color: #3fb883;
  margin: 1em;
  padding: 1em;
  border-radius: 10px;
}
</style>

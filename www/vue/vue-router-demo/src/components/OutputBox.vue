<template>
  <div :style="{ background: color }">
    <slot>
      <h1>{{ msg }}</h1>
    </slot>
  </div>
</template>

<script>
export default {
  name: "HelloWorld",
  props: {
    color: { type: String, default: "#525d75" },
    msg: String,
  },
};
</script>

<style scoped>
h1 {
  padding: 1em 0;
  font-size: 3em;
  text-align: center;
  margin: 0;
}
div {
  color: whitesmoke;
}
</style>

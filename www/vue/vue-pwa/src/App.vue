<template>
  <div id="app">
    <BouncyBall />
  </div>
</template>

<script>
import BouncyBall from './components/BouncyBall.vue';

export default {
  name: 'App',
  components: {
    BouncyBall,
  },
};
</script>

<style>
body {
  margin-top: 0;
  background: #a3d9ff;
}
</style>

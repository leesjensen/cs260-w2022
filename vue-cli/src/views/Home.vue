<template>
  <div class="home component">
    <div>Home view</div>
    <img alt="Vue logo" src="../assets/logo.png" />
    <HelloWorld msg="Param from parent of helloworld" />
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue';

export default {
  name: 'Home',
  components: {
    HelloWorld,
  },
};
</script>

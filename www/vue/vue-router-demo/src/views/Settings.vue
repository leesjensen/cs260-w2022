<template>
  <div class="home">
    <HelloWorld msg="Settings" />
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue';

export default {
  name: 'Settings',
  components: {
    HelloWorld,
  },
};
</script>

<template>
  <div class="home">
    <OutputBox msg="Our house" />
  </div>
</template>

<script>
// @ is an alias to /src
import OutputBox from "@/components/OutputBox.vue";

export default {
  name: "HomeView",
  components: {
    OutputBox,
  },
};
</script>

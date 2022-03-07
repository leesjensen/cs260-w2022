<template>
  <div class="home">
    <OutputBox msg="Our house" />
  </div>
</template>

<script>
import OutputBox from "@/components/OutputBox.vue";

export default {
  name: "HomeView",
  components: {
    OutputBox,
  },
};
</script>

<template>
  <div class="info">
    <OutputBox color="#096b09" :msg="`${$route.params.category} info`" />
  </div>
</template>

<script>
import OutputBox from "@/components/OutputBox.vue";

export default {
  name: "InfoView",
  components: {
    OutputBox,
  },
};
</script>
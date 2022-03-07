<template>
  <div class="info">
    <OutputBox color="#096b09" :msg="`${$route.params.category} info`" />
  </div>
</template>

<script>
// @ is an alias to /src
import OutputBox from "@/components/OutputBox.vue";

export default {
  name: "InfoView",
  components: {
    OutputBox,
  },
};
</script>
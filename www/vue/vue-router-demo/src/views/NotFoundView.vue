<template>
  <div class="not-found">
    <OutputBox color="#910b0b" :msg="`404: ${$route.fullPath}`" />
  </div>
</template>

<script>
// @ is an alias to /src
import OutputBox from "@/components/OutputBox.vue";

export default {
  name: "NotFoundView",
  components: {
    OutputBox,
  },
};
</script>
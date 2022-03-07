<template>
  <div>
    <OutputBox color="#188b77" :msg="`${$route.params.userId} profile`" />
  </div>
</template>

<script>
import OutputBox from "@/components/OutputBox.vue";

export default {
  name: "UserProfileView",
  props: ["userId"],
  components: {
    OutputBox,
  },
};
</script>
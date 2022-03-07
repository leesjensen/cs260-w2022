<template>
  <div>
    <OutputBox color="#188b77" :msg="`User ${$route.params.userId} profile`" />
  </div>
</template>

<script>
// @ is an alias to /src
import OutputBox from "@/components/OutputBox.vue";

export default {
  name: "UserProfileView",
  props: ["userId"],
  components: {
    OutputBox,
  },
};
</script>
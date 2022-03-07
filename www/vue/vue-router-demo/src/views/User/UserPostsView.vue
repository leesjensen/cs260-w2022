<template>
  <div>
    <OutputBox color="#8b1877" :msg="`${userId} posts`" />
  </div>
</template>

<script>
import OutputBox from "@/components/OutputBox.vue";

export default {
  name: "UserPostsView",
  props: ["userId"],
  components: {
    OutputBox,
  },
};
</script>
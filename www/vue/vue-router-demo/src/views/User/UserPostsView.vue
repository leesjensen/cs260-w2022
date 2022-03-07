<template>
  <div>
    <OutputBox color="#8b1877" :msg="`User ${userId} posts`" />
  </div>
</template>

<script>
// @ is an alias to /src
import OutputBox from "@/components/OutputBox.vue";

export default {
  name: "UserPostsView",
  props: ["userId"],
  components: {
    OutputBox,
  },
};
</script>
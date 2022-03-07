<template>
  <div>
    <OutputBox color="#0f5694" :msg="`User ${$route.params.userId}`" />
    <!-- Sub navigation -->
    <nav>
      <router-link :to="{ name: 'posts' }">Posts</router-link> |
      <router-link :to="{ name: 'profile' }">Profile</router-link>
    </nav>

    <!-- Transition -->
    <transition name="slide">
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>
// @ is an alias to /src
import OutputBox from "@/components/OutputBox.vue";

export default {
  name: "UserView",
  props: ["userId"],

  //  Navigation guard to ensure login
  beforeRouteEnter: (to, from, next) => {
    if (to.params.userId !== "logged out") {
      next();
    } else {
      next({ name: "login", params: { userId: to.params.userId } });
    }
  },

  components: {
    OutputBox,
  },
};
</script>

<style scoped>
/* .fade-enter-active,
.fade-leave-active {
  transition: opacity 0.75s ease;
}
.fade-enter,
.fade-leave-active {
  opacity: 0;
} */

.slide-enter-active {
  transition: all 0.3s ease;
}
.slide-leave-active {
  transition: all 0.8s cubic-bezier(1, 0.5, 0.8, 1);
}
.slide-enter, .slide-leave-to
/* .slide-leave-active below version 2.1.8 */ {
  transform: translateX(10px);
  opacity: 0;
}
</style>
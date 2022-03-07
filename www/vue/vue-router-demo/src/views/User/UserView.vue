<template>
  <div>
    <OutputBox color="#0f5694" :msg="`User ${$route.params.userId}`" />
    <!-- Sub navigation -->
    <nav>
      <router-link :to="{ name: 'posts' }">Posts</router-link> |
      <router-link :to="{ name: 'profile' }">Profile</router-link>
    </nav>

    <!-- Transition -->
    <transition name="fade">
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>
import OutputBox from "@/components/OutputBox.vue";
import Auth from "@/Authorization.js";

export default {
  name: "UserView",
  props: ["userId"],

  //  Navigation guard to ensure login
  beforeRouteEnter: (to, from, next) => {
    if (Auth.authorized) {
      next();
    } else {
      next("/login");
    }
  },

  components: {
    OutputBox,
  },
};
</script>

<style scoped>
.fade-enter {
  opacity: 0.25;
}

.fade-enter-to {
  transition: opacity 0.75s ease;
  opacity: 1;
}

.fade-leave {
  display: none;
}
</style>
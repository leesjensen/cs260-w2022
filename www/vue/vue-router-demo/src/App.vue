<template>
  <div id="app">
    <div>User: {{ userId }}</div>
    <nav>
      <!-- Create internal router links -->
      <router-link to="/">Home</router-link> |

      <!-- Parameters -->
      <router-link to="/info/company">Company</router-link> |
      <router-link to="/info/product">Product</router-link> |

      <!-- Named route with parameter -->
      <router-link :to="{ name: 'posts', params: { userId: userId } }">
        User
      </router-link>
      |

      <!-- Wildcard handles bad link -->
      <router-link to="/bad/path">404</router-link>
    </nav>

    <!-- Inject the router output here -->
    <transition name="bonkers">
      <router-view />
    </transition>
    <pre>{{ routeInfo }}</pre>
  </div>
</template>

<script>
export default {
  name: "App",
  data: function () {
    return { userId: "logged out" };
  },
  computed: {
    routeInfo() {
      // Display the route information.
      const info = (({ name, fullPath, params }) => ({
        name,
        fullPath,
        params,
      }))(this.$route);
      return JSON.stringify(info, undefined, 2);
    },
  },
};
</script>

<style>
.bonkers-enter-active {
  transition: all 0.3s ease;
}
.bonkers-leave-active {
  transition: all 0.8s cubic-bezier(1, 0.5, 0.8, 1);
}
.bonkers-enter, .bonkers-leave-to
/* .bonkers-leave-active below version 2.1.8 */ {
  transform: translateX(10px);
  opacity: 0;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  color: #2c3e50;
}

nav {
  text-align: center;
  padding: 1em;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
  text-decoration: none;
}

nav a.router-link-exact-active {
  color: #d79e13;
}

pre {
  font-family: "Courier New", Courier, monospace;
  text-align: left;
  background: black;
  color: white;
  padding: 1em;
}
</style>

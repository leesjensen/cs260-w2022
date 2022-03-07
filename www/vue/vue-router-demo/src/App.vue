<template>
  <div id="app">
    <div>User: {{ auth.user }}</div>
    <nav>
      <!-- Create internal router links -->
      <router-link to="/">Home</router-link> |

      <!-- Parameters -->
      <router-link to="/info/company">Company</router-link> |
      <router-link to="/info/product">Product</router-link> |

      <!-- Named route with parameter -->
      <router-link :to="{ name: 'posts', params: { userId: auth.user } }">
        User
      </router-link>
      |

      <!-- Wildcard handles bad link -->
      <router-link to="/bad/path">404</router-link>
    </nav>

    <!-- Inject the router output here -->
    <router-view />
    <pre>{{ routeInfo }}</pre>
  </div>
</template>

<script>
// @ is an alias to /src
import Auth from "@/Authorization.js";

export default {
  name: "App",
  data: function () {
    return {
      auth: Auth,
    };
  },
  computed: {
    // Simplify the route information
    routeInfo() {
      const r = this.$route;
      const info = {
        name: r.name,
        fullPath: r.fullPath,
        params: r.params,
        matched: r.matched.map((n) => {
          return {
            path: n.path,
            component: n.components.default.name,
          };
        }),
      };
      return JSON.stringify(info, undefined, 2);
    },
  },
};
</script>

<style>
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

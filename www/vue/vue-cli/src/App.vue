<template>
  <div id="app">
    <div>App content</div>
    <h1>Ticket System</h1>
    <div id="nav">
      <div>Router nav</div>
      <router-link to="/">Home</router-link> | <router-link to="/create">Create</router-link> |
      <router-link to="/about">About</router-link>
    </div>
    <router-view />
  </div>
</template>

<style>
#app {
  font-family: Roboto, Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  background-color: #dccca9;
  border-radius: 10px;
  padding: 1em;
}

#nav {
  padding: 3em;
  background-color: wheat;
  border-radius: 10px;
  margin: 1em;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>

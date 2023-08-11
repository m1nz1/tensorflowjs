<template>
  <nav>
    <router-link to="/">Page1</router-link> |
    <router-link to="/page2">Page2</router-link> |
    <router-link to="/page3">Page3</router-link> |
  </nav>
  <router-view />
</template>

<script>
// // import Page1 from './components/page1.vue'
// export default {
//   components: { page1 }
// }
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}
</style>

<template>
  <div id="app">
    <Session/>
  </div>
</template>

<script>
import Session from './components/Session.vue'

export default {
  name: 'app',
  components: {
    Session
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>

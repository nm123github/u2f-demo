<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png">
    <U2FComponent />
  </div>
</template>

<script>
import U2FComponent from './components/U2FComponent.vue'

export default {
  name: 'App',
  components: {
    U2FComponent
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>

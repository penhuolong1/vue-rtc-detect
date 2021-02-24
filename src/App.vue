<template>
  <div id="app">
    <HelloWorld ref="HelloWorld" :audioSrc="audioSrc" msg="Welcome to Your Vue.js App"/>
  </div>
</template>

<script>
import HelloWorld from './components/index'

export default {
  name: 'App',
  components: {
    HelloWorld
  },
  data() {
    return {
      audioSrc: ''
    }
  },
  created() {
  },
  mounted() {
    this.$refs.HelloWorld.init()
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

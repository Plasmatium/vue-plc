<template>
  <div id="app">
    <img src="./assets/logo.png">
    <hello></hello>
    <PLC :input="inputArr" :output="outputObj">0</PLC>
  </div>
</template>

<script>
import Hello from './components/Hello'
import PLC from './components/PLC'

export default {
  name: 'app',
  components: {
    Hello,
    PLC
  },
  data () {
    return {
      inputArr: [false, false],
      outputObj: {q: undefined}
    }
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
  margin-top: 60px;
}
</style>

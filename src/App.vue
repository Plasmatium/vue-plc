<template>
  <div id="app">
    <img src="./assets/logo.png">
    <hello></hello>
    <hr>
    <pre style="text-align: left;">
    </pre>
    <hr>
    <plc :data="data" />
  </div>
</template>

<script>
import Hello from './components/Hello'
import plc from './components/runPLC'
import {dataInit} from './components/defPLC'

export default {
  name: 'app',
  components: {
    Hello,
    plc
  },
  data () {
    return {
      data: dataInit({
        h0: {type: 'HOLDER'},
        rollup () {
        }
      })
    }
  },
  computed: {
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

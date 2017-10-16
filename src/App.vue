<template>
  <div id="app">
    <img src="./assets/logo.png">
    <hello></hello>
    <hr>
    <pre style="text-align: left;">
    </pre>
    <hr>
    <plc :data="data2" />
  </div>
</template>

<script>
import Hello from './components/Hello'
import plc from './components/runPLC'
import {BLOCK} from './components/defPLC'

export default {
  name: 'app',
  components: {
    Hello,
    plc
  },
  data () {
    return {
      data: new BLOCK({
        params: {
          h0: {type: 'HOLDER'}
        },
        interface: {
          i0: {path: 'h0.EN', val: false},
          i1: {path: 'h0.RST', val: false}
        }
      }),
      data2: new BLOCK({
        params: {
          q0: {type: 'RELAY'}
        },
        interface: {
          i0: {}
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

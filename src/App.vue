<template>
  <div id="app">
    <img src="./assets/logo.png">
    <hello></hello>
    {{logicParam.output}}
  </div>
</template>

<script>
import Hello from './components/Hello'
import {makeLogicBlock} from './components/PLC.js'

export default {
  name: 'app',
  components: {
    Hello
  },
  data () {
    return {
      logicParam: {
        input: {i0: false, i1: false},
        output: undefined,
        blocks: [
          {name: 'q0', type: 'RELAY'}
        ],
        transfunc ({i0, q0, i1}) {
          debugger
          return {i0, q0, i1}
        }
      }
    }
  },
  created () {
    makeLogicBlock(this.$createElement, this.logicParam)
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

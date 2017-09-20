<template>
  <div id="app">
    <img src="./assets/logo.png">
    <hello></hello>
    {{blockFun}}
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
        output: {q0: undefined},
        blocks: [
          {name: 'i0', type: 'INPUT', data: {}},
          {name: 'i1', type: 'INPUT', data: {}},
          {name: 'q0', type: 'RELAY', data: {state: 0}}
        ],
        transfunc ({i0, q0, i1}) {
          console.log(i0, q0, i1)
        }
      }
    }
  },
  created () {
    this.trigger = makeLogicBlock(this.$createElement, this.logicParam)
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

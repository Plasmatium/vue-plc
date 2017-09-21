<template>
  <div id="app">
    <img src="./assets/logo.png">
    <hello></hello>
    <!-- {{logicParam.output}} -->
    <hr>
    <plc :logicParam="logicParam"></plc>
    <!-- <p>in1: {{in1}}</p>
    <p>output: {{output}}</p> -->
  </div>
</template>

<script>
import Hello from './components/Hello'
import plc from './components/PLC.vue'

export default {
  name: 'app',
  components: {
    Hello,
    plc
  },
  data () {
    return {
      logicParam: {
        INPUT: {
          i0: false,
          i1: false
        },
        functionBlocks: {
          RELAY: {
            q0: {state: false}
          }
        },
        transfunc ({i0, q0, i1}) {
          return {i0, q0, i1}
        },
        OUTPUT: undefined
      }
    }
  },
  created () {
    // makeLogicBlock(this.$createElement, this.logicParam)
  },
  computed: {
  //   in1: {
  //     get () {
  //       return this.logicParam.input.i0
  //     },
  //     set (newVal) {
  //       this.logicParam.input.i0 = newVal
  //     }
  //   },
  //   output () {
  //     let rslt = this.logicParam.output
  //     console.log(rslt)
  //     return rslt
  //   }
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

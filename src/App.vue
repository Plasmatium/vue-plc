<template>
  <div id="app">
    <img src="./assets/logo.png">
    <hello></hello>
    <!-- {{logicParam.output}} -->
    <hr>
    <plc :logicParam="logicParam"></plc>
    <p>in1: {{in1}}</p>
    <p>output: {{output}}</p>
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
          // q0.lineIn(!(i0 * 1) * q0 + i1)
          q0.lineIn(!(i0 * 1) * q0 + i1)
          return {i0, q0, i1}
        }
        // OUTPUT: undefined
        // VERY IMPORTANT: 此处OUTPUT必须不能有
        // 这样的OUTPUT是非响应式的，能够避免responsive死循环
        // 此机制有待更深入挖掘理解
        // 但是问题并没有解决，随着OUTPUT不再responsive，OUTPUT也将
        // 变成静态的，无法实时获取正确的值（但是通过console.log可以看到
        // 内部的值确实按照起停保的功能来运行。
        // 可以看到，一旦以任何方式将OUTPUT变成responsive，那么就会死循环，
        // 比如用Vue.set使其responsive。
      }
    }
  },
  created () {
    // makeLogicBlock(this.$createElement, this.logicParam)
  },
  computed: {
    in1: {
      get () {
        return this.logicParam.INPUT.i1
      },
      set (newVal) {
        this.logicParam.INPUT.i1 = newVal
      }
    },
    in0: {
      get () {
        return this.logicParam.INPUT.i0
      },
      set (newVal) {
        this.logicParam.INPUT.i0 = newVal
      }
    },
    output () {
      let rslt = this.logicParam.OUTPUT
      console.log(rslt)
      return rslt
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

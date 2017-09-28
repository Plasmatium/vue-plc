<template>
  <div id="app">
    <img src="./assets/logo.png">
    <hello></hello>
    <input type="checkbox" v-model="logicParam.input.i0">i0</input>
    <input type="checkbox" v-model="logicParam.input.i1">i1</input>
    <hr>
    <pre style="text-align: left;">
      {{JSON.stringify(logicParam.blocks.t1, null, '    ')}}
    </pre>
    <hr>
    <PLC :logicParam="logicParam"></PLC>
    <p>{{logicParam.blocks.q0}}</p>
  </div>
</template>

<script>
import Hello from './components/Hello'
import PLC from './components/PLC.vue'

export default {
  name: 'app',
  components: {
    Hello,
    PLC
  },
  data () {
    return {
      logicParam: PLC.initLogicParam({
        input: {
          i0: false,
          i1: false
        },
        blocksParam: [
          {name: 'q0', type: 'Relay'},
          {name: 't0', type: 'Timer', timeout: 1000},
          {name: 't1', type: 'AdvTimer', pulseSeries: [1500], loop: true}
        ],
        transfunc ({i0, q0, i1, t0, t1}) {
          let m0 = (i0 ^ 1) * (t0 ^ 1) * q0 + t1
          q0.lineIn(m0)
          t0.lineIn(m0)
          t1.lineIn(i1)
        }
      })
    }
  },
  computed: {
    in1: {
      get () {
        return this.logicParam.input.i1
      },
      set (newVal) {
        this.logicParam.input.i1 = newVal
      }
    },
    in0: {
      get () {
        return this.logicParam.input.i0
      },
      set (newVal) {
        this.logicParam.input.i0 = newVal
      }
    },
    output () {
      // output 不知为何引起reactive dead loop
      let {q0, t0} = this.logicParam.blocks
      let {i0, i1} = this.logicParam.input
      console.log({i0, i1, q0, t0})
      return {i0, i1, q0, t0}
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

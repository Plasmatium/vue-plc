<template>
  <div id="app">
    <img src="./assets/logo.png">
    <hello></hello>
    <hr>
    <input type="checkbox" v-model="data2.i0">i0</input>
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
          i0: {val: true}
        },
        rollup ({i0, q0, Q}) {
          global.count = global.count || 1
          if (global.count === 1) { console.time('logic time') }
          if (global.count === 1000) {
            console.timeEnd('logic time')
            global.count = 1
            return
          }
          q0.lineIn(q0 ^ 1)
          Q.lineIn(q0 + 0)
          global.count += 1
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

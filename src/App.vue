<template>
  <div id="app">
    <img src="./assets/logo.png">
    <hello></hello>
    <PLC :in="inputArr" :out="outputObj" :transfer="transfer">0</PLC>
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
      inputArr: [1, 1, 1],
      outputObj: {},
      transfer: {
        i0: {type: 'DI'},
        i1: {type: 'DI'},
        q0: {type: 'RELAY'},
        t0: {type: 'TIMER', timeout: 3000},
        transfunc ({i0, i1, q0, t0}) {
          console.log('1')
        }
      }
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

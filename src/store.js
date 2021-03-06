import vue from 'vue'
import Vuex from 'vuex'

vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    count: 0,
    timer: 1000
  },
  mutations: {
    increment (state) {
      state.count++
    }
  }
})

export default store

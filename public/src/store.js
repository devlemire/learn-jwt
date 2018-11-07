import Vuex from 'vuex'
import Vue from 'vue'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: undefined
  },
  getters: {
    user(state) {
      return state.user
    }
  },
  mutations: {
    setUser(state, payload) {
      console.log('Setting the user to:', payload)
      state.user = payload
    }
  }
})

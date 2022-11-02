import Vue from 'vue'
import Vuex from 'vuex'
import state from './stateFc'

Vue.use(Vuex)

export default new Vuex.Store({
  state,
  getters: {
  },
  mutations: {
    goBack(){
      this.$router.go(-1)
    }
  },
  actions: {
  },
  modules: {
  }
})

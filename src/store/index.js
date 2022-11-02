import Vue from 'vue'
import Vuex from 'vuex'
import { chooseType} from "@/dataModel/type.js";

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    listType:chooseType
  },
  getters: {
  },
  mutations: {
    setListId(state,a){
      state.listType.pid=a
    },
    setListKeyword(state,a){
      state.listType.keyword=a
    },
    setListType(state){
      state.listType=chooseType
    }
  },
  actions: {
  },
  modules: {
  }
})

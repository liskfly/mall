import Vue from 'vue'
import Vuex from 'vuex'

import { chooseType} from "@/dataModel/type.js";


Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    listType:chooseType,
    storeArr:JSON.parse(localStorage.getItem("CONXERN_STORE")) || []
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
    },
    addStore(state,a){
     let isStore= state.storeArr.findIndex(t=>t.mer_id==a.mer_id)
     if(isStore==-1){
      state.storeArr.unshift(a)
      let store = JSON.stringify(state.storeArr);
      localStorage.setItem("CONXERN_STORE", store);
     }else{
      let store = JSON.stringify(state.storeArr.filter(t=>t.mer_id!=a.mer_id));
      localStorage.setItem("CONXERN_STORE", store);
     }
     console.log(isStore);
    }
  },
  actions: {
  },
  modules: {
  }
})

import Vue from 'vue'
import Vuex from 'vuex'
import { chooseType } from "@/dataModel/type.js";

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    storeArr: JSON.parse(localStorage.getItem("CONXERN_STORE")) || [],
    listType: chooseType,
    goodscar: JSON.parse(window.localStorage.getItem('goodscar')) || [],
    same: false,
    collectionlist: JSON.parse(window.localStorage.getItem('collection')) || [],
    ischoice: false,
    paymentlist: JSON.parse(window.localStorage.getItem('payment')) || [],

  },
  getters: {
  },
  mutations: {
    setListId(state, a) {
      state.listType.pid = a
    },
    setListKeyword(state, a) {
      state.listType.keyword = a
    },
    setListType(state) {
      state.listType = chooseType
    },
    addStore(state, a) {
      let isStore = state.storeArr.findIndex(t => t.mer_id == a.mer_id)
      if (isStore == -1) {
        state.storeArr.unshift(a)
        let store = JSON.stringify(state.storeArr);
        localStorage.setItem("CONXERN_STORE", store);
      } else {
        let store = JSON.stringify(state.storeArr.filter(t => t.mer_id != a.mer_id));
        localStorage.setItem("CONXERN_STORE", store);
      }
      console.log(isStore);
    },
    addgoods(state, data) {
      state.goodscar.forEach((item) => {
        if (data.id == item.id) {
          item.value = data.value + item.value
        } else {
          state.same = true
        }
      })
      if (state.same || state.goodscar.length == 0) {
        state.goodscar.push(data)
      }
      window.localStorage.setItem('goodscar', JSON.stringify(state.goodscar))
      state.same = false
    },
    collectionAdd(state, data) {
      state.collectionlist = state.collectionlist.filter(({ mer_id }) => {
        if (data.mer_id == mer_id) {
          state.same = true
          return false
        } else {
          return true
        }
      })
      console.log(state.collectionlist);
      if (state.same == false) {
        state.collectionlist.push(data)
      }
      window.localStorage.setItem('collection', JSON.stringify(state.collectionlist))
      state.same = false
    },
    isCollection(state, data) {
      let num = 0
      state.collectionlist.forEach(({ product_id }) => {
        if (product_id == data.product_id) {
          num++
        }
        state.ischoice = num > 0 ? true : false
      })
    },
    paymentAdd(state, data) {
      state.paymentlist.push(data)
      window.localStorage.setItem('payment', JSON.stringify(state.paymentlist))
    }
  },
  actions: {
  },
  modules: {
  }
})

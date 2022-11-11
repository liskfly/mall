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
    isConxern: false,
    footPrint: JSON.parse(localStorage.getItem('FOOT_PRINT')) || []
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
    resetListType(state) {
      state.listType = {
        pid: '',
        order: '',
        price_on: '',
        price_off: '',
        brand_id: '',
        keyword: '',
        trader: '',
      }
    },
    addStore(state, a) {
      let isStore = state.storeArr.findIndex(t => t.mer_id == a.mer_id)
      if (isStore == -1) {
        state.storeArr.unshift(a)
        let store = JSON.stringify(state.storeArr);
        localStorage.setItem("CONXERN_STORE", store);
        state.isConxern = true
      } else {
        state.storeArr = state.storeArr.filter(t => t.mer_id != a.mer_id)
        let store = JSON.stringify(state.storeArr);
        localStorage.setItem("CONXERN_STORE", store);
        state.isConxern = false
      }
    },
    isSubscribe(state, a) {
      let isStore = state.storeArr.findIndex(t => t.mer_id == a.mer_id)
      if (isStore == -1) {
        state.isConxern = false
      } else {
        state.isConxern = true
      }
    },
    HistoricalFootprint(state, footData) {
      let a = state.footPrint.findIndex(t => t.product_id == footData.product_id)
      if (a == -1) {
        state.footPrint.unshift(footData)
        let foot = JSON.stringify(state.footPrint);
        localStorage.setItem("FOOT_PRINT", foot);
      }else{
         state.footPrint= state.footPrint.filter(f=>footData.product_id!=f.product_id)
         state.footPrint.unshift(footData)
         let foot = JSON.stringify(state.footPrint);
         localStorage.setItem("FOOT_PRINT", foot);
      }
     
      console.log(a);

    },
    removeHistorical(state, id) {
      state.footPrint = state.footPrint.filter(f => f.id != id)
      let foot = JSON.stringify(state.footPrint);
      localStorage.setItem("FOOT_PRINT", foot);
    },
    addgoods(state, data) {
      state.goodscar.forEach((item) => {
        if (data.product_id == item.product_id) {
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
      state.collectionlist = state.collectionlist.filter(({ product_id }) => {
        if (data.product_id == product_id) {
          state.same = true
          return false
        } else {
          return true
        }
      })
      // console.log(state.collectionlist);
      if (state.same == false) {
        state.collectionlist.unshift(data)
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
      state.paymentlist.unshift(data)
      window.localStorage.setItem('payment', JSON.stringify(state.paymentlist))
    }
  },
  actions: {
  },
  modules: {
  }
})

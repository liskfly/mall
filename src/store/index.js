import Vue from 'vue'
import Vuex from 'vuex'
import { chooseType } from "@/dataModel/type.js";

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    storeArr: JSON.parse(localStorage.getItem("CONXERN_STORE")) || [],
    listType: chooseType,
    isAddgoods: false,
    goodscar: JSON.parse(window.localStorage.getItem('goodscar')) || [],
    same: false,
    collectionlist: JSON.parse(window.localStorage.getItem('collection')) || [],
    ischoice: false,
    paymentlist: JSON.parse(window.localStorage.getItem('payment')) || [],
    isConxern: false,
    footPrint: JSON.parse(localStorage.getItem('FOOT_PRINT')) || [],
    data: JSON.parse(window.sessionStorage.getItem('token')) || {},
    location: JSON.parse(window.localStorage.getItem('location')) || [],
    addressList: JSON.parse(localStorage.getItem('location')) || []
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
      } else {
        state.footPrint = state.footPrint.filter(f => footData.product_id != f.product_id)
        state.footPrint.unshift(footData)
        let foot = JSON.stringify(state.footPrint);
        localStorage.setItem("FOOT_PRINT", foot);
      }
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
          state.isAddgoods = true
        }
      })
      if (state.isAddgoods || state.goodscar.length == 0) {
        state.goodscar.push(data)
      }
      window.localStorage.setItem('goodscar', JSON.stringify(state.goodscar))
      state.isAddgoods = false
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
      if (Array.isArray(data)) {
        state.paymentlist.unshift(...data)
      } else {
        state.paymentlist.unshift(data)
      }
      window.localStorage.setItem('payment', JSON.stringify(state.paymentlist))
    },
    replacegoodscar(state, data) {
      state.goodscar = data
      window.localStorage.setItem('goodscar', JSON.stringify(state.goodscar))
    },
    createLocation(state, data) {
      let create = {}
      create.id = state.location.length + 1 || 1
      create.name = data.name
      create.tel = data.tel
      create.address = data.city + data.province + data.county + data.addressDetail
      create.isDefault = data.isDefault || false
      console.log(create);
      state.location.push(create)
      state.location = state.location.map((item) => {
        if (item.id != create.id && create.isDefault == true) {
          return { ...item, isDefault: false }
        } else {
          return item
        }
      })
      localStorage.setItem('location', JSON.stringify(state.location))
    },
    setAddressList(state, a) {
      state.addressList = a
      window.localStorage.setItem('location', JSON.stringify(state.addressList))
    },
    removeFootPrint(state, a) {
      state.footPrint = state.footPrint.filter(
        ({ id }) => id != a
      );
      let searchArr = JSON.stringify(state.footPrint);
      localStorage.setItem("FOOT_PRINT", searchArr);
    }
  },
  actions: {
  },
  modules: {
  }
})

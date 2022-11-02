import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import VueAxiosPlugin from 'vue-axios-plugin'
import vantConfig from './vant.config.js'
import { Tab, Tabs } from 'wot-design'

Vue.use(Tab)
Vue.use(Tabs)

Vue.use(VueAxiosPlugin, {
  // 请求拦截处理
  reqHandleFunc: config => ({
    ...config,
    baseURL: 'http://m.gdypyg.cn:80/api/',
  }),
  reqErrorFunc: error => Promise.reject(error),
  // 响应拦截处理
  resHandleFunc: ({ data }) => data,
  resErrorFunc: error => Promise.reject(error)
})

Vue.use(vantConfig)
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

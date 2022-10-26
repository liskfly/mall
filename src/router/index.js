import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView/HomeView.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/home',
    name: 'home',
    component: HomeView
  },
  {
    path: '/classification',
    name: 'classification',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/ClassificationView/ClassificationView.vue')
  },
  {
    path:'/shoppingcart',
    name:'shoppingcart',
    component: () => import(/* webpackChunkName: "about" */ '../views/ShoppingCartView/ShoppingCartView.vue')
  },
  {
    path:'/user',
    name:'user',
    component: () => import(/* webpackChunkName: "about" */ '../views/UserView/UserView.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router

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
    component: () => import('../views/ClassificationView/ClassificationView.vue')
  },
  {
    path: '/shoppingcart',
    name: 'shoppingcart',
    component: () => import('../views/ShoppingCartView/ShoppingCartView.vue')
  },
  {
    path: '/user',
    name: 'user',
    component: () => import('../views/UserView/UserView.vue')
  },
  {

    path: '/classify',
    name: 'classify',
    component: () => import('@/views/classifyView/classifyView.vue')
  },

  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/merchant',
    name: 'merchant',
    component: () => import('@/views/MerchantView/MerchantView.vue')
  },
  {
    path: '/labels',
    name: 'labels',
    component: () => import('@/components/LabelsPage.vue')
  },
  {
    path: '/store',
    name: 'store',
    component: () => import('@/components/StorePage.vue')
  },
  {
    path: '/hot',
    name: 'hot',
    component: () => import('@/components/HotPage.vue')
  }

]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})


export default router

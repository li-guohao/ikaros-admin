import Vue from 'vue'
import VueRouter from 'vue-router'
import NotFound from '@/component/NotFound.vue' //404 Not Found
import Home from '@/component/Home.vue' // Home
import Login from '@/component/Login.vue' //登录

Vue.use(VueRouter)

const routes = [
  {
    path: '*',
    component: NotFound
  },
  {
    path: '/',
    component: Home
  },
  {
    path: '/login',
    component: Login
  },
]

const router = new VueRouter({
  mode: 'history', //历史模式
  routes
})

export default router

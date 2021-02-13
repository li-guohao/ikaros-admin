import Vue from 'vue'
import VueRouter from 'vue-router'
import NotFound from '@/component/NotFound.vue' //404 Not Found
import Home from '@/component/Home.vue' // Home
import Login from '@/component/Login.vue' //登录

import ArticleWrite from '@/component/personal/ArticleWrite.vue'     //个人中心撰写专栏
import ArticleManager from '@/component/personal/ArticleManager.vue' // 个人中心专栏管理

import DBFileManager from '@/component/data/center/DBFileManager.vue'   //文件管理
import DBFileUploader from '@/component/data/center/DBFileUploader'     // 文件上传
import ConfigManager from '@/component/system/option/ConfigManager.vue' //配置管理

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
  {
    path: '/personal/article/write',
    component: ArticleWrite
  },
  {
    path: '/personal/article/manager',
    component: ArticleManager
  },
  {
    path:'/data/center/dbfile/manager',
    component: DBFileManager
  },
  {
    path:'/data/center/dbfile/upload',
    component: DBFileUploader
  },
  {
    path: '/system/option/config/manager',
    component: ConfigManager
  },
]

const router = new VueRouter({
  mode: 'history', //历史模式
  routes
})

export default router

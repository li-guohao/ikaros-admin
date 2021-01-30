import Vue from 'vue'
import App from './App.vue'
import router from './router.js'
import store from './store.js'

// Element-UI组件库
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

import axios from 'axios'
// 配置请求的跟路径
axios.defaults.baseURL = 'http://localhost:8888/'


// http request 拦截器 作用是添加全局请求头
// axios.interceptors.request.use(
//   config => {  
//     config.headers['Authorization'] =  window.sessionStorage.getItem('token');
//     config.headers['UID'] = window.sessionStorage.getItem('UID');
//     return config;
//   })
Vue.prototype.$http = axios

// Vue 全局配置
Vue.config.productionTip = false

Vue.use(ElementUI)


new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

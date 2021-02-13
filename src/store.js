import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
      // 数据中心文件上传的接口路径
      dataCenterFileUploadAPIURL:'http://127.0.0.1:8888/api/dbfile/one/upload',

  },
  mutations: {
  },
  actions: {
  },
  modules: {
  }
})

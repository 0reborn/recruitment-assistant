import Vue from 'vue'
import router from './router'
import store from '@/store'
import App from './App.vue'
// import '@/plugins/axios.js'
import '@/plugins/element.js'

Vue.config.productionTip = false

Vue.prototype.$apiServer = "https://dist.cstdio.cn/yingpin/"
// Vue.prototype.$apiServer = "http://111.230.250.176/yingpin/"

Vue.prototype.showSuccessMessage = (message) => {
  Vue.prototype.$message({
    message: message,
    type: 'success'
  })
}

Vue.prototype.showErrorMessage = (message) => {
  Vue.prototype.$message({
    message: message,
    type: 'error'
  })
}

router.beforeEach((to, from, next) => {
  var flag = localStorage.getItem('isLogin')
  if (flag == 'true') {
    var user = {
      username: localStorage.getItem('username'),
      userId: localStorage.getItem('userId')
    }
    store.dispatch('login', user)
    next()
  } else {
    if (to.meta.requireAuth) {
      Vue.prototype.showErrorMessage('请先登录')
    }
    next()
  }
})

new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')
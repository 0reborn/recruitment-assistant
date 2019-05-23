import Vue from 'vue'
import router from './router'
import store from '@/store'
import App from './App.vue'
// import '@/plugins/axios.js'
import '@/plugins/element.js'

Vue.config.productionTip = false

// Vue.prototype.$apiServer = "https://cstdio.cn/yingpin/"
Vue.prototype.$apiServer = "http://111.230.250.176/yingpin/"

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
   if (to.meta.requireAuth) { // 判断该路由是否需要登录权限
      var flag = localStorage.getItem('isLogin')
      if (flag == 'true') {
         var user = {
            username: localStorage.getItem('username'),
            userId: localStorage.getItem('userId')
         }
         store.dispatch('login', user)
      }
   }
   next()
})

new Vue({
   render: h => h(App),
   router,
   store
}).$mount('#app')
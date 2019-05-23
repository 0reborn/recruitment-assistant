import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex)

const state = {
   // 登录状态为没登录
   isLogin: false,
   // 用户信息数据
   username: '',
   userId: ''
}

var mutations = {

   // setUserLoginFlag
   USER_LOGIN_FLAG(state, flag) {
      state.isLogin = flag
   },

   USER_INFO(state, user) {
      state.username = user.username
      state.userId = user.userId
   },

   LOGIN(state, user) {
      // 登录
      // 先让登录状态变为登录了
      // 若只是改变state里的值，在强制刷新后会丢失，数据添加到localStorage里
      localStorage.setItem("username", user.username)
      localStorage.setItem("password", user.password)
      localStorage.setItem("userId", user.userId)
      localStorage.setItem("isLogin", true)
      state.username = user.username
      state.password = user.password
      state.userId = user.userId
      state.isLogin = true

   },

   // 登出
   LOGOUT(state) {
      // 这个同理
      localStorage.removeItem("username")
      localStorage.removeItem("password")
      localStorage.removeItem("userId")
      localStorage.removeItem("isLogin")
      state.username = ''
      state.password = ''
      state.userId = ''
      state.isLogin = false
   }
}

var actions = {

   login(context, user) {

      context.commit("USER_LOGIN_FLAG", true)
      context.commit("USER_INFO", user)

      localStorage.setItem('isLogin', true)
      localStorage.setItem('username', user.username)
      localStorage.setItem('userId', user.userId)

   },

   logout(context) {

      context.commit("USER_LOGIN_FLAG", false)
      context.commit("USER_INFO", {
         username: '',
         userId: ''
      })

      localStorage.removeItem('isLogin')
      localStorage.removeItem('username')
      localStorage.removeItem('userId')
   }

}

export default new Vuex.Store({
   state,
   mutations,
   actions
})
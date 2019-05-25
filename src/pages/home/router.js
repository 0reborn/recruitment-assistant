import Vue from 'vue'
import Router from 'vue-router'

import Main from './views/main'
import Introduce from './views/introduce'
import About from './views/about'
import UserCenter from './views/userCenter'

Vue.use(Router)

export default new Router({
  linkActiveClass: 'linkActive',
  routes: [{
      path: '/',
      name: 'index',
      redirect: 'home',
      meta: {
        requireAuth: true
      }
    },
    {
      path: '/home',
      name: 'home',
      component: Main,
      meta: {
        requireAuth: true,
        component: Main
      }
    },
    {
      path: '/introduce',
      name: 'introduce',
      component: Introduce
    },
    {
      path: '/about',
      name: 'about',
      component: About
    },
    {
      path: '/userCenter',
      name: 'userCenter',
      component: UserCenter,
      meta: {
        requireAuth: true
      }
    }
  ]
})
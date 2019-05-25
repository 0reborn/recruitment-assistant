<template>
   <div id="header">
      <nav class="navbar navbar-expand-lg navbar-dark"
         style="background-color: transparent;">
         <router-link class="navbar-brand"
            to="/">招聘助手</router-link>
         <button class="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
         </button>

         <div class="collapse navbar-collapse"
            id="navbarSupportedContent">
            <ul class="navbar-nav mr-auto">
               <li class="nav-item">
                  <router-link class="nav-link"
                     to="/home">首页</router-link>
               </li>
               <li class="nav-item">
                  <router-link class="nav-link"
                     to="/introduce">产品介绍</router-link>
               </li>
               <li class="nav-item">
                  <router-link class="nav-link"
                     to="/about">关于我们</router-link>
               </li>
            </ul>
            <form class="form-inline my-2 my-lg-0">
               <input class="form-control mr-sm-2"
                  type="search"
                  placeholder="输入点什么..."
                  aria-label="Search">
               <button class="btn btn-info my-2 my-sm-0"
                  type="submit">搜索</button>
            </form>
            <ul class="navbar-nav">
               <li v-if="!$store.state.isLogin"
                  class="nav-item">
                  <a @click="showLoginModal"
                     class="nav-link"
                     data-toggle="modal"
                     href="#">登录</a>
               </li>
               <li @click="showDropdownMenu"
                  v-if="$store.state.isLogin"
                  class="nav-item dropdown">
                  <a @click.prevent="" class="nav-link dropdown-toggle"
                     href="">
                     <i class="el-icon-user-solid"></i>
                     {{ $store.state.username }}
                  </a>
                  <div class="dropdown-menu">
                     <router-link class="dropdown-item"
                        to="/userCenter">个人中心</router-link>
                     <a class="dropdown-item"
                        href="#">帮助</a>
                     <div class="dropdown-divider"></div>
                     <a @click.prevent="logout"
                        class="dropdown-item"
                        href="">注销</a>
                  </div>
               </li>
               <li v-if="!$store.state.isLogin"
                  class="nav-item">
                  <a class="nav-link"
                     data-toggle="modal"
                     data-target="#register"
                     href="#">注册</a>
               </li>
            </ul>
         </div>
      </nav>
   </div>
</template>

<script>

import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap/dist/js/bootstrap.min.js"

export default {
   data () {
      return {
      };
   },
   methods: {
      showLoginModal () {
         $('#login').modal('show')
      },

      showDropdownMenu () {
         $('#header .dropdown-menu').toggle(200)
      },
      logout () {
         this.$store.dispatch('logout')
      }
   }
}
</script>

<style lang="less">
@navBar-font-size: 15px;
#header {
   a {
      text-decoration: none;
   }

   .navbar {
      padding: 1.5rem 1rem;
      @nav-link-padding: 10px;
      .navbar-brand {
         font-size: (@navBar-font-size + 6px);
      }

      .dropdown {
         z-index: 999;
      }

      .nav-item {
         .dropdown-menu {
            left: unset;
            right: 0;
            .linkActive {
               color: unset;
            }
         }

         .nav-link {
            position: relative;
            font-size: (@navBar-font-size + 2px);
            padding-left: @nav-link-padding;
            padding-right: @nav-link-padding;
         }

         .nav-link::before {
            content: "";
            position: absolute;
            bottom: 0;
            left: 0;
            width: calc(100% - 20px);
            height: 3px;
            background-color: #fff;
            transform: scaleX(0);
            // -webkit-transform-origin-x: 0%;
            transition: 0.4s;
            margin: 0 10px;
         }

         .nav-link:hover::before {
            transform: scaleX(1);
         }

         .linkActive {
            color: @primary-font-color;
         }

         .linkActive::before {
            transform: scaleX(1);
         }
      }
   }

   form.form-inline {
      margin-right: 20px;

      input.form-control {
         font-size: @navBar-font-size;
         text-indent: 4px;
         border-radius: 200px;
         width: 200px;
      }

      button {
         font-size: @navBar-font-size;
      }
   }
}
</style>

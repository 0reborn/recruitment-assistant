<template>
   <div id="app">
      <div class="container-fluid">
         <Header></Header>
         <Login></Login>
         <Register></Register>
         <AddFrame></AddFrame>
         <EditFrame ref="editFrame"></EditFrame>
         <AddStatusFrame ref="addStatusFrame"></AddStatusFrame>
         <router-view ref="main">
         </router-view>
         <Footer></Footer>
      </div>
   </div>
</template>

<script>

import Header from "@/components/common/header"
import Login from "@/components/login"
import Register from "@/components/register"
import AddFrame from "./views/add"
import EditFrame from "./views/edit"
import AddStatusFrame from "./views/status/add"
import Footer from "@/components/common/footer"

export default {
   components: {
      Header,
      Login,
      Register,
      AddFrame,
      EditFrame,
      AddStatusFrame,
      Footer
   }
}

</script>

<!-- Add "scoped " attribute to limit CSS to this component only -->
<style lang="less">
#app {
   width: 100%;
   background-color: @primary-bg-color;
   color: @primary-font-color;
   height: 100vh;
   > .container-fluid {
      padding: 0 10px;
      overflow: hidden;
   }

   .modal-content {

      font-size: @modal-form-font-size;

      .btn {
         font-size: (@modal-form-font-size - 1px);
      }

      .modal-header {
         color: @black-font-color;
      }

      .modal-body {
         // padding-bottom: 0.3rem;
         // padding-top: 2rem;
         color: @black-font-color;

         #verifyCodeBtn {
            width: 100%;
            color: #fff;
            font-size: (@modal-form-font-size - 3.5px);
         }
      }
      
      .form-group {
         // margin-bottom: 1.7rem;
         .col-form-label {
            padding-right: 0;
         }
      }
   }
}
</style>
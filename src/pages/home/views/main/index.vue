<template>
   <div id="main">
      <Calendar ref="calendar"></Calendar>
      <el-button class="addition" data-toggle="modal" data-target="#addRecord" type="danger" icon="el-icon-plus" circle></el-button>
   </div>
</template>

<script>

import Calendar from "./Calendar"

export default {
   data () {
      return {

      }
   },
   methods: {
      
   },
   components: {
      Calendar
   }
}
</script>

<style lang="less">
#main {
   width: 100%;
   height: @main-div-height;
   // border: 1px red solid;

   .el-row {
      position: static;
      // margin-bottom: 20px;
   }

   .addition {
      position: absolute;
      bottom: 0;
      right: 0;
      height: 70px;
      width: 70px;
      font-size: 25px;
      transform: translate(-50%, -50%);
   }
}
</style>

<template>
   <div id="userCenter">
      <div class="info-header">
         <span class="title">基本信息</span>
         <div class="header-right">
            <a href="#"
               class="btn btn-cancel">取消</a>
            <a href="#"
               class="btn btn-save btn-primary">保存</a>
         </div>
      </div>
      <hr>
      <div class="info-content">
         <form>
            <div class="form-group row">
               <label class="col-sm-1 col-form-label">我的昵称</label>
               <div class="col-sm-11">
                  <input type="text"
                     class="form-control form-control-plaintext"
                     value="SuluMer">
               </div>
            </div>
            <div class="form-group row">
               <label class="col-sm-1 col-form-label">我的邮箱</label>
               <div class="col-sm-11">
                  <input type="text"
                     class="form-control form-control-plaintext"
                     value="xxx@qq.com">
               </div>
            </div>
            <div class="form-group row">
               <label class="col-sm-1 col-form-label">我的手机</label>
               <div class="col-sm-11">
                  <input type="text"
                     class="form-control form-control-plaintext"
                     value="130****1234">
               </div>
            </div>
            <div class="form-group row">
               <label class="col-sm-1 col-form-label">我的主页</label>
               <div class="col-sm-11">
                  <input type="text"
                     class="form-control form-control-plaintext"
                     value="xxx.yingpinzhushou.com">
               </div>
            </div>
            <div class="form-group row">
               <label class="col-sm-1 col-form-label">个人介绍</label>
               <div class="col-sm-11">
                  <input type="text"
                     class="form-control form-control-plaintext"
                     value="做个有趣的人">
               </div>
            </div>
         </form>
      </div>
      <div class="info-header">
         <span class="title">应聘经历</span>
      </div>
      <hr>
      <div class="info-experience">
         <div class="experience-row row">
            <div style="padding-right: 0"
               class="company col-2">
               <a class="label">百度</a>
            </div>
            <div style="padding-left: 0"
               class="experiences col-10">
               <a class="experience label label-active">笔试</a>
               <a class="experience label label-active">一面</a>
               <a class="experience label">二面</a>
               <a class="experience label">三面</a>
            </div>
         </div>
         <div class="experience-row row">
            <div style="padding-right: 0"
               class="company col-2">
               <a class="label">腾讯</a>
            </div>
            <div style="padding-left: 0"
               class="experiences col-10">
               <a class="experience label label-active">笔试</a>
               <a class="experience label label-active">一面</a>
               <a class="experience label">二面</a>
               <a class="experience label">三面</a>
            </div>
         </div>
         <div class="experience-row row">
            <div style="padding-right: 0"
               class="company col-2">
               <a class="label">阿里巴巴</a>
            </div>
            <div style="padding-left: 0"
               class="experiences col-10">
               <a class="experience label label-active">笔试</a>
               <a class="experience label label-active">一面</a>
               <a class="experience label">二面</a>
               <a class="experience label">三面</a>
            </div>
         </div>
      </div>
   </div>
</template>

<script>
export default {
   data () {
      return {

      }
   },
   methods: {

   },
   components: {

   }
}
</script>

<style lang="less">
#userCenter {
   height: @main-div-height;
   width: 80%;
   margin-left: 10%;
   border: 1px solid red;
   padding: 20px 25px;

   .title {
      font-size: 160%;
   }

   hr {
      border-top: 2px solid @primary-font-color;
   }

   .info-header {
      display: flex;
      align-items: center;
      justify-content: space-between;

      .btn-cancel {
         background-color: #e4e4e4;
         margin-right: 20px;
      }

      .btn-cancel:hover {
         background-color: #fff;
      }

      .btn {
         padding: 5px 25px;
      }
   }

   .info-content {
      padding-top: 10px;
      padding-bottom: 15px;
      .form-group {
         margin-bottom: 0rem;
         label {
            padding-right: 0;
            font-size: 110%;
         }
         input {
            font-size: 110%;
         }
         .form-control {
            width: 60%;
         }
      }
   }

   .info-experience {
      font-size: 110%;
      .experience-row {
         display: flex;
         align-items: center;
         margin-bottom: 15px;

         .label {
            padding: 5px 15px;
            border-radius: 3px;
            cursor: pointer;
         }

         .company {
            display: flex;
            .label {
               background-color: #007bff;
            }
         }

         .experiences {
            display: flex;

            .label {
               background-color: #e4e4e4;
               color: #444;
               margin-right: 30px;
               transition: .4s;
            }

            .label:hover {
               background-color: #fff;
            }

            .label-active {
               background-color: #17a2b8;
               color: @primary-font-color;
               transition: .4s;
            }

            .label-active:hover {
               background-color: #138496;
            }
         }
      }
   }
}
</style>

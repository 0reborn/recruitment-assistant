<template>
   <div class="modal fade bd-example-modal-lg"
      id="editRecord"
      tabindex="-1"
      role="dialog"
      aria-labelledby="exampleModalCenterTitle"
      aria-hidden="true">
      <div class="modal-dialog modal-lg"
         role="document">
         <div class="modal-content">
            <div class="modal-header">
               <h5 class="modal-title"
                  id="exampleModalLongTitle">应聘信息</h5>
               <button type="button"
                  class="close"
                  data-dismiss="modal"
                  aria-label="Close">
                  <span aria-hidden="true">&times;</span>
               </button>
            </div>
            <div class="modal-body">
               <form>
                  <div class="input-group mb-4">
                     <div class="input-group-prepend">
                        <span class="input-group-text">公司名称</span>
                     </div>
                     <input v-model="company"
                        type="text"
                        class="form-control"
                        placeholder="建议使用公司简称，如百度，阿里，不可超过四个字">
                  </div>
                  <div class="input-group mb-4">
                     <div class="input-group-prepend">
                        <span class="input-group-text">岗位名称</span>
                     </div>
                     <input v-model="post"
                        type="text"
                        class="form-control"
                        placeholder="建议使用岗位简称，如产品，前端，后端，不可超过四个字">
                  </div>
                  <label>简历投递地址</label>
                  <div class="input-group mb-4">
                     <div class="input-group-prepend">
                        <span class="input-group-text">https://</span>
                     </div>
                     <input v-model="address"
                        type="text"
                        class="form-control"
                        placeholder="建议填写官网投递地址，可点击直达">
                  </div>
                  <div class="input-group mb-4">
                     <div class="input-group-prepend">
                        <span class="input-group-text">内推人</span>
                     </div>
                     <input v-model="pushman"
                        type="text"
                        class="form-control"
                        placeholder="">
                     <div class="input-group-prepend">
                        <span class="input-group-text">内推码</span>
                     </div>
                     <input v-model="pushcode"
                        type="text"
                        class="form-control"
                        placeholder="">
                  </div>

                  <label>日期范围</label>
                  <div class="input-group mb-4">
                     <el-date-picker v-model="dateRange"
                        type="datetimerange"
                        range-separator="至"
                        start-placeholder="开始日期"
                        end-placeholder="结束日期">
                     </el-date-picker>
                  </div>
                  <div class="input-group mb-4">
                     <div class="input-group-prepend">
                        <span class="input-group-text">备注</span>
                     </div>
                     <textarea v-model="remark"
                        class="form-control"></textarea>
                  </div>
                  <p>
                     <a class="btn btn-info"
                        data-toggle="collapse"
                        href="#collapseExample"
                        role="button"
                        aria-expanded="false"
                        aria-controls="collapseExample">
                        <i class="el-icon-view"></i>
                        当前状态
                     </a>
                  </p>
                  <div class="collapse"
                     id="collapseExample">
                     <div class="card card-body">
                        <div class="input-group mb-4">
                           <div class="input-group-prepend">
                              <label class="input-group-text">应聘状态</label>
                           </div>
                           <select v-model="status.name"
                              class="custom-select">
                              <option>宣讲会</option>
                              <option>面试</option>
                              <option>笔试</option>
                              <option>offer</option>
                           </select>
                           <select v-model="status.method"
                              class="custom-select">
                              <option>线下</option>
                              <option>线上</option>
                           </select>
                        </div>

                        <label>日期</label>
                        <div class="input-group mb-4">
                           <el-date-picker v-model="status.date"
                              type="datetime"
                              placeholder="选择日期时间">
                           </el-date-picker>
                        </div>

                        <div class="input-group mb-4">
                           <div class="input-group-prepend">
                              <span class="input-group-text">地址 / 联系方式</span>
                           </div>
                           <input v-model="status.address"
                              type="text"
                              class="form-control"
                              placeholder="线下填实际地址，线上填联系方式（手机、qq等）">
                        </div>
                     </div>
                  </div>
               </form>
            </div>
            <div class="modal-footer">
               <button @click="updateRecord"
                  type="button"
                  class="btn btn-primary">更新</button>
               <button type="button"
                  class="btn btn-secondary"
                  data-dismiss="modal">取消</button>
            </div>
         </div>
      </div>
   </div>
</template>

<script>
export default {
   data () {
      return {
         dateRange: [],
         company: '',
         post: '',
         address: '',
         pushman: '',
         pushcode: '',
         remark: '',
         status: {
            name: '',
            method: '',
            date: '',
            address: ''
         },

         copy: null,

         formData: {
            id: "rid",
            data: {
               address: "https://www.baidu.com/join",
               post: "Vue前端",
               endtime: "2019-05-17 18:00:00"
            }
         }
      }
   },
   methods: {

      show (event) {
         // console.log(event)
         this.company = event.company
         this.post = event.post
         this.address = event.address
         this.pushcode = event.pros[0].value
         this.pushman = event.pros[1].value
         this.dateRange = [event.starttime, event.endtime]
         this.remark = event.remark
         this.status = event.status

         this.copy = {
            dateRange: this.dateRange,
            company: this.company
         }

         $('#editRecord').modal('show')
      },

      formatDate (date) {
         var y = date.getFullYear()
         var m = date.getMonth() + 1
         m = m < 10 ? ('0' + m) : m
         var d = date.getDate()
         d = d < 10 ? ('0' + d) : d
         var h = date.getHours()
         var minute = date.getMinutes()
         minute = minute < 10 ? ('0' + minute) : minute
         var second = date.getSeconds()
         second = minute < 10 ? ('0' + second) : second
         return y + '-' + m + '-' + d + ' ' + h + ':' + minute + ':' + second
      },

      isEmptyOrNull (string) {
         if (string == '' || string == null) return true
         return false
      },

      checkSubmitFormat () {
         var isEmptyOrNull = this.isEmptyOrNull
         if (isEmptyOrNull(this.company)) {
            this.showErrorMessage('公司名不能为空')
            return false
         }
         if (isEmptyOrNull(this.post)) {
            this.showErrorMessage('岗位名不能为空')
            return false
         }
         if (isEmptyOrNull(this.address)) {
            this.showErrorMessage('简历投递地址不能为空')
            return false
         }
         if (isEmptyOrNull(this.dateRange[0])) {
            this.showErrorMessage('起始时间不能为空')
            return false
         }
         if (isEmptyOrNull(this.dateRange[1])) {
            this.showErrorMessage('结束时间不能为空')
            return false
         }
         if (isEmptyOrNull(this.status.name)) {
            this.showErrorMessage('需要添加一个初始状态')
            return false
         }
         if (isEmptyOrNull(this.status.time)) {
            this.showErrorMessage('日期不能为空')
            return false
         }
         return true
      },

      updateRecord () {

      }
   },
   components: {

   }
}
</script>

<style lang="less">
#editRecord {
   .modal-content {
      .modal-body {
         .input-group * {
            // font-size: (@modal-form-font-size - 1px);
         }

         .newStatus {
            display: none;
         }
      }
   }

   .el-date-editor.el-input,
   .el-date-editor.el-input__inner {
      width: 100%;
   }
}
</style>

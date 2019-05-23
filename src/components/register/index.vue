<template>
   <div class="modal fade"
      id="register"
      tabindex="-1"
      role="dialog"
      aria-labelledby="exampleModalCenterTitle"
      aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered"
         role="document">
         <div class="modal-content">
            <div class="modal-header">
               <h5 class="modal-title"
                  id="exampleModalLongTitle">注册</h5>
               <button type="button"
                  class="close"
                  data-dismiss="modal"
                  aria-label="Close">
                  <span aria-hidden="true">&times;</span>
               </button>
            </div>
            <div class="modal-body">
               <form>
                  <div class="form-group row">
                     <label class="col-2 col-form-label">用户名</label>
                     <div class="col-10">
                        <input v-model="username"
                           v-on:input="checkUsername"
                           @blur="checkUsername"
                           type="text"
                           class="form-control"
                           :class="{'is-invalid': format.username == -1, 'is-valid': format.username == 1}"
                           placeholder="">
                        <div v-if="format.username == -1"
                           class="invalid-feedback">
                           用户名不能为空！
                        </div>
                     </div>
                  </div>
                  <div class="form-group row">
                     <label class="col-2 col-form-label">密码</label>
                     <div class="col-10">
                        <input v-model="password"
                           v-on:input="checkPassword"
                           @blur="checkPassword"
                           type="password"
                           class="form-control"
                           :class="{'is-invalid': format.password == -1, 'is-valid': format.password == 1}"
                           placeholder="">
                        <div v-if="format.password == -1"
                           class="invalid-feedback">
                           密码不能为空！
                        </div>
                     </div>
                  </div>
                  <div class="form-group row">
                     <label class="col-2 col-form-label">确认密码</label>
                     <div class="col-10">
                        <input v-model="confirmPassword"
                           v-on:input="checkConfirmPassword"
                           @blur="checkConfirmPassword"
                           type="password"
                           class="form-control"
                           :class="{'is-invalid': format.confirmPassword == -1, 'is-valid': format.confirmPassword == 1}"
                           placeholder="">
                        <div v-if="format.confirmPassword == -1"
                           class="invalid-feedback">
                           两次输入密码不一致！
                        </div>
                     </div>
                  </div>
                  <div class="form-group row">
                     <label class="col-2 col-form-label">手机号</label>
                     <div class="col-10">
                        <input v-model="phone"
                           v-on:input="checkPhone"
                           @blur="checkPhone"
                           type="text"
                           class="form-control"
                           :class="{'is-invalid': format.phone == -1, 'is-valid': format.phone == 1}"
                           placeholder="">
                        <div v-if="format.phone == -1"
                           class="invalid-feedback">
                           手机号格式不正确
                        </div>
                     </div>
                  </div>
                  <div class="form-group row">
                     <label class="col-2 col-form-label">验证码</label>
                     <div class="col-7">
                        <input v-model="verifyCode"
                           v-on:input="checkVerifyCode"
                           @blur="checkVerifyCode"
                           type="text"
                           class="form-control"
                           :class="{'is-invalid': format.verifyCode == -1, 'is-valid': format.verifyCode == 1}"
                           placeholder="">
                        <div v-if="format.verifyCode == -1"
                           class="invalid-feedback">
                           验证码有误
                        </div>
                     </div>
                     <div class="col-3"
                        style="padding-left: 0">
                        <el-button @click="sendVerifyCode"
                           id="verifyCodeBtn"
                           type="danger"
                           :disabled="!isValid">获取验证码</el-button>
                     </div>
                  </div>
               </form>
            </div>
            <div class="modal-footer">
               <button @click="register"
                  type="button"
                  class="btn btn-primary">确定</button>
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
         username: '',
         password: '',
         confirmPassword: '',
         phone: '',
         verifyCode: '',
         format: {
            username: 0,
            password: 0,
            confirmPassword: 0,
            phone: 0,
            verifyCode: 0
         },
         isValid: true,
         trueVerifyCode: '924086'
      }
   },

   methods: {

      checkUsername () {
         if (this.username == '' || this.username == null) {
            this.format.username = -1
         } else {
            this.format.username = 1
         }
      },

      checkPassword () {
         if (this.password == '' || this.password == null) {
            this.format.password = -1
         } else {
            this.format.password = 1
         }
      },

      checkConfirmPassword () {
         if (this.password != this.confirmPassword || this.password == '' || this.password == null) {
            this.format.confirmPassword = -1
         } else {
            this.format.confirmPassword = 1
         }
      },

      checkPhone () {
         if (this.phone == '' || this.phone == null) {
            this.format.phone = -1
         } else {
            if (!(/^1[3|4|5|7|8][0-9]{9}$/.test(this.phone))) {
               this.format.phone = -1
            } else {
               this.format.phone = 1
            }
         }
      },

      checkVerifyCode () {
         if (this.trueVerifyCode != null && this.trueVerifyCode == this.verifyCode) {
            this.format.verifyCode = 1
         } else {
            this.format.verifyCode = -1
         }
      },

      sendVerifyCode () {

         var _this = this

         if (_this.format.phone <= 0) {
            _this.showErrorMessage('手机号格式不正确')
            return
         }

         var waitTime = 5
         var suffixText = "s后重新发送"
         var $verifyCodeBtn = $('#verifyCodeBtn')
         this.isValid = false
         var timer = setInterval(() => {
            $verifyCodeBtn.text((waitTime--) + suffixText)
            if (waitTime == -2) {
               clearInterval(timer)
               $verifyCodeBtn.text('获取验证码')
               this.isValid = true
            }
         }, 1000)

         $.ajax({
            url: _this.$apiServer + 'dysms/demo/sendSms.php',
            method: 'POST',
            data: {
               phone: this.phone
            },
            dataType: 'JSON',
            success: function (res) {
               if (res.code == '200') {
                  // _this.trueVerifyCode = res.verify
                  _this.showSuccessMessage('验证码已发送')
               } else if (res.code == '400') {
                  _this.showErrorMessage(res.error)
               }
            }
         })
      },

      register () {

         var _this = this
         var formatNum = 0

         $('#register input.form-control').each(function () {
            if ($(this).hasClass('is-valid')) {
               formatNum++
            }
         })

         if (formatNum == 5) {
            $.ajax({
               url: _this.$apiServer + 'register.php',
               method: 'POST',
               data: {
                  username: this.username,
                  password: this.password,
                  phone: this.phone
               },
               dataType: 'JSON',
               success: function (res) {
                  if (res.code == '200') {
                     _this.showSuccessMessage('注册成功')
                     $('#register').modal('hide')
                     $('#login').modal('show')
                     _this.$parent.$children[1].username = _this.username
                  } else if (res.code == '400') {
                     _this.showErrorMessage('注册失败，原因：' + res.error)
                  }
               }
            })
         } else {
            this.showErrorMessage('信息填写不完整或格式有误')
            return
         }
      }
   },
   components: {

   }
}
</script>

<style lang="less">
#register {
}
</style>
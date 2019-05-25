<template>
  <div
    class="modal fade"
    id="login"
    ref="login"
    tabindex="-1"
    role="dialog"
    aria-labelledby="exampleModalCenterTitle"
    aria-hidden="true"
  >
    <div class="modal-dialog modal-dialog-centered" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLongTitle">登录</h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <form>
            <div class="form-group">
              <label class="col-form-label">用户名:</label>
              <input v-model="username" type="text" class="form-control username">
            </div>
            <div class="form-group">
              <label class="col-form-label">密码:</label>
              <input v-model="password" type="password" class="form-control">
            </div>
          </form>
        </div>
        <div class="modal-footer">
          <a
            class="have-no-account"
            data-dismiss="modal"
            data-toggle="modal"
            data-target="#register"
          >没有账号?</a>
          <button @click="login" type="button" class="btn btn-primary">确定</button>
          <button type="button" class="btn btn-secondary" data-dismiss="modal">取消</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      username: '',
      password: '',
      isLogin: false
    }
  },
  inject: ["reload"],
  methods: {
    login() {

      var _this = this

      $.ajax({
        url: _this.$apiServer + 'login.php',
        method: 'POST',
        data: {
          username: this.username,
          password: this.password,
        },
        dataType: 'JSON',
        success: function (res) {
          if (res.code == '200') {
            _this.showSuccessMessage('登录成功')
            $('#login').modal('hide')
            _this.$store.dispatch('login', {
              username: _this.username,
              userId: res.data.uid
            })
            _this.reload()
            _this.$router.push({ path: '/home' })
          } else if (res.code == '400') {
            _this.showErrorMessage('登录失败，原因：' + res.error)
          }
        }
      })
    }
  },
  components: {

  }
}
</script>

<style lang="less">
#login {
  .btn {
    font-size: (@modal-form-font-size - 1px);
  }
  .modal-header,
  .modal-body {
    color: #212529;
  }

  .have-no-account {
    color: @primary-bg-color;
    font-size: (@modal-form-font-size - 1px);
    cursor: pointer;
  }
}
</style>

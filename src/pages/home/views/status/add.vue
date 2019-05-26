<template>
  <div
    class="modal fade bd-example-modal-lg"
    id="addStatus"
    tabindex="-1"
    role="dialog"
    aria-labelledby="exampleModalCenterTitle"
    aria-hidden="true"
  >
    <div class="modal-dialog modal-lg" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLongTitle">应聘信息</h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <form>
            <div class="input-group mb-4 mt-2">
              <div class="input-group-prepend">
                <label class="input-group-text">新增状态</label>
              </div>
              <select v-model="name" class="custom-select">
                <option>宣讲会</option>
                <option>面试</option>
                <option>笔试</option>
                <option>offer</option>
              </select>
              <select v-model="pos" class="custom-select">
                <option>线下</option>
                <option>线上</option>
              </select>
            </div>

            <label>日期</label>
            <div class="input-group mb-4">
              <el-date-picker v-model="time" type="datetime" placeholder="选择日期时间"></el-date-picker>
            </div>

            <div class="input-group mb-4">
              <div class="input-group-prepend">
                <span class="input-group-text">地址 / 联系方式</span>
              </div>
              <input
                v-model="address"
                type="text"
                class="form-control"
                placeholder="线下填实际地址，线上填联系方式（手机、qq等）"
              >
            </div>
          </form>
        </div>
        <div class="modal-footer">
          <button @click="addStatus" type="button" class="btn btn-primary">添加</button>
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
      rid: '',
      name: '宣讲会',
      pos: '线下',
      time: '',
      address: '',
      nextPath: ''
    }
  },
  inject: ["reload"],
  methods: {
    show(rid, nextPath) {
      this.rid = rid
      this.nextPath = nextPath
      $('#addStatus').modal('show')
    },
    formatDate(date) {
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
    addStatus() {
      var _this = this

      var formData = {
        rid: this.rid,
        status: this.name,
        pos: this.pos,
        time: this.formatDate(this.time),
        address: this.address
      }
      console.log(formData)
      $.ajax({
        url: _this.$apiServer + 'addStatus.php',
        method: 'POST',
        data: formData,
        dataType: 'JSON',
        success: function (res) {
          if (res.code == '200') {
            _this.showSuccessMessage('添加成功')
            $('#addStatus').modal('hide')
            _this.reload()
            _this.$router.push({ path: _this.nextPath })
          } else if (res.code == '400') {
            _this.showErrorMessage('添加失败，原因：' + res.error)
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
#addStatus {
  .el-date-editor.el-input {
    width: 100%;
  }
}
</style>

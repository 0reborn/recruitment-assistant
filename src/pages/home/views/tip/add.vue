<template>
  <div
    class="modal fade bd-example-modal-lg"
    id="addTip"
    tabindex="-1"
    role="dialog"
    aria-labelledby="exampleModalCenterTitle"
    aria-hidden="true"
  >
    <div class="modal-dialog modal-lg" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLongTitle">新增笔试/面试经验</h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <form>
            <div class="form-group">
              <label>你的经验与总结</label>
              <textarea v-model="tip" class="form-control" rows="3"></textarea>
            </div>
          </form>
        </div>
        <div class="modal-footer">
          <button @click="addTip" type="button" class="btn btn-primary">添加</button>
          <button type="button" class="btn btn-secondary" data-dismiss="modal">取消</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  components: {},
  data() {
    return {
      sid: '',
      tip: ''
    };
  },
  inject: ["reload"],
  methods: {
    show(sid) {
      this.sid = sid
      $('#addTip').modal('show')
    },
    addTip() {
      var _this = this
      if (_this.tip == '' || _this.tip == null) {
        _this.showErrorMessage('内容不能为空')
        return
      }
      
      $.ajax({
        url: _this.$apiServer + 'addTips.php',
        method: 'POST',
        data: {
          sid: _this.sid,
          tip: _this.tip
        },
        dataType: 'JSON',
        success: function (res) {
          if (res.code == '200') {
            _this.showSuccessMessage('添加成功')
            $('#addTip').modal('hide')
            _this.reload()
            _this.$router.push({ path: '/userCenter' })
          } else if (res.code == '400') {
            _this.showErrorMessage('添加失败' + res.error)
          }
        }
      })
    }
  },
  created() {

  },

};
</script>
<style lang="less">
</style>
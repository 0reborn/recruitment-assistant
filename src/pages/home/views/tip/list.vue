<template>
  <div
    class="modal fade bd-example-modal-lg"
    id="tipList"
    tabindex="-1"
    role="dialog"
    aria-labelledby="exampleModalCenterTitle"
    aria-hidden="true"
  >
    <div class="modal-dialog modal-lg" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLongTitle">{{ company }}/{{ status.name }}</h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <div v-for="(tip, index) in status.tips" :key="index">
            <div :class="setClass(index)" role="alert">{{ tip }}</div>
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-primary">添加新的经验</button>
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
      company: '',
      status: {
        'name': '',
        'tips': []
      },
      alertClasses: [
        'primary',
        'secondary',
        'success',
        'danger',
        'warning',
        'info',
      ],


    }
  },
  methods: {
    setClass(index) {
      return "alert alert-" + this.alertClasses[index % this.alertClasses.length]
    },
    show(company, status) {
      this.company = company
      this.status = status
      $('#tipList').modal('show')
    }
  },
  created() { }
}
</script>
<style lang="less">
</style>
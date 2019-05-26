<template>
  <div id="userCenter">
    <div class="info-header">
      <span class="title">基本信息</span>
      <div class="header-right">
        <a href="#" class="btn btn-cancel">取消</a>
        <a href="#" class="btn btn-save btn-primary">保存</a>
      </div>
    </div>
    <hr>
    <div class="info-content">
      <form>
        <div class="form-group row">
          <label class="col-sm-1 col-form-label">我的昵称</label>
          <div class="col-sm-11">
            <input
              type="text"
              class="form-control form-control-plaintext"
              v-model="this.$store.state.username"
            >
          </div>
        </div>
        <div class="form-group row">
          <label class="col-sm-1 col-form-label">我的邮箱</label>
          <div class="col-sm-11">
            <input type="text" class="form-control form-control-plaintext" value="xxx@qq.com">
          </div>
        </div>
        <div class="form-group row">
          <label class="col-sm-1 col-form-label">我的手机</label>
          <div class="col-sm-11">
            <input type="text" class="form-control form-control-plaintext" value="130****1234">
          </div>
        </div>
        <div class="form-group row">
          <label class="col-sm-1 col-form-label">我的主页</label>
          <div class="col-sm-11">
            <input
              type="text"
              class="form-control form-control-plaintext"
              value="xxx.yingpinzhushou.com"
            >
          </div>
        </div>
        <div class="form-group row">
          <label class="col-sm-1 col-form-label">个人介绍</label>
          <div class="col-sm-11">
            <input type="text" class="form-control form-control-plaintext" value="做个有趣的人">
          </div>
        </div>
      </form>
    </div>
    <div class="info-header">
      <span class="title">应聘经历</span>
    </div>
    <hr>
    <div class="info-experience">
      <div v-for="record in records" :key="record.rid" class="experience-row row">
        <div style="padding-right: 0" class="company col-2">
          <a class="label">{{ record.company }}</a>
        </div>
        <div style="padding-left: 0" class="experiences col-10">
          <div v-for="state in record.status" :key="state.sid">
            <a
              @click="state.tips.length != 0 ? showTipList(record.company, state) : showAddTip(state.sid)"
              class="experience label"
              :class="{'label-active': state.tips.length != 0}"
            >{{ state.name }}</a>
          </div>
          <div v-for="i in 1" :key="i">
            <a @click="addStatus(record.rid)" class="experience label">
              <i class="el-icon-plus"></i>
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      records: [
        {
          rid: 18,
          company: '阿里',
          statuses: [
            {
              'sid': 0,
              'name': '笔试',
              'tips': ['tip1', 'tip2'],        //方案一
            }
          ]
        },
        {
          rid: 19,
          company: '腾讯',
          statuses: [
            {
              'sid': 2,
              'name': '面试',
              'tips': [],        //方案一
            }
          ]
        }
      ]
    }
  },
  methods: {
    showTipList(company, status) {
      this.$root.$children[0].$refs.tipList.show(company, status)
    },
    showAddTip(sid) {
      this.$root.$children[0].$refs.addTip.show(sid)
    },
    addStatus(rid) {
      this.$root.$children[0].$refs.addStatusFrame.show(rid, 'userCenter')
    },
    update() {
      var _this = this

      $.ajax({
        url: _this.$apiServer + 'getTips.php',
        method: 'GET',
        data: {
          uid: _this.$store.state.userId
        },
        dataType: 'JSON',
        success: function (res) {
          if (res.code == '200') {
            console.log(res.record)
            _this.records = res.record
          } else if (res.code == '400') {
            _this.showErrorMessage('获取数据失败，原因：' + res.error)
          }
        }
      })
    }
  },
  created() {
    this.update()
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
          transition: 0.4s;
        }

        .label:hover {
          background-color: #fff;
        }

        .label-active {
          background-color: #17a2b8;
          color: @primary-font-color;
          transition: 0.4s;
        }

        .label-active:hover {
          background-color: #138496;
        }
      }
    }
  }
}
</style>

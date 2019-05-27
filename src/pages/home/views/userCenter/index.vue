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
            <input type="text" class="form-control form-control-plaintext" v-model="username">
          </div>
        </div>
        <div class="form-group row">
          <label class="col-sm-1 col-form-label">我的邮箱</label>
          <div class="col-sm-11">
            <input
              v-model="email"
              type="text"
              class="form-control form-control-plaintext"
              value="xxx@qq.com"
            >
          </div>
        </div>
        <div class="form-group row">
          <label class="col-sm-1 col-form-label">我的手机</label>
          <div class="col-sm-11">
            <input
              v-model="phone"
              type="text"
              class="form-control form-control-plaintext"
              value="130****1234"
            >
          </div>
        </div>
        <div class="form-group row">
          <label class="col-sm-1 col-form-label">我的主页</label>
          <div class="col-sm-11">
            <input
              v-model="homepage"
              type="text"
              class="form-control form-control-plaintext"
              value="xxx.yingpinzhushou.com"
            >
          </div>
        </div>
        <div class="form-group row">
          <label class="col-sm-1 col-form-label">个人介绍</label>
          <div class="col-sm-11">
            <input
              v-model="instruction"
              type="text"
              class="form-control form-control-plaintext"
              value="做个有趣的人"
            >
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
      records: [],
      username: '',
      email: '',
      phone: '',
      homepage: '',
      instruction: '',
      copy: null
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

      $.ajax({
        url: _this.$apiServer + 'getUserinfo.php',
        method: 'POST',
        data: {
          uid: _this.$store.state.userId
        },
        dataType: 'JSON',
        success: function (res) {
          if (res.code == '200') {
            console.log(res)
            _this.username = res.username
            _this.email = res.email
            _this.phone = res.phone
            _this.homepage = res.homepage
            _this.instruction = res.introduction ? res.introduction : '这个人比较懒，啥也没有写~'
            _this.copy = {
              username: _this.username,
              email: _this.email,
              phone: _this.phone,
              homepage: _this.homepage,
              instruction: _this.instruction
            }
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
  @cancel-btn-primary: #f0f0f0;
  @info-bg-plus-color: #361111;
  height: @main-div-height;
  overflow-y: scroll;
  width: 80%;
  margin-left: 10%;
  padding: 20px 28px;
  border-radius: 24px;
  border: 1px solid @primary-bg-color + @info-bg-plus-color;
  background-color: @primary-bg-color + @info-bg-plus-color;
  box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.25);

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
      background-color: @cancel-btn-primary;
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
          background-color: @confirm-btn-color;
        }
      }

      .experiences {
        display: flex;

        .label {
          background-color: @cancel-btn-primary;
          color: #444;
          margin-right: 30px;
          transition: 0.4s;
        }

        .label:hover {
          background-color: #fff;
        }

        .label-active {
          background-color: @primary-btn-color;
          color: @primary-font-color;
          transition: 0.4s;
        }

        .label-active:hover {
          background-color: @primary-btn-hover-color;
        }
      }
    }
  }
}

#userCenter::-webkit-scrollbar {
  display: none;
}
</style>

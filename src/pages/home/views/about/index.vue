<template>
  <div id="about">
    <div class="info-header">
      <span class="title">使用帮助</span>
    </div>
    <hr>
    <div class="info-content">
      <p>Step1：添加应聘记录信息</p>
      <p>通过主页右下角“+“号按钮，按提示添加应聘记录信息。</p>
      <p>Step2：更新应聘状态</p>
      <p>当应聘状态更新时，如收到笔试信息，在首页记录内查看更多中的更新状态添加新状态（笔试）</p>
      <p>Step3：应聘状态完成，添加应聘过程心得（笔经，面经）</p>
      <p>例如上述中的“笔试”应聘状态完成，可在个人中心添加应聘过程心得。</p>
    </div>
  </div>
</template>

<script>
export default {
  data() {
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
#about {
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
    font-size: 125%;
    letter-spacing: 1px;
    // text-indent: 41px;
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

#about::-webkit-scrollbar {
  display: none;
}
</style>

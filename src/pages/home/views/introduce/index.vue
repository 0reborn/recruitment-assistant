<template>
  <div id="introduce">
    <div class="info-header">
      <span class="title">项目背景</span>
    </div>
    <hr>
    <div class="info-content">
      <p>在春招、秋招期间，应聘者有大量的公司可以选择，而公司又有内推-网申笔试-面试阶段。用户使用 excel、手动记录等方式非常繁琐，同时内容不够直观。我们的招聘助手主要是为用户提供定制化内容的招聘信息，能够有效地使应聘者了解当前处于哪个公司的哪个阶段，可以更好地规划自己的应聘准备工作，同时避免错过招聘的某一阶段。</p>
    </div>
    <div class="info-header">
      <span class="title">产品特色</span>
    </div>
    <hr>
    <div class="info-content">
      <p>网上大部分的应用，例如牛客网的笔试日历、小程序端的校招管家，显示的都是官方收集的招聘消息，桌面日历助手显示较为凌乱，用户体验不足。我们的产品通过用户自定义添加招聘信息，满足用户定制化的需求，方便用户查看招聘信息状态，小程序端还能够给用户推送通知，避免用户没有及时查看招聘状态而错过招聘的机会。</p>
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
#introduce {
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
    text-indent: 41px;
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

#introduce::-webkit-scrollbar {
  display: none;
}
</style>

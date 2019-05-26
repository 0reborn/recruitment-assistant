<template>
  <div class="day_event">
    <div class="header">
      <div class="circle-label"></div>
      <div class="companyName">{{ event.company }}</div>
      <div class="postName">{{ event.post }}</div>
      <div class="remainDayNum">{{ event.remainDayNum }}天</div>
    </div>
    <div class="main">
      <div v-if="event.status && event.status.length != 0" class="statusInfo">
        <div class="info">
          <div class="left">
            <div class="name">{{ event.status.name }}</div>
          </div>
          <div class="right">
            <div class="method">{{ event.status.method }}</div>
          </div>
        </div>
        <div class="info">
          <div class="left">
            <div>时间</div>
          </div>
          <div class="right">
            <div class="date">{{ event.status.date.split(' ')[0].substr(5) }}</div>
            <div class="time">{{ event.status.date.split(' ')[1].substring(0, 5) }}</div>
          </div>
        </div>
        <div class="info">
          <div class="left">
            <div>地址</div>
          </div>
          <div class="right">
            <div class="address">{{ event.status.address }}</div>
          </div>
        </div>
      </div>
      <div v-else>
        <a @click="addStatus" href="#" class="addStatusBtn btn btn-sm btn-info">添加状态</a>
      </div>

      <div class="elseInfo" ref="elseInfo">
        <div v-for="prop in event.pros" :key="prop.key" class="info">
          <div class="key">{{ prop.key }}</div>：
          <div class="value">{{ prop.value }}</div>
        </div>

        <a
          v-if="event.status && event.status.length != 0"
          @click="editRecord"
          href="#"
          class="updateRecordBtn btn btn-sm btn-info"
        >更新状态</a>
      </div>
    </div>
    <div @click="unfold" class="unfold-btn">
      <div v-if="fold">
        更多
        <i class="el-icon-caret-bottom"></i>
      </div>
      <div v-else-if="!fold">
        收起
        <i class="el-icon-caret-top"></i>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      fold: true
    }
  },
  inject: ["reload"],
  props: {
    event: null
  },
  methods: {
    unfold() {
      if (this.fold) {
        $(this.$refs.elseInfo).slideDown(400)
      } else {
        $(this.$refs.elseInfo).slideUp(400)
      }
      this.fold = !this.fold
    },
    addStatus() {
      this.$root.$children[0].$refs.addStatusFrame.show(this.event.rid, 'home')
    },
    editRecord() {
      this.$root.$children[0].$refs.editFrame.show(this.event)
    }
  },
  components: {

  },
  created() {
    // console.log(this.event)
  }
}
</script>

<style lang="less">
@event-label-color: #ffd000;
@event-remainDayNum-bg-color: #f56c6c;
@event-border-color: green;

@event-info-font-size: 13.5px;

.day_event {
  margin-bottom: 15px;
  border: 1px solid @event-border-color;
  height: unset;

  .header {
    border-bottom: 1px solid @event-border-color;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 5px 5px;

    > div {
      height: 20px;
      line-height: 20px;
      font-size: (@event-info-font-size + 0.5px);
    }

    .circle-label {
      height: 14px;
      width: 14px;
      border-radius: 50%;
      background-color: @event-label-color;
    }

    .remainDayNum {
      background-color: @event-remainDayNum-bg-color;
      border-radius: 2px;
      padding: 0 2px;
      font-size: 13px;
    }
  }

  .main {
    font-size: @event-info-font-size;
    padding: 6px 15px;
    padding-top: 2px;

    .statusInfo {
      > div {
        margin-top: 6px;
      }
      .info {
        display: flex;
        // justify-content: space-between;

        .left {
          margin-right: 14px;
        }

        .right {
          max-width: 70%;
          display: flex;
          font-size: (@event-info-font-size - 1px);

          .time {
            background-color: #ccc000;
            border-radius: 2px;
            padding: 0 2px;
          }

          .date {
            margin-right: 15px;
            background-color: #00aa00;
            border-radius: 2px;
            padding: 0 2px;
          }

          .method {
            background-color: #666;
            border-radius: 2px;
            padding: 0 2px;
          }

          .address {
            max-width: 100%;
            overflow-x: scroll;
          }

          .address::-webkit-scrollbar {
            display: none;
          }
        }
      }
    }

    .addStatusBtn {
      margin-top: 5px;
      width: 100%;
      font-size: 95%;
    }

    .elseInfo {
      display: none;
      .info {
        margin-top: 6px;
        display: flex;
      }

      .updateRecordBtn {
        margin-top: 5px;
        width: 100%;
        font-size: 95%;
      }
    }
  }

  .unfold-btn {
    height: 20px;
    line-height: 18px;
    text-align: center;
    border-top: 1px solid @event-border-color;
    font-size: (@event-info-font-size - 1px);
    cursor: pointer;
  }

  .unfold-btn:hover {
    background-color: rgba(255, 255, 255, 0.2);
  }
}
</style>

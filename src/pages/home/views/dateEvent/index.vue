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
        <div style="margin-top: 9px" class="info">
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
@event-label-color: #00f600;
@event-remainDayNum-bg-color: #f57d6c;
@event-border-color: #616161;
@event-method-color: #979797;
@event-label-border-radius: 4px;
@event-label-padding-vertical: 0px;
@event-label-padding-horizon: 4px;
@event-info-font-size: 14.5px;

.day_event {
  margin-bottom: 15px;
  border: 1px solid @event-border-color;
  height: unset;
  border-radius: 3px;

  .header {
    border-bottom: 1px solid @event-border-color;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 5px 6.5px;
    overflow: hidden;

    > div {
      height: 20px;
      line-height: 20px;
      font-size: (@event-info-font-size + 0.5px);
    }

    .circle-label {
      height: 14px;
      width: 14px;
      border-radius: 50%;
      // background-color: @event-label-color;
      background-color: @event-method-color;
    }

    .remainDayNum {
      background-color: @event-remainDayNum-bg-color;
      border-radius: @event-label-border-radius;
      padding: @event-label-padding-vertical @event-label-padding-horizon;
      font-size: 13px;
    }
  }

  .main {
    font-size: @event-info-font-size;
    padding: 6px 12px;
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
            // background-color: #d4d400;
            background-color: (@primary-bg-color + @primary-btn-color * 2) / 3;

            border-radius: @event-label-border-radius;
            padding: @event-label-padding-vertical @event-label-padding-horizon;
          }

          .date {
            margin-right: 15px;
            // background-color: #33e033;
            background-color: (@primary-bg-color + @primary-btn-color * 2) / 3;

            border-radius: @event-label-border-radius;
            padding: @event-label-padding-vertical @event-label-padding-horizon;
          }

          .method {
            // background-color: @event-method-color;
            background-color: (@primary-bg-color + @primary-btn-color * 2) / 3;

            border-radius: @event-label-border-radius;
            padding: @event-label-padding-vertical @event-label-padding-horizon;
          }

          .address {
            max-width: 100%;
            overflow-x: scroll;
            font-size: @event-info-font-size;
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

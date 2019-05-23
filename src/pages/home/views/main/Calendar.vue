<template>
   <div id="calendar">
      <div class="overlay">
         <Calendar ref="Calendar"
            agoDayHide="1530115221"
            v-on:choseDay="clickDay"
            v-on:changeMonth="changeDate"></Calendar>
      </div>
      <div class="week-box container-fluid">
         <div class="week-box-header col-12">
            <button @click="lastWeek"
               class="btn btn-info">上一周</button>
            <button @click="unfold"
               class="btn btn-info">全部日历</button>
            <button @click="nextWeek"
               class="btn btn-info">下一周</button>
         </div>
         <div class="week-box-main col-12">
            <div class="date"
               v-for="date in LatterWeekDates"
               :key="date[0]">
               <div class="date-header">{{ date[0] }}&nbsp;&nbsp;&nbsp;{{ date[1] }}</div>
               <div class="date-event-box">
                  <div v-if="date[2]">
                     <DateEvent v-for="event in sortByRemainDayNum(dateEvent[date[0]])"
                        :key="event.rid"
                        class="date-event"
                        :event="event">
                     </DateEvent>
                  </div>
               </div>
            </div>
         </div>
      </div>
      <!-- <div class="div" @click="demo">点击跳到2019-4-29</div> -->
   </div>
</template>

<script>

import Calendar from "vue-calendar-component"
import DateEvent from "../dateEvent"

export default {

   data () {
      return {
         LatterWeekDates: [],
         dateEvent: null,
         currDate: null,
         currDateString: ''
      }
   },

   components: {
      Calendar,
      DateEvent
   },

   methods: {

      sortByRemainDayNum (arr) {
         return arr.slice().sort((a, b) => {
            return a.remainDayNum - b.remainDayNum
         })
      },

      clickDay (dateString) {

         this.fold()

         console.log("选中了", dateString) //选中某天

         this.displayByDate(dateString)
      },

      lastWeek () {
         var currTime = this.currDate.getTime()
         var lastSevenTime = currTime - 7 * 24 * 60 * 60 * 1000
         var lastSevenDate = new Date(lastSevenTime)

         var year = lastSevenDate.getFullYear()
         var month = lastSevenDate.getMonth() + 1
         month = month < 10 ? '0' + month : '' + month
         var day = lastSevenDate.getDate()
         day = day < 10 ? '0' + day : '' + day

         this.displayByDate(year + '-' + month + '-' + day)
      },

      nextWeek () {
         var currTime = this.currDate.getTime()
         var lastSevenTime = currTime + 7 * 24 * 60 * 60 * 1000
         var lastSevenDate = new Date(lastSevenTime)

         var year = lastSevenDate.getFullYear()
         var month = lastSevenDate.getMonth() + 1
         month = month < 10 ? '0' + month : '' + month
         var day = lastSevenDate.getDate()
         day = day < 10 ? '0' + day : '' + day

         this.displayByDate(year + '-' + month + '-' + day)
      },

      // clickToday (data) {

      // },

      changeDate (data) {
         console.log("左右点击切换月份", data) //左右点击切换月份
      },

      demo () {
         this.$refs.Calendar.ChoseMonth("2019-4-29") //跳到12月12日选中12月12日
      },

      // 初始化七天内容
      initSevenDays () {
         this.displayByDate()
      },

      // 根据日期改变展示的内容
      displayByDate (dateString = "") {

         var weekDays = ["周日", "周一", "周二", "周三", "周四", "周五", "周六"]

         var currDate = dateString ? new Date(dateString) : new Date()
         this.currDate = currDate
         var currTime = currDate.getTime()

         var currYear = currDate.getFullYear()
         var currMonth = currDate.getMonth() + 1 < 10 ? '0' + (currDate.getMonth() + 1) : '' + (currDate.getMonth() + 1)
         var currDay = currDate.getDate() < 10 ? '0' + currDate.getDate() : '' + currDate.getDate()
         var fullString = currYear + '-' + currMonth + '-' + currDay
         this.currDateString = fullString

         var flag = false
         for (var str in this.dateEvent) {
            if (str == fullString) {
               flag = true
               break
            }
         }

         var dates = [
            [
               fullString,
               weekDays[currDate.getDay()],
               flag ? true : false
            ]
         ]

         var year, month, day, week

         for (var i = 1; i < 7; i++) {

            var nextTime = currTime + i * 24 * 60 * 60 * 1000

            var newDate = new Date(nextTime)

            year = newDate.getFullYear()
            month = newDate.getMonth() + 1
            month = month < 10 ? '0' + month : '' + month
            day = newDate.getDate()
            day = day < 10 ? '0' + day : '' + day
            week = weekDays[newDate.getDay()]

            var fullDateString = year + "-" + month + "-" + day

            var find = false
            for (var string in this.dateEvent) {
               if (string == fullDateString) {
                  find = true
                  break
               }
            }

            dates.push([fullDateString, week, find ? true : false])

         }

         this.LatterWeekDates = dates
      },

      // 展开日历
      unfold () {
         $('.overlay').slideDown(400)
      },

      // 折叠日历
      fold () {
         $('.overlay').slideUp(400)
      },

      // 更新event数据
      updateDateEventData (dateString) {

         var _this = this

         $.ajax({
            url: _this.$apiServer + 'getRecord.php',
            method: 'GET',
            data: {
               uid: this.$store.state.userId
            },
            dataType: 'JSON',
            success: function (res) {
               if (res.code == '200') {
                  console.log(res.data)
                  _this.dateEvent = res.data
                  _this.displayByDate(dateString)
               } else if (res.code == '400') {
                  if (!_this.$store.state.isLogin) {
                     _this.showErrorMessage('请先登录')
                  } else {
                     _this.showErrorMessage('获取数据失败，原因：' + res.error)
                  }
               }
            }
         })
      },

      // 刷新当前页面
      update() {
         this.updateDateEventData(this.currDateString)
      }
   },

   created () {
      this.updateDateEventData("")
   }
}
</script>

<style lang="less">
#calendar {
   .wh_container {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      max-width: 700px;
   }

   .wh_content_item {
      height: 60px;
      font-size: 17px;
   }

   .wh_item_date {
      height: 50px;
      width: 50px;
   }

   .overlay {
      display: none;
      position: absolute;
      top: 0%;
      left: 0%;
      width: 100%;
      height: 100vh;
      background-color: rgba(0, 0, 0, 0.4);
      z-index: 999;
   }

   .week-box {
      height: 500px;
      padding: 0;

      .week-box-header {
         height: 15%;
         display: flex;
         justify-content: space-between;
         align-items: center;
      }

      .week-box-main {
         height: 90%;
         display: flex;
         overflow-y: scroll;

         > .date {
            width: 14.28%;
            height: 100%;
            // display: inline-block;

            .date-header {
               border: 1px solid #fff;
               height: 35px;
               line-height: 35px;
               text-align: center;
            }

            .date-event-box {
               padding: 10px 8px;
               border: 1px solid #fff;
               border-top: none;
               height: 105%;
            }
         }
      }

      .week-box-main::-webkit-scrollbar {
         display: none;
      }
   }
}
// .wh_container >>> .mark1 {
//    background-color: orange;
// }

// .wh_container >>> .mark2 {
//    background-color: blue;
// }
// .wh_content_item > .wh_isMark {
//    background: orange;
// }
// .wh_container >>> .wh_content_all {
//    /* background-color: red; */
// }
</style>

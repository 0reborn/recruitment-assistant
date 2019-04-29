<template>
   <div id="app">
      <transition name="calendar">
         <Calendar ref="Calendar" v-on:isToday="clickToday" agoDayHide="1530115221" v-on:choseDay="clickDay" v-on:changeMonth="changeDate"></Calendar>
      </transition>
      <p style="text-align: center">当前选中日期及未来6天：</p>
      <div class="currSevenDays">
         <div v-for="date in LatterWeekDates" :key="date">{{ date }}</div>
      </div>
      <div class="div" @click="demo">点击跳到2019-4-29</div>
   </div>
</template>

<script>

// import Element from 'element'

import Calendar from "vue-calendar-component"
import "@/common/css/calendar.css"

export default {

   data () {
      return {
         LatterWeekDates: []
      }
   },

   components: {
      Calendar
   },

   methods: {

      clickDay (dateString) {

         console.log("选中了", dateString) //选中某天

         var currDate = new Date(dateString)
         var currTime = currDate.getTime()

         var dates = [
            `${currDate.getFullYear()}-` +
            `${currDate.getMonth() + 1}-` +
            `${currDate.getDate()}`
         ]

         var nextTime, year, month, day

         for (var i = 1; i < 7; i++) {

            nextTime = currTime + i * 24 * 60 * 60 * 1000

            year = new Date(nextTime).getFullYear()
            month = new Date(nextTime).getMonth() + 1
            day = new Date(nextTime).getDate()

            dates.push(year + "-" + month + "-" + day)
         }

         this.LatterWeekDates = dates
      },

      clickToday (data) {
         console.log("跳到了本月今天", data) //跳到了本月
      },

      changeDate (data) {
         console.log("左右点击切换月份", data) //左右点击切换月份
      },

      demo () {
         this.$refs.Calendar.ChoseMonth("2019-4-29") //跳到12月12日选中12月12日
      }
   },

   created () {
      function format (date, index) {
         date = new Date(date)
         return `${date.getFullYear()}-${date.getMonth() + 1}-${index}`
      }
      setTimeout(() => {
         this.arr = [
            {
               date: format(new Date(), 3),
               className: "mark1"
            },
            {
               date: format(new Date(), 12),
               className: "mark2"
            }
         ]
         this.arr.push({
            date: format(new Date(), 15),
            className: "mark1"
         })
      }, 300)
   }
}
</script>

<!-- Add "scoped " attribute to limit CSS to this component only -->
<style>
h3 {
   text-align: center;
   width: 90%;
   margin: auto;
}

.div {
   margin: auto;
   width: 220px;
   height: 44px;
   line-height: 44px;
   background: #0fc37c;
   color: #fff;
   font-size: 17px;
   text-align: center;
   margin-top: 20px;
}

.wh_container >>> .mark1 {
   background-color: orange;
}

.wh_container >>> .mark2 {
   background-color: blue;
}
.wh_content_item > .wh_isMark {
   background: orange;
}
.wh_container >>> .wh_content_all {
   /* background-color: red; */
}
.currSevenDays {
   display: flex;
   justify-content: center;
}
.currSevenDays > div {
   display: inline-block;
   border: 1px solid green;
   padding: 10px;
}
</style>
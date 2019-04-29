<template>
   <div id="app">
      <div class="overlay">
         <Calendar ref="Calendar" v-on:isToday="clickToday" agoDayHide="1530115221" v-on:choseDay="clickDay" v-on:changeMonth="changeDate"></Calendar>
      </div>
      <el-row style="text-align: center">
         当前选中日期及未来6天：
      </el-row>
      <el-row>
         <div class="currSevenDays">
            <div v-for="date in LatterWeekDates" :key="date">
               {{ date }}<br>
               <div v-for="(event, index) in serverReturnData[date]" :key="index">
                  {{ event['company'] }}<br>
                  {{ index }}
               </div>
            </div>
         </div>
      </el-row>
      <!-- <div class="div" @click="demo">点击跳到2019-4-29</div> -->
      <el-row type="flex" justify="center">
         <el-button @click="unfold" type="success">展开日历</el-button>
      </el-row>
   </div>
</template>

<script>

import Calendar from "vue-calendar-component"
import "./styles/calendar.less"

import $http from "@/utils/http"

export default {

   data () {
      return {
         LatterWeekDates: [],
         serverReturnData: {
            "2019-5-1": [
               {
                  "company": "完美世界",
                  "area": "京津冀地区",
                  "post": "游戏开发",
                  "description": "完美世界游戏开发岗位（PC端，移动端），笔试",
                  "startDate": "2019.4.30",
                  "endDate": "2019.5.4",
                  "startTime": "15:00",
                  "endTime": "16:30",
                  "tags": [
                     "游戏开发",
                     "笔试"
                  ]
               },

               {
                  "company": "腾讯",
                  "area": "深圳",
                  "post": "产品运营",
                  "description": "腾讯产品运营岗位，网络在线面试",
                  "startDate": "2019.4.18",
                  "endDate": "2019.5.20",
                  "startTime": "19:00",
                  "endTime": "21:30",
                  "tags": [
                     "产品运营",
                     "视频面试"
                  ]
               }
            ],

            "2019-5-2": [],

            "2019-5-4": []
         }
      }
   },

   components: {
      Calendar
   },

   methods: {

      clickDay (dateString) {

         $http.get('https://bird.ioliu.cn/joke/?type=text').then(res => {
            console.log(res.data)
         })

         $('.overlay').slideUp(400)

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

      unfold () {
         $('.overlay').slideDown(400)
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
<style lang="less">
#app .el-row {
   position: static;
   margin-bottom: 20px;
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
.overlay {
   position: absolute;
   top: 0%;
   left: 0%;
   width: 100%;
   height: 100vh;
   background-color: rgba(0, 0, 0, 0.4);
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
<template>
  <div class="body">
    <Row type="flex" justify="end" style="margin-bottom: 5px;color:#FF4D4D">
      <span style="font-size:20px;display: inline-block;margin-top: -4px">* </span>告警按发生时间统计
    </Row>
    <Row style="margin-bottom: 20px" :gutter="16">
      <Col span="16">
      <Row class="box">
        <Row type="flex" justify="start" class="titleBar">告警次数</Row>
        <Row>
          <Row type="flex" justify="start" style="margin: 20px">
            <DatePicker v-model="time1" :options="options2" :transfer='true' @on-change="timeChange1" placement="bottom-start" format="yyyy-MM-dd" type="daterange" placeholder="选择日期" style="width:300px" :tranfer="true"></DatePicker>
          </Row>
          <Row>
            <div id="barBox"></div>
          </Row>
        </Row>
      </Row>
      </Col>
      <Col span="8">
      <Row class="box">
        <Row type="flex" justify="start" class="titleBar">告警数据占比</Row>
        <Row>
          <Row type="flex" justify="start" style="margin:20px">
            <DatePicker  v-model="time2" :options="options2" :transfer='true' @on-change="timeChange2" placement="bottom-start" format="yyyy-MM-dd" type="daterange" placeholder="选择日期" style="width:300px" :tranfer="true"></DatePicker>
          </Row>
          <Row>
            <div id="pieBox"></div>
          </Row>
        </Row>
      </Row>
      </Col>
    </Row>
    <Row  class="box">
      <Row type="flex" justify="start" style="background: #f3f3f3">
        <div v-for="(item,index) in btnList" :key="index"  :class="btnIndex === index ? 'customBtn customBtn-checked': 'customBtn customBtn-default'"  @click="changeBtn(index)">{{item.name}}告警</div>
      </Row>
      <Row>
        <Row type="flex" justify="start" style="margin: 20px">
          <div style="float: left" v-if="isShow">
            <div v-for="(item,index) in btnTank" :key="index" @click="changeTank(index)" :class="tankIndex === index ? 'tankBtn tankBtn-checked' : 'tankBtn tankBtn-default'" >{{item.name}}号罐</div>
          </div>
          <DatePicker v-model="time3" :options="options2" :transfer='true' @on-change="timeChange3" placement="bottom-start" format="yyyy-MM-dd" type="daterange" placeholder="选择日期" style="width:300px" :tranfer="true"></DatePicker>
        </Row>
        <Row>
          <div id="lineBox"></div>
        </Row>
      </Row>
    </Row>
  </div>
</template>

<script>
  import echarts from 'echarts'
  import { alarmStatistics, alarmStatisticsType, oliTankMonitor, alarmStatisticsCountType, alarmPullList } from '../../api/api'
  export default {
    data () {
      return {
        alarmName: [],
        time1: [],
        time2: [],
        time3: [],
        isShow: false,
        typeList: [],
        btnList: [
          // {
          //   name:'油枪气液比告警',
          //   type: 0
          // },
          // {
          //   name:'油罐压力告警',
          //   type: 1
          // },
          // {
          //   name:'测漏压力告警',
          //   type: 2
          // },
          // {
          //   name:'油气浓度告警',
          //   type: 3
          // },
          // {
          //   name:'油罐温度告警',
          //   type: 4
          // }
        ],
        btnTank: [],
        locationList: [],
        alarmData: [],
        alarmType: [],
        typeData: [],
        btnIndex: 0,
        tankIndex: 0,
        paramnter1: {
          gasStationId: '',
          startTime: '',
          endTime: ''
        },
        paramnter2: {
          gasStationId: '',
          startTime: '',
          endTime: ''
        },
        paramnter3: {
          gasStationId: '',
          oilTankId: '',
          alarmType: 0,
          startTime: '',
          endTime: ''
        },
        options2:{
          shortcuts: [
            {
              text: '今日',
              value () {
                const end = new Date();
                const start = new Date();
                return [start, end];
              }
            },
            {
              text: '近一周',
              value () {
                const end = new Date();
                const start = new Date();
                start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
                return [start, end];
              }
            },
            {
              text: '近一个月',
              value () {
                const end = new Date();
                const start = new Date();
                start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
                return [start, end];
              }
            }
          ]
        },
        chart: {}
      }
    },
    mounted () {
      let vm = this
      vm.drawLine('barBox', vm.alarmData)
      vm.drawPie('pieBox', vm.alarmType)
      vm.drawLine('lineBox', vm.typeData)
    },
    methods: {
      // 日期格式转换-------------------
      formatDate (date) {
        var y = date.getFullYear()
        var m = date.getMonth() + 1
        m = m < 10 ? '0' + m : m
        var d = date.getDate()
        d = d < 10 ? ('0' + d) : d
        var newDate = y + '-' + m + '-' + d
        return newDate
      },
      timeChange1 (change) {
        if (change[0] !== '' && change[1] !== undefined) {
          this.paramnter1.startTime = this.formatDate(new Date(change[0]))
          this.paramnter1.endTime = this.formatDate(new Date(change[1]))
        } else {
          this.paramnter1.startTime = undefined
          this.paramnter1.endTime = undefined
        }
        this.getAlarmCount(this.paramnter1)
      },
      timeChange2 (change) {
        if (change[0] !== '' && change[1] !== undefined) {
          this.paramnter2.startTime = this.formatDate(new Date(change[0]))
          this.paramnter2.endTime = this.formatDate(new Date(change[1]))
        } else {
          this.paramnter2.startTime = undefined
          this.paramnter2.endTime = undefined
        }
        this.getalarmType(this.paramnter2)
      },
      timeChange3 (change) {
        if (change[0] !== '' && change[1] !== undefined) {
          this.paramnter3.startTime = this.formatDate(new Date(change[0]))
          this.paramnter3.endTime = this.formatDate(new Date(change[1]))
        } else {
          this.paramnter3.startTime = undefined
          this.paramnter3.endTime = undefined
        }
        this.getAlarmTypeLine(this.paramnter3)
      },
      changeBtn (index) {
        this.btnIndex = index
        if (index ===1 || index === 2) {
          this.isShow = true
          this.paramnter3.oilTankId = this.btnTank[this.tankIndex].id
        } else {
          this.isShow = false
          this.paramnter3.oilTankId = ''
        }
        this.paramnter3.alarmType = this.btnList[index].id
        this.getAlarmTypeLine(this.paramnter3)
      },
      changeTank (index) {
        this.tankIndex = index
        this.paramnter3.oilTankId = this.btnTank[index].id
        this.getAlarmTypeLine(this.paramnter3)
      },
      getTime (AddDayCount) {
        var dd = new Date();
        dd.setDate(dd.getDate()+AddDayCount);//获取AddDayCount天后的日期
        var y = dd.getFullYear();
        var m = dd.getMonth()+1;//获取当前月份的日期
        var d = dd.getDate();
        return y+'-'+(m<10?'0'+m:m)+'-'+(d<10?'0'+d:d);
      },
      // 折线图
      drawLine (id, edata) {
        let vm = this
        if (document.getElementById(id) === null) {
          return false
        }
        let _chart = {}
        _chart[id] = echarts.init(document.getElementById(id))
        vm.chart = Object.assign({}, vm.chart, _chart)
        let toady = vm.getTime(0)
        let tommow = vm.getTime(1)
        var anchor = [
          {name: toady, value:[toady, 0]},
          {name:tommow, value:[tommow, 0]}
        ]
        // let data = [
        //   [
        //     {name:'2019-06-20 00:00:00', value:['2019-06-20 00:00:00', 1]},
        //   ],
        //   [
        //     {name:'2019-06-20 00:00:00', value:['2019-06-20 00:00:00', 2]},
        //   ],
        //   [
        //     {name:'2019-06-20 00:00:00', value:['2019-06-20 00:00:00', 3]},
        //   ]
        // ]
        let areaColor = [
          [
            {
              offset: 0,
              color: '#FF8D2A'
            },
            {
              offset: 1,
              color: 'rgba(255,255,255,0)'
            }
          ],
          [
            {
              offset: 0,
              color: '#FF4D4D'
            },
            {
              offset: 1,
              color: 'rgba(255,255,255,0)'
            }
          ],
          [
            {
              offset: 0,
              color: '#9345FF'
            },
            {
              offset: 1,
              color: 'rgba(255,255,255,0)'
            }
          ]
        ]
        let nameList = ['全部告警','预警', '报警']
        let option = {
          tooltip: {
            trigger: 'axis',
            // alwaysShowContent: true,
            position: function (pt) {
              return [pt[0], '10%'];
            },
            textStyle: {
              color: '#333',
              align: 'left'
            },
            backgroundColor: '#fff',
            borderColor: '#74CFFF',
            borderWidth: 1,
            formatter: function (params) {
              let name =''
              let time = params[0].data.value[0]
              let value = 0
              let result = time + '<br>'
              for (let i = 0; i < params.length; i++) {
                if (params[i].seriesName !== '.anchor') {
                  name =  params[i].seriesName
                  value = params[i].data.value[1]
                  result +=  name + ':' + value + '<br>'
                }
              }
              return result
            },
          },
          legend: {
            data: nameList,
            right: '10%'
          },
          grid: {
            bottom: '20%',
            top: '15%',
            left: '5%',
            right: '10%'
          },
          xAxis: {
            type: 'time',
            name: '(时间)',
            nameTextStyle: {
              color: '#333',
              fontSize: 14
            },
            boundaryGap: false,
            splitLine: {
              show: false
            },
            axisLine: {
              show: false,
            },
            axisTick: {
              show: false
            },
            axisLabel: {
              color: '#333',
              fontSize: 12
            }
          },
          yAxis: {
            type: 'value',
            name: '(次)',
            nameTextStyle: {
              color: '#333',
              fontSize: 14
            },
            splitLine: {
              show: true,
              lineStyle: {
                color: '#E6E6E6'
              }
            },
            axisLine: {
              show: false,
            },
            axisTick: {
              show: false
            },
            axisLabel: {
              color: '#333',
              fontSize: 12
            },
            boundaryGap: [0, '100%']
          },
          series: (function () {
            let result = []
            if (edata !== undefined && edata.length !== 0) {
              edata.forEach((item,index) => {
                result.push({
                  name:nameList[index],
                  type:'line',
                  symbol: 'emptyCircle',
                  smooth: true,
                  itemStyle: {
                    normal: {
                      color: areaColor[index] === undefined ? 'red' :areaColor[index][0] .color
                    }
                  },
                  areaStyle: {
                    normal: {
                      color: new echarts.graphic.LinearGradient(1, 0, 1, 1, areaColor[index])
                    }
                  },
                  data:item
                })
              })
            }
            result.push({
              name:'.anchor',
              type:'line',
              showSymbol:false,
              data:anchor,
              itemStyle:{normal:{opacity:0}},
              lineStyle:{normal:{opacity:0}}
            })
            return result
          })()
        }
        if (edata.length === 0) {
          vm['chart'][id].clear()
        }
        vm['chart'][id].setOption(option)
      },
      // 饼状图
      drawPie (id,edata, total) {
        let vm = this
        if (document.getElementById(id) === null) {
          return false
        }
        let _chart = {}
        _chart[id] = echarts.init(document.getElementById(id))
        vm.chart = Object.assign({}, vm.chart, _chart)
        let colorList = ['#FFB852','#ED5FC3','#8553FF', '#29BCFF', '#44E9EC']
        let option = {
          title: {
            text: total,
            x: '37%',
            y: '45%',
            textStyle:{
              color: '#333',
              fontSize: 18
            }
          },
          grid: {
            left: "5%",
            top: "15%",
            bottom: "10%",
            right: "5%",
            containLabel: true
          },
          tooltip : {
            trigger: 'item',
            textStyle: {
              align: 'left'
            },
            formatter: "{a} <br/>{b} : {d}%"
          },
          color:edata.length === 0 ? ['#ff8c37'] : colorList,
          legend: {
            top: "top",
            left: '70%',
            itemWidth: 15,
            data: vm.alarmName,
            formatter:function(name){
              var oa = option.series[0].data;
              for(var i = 0; i < option.series[0].data.length; i++){
                if(name==oa[i].name){
                  return name + '  ' + oa[i].value ;
                }
              }
            }
          },
          series : [
            {
              name: '告警数据占比',
              type: 'pie',
              radius : [50,80],
              center: ['40%', '50%'],
              data: edata.length === 0 ? [0] : edata,
              itemStyle: {
                emphasis: {
                  shadowBlur: 10,
                  shadowOffsetX: 0,
                  shadowColor: 'rgba(0, 0, 0, 0.5)'
                },
                normal: {
                  label:{
                    show: true,
//	                            position:'inside',
                    formatter: '{d}%'
                  }
                },
                labelLine :{show:true}
              }
            }
          ]
        }
        vm['chart'][id].setOption(option)
      },
      getAlarmCount (par) {
        this.alarmData = []
        alarmStatistics(par).then((res) => {
          if (res.data.code === 1000) {
            let earlyWaring = []
            let alarmCount = []
            let total = []
            for (let i = 0; i < res.data.content.length; i++) {
              let s1 = {
                name: res.data.content[i].time,
                value: [res.data.content[i].time, res.data.content[i].earleWarningCount]
              }
              earlyWaring.push(s1)
              let s2 = {
                name: res.data.content[i].time,
                value: [res.data.content[i].time, res.data.content[i].alarmCount]
              }
              alarmCount.push(s2)
              let s3 = {
                name: res.data.content[i].time,
                value: [res.data.content[i].time, res.data.content[i].total]
              }
              total.push(s3)
            }
            this.alarmData = [total, earlyWaring, alarmCount]
          } else {
            this.alarmData = []
          }
          this.drawLine('barBox', this.alarmData)
        })
      },
      // 告警数据占比
      getalarmType (par) {
        this.alarmType = []
        let total = 0
        alarmStatisticsType(par).then((res) => {
          if (res.data.code === 1000) {
            let result = res.data.content
            for (let i = 0; i < result.length; i++) {
              total += result[i].count
              let s = {
                value: result[i].count,
                name: ''
                  // result[i].alarmType === 0 ? '油枪气液比' : result[i].alarmType === 1 ? '油罐压力' : result[i].alarmType === 2 ? '测漏压力':  result[i].alarmType === 3 ? '油气浓度' : result[i].alarmType === 4 ? '油罐温度' : ''
              }
              for (let j = 0; j < this.btnList.length; j++) {
                if (result[i].alarmType === this.btnList[j].id) {
                  s.name = this.btnList[j].name
                }
              }
              this.alarmType.push(s)
            }
          } else {
            this.alarmType = []
          }
          this.drawPie('pieBox', this.alarmType, total)
        })
      },
      // 油罐
      getTank () {
        this.btnTank = []
        let par = {
          gasStationId: this.gasStationId
        }
        oliTankMonitor(par).then((res) => {
          if (res.data.code === 1000) {
            this.btnTank = res.data.content
          } else {
            this.btnTank = []
          }
          this.getAlarmTypeLine(this.paramnter3)
        })
      },
      // 告警类型统计
      getAlarmTypeLine (par) {
        alarmStatisticsCountType(par).then((res) => {
          this.typeData = []
          if (res.data.code === 1000) {
            let earlyWaring = []
            let alarmCount = []
            let total = []
            if (res.data.content.length > 0) {
              for (let i = 0; i < res.data.content.length; i++) {
                let s1 = {
                  name: res.data.content[i].time,
                  value: [res.data.content[i].time, res.data.content[i].earleWarningCount]
                }
                earlyWaring.push(s1)
                let s2 = {
                  name: res.data.content[i].time,
                  value: [res.data.content[i].time, res.data.content[i].alarmCount]
                }
                alarmCount.push(s2)
                let s3 = {
                  name: res.data.content[i].time,
                  value: [res.data.content[i].time, res.data.content[i].total]
                }
                total.push(s3)
              }
            }
            this.typeData = [total, earlyWaring, alarmCount]
          }
          this.drawLine('lineBox', this.typeData)
        })
      },
      // 告警类型下拉
      getTypeList () {
        this.alarmName = []
        alarmPullList().then((res) => {
          if (res.data.code === 1000) {
            this.btnList = res.data.content
            for (let i = 0; i < this.btnList.length; i++) {
              this.alarmName.push(this.btnList[i].name)
            }
          } else {
            this.btnList = []
          }
        })
      },
    },
    created:function () {
      this.time1 = [this.formatDate(new Date()), this.formatDate(new Date())]
      this.paramnter1.startTime = this.formatDate(new Date())
      this.paramnter1.endTime = this.formatDate(new Date())
      this.time2 = [this.formatDate(new Date()), this.formatDate(new Date())]
      this.paramnter2.startTime = this.formatDate(new Date())
      this.paramnter2.endTime = this.formatDate(new Date())
      this.time3 = [this.formatDate(new Date()), this.formatDate(new Date())]
      this.paramnter3.startTime = this.formatDate(new Date())
      this.paramnter3.endTime = this.formatDate(new Date())
      this.getTypeList()
      if (sessionStorage.getItem('station') !== null) {
        this.gasStationId = JSON.parse(sessionStorage.getItem('station')).stationId
        this.paramnter1.gasStationId = this.gasStationId
        this.paramnter2.gasStationId = this.gasStationId
        this.paramnter3.gasStationId = this.gasStationId
        // 告警次数
        this.getAlarmCount(this.paramnter1)
        // 告警数据占比
        this.getalarmType(this.paramnter2)
        // 油罐
        this.getTank()
      }
    }
  }
</script>

<style scoped>
  .box{
    background: #fff;
    box-shadow:0px 2px 17px 0px rgba(206,206,203,0.5);
  }
  #lineBox{
    width: 100%;
    height:250px;
  }
  .titleBar {
    background: #F3F3F3;
    font-size:18px;
    color: #333;
    padding: 10px 20px
  }
  #barBox{
    width: 100%;
    height: 250px;
  }
  #pieBox{
    width: 100%;
    height: 250px;
  }
  .customBtn{
    font-size: 16px;
    padding: 10px 20px;
    cursor: pointer;
    background: #F3F3F3;
    float: left;
    color: #999;
  }
  .customBtn-checked {
    background: #fff;
    color:#333
  }
  .customBtn-default {
    background:#F3F3F3;
    color:#999;
  }
  .tankBtn{
    padding: 5px 10px;
    border-radius:18px;
    color: #999;
    background: #fff;
    cursor: pointer;
    float: left;
    margin-right: 10px;
    border: 1px solid #999;
  }
  .tankBtn:last-child{
    margin-right: 50px;
  }
  .tankBtn-default {
    background:#fff;
    color:#999;
    border:1px solid #999
  }
  .tankBtn-checked {
    background: #1A9CF4;
    color:#fff;
    border: 1px solid #1A9CF4;
  }
</style>

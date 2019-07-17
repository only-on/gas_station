<template>
<div class="body">
  <Row  class="box">
    <Row type="flex" justify="start" class="titleBar">气液比统计数据</Row>
    <Row>
      <div class="searchBox" style="margin-top: 20px">
        <Select :transfer='true' v-model="paramnter1.nozzleId" style="width:150px;margin:0 20px" clearable placeholder="油枪编号" @on-change="changeNozzle">
          <Option v-for="(item,index) in tankerList" :key="index"  :value="item.value">{{item.name}}# 枪</Option>
        </Select>
        <DatePicker v-model="time1" :options="options1" :transfer='true' @on-change="timeChange1" placement="bottom-start" format="yyyy-MM-dd" type="daterange" placeholder="选择日期和时间" style="width:300px" :tranfer="true"></DatePicker>
      </div>
      <Row>
        <div id="lineBox"></div>
      </Row>
    </Row>
  </Row>
  <Row style="margin-top: 20px" :gutter="16">
    <Col span="16">
      <Row class="box">
        <Row type="flex" justify="start" class="titleBar">加油次数统计</Row>
        <Row>
          <Row type="flex" justify="start" style="margin: 20px">
            <DatePicker v-model="time2" :options="options1" :transfer='true' @on-change="timeChange2" placement="bottom-start" format="yyyy-MM-dd" type="daterange" placeholder="选择日期" style="width:300px" :tranfer="true"></DatePicker>
          </Row>
          <Row>
            <div id="barBox"></div>
          </Row>
        </Row>
      </Row>
    </Col>
    <Col span="8">
    <Row class="box">
      <Row type="flex" justify="start" class="titleBar">油品占比统计</Row>
      <Row>
        <Row type="flex" justify="start" style="margin: 20px">
          <DatePicker v-model="time3" :options="options1" :transfer='true' @on-change="timeChange3" placement="bottom-start" format="yyyy-MM-dd" type="daterange" placeholder="选择日期" style="width:300px" :tranfer="true"></DatePicker>
        </Row>
        <Row>
          <div id="pieBox"></div>
        </Row>
      </Row>
    </Row>
    </Col>
  </Row>
</div>
</template>

<script>
  import echarts from 'echarts'
  import {formatDate , getTime} from '@/vendor/date'
  import { nozzlePullList, nozzleStatistics, nozzleRefuel, oliStatistics } from '../../api/api'
  export default {
    data () {
      return {
        time1: [],
        time2: [],
        time3: [],
        gasStationId: '',
        tankerList: [],
        gasLiquidData: [],
        refuelData: {
          xData: [],
          yData: []
        },
        oilData:{
          xData: [],
          yData: []
        },
        paramnter1: {
          nozzleId: '',
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
          startTime: '',
          endTime: ''
        },
        options1: {
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
        }
      };
    },
    mounted () {
      let vm = this
      vm.drawLine('lineBox', vm.gasLiquidData)
      vm.drawBar('barBox', vm.refuelData)
      vm.drawPie('pieBox', vm.oilData)
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
      changeNozzle (change) {
        if (change !== undefined) {
          this.paramnter1.nozzleId = change
        } else {
          this.paramnter1.nozzleId = ''
        }
        this.getGasLiquid(this.paramnter1)
      },
      getNozzleList (id) {
        let par = {
          gasStationId: id
        }
        nozzlePullList(par).then((res) => {
          if (res.data.code === 1000) {
            this.tankerList = res.data.content
            if (this.tankerList.length !== 0) {
              if (this.$route.params.nozzleId !== undefined) {
                this.paramnter1.nozzleId = this.$route.params.nozzleId
              } else {
                this.paramnter1.nozzleId = this.tankerList[0].value
              }
              this.getGasLiquid(this.paramnter1)
            }
          } else {
            this.tankerList = []
          }
        })
      },
      timeChange1 (change) {
        if (change[0] !== '' && change[1] !== undefined) {
          this.paramnter1.startTime = this.formatDate(new Date(change[0]))
          this.paramnter1.endTime = this.formatDate(new Date(change[1]))
        } else {
          this.paramnter1.startTime = undefined
          this.paramnter1.endTime = undefined
        }
        this.getGasLiquid(this.paramnter1)
      },
      timeChange2 (change) {
        if (change[0] !== '' && change[1] !== undefined) {
          this.paramnter2.startTime = this.formatDate(new Date(change[0]))
          this.paramnter2.endTime = this.formatDate(new Date(change[1]))
        } else {
          this.paramnter2.startTime = undefined
          this.paramnter2.endTime = undefined
        }
        this.getRefuelCount(this.paramnter2)
      },
      timeChange3 (change) {
        if (change[0] !== '' && change[1] !== undefined) {
          this.paramnter3.startTime = this.formatDate(new Date(change[0]))
          this.paramnter3.endTime = this.formatDate(new Date(change[1]))
        } else {
          this.paramnter3.startTime = undefined
          this.paramnter3.endTime = undefined
        }
        this.getOliCount(this.paramnter3)
      },
      getTime (AddDayCount) {
        var dd = new Date();
        dd.setDate(dd.getDate()+AddDayCount);//获取AddDayCount天后的日期
        var y = dd.getFullYear();
        var m = dd.getMonth()+1;//获取当前月份的日期
        var d = dd.getDate();
        return y+'/'+(m<10?'0'+m:m)+'/'+(d<10?'0'+d:d);
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
        let toady = vm.getTime(0) + ' 00:00:00'
        let tommow = vm.getTime(1) + ' 00:00:00'
        var anchor = [
          {name: toady, value:[toady, 0]},
          {name:tommow, value:[tommow, 0]}
        ]
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
              let date = params[0].name.split(' ')[0]
              let time = params[0].name.split(' ')[1]
              let value = params[0].data.value[1]
              return date + '<br>' + time + '<br>' + '气液比：' + value
            },
          },
          grid: {
            bottom: '20%',
            top: '10%',
            left: '5%',
            right: '5%'
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
            name: '(气液比)',
            nameTextStyle: {
              color: '#333',
              fontSize: 14
            },
            splitLine: {
              show: true,
              lineStyle: {
                color: 'rgba(255, 48, 48, 0.3)'
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
            // min:0,
            // max: 2.6,
            // interval:0.4,
            boundaryGap: [0, '100%']
          },
          series: [
            {
              name:'气液比',
              type:'line',
              symbol: 'emptyCircle',
              itemStyle: {
                normal: {
                  color: '#FF1C1C'
                }
              },
              data: edata
            },
            {
              name:'.anchor',
              type:'line',
              showSymbol:false,
              data:anchor,
              itemStyle:{normal:{opacity:0}},
              lineStyle:{normal:{opacity:0}}
            }]
        }
        vm['chart'][id].setOption(option)
        // if (edata.length !== 0) {
        //   vm['chart'][id].dispatchAction({
        //     type: 'showTip',
        //     seriesIndex: 0,
        //     dataIndex: edata.length - 1
        //   })
        // }
      },
      // 柱状图
      drawBar (id,edata) {
        let vm = this
        if (document.getElementById(id) === null) {
          return false
        }
        let _chart = {}
        _chart[id] = echarts.init(document.getElementById(id))
        vm.chart = Object.assign({}, vm.chart, _chart)
        let option = {
          tooltip: {
            trigger: "item",
            show: true
          },
          grid: {
            left: "5%",
            top: "15%",
            bottom: "10%",
            right: "10%",
            containLabel: true
          },
          label: {
            show: false,
            position: 'top',
            color: '#333',
            fontSize: 14
          },
          xAxis: {
            name: '（油枪编号）',
            data: edata.xData,
            type: 'category',
            splitLine: {
              show: false
            },
            axisLine: {
              show: true
            },
            axisTick: {
              show: false
            },
            axisLabel: {
              color: '#333',
              fontSize: 12,
              interval: 0,
            }
          },
          yAxis: {
            type: 'value',
            name: '（次）',
            splitLine: {
              show: true,
              lineStyle: {
                color: '#D5D5D5'
              }
            },
            axisLine: {
              show: true
            },
            axisTick: {
              show: false
            },
            axisLabel: {
              color: '#333',
              fontSize: 12
            }
          },
          series:[
            {
              name: '加油次数',
              type: 'bar',
              animation: false,
              barWidth: 12,
              data: edata.yData,
              tooltip: {
                show: true
              },
              itemStyle: {
                normal: {
                  color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                    offset: 0,
                    color: '#9773FE'
                  }, {
                    offset: 1,
                    color: '#C8ABFF'
                  }]),
                  barBorderRadius: 8
                },
              },
            }
          ]
        }
        vm['chart'][id].setOption(option)
      },
      // 饼状图
      drawPie (id,edata) {
        let vm = this
        if (document.getElementById(id) === null) {
          return false
        }
        let _chart = {}
        _chart[id] = echarts.init(document.getElementById(id))
        vm.chart = Object.assign({}, vm.chart, _chart)
        let colorList = ['#FF8989','#C5EC49','#42D1F6']
        let option = {
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
            formatter: "{a} <br/>{b} : {d}% ({c}L)"
          },
          color:edata.yData.length === 0 ? ['#ff8c37'] : colorList,
          legend: {
            top: "top",
            left: '70%',
            orient: 'vertical',
            itemWidth: 15,
            data: edata.xData,
            formatter:function(name){
              var oa = option.series[0].data
              for(let i = 0; i < option.series[0].data.length; i++){
                if(name==oa[i].name){
                  return name + '  ' + oa[i].value + 'L'
                }
              }
            }
          },
          series : [
            {
              name: '油品占比',
              type: 'pie',
              radius : '65%',
              center: ['40%', '50%'],
              data: edata.yData.length === 0 ? [0] : edata.yData,
              itemStyle: {
                emphasis: {
                  shadowBlur: 10,
                  shadowOffsetX: 0,
                  shadowColor: 'rgba(0, 0, 0, 0.5)'
                },
                normal: {
                  label:{
                    show: true,
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
      // 气液比实时数据
      getGasLiquid (param) {
        this.gasLiquidData = []
        nozzleStatistics(param).then((res) => {
          if (res.data.code === 1000) {
            for (let i = 0; i < res.data.content.length; i++) {
              let s = {
                name: res.data.content[i].time,
                value: [res.data.content[i].time, res.data.content[i].value]
              }
              this.gasLiquidData.push(s)
            }
          } else {
            this.gasLiquidData = []
          }
          this.drawLine('lineBox', this.gasLiquidData)
        })
      },
      getRefuelCount (par) {
        this.refuelData.xData = []
        this.refuelData.yData = []
        nozzleRefuel(par).then((res) => {
          if (res.data.code === 1000) {
            for (let i = 0; i < res.data.content.length; i++) {
              this.refuelData.xData.push(res.data.content[i].number)
              this.refuelData.yData.push(res.data.content[i].count)
            }
          } else {
            this.refuelData.xData = []
            this.refuelData.yData = []
          }
          this.drawBar('barBox', this.refuelData)
        })
      },
      getOliCount (par) {
        this.oilData.xData = []
        this.oilData.yData = []
        oliStatistics(par).then((res) => {
          if (res.data.code === 1000) {
            for (let i = 0; i < res.data.content.length; i++) {
              let s = {
                value: res.data.content[i].oilFlow,
                name: res.data.content[i].oilNumber
              }
              this.oilData.yData.push(s)
              this.oilData.xData.push(res.data.content[i].oilNumber)
            }
          } else {

            this.oilData.xData = []
            this.oilData.yData = []
          }
          this.drawPie('pieBox', this.oilData)
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
      if (sessionStorage.getItem('station') !== null) {
        this.gasStationId = JSON.parse(sessionStorage.getItem('station')).stationId
        this.getNozzleList(this.gasStationId)
        this.paramnter2.gasStationId = this.gasStationId
        this.paramnter3.gasStationId = this.gasStationId
        // 加油次数统计
        this.getRefuelCount(this.paramnter2)
        // 油品占比统计
        this.getOliCount(this.paramnter3)
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
   height:300px;
 }
  .titleBar {
    background: #F3F3F3;
    font-size:18px;
    color: #333;
    padding: 10px 20px
  }
  #barBox{
    width: 100%;
    height: 220px;
  }
  #pieBox{
    width: 100%;
    height: 220px;
  }
</style>

<template>
  <div class="body">
    <Row :gutter="16">
      <Col span="12">
      <div class="echarts-content" style="margin-bottom: 20px;">
        <div class="card-top-box">
          <div class="card-title-text">
            油罐压力数据分析
          </div>
          <div style="float: right">
            <div v-for="(item, index) in tankList" :key="item.id" :class="checkedTank1 === index ? 'card-top-tank-checked' : 'card-top-tank-defult'"  @click="changeTank1(index)">{{item.name}}号罐</div>

          </div>
        </div>
        <div class="card-content">
          <div class="card-search-bar">
            <DatePicker type="daterange" v-model="time1" :transfer='true' @on-change="timeChange1" :options="options2" placeholder="请选择时间段" style="width: 300px"></DatePicker>
          </div>
          <div id="tank_chart" style="width: 100%;height: 100%"></div>
        </div>
      </div>
      </Col>
      <Col span="12">
      <div class="echarts-content" style="margin-bottom: 20px;">
        <div class="card-top-box">
          <div class="card-title-text">
            测漏压力数据分析
          </div>
          <div style="float: right">
            <div v-for="(item, index) in tankList" :key="item.id" :class="checkedTank === index ? 'card-top-tank-checked' : 'card-top-tank-defult'"  @click="changeTank(index)">{{item.name}}号罐</div>

          </div>
        </div>
        <div class="card-content">
          <div class="card-search-bar">
            <DatePicker type="daterange" v-model="time2" :transfer='true' @on-change="timeChange2" :options="options2" placeholder="请选择时间段" style="width: 300px"></DatePicker>
          </div>
          <div id="leakage_chart" style="width: 100%;height: 100%"></div>
        </div>
      </div>
      </Col>
    </Row>
    <Row :gutter="16">
      <!--<Col span="12">-->
      <!--<div class="echarts-content" style="margin-bottom: 20px;">-->
        <!--<div class="card-top-box">-->
          <!--<div class="card-title-text">-->
            <!--油气浓度数据分析-->
          <!--</div>-->
        <!--</div>-->
        <!--<div class="card-content">-->
          <!--<div class="card-search-bar">-->
            <!--<DatePicker type="daterange" v-model="time3" :transfer='true' @on-change="timeChange3"  :options="options2" placeholder="请选择时间段" style="width: 300px"></DatePicker>-->
          <!--</div>-->
          <!--<div id="gas_oil_chart" style="width: 100%;height: 100%"></div>-->
        <!--</div>-->
      <!--</div>-->
      <!--</Col>-->
      <Col span="24">
      <div class="echarts-content" style="margin-bottom: 20px;">
        <div class="card-top-box">
          <div class="card-title-text">
            油罐温度数据分析
          </div>
          <div style="float: right">
            <div v-for="(item, index) in tankList" :key="item.id" :class="checkedTank2 === index ? 'card-top-tank-checked' : 'card-top-tank-defult'"  @click="changeTank2(index)">{{item.name}}号罐</div>
          </div>
        </div>
        <div class="card-content">
          <div class="card-search-bar">
            <DatePicker type="daterange" v-model="time4" :transfer='true' @on-change="timeChange4"  :options="options2" placeholder="请选择时间段" style="width: 300px"></DatePicker>
          </div>
          <div id="temperature_chart" style="width: 100%;height: 100%"></div>
        </div>
      </div>
      </Col>
    </Row>
  </div>
</template>

<script>
  import { oliTankMonitor, tankAnalyse, tankLeakageAnalyse, gasOilAnalyse, temperatureAnalyse } from '../../api/api'
  import echarts from 'echarts'
  export default {
    data () {
      return {
        time3: [],
        time4: [],
        time2: [],
        time1: [],
        paramnter1: {
          oilTankId: '',
          stationId: '',
          startTime: '',
          endTime: ''
        },
        paramnter2: {
          oilTankId: '',
          startTime: '',
          endTime: ''
        },
        paramnter3: {
          stationId: '',
          startTime: '',
          endTime: ''
        },
        paramnter4: {
          oilTankId: '',
          startTime: '',
          endTime: ''
        },
        options2: {
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
        checkedTank2: 0,
        checkedTank: 0,
        checkedTank1: 0,
        tankList: []
      }
    },
    mounted () {
      let vm = this
      vm.$nextTick(function () {
        vm.getOilTankList()
        vm.paramnter1.stationId = JSON.parse(sessionStorage.getItem('station')).stationId
        this.time1 = [this.formatDate(new Date()), this.formatDate(new Date())]
        vm.paramnter1.startTime = this.formatDate(new Date())
        vm.paramnter1.endTime = this.formatDate(new Date())
        // vm.paramnter3.stationId = JSON.parse(sessionStorage.getItem('station')).stationId
        // this.time3 = [this.formatDate(new Date()), this.formatDate(new Date())]
        // vm.paramnter3.startTime = this.formatDate(new Date())
        // vm.paramnter3.endTime = this.formatDate(new Date())
        this.time2 = [this.formatDate(new Date()), this.formatDate(new Date())]
        vm.paramnter2.startTime = this.formatDate(new Date())
        vm.paramnter2.endTime = this.formatDate(new Date())
        this.time4 = [this.formatDate(new Date()), this.formatDate(new Date())]
        vm.paramnter4.startTime = this.formatDate(new Date())
        vm.paramnter4.endTime = this.formatDate(new Date())
        // vm.getGasOil()
      })
    },
    methods: {
      getOilTankList () {
        let par = {
          gasStationId: JSON.parse(sessionStorage.getItem('station')).stationId
        }
        oliTankMonitor(par).then((res) => {
          if (res.data.code === 1000) {
            this.tankList = res.data.content
            this.paramnter1.oilTankId = this.tankList[0].id
            this.paramnter2.oilTankId = this.tankList[0].id
            this.paramnter4.oilTankId = this.tankList[0].id
          }
          this.tankLeakageAnalyse()
          this.getTemperature()
          this.getTank()
        })
      },
      getTank () {
        tankAnalyse(this.paramnter1).then((res) => {
          let edate = []
          if (res.data.code === 1000) {
            if (res.data.content.length > 0) {
              // 折线图数据
              for (let i = 0; i < res.data.content.length; i++) {
                let s = {
                  name: res.data.content[i].time,
                  value:[res.data.content[i].time, res.data.content[i].value]
                }
                edate.push(s)
              }
            }
          }
          this.drawLine('tank_chart', edate)
        })
      },
      tankLeakageAnalyse () {
        tankLeakageAnalyse(this.paramnter2).then((res) => {
          let edate = []
          if (res.data.code === 1000) {
            if (res.data.content.length > 0) {
              // 折线图数据
              for (let i = 0; i < res.data.content.length; i++) {
                let s = {
                  name: res.data.content[i].time,
                  value:[res.data.content[i].time, res.data.content[i].value]
                }
                edate.push(s)
              }
            }
          }
          this.drawLineLeakagePress('leakage_chart', edate)
        })
      },
      // getGasOil () {
      //   gasOilAnalyse(this.paramnter3).then((res) => {
      //     let edate = []
      //     if (res.data.code === 1000) {
      //       if (res.data.content.length > 0) {
      //         // 折线图数据
      //         for (let i = 0; i < res.data.content.length; i++) {
      //           let s = {
      //             name: res.data.content[i].time,
      //             value:[res.data.content[i].time, res.data.content[i].value]
      //           }
      //           edate.push(s)
      //         }
      //       }
      //     }
      //     this.drawLineGasOil('gas_oil_chart', edate)
      //   })
      // },
      getTemperature () {
        temperatureAnalyse(this.paramnter4).then((res) => {
          let edate = []
          if (res.data.code === 1000) {
            if (res.data.content.length > 0) {
              // 折线图数据
              for (let i = 0; i < res.data.content.length; i++) {
                let s = {
                  name: res.data.content[i].time,
                  value:[res.data.content[i].time, res.data.content[i].value]
                }
                edate.push(s)
              }
            }
          }
          this.drawLineTemperature('temperature_chart', edate)
        })
      },
      changeTank1 (index) {
        this.checkedTank1 = index
        this.paramnter1.oilTankId = this.tankList[index].id
        this.getTank()
      },
      changeTank (index) {
        this.checkedTank = index
        this.paramnter2.oilTankId = this.tankList[index].id
        this.tankLeakageAnalyse()
      },
      changeTank2 (index) {
        this.checkedTank2 = index
        this.paramnter4.oilTankId = this.tankList[index].id
        this.getTemperature()
      },
      getTime (AddDayCount) {
        var dd = new Date();
        dd.setDate(dd.getDate()+AddDayCount);//获取AddDayCount天后的日期
        var y = dd.getFullYear();
        var m = dd.getMonth()+1;//获取当前月份的日期
        var d = dd.getDate();
        return y+'/'+(m<10?'0'+m:m)+'/'+(d<10?'0'+d:d);
      },
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
        this.getTank()
      },
      timeChange2 (change) {
        if (change[0] !== '' && change[1] !== undefined) {
          this.paramnter2.startTime = this.formatDate(new Date(change[0]))
          this.paramnter2.endTime = this.formatDate(new Date(change[1]))
        } else {
          this.paramnter2.startTime = undefined
          this.paramnter2.endTime = undefined
        }
        this.tankLeakageAnalyse()
      },
      timeChange3 (change) {
        if (change[0] !== '' && change[1] !== undefined) {
          this.paramnter3.startTime = this.formatDate(new Date(change[0]))
          this.paramnter3.endTime = this.formatDate(new Date(change[1]))
        } else {
          this.paramnter3.startTime = undefined
          this.paramnter3.endTime = undefined
        }
        this.getGasOil()
      },
      timeChange4 (change) {
        if (change[0] !== '' && change[1] !== undefined) {
          this.paramnter4.startTime = this.formatDate(new Date(change[0]))
          this.paramnter4.endTime = this.formatDate(new Date(change[1]))
        } else {
          this.paramnter4.startTime = undefined
          this.paramnter4.endTime = undefined
        }
        this.getTemperature()
      },
      // 折线图4
      drawLineTemperature (id, edata) {
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
        let data = [
          {name:'2019/06/11 6:38:08', value:['2019/06/11 6:38:08', 80]},
          {name:'2019/06/11 8:18:18', value:['2019/06/11 8:18:18', 60]},
          {name:'2019/06/11 9:18:18', value:['2019/06/11 9:18:18', 90]}
        ]
        let option = {
          tooltip: {
            trigger: 'axis',
            // alwaysShowContent: true,
            position: function (pt) {
              return [pt[0], '10%'];
            },
            textStyle: {
              color: '#2c3e50',
              align: 'left'
            },
            backgroundColor: '#fff',
            borderColor: '#74CFFF',
            borderWidth: 1,
            formatter: function (params) {
              let time = params[0].name.split(" ")[1]
              let value = params[0].data.value[1]
              return time + '<br>' + '温度：' + value
            },
          },
          grid: {
            bottom: '20%',
            top: '20%',
            left: '10%',
            right: '10%'
          },
          title: {
            // left: 'left',
            // text: '气液比今日监控数据',
            // textStyle: {
            //   // color: '#80DAFF',
            //   fontSize: 18
            // }
          },
          xAxis: {
            type: 'time',
            name: '(时间)',
            nameTextStyle: {
              // color: '#74CFFF',
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
              // color: '#74CFFF',
              fontSize: 12
            }
          },
          yAxis: {
            type: 'value',
            name: '(℃)',
            nameTextStyle: {
              // color: '#74CFFF',
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
              // color: '#74CFFF',
              fontSize: 12
            },
            boundaryGap: [0, '100%']
          },
          series: [
            {
              name:'pa',
              type:'line',
              smooth: true,
              // symbol: 'none',
              // symbol: 'emptyCircle',
              itemStyle: {
                normal: {
                  color: '#FEB91A'
                }
              },
              areaStyle: {
                normal: {
                  color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                    offset: 0,
                    color: '#FEB91A'
                  },
                    // {
                    //   offset: 0.3,
                    //   color: '#822134'
                    // },
                    // {
                    //   offset: 0.7,
                    //   color: '#43203d'
                    // },
                    {
                      offset: 1,
                      color: '#fff'
                    }])
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
        // if (edata.length > 0) {
        //   vm['chart'][id].dispatchAction({
        //     type: 'showTip',
        //     seriesIndex: 0,
        //     dataIndex: edata.length - 1
        //   })
        // }
      },
      // 折线图3
      drawLineGasOil (id, edata) {
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
        let data = [
          {name:'2019/06/11 6:38:08', value:['2019/06/11 6:38:08', 80]},
          {name:'2019/06/11 8:18:18', value:['2019/06/11 8:18:18', 60]},
          {name:'2019/06/11 9:18:18', value:['2019/06/11 9:18:18', 90]}
        ]
        let option = {
          tooltip: {
            trigger: 'axis',
            // alwaysShowContent: true,
            position: function (pt) {
              return [pt[0], '10%'];
            },
            textStyle: {
              color: '#2c3e50',
              align: 'left'
            },
            backgroundColor: '#fff',
            borderColor: '#74CFFF',
            borderWidth: 1,
            formatter: function (params) {
              let time = params[0].name.split(" ")[1]
              let value = params[0].data.value[1]
              return time + '<br>' + '油气浓度：' + value
            },
          },
          grid: {
            bottom: '20%',
            top: '20%',
            left: '10%',
            right: '10%'
          },
          title: {
            // left: 'left',
            // text: '气液比今日监控数据',
            // textStyle: {
            //   // color: '#80DAFF',
            //   fontSize: 18
            // }
          },
          xAxis: {
            type: 'time',
            name: '(时间)',
            nameTextStyle: {
              // color: '#74CFFF',
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
              // color: '#74CFFF',
              fontSize: 12
            }
          },
          yAxis: {
            type: 'value',
            name: '(g/m³)',
            nameTextStyle: {
              // color: '#74CFFF',
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
              // color: '#74CFFF',
              fontSize: 12
            },
            boundaryGap: [0, '100%']
          },
          series: [
            {
              name:'pa',
              type:'line',
              smooth: true,
              // symbol: 'none',
              // symbol: 'emptyCircle',
              itemStyle: {
                normal: {
                  color: '#1A90FE'
                }
              },
              areaStyle: {
                normal: {
                  color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                    offset: 0,
                    color: '#1A90FE'
                  },
                    // {
                    //   offset: 0.3,
                    //   color: '#822134'
                    // },
                    // {
                    //   offset: 0.7,
                    //   color: '#43203d'
                    // },
                    {
                      offset: 1,
                      color: '#fff'
                    }])
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
        // if (edata.length > 0) {
        //   vm['chart'][id].dispatchAction({
        //     type: 'showTip',
        //     seriesIndex: 0,
        //     dataIndex: edata.length - 1
        //   })
        // }
      },
      // 折线图2
      drawLineLeakagePress (id, edata) {
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
        let data = [
          {name:'2019/06/11 6:38:08', value:['2019/06/11 6:38:08', 80]},
          {name:'2019/06/11 8:18:18', value:['2019/06/11 8:18:18', 60]},
          {name:'2019/06/11 9:18:18', value:['2019/06/11 9:18:18', 90]}
        ]
        let option = {
          tooltip: {
            trigger: 'axis',
            // alwaysShowContent: true,
            position: function (pt) {
              return [pt[0], '10%'];
            },
            textStyle: {
              color: '#2c3e50',
              align: 'left'
            },
            backgroundColor: '#fff',
            borderColor: '#74CFFF',
            borderWidth: 1,
            formatter: function (params) {
              let time = params[0].name.split(" ")[1]
              let value = params[0].data.value[1]
              return time + '<br>' + '压力：' + value
            },
          },
          grid: {
            bottom: '20%',
            top: '20%',
            left: '10%',
            right: '10%'
          },
          title: {
            // left: 'left',
            // text: '气液比今日监控数据',
            // textStyle: {
            //   // color: '#80DAFF',
            //   fontSize: 18
            // }
          },
          xAxis: {
            type: 'time',
            name: '(时间)',
            nameTextStyle: {
              // color: '#74CFFF',
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
              // color: '#74CFFF',
              fontSize: 12
            }
          },
          yAxis: {
            type: 'value',
            name: '(pa)',
            nameTextStyle: {
              // color: '#74CFFF',
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
              // color: '#74CFFF',
              fontSize: 12
            },
            boundaryGap: [0, '100%']
          },
          series: [
            {
              name:'pa',
              type:'line',
              smooth: true,
              // symbol: 'none',
              // symbol: 'emptyCircle',
              itemStyle: {
                normal: {
                  color: '#FE6B1A'
                }
              },
              areaStyle: {
                normal: {
                  color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                    offset: 0,
                    color: '#FE6B1A'
                  },
                    // {
                    //   offset: 0.3,
                    //   color: '#822134'
                    // },
                    // {
                    //   offset: 0.7,
                    //   color: '#43203d'
                    // },
                    {
                      offset: 1,
                      color: '#fff'
                    }])
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
        // if (edata.length > 0) {
        //   vm['chart'][id].dispatchAction({
        //     type: 'showTip',
        //     seriesIndex: 0,
        //     dataIndex: edata.length - 1
        //   })
        // }
      },
      // 折线图1
      drawLine (id, edata) {
        // console.log(edata)
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
        // let data = [
        //   {name:'2019/06/11 6:38:08', value:['2019/06/11 6:38:08', 80]},
        //   {name:'2019/06/11 8:18:18', value:['2019/06/11 8:18:18', 60]},
        //   {name:'2019/06/11 9:18:18', value:['2019/06/11 9:18:18', 50]},
        //   {name:'2019/06/11 18:18:18', value:['2019/06/11 18:18:18', 40]},
        //   {name:'2019/06/11 20:18:18', value:['2019/06/11 20:18:18', 60]},
        //   {name:'2019/06/11 22:18:18', value:['2019/06/11 22:18:18', 90]}
        // ]
        let option = {
          tooltip: {
            trigger: 'axis',
            // alwaysShowContent: true,
            position: function (pt) {
              return [pt[0], '10%'];
            },
            textStyle: {
              color: '#2c3e50',
              align: 'left'
            },
            backgroundColor: '#fff',
            borderColor: '#74CFFF',
            borderWidth: 1,
            formatter: function (params) {
              let time = params[0].name.split(" ")[1]
              let value = params[0].data.value[1]
              return time + '<br>' + '压力：' + value
            },
          },
          grid: {
            bottom: '20%',
            top: '20%',
            left: '10%',
            right: '10%'
          },
          title: {
            // left: 'center',
            // text: '气液比今日监控数据',
            // textStyle: {
            //   color: '#80DAFF',
            //   fontSize: 18
            // }
          },
          xAxis: {
            type: 'time',
            name: '(时间)',
            nameTextStyle: {
              // color: '#74CFFF',
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
              // color: '#74CFFF',
              fontSize: 12
            }
          },
          yAxis: {
            type: 'value',
            name: '(pa)',
            nameTextStyle: {
              // color: '#74CFFF',
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
              // color: '#74CFFF',
              fontSize: 12
            },
            boundaryGap: [0, '100%']
          },
          series: [
            {
              name:'pa',
              type:'line',
              smooth: true,
              // symbol: 'none',
              // symbol: 'emptyCircle',
              itemStyle: {
                normal: {
                  color: '#C21AFE'
                }
              },
              areaStyle: {
                normal: {
                  color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                    offset: 0,
                    color: '#C21AFE'
                  },
                    // {
                    //   offset: 0.3,
                    //   color: '#822134'
                    // },
                    // {
                    //   offset: 0.7,
                    //   color: '#43203d'
                    // },
                    {
                      offset: 1,
                      color: '#fff'
                    }])
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
    }
  }
</script>

<style lang="less"  scoped>
  @import '../../assets/styles/variable/variable.less';
  .card-top-tank-checked {
    background: @btn-modal-submit !important;
    border-radius: 97px;
    width: 50px;
    padding: 4px 0px;
    color: @main-text-white !important;
    margin-right: 20px;
    margin-top: 13px;
    display: inline-block;
  }
  .card-top-tank-defult {
    background: @main-text-white !important;
    border-radius: 97px;
    width: 50px;
    padding: 4px 0px;
    color: @main-gray !important;
    border: 1px solid @main-gray !important;
    margin-right: 20px;
    margin-top: 13px;
    display: inline-block;
  }
</style>

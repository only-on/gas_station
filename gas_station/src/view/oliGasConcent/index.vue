<template>
  <div class="body">
    <Row :gutter="16">
      <Col span="12">
       <Row  class="itemBox">
         <Row type="flex"  justify="start" style="padding:15px 20px;background:#EDEDED;font-size:20px;color:#333 ">油气浓度</Row>
         <div id="gaugeBox"></div>
         <div :class="status === 1 ? 'olitankStatus greenStatus' :status === 2 ? 'olitankStatus disStatus' : status === 3 ? 'olitankStatus yellowStatus' : status === 4 ? 'olitankStatus redStatus' : ''">
           {{status === 1 ? '正常' : status === 2 ? '离线' :status === 3 ? '预警' : status === 4 ? '报警' : ''}}
         </div>
       </Row>
      </Col>
      <Col span="12">
      <Row class="itemBox">
        <Row type="flex"  justify="start" style="padding:15px 20px;background:#EDEDED;font-size:20px;color:#333 ">环境温度</Row>
        <div id="temperatureBox"></div>
        <div :class="temStatus === 1 ? 'olitankStatus greenStatus' :temStatus === 2 ? 'olitankStatus disStatus' : temStatus === 3 ? 'olitankStatus yellowStatus' : status === 4 ? 'olitankStatus redStatus' : ''">
          {{temStatus === 1 ? '正常' : temStatus === 2 ? '离线' :temStatus === 3 ? '预警' : temStatus === 4 ? '报警' : ''}}
        </div>
      </Row>
      </Col>
    </Row>
  </div>
</template>

<script>
  import echarts from 'echarts'
  import { gasConcentration }  from '../../api/api'
  export default {
    data () {
      return {
        unit: 'ppm',
        gasStationId: '',
        status: '',
        value: 0,
        alarmValue: 4000,
        temStatus: '',
        temValue: 0,
        temAlarmValue: 0
      }
    },
    methods: {
      drawGauge (id,edata, unit) {
        let vm = this
        if (document.getElementById(id) === null) {
          return false
        }
        let _chart = {}
        _chart[id] = echarts.init(document.getElementById(id))
        vm.chart = Object.assign({}, vm.chart, _chart)
        let textColor = ''
        if (edata <= vm.alarmValue) {
          textColor = '#4CE398'
        } else {
          textColor = '#FF5050'
        }
        let maxRange = 0
        if (unit !== undefined && unit === 'ppm') {
          maxRange = 10000
        } else {
          maxRange = 100
        }
        let option = {
          grid: {
            left: "5%",
            top: 5,
            right: "5%"
          },
          series: [
            {
              //渐变圆环
              name: "",
              type: "pie",
              radius: ["50%", "60%"],
              center: ['50%', '50%'],
              startAngle: 210,
              hoverAnimation: false,
              avoidLabelOverlap: true,
              z: 0,
              zlevel: 0,
              label: {
                show: false,
                normal: {show: false}
              },
              data: [
                {
                  value: 66,
                  itemStyle: {
                    normal: {
                      color: {
                        x: 0,
                        y: 0,
                        x2: 1,
                        y2: 0,
                        colorStops: [
                          {
                            offset: 0,
                            color: '#4CE398' // 0% 处的颜色
                          },
                          {
                            offset: Math.abs(vm.alarmValue/maxRange - 0.01),
                            color: '#FFC22F' // 0% 处的颜色
                          },
                          {
                            offset: 1,
                            color: '#FF5050' // 100% 处的颜色
                          }
                        ],
                        globalCoord: false
                      }
                    }
                  }

                },
                {
                  value: 34,
                  itemStyle: {
                    normal: {
                      color: "rgba(0,0,0,0)"
                    }
                  }
                },

              ]
            },
            {
              startAngle: 210,
              endAngle: -30,
              name: '中心圆',
              type: 'gauge', // 默认全局居中
              radius:40,
              center: ['50%', '50%'],
              splitNumber: 0,
              axisLabel: {
                show: false
              },
              splitLine: { // 分隔线
                length: 10, // 属性length控制线长
                lineStyle: { // 属性lineStyle（详见lineStyle）控制线条样式
                  width: 0
                }
              },
              axisLine: { // 坐标轴线
                lineStyle: {
                  color: [
                    [1, textColor]
                  ], // 属性lineStyle控制线条样式
                  width: 2
                }
              },
              detail: {
                show: false
              },

            },
            {
              //仪表盘样式
              name: "",
              type: "gauge",
              radius:120,
              center: ['50%', '50%'],
              startAngle: 210,
              endAngle: -30,
              clockwise:true,
              min: 0,
              max:maxRange,
              splitNumber: 10, //刻度数量
              hoverAnimation: true,
              axisTick: {
                show: false
              },
              splitLine: {
                length: 20,
                lineStyle: {
                  width: 1,
                  color: "#fff"
                }
              },
              axisLabel: {
                show:true,
                color: '#666',
                //   标签与刻度线的距离
                distance: -50
              },
              axisLine: {
                lineStyle: {
                  opacity:0
                }
              },
              pointer: {
                show: true,
                length: '85%',
                width:4,
                position: ['50%', '30%'],
                color: '#EF2B2B'
              },
              detail: {
                show: true,
                offsetCenter: [0, '60%'],
                textStyle: {
                  fontSize: 20,
                  color: textColor
                },
                formatter: function (params) {
                  if (!isNaN(params)) {
                    return [
                      params , '{name|'+ unit +'}'
                    ].join('\n')
                  } else {
                    return '--'
                  }
                },
                rich: {
                  name: {
                    fontSize: 20,
                    lineHeight: 20,
                    color: '#666'
                  }
                }
              },
              //   指针样式
              itemStyle: {
                normal: {
                  color: "#FE5D5D",
                }
              },
              data: [{
                value: edata,
                name: ""
              }]
            },
          ]
        }
        vm['chart'][id].setOption(option)
      },
      drawGauge1 (id,edata) {
        let vm = this
        if (document.getElementById(id) === null) {
          return false
        }
        let _chart = {}
        _chart[id] = echarts.init(document.getElementById(id))
        vm.chart = Object.assign({}, vm.chart, _chart)
        let textColor = '#4CE398'
        // if (edata <= vm.temAlarmValue) {
        //   textColor = '#4CE398'
        // } else {
        //   textColor = '#FF5050'
        // }
        let option = {
          grid: {
            left: "5%",
            top: 5,
            right: "5%"
          },
          series: [
            {
              //渐变圆环
              name: "",
              type: "pie",
              radius: ["50%", "60%"],
              center: ['50%', '50%'],
              startAngle: 210,
              hoverAnimation: false,
              avoidLabelOverlap: true,
              z: 0,
              zlevel: 0,
              label: {
                show: false,
                normal: {show: false}
              },
              data: [
                {
                  value: 66,
                  itemStyle: {
                    normal: {
                      color: {
                        x: 0,
                        y: 0,
                        x2: 0,
                        y2: 1,
                        colorStops: [
                          {
                            offset: 0,
                            color: '#4CE398' // 100% 处的颜色
                          },
                          {
                            offset: 0.4,
                            color: '#FFC22F' // 0% 处的颜色
                          },
                          {
                            offset: 1,
                            color: '#FF5050' // 100% 处的颜色
                          }
                        ],
                        globalCoord: false
                      }
                    }
                  }

                },
                {
                  value: 34,
                  itemStyle: {
                    normal: {
                      color: "rgba(0,0,0,0)"
                    }
                  }
                },

              ]
            },
            {
              startAngle: 210,
              endAngle: -30,
              name: '中心圆',
              type: 'gauge', // 默认全局居中
              radius:40,
              center: ['50%', '50%'],
              splitNumber: 0,
              axisLabel: {
                show: false
              },
              splitLine: { // 分隔线
                length: 10, // 属性length控制线长
                lineStyle: { // 属性lineStyle（详见lineStyle）控制线条样式
                  width: 0
                }
              },
              axisLine: { // 坐标轴线
                lineStyle: {
                  color: [
                    [1, textColor]
                  ], // 属性lineStyle控制线条样式
                  width: 2
                }
              },
              detail: {
                show: false
              },

            },
            {
              //仪表盘样式
              name: "",
              type: "gauge",
              radius:120,
              center: ['50%', '50%'],
              startAngle: 210,
              endAngle: -30,
              clockwise:true,
              min: -50,
              max:70,
              splitNumber: 10, //刻度数量
              hoverAnimation: true,
              axisTick: {
                show: false
              },
              splitLine: {
                length: 20,
                lineStyle: {
                  width: 1,
                  color: "#fff"
                }
              },
              axisLabel: {
                show:true,
                color: '#666',
                //   标签与刻度线的距离
                distance: -50
              },
              axisLine: {
                lineStyle: {
                  opacity:0
                }
              },
              pointer: {
                show: true,
                length: '85%',
                width:4,
                position: ['50%', '30%'],
                color: '#EF2B2B'
              },
              detail: {
                show: true,
                offsetCenter: [0, '60%'],
                textStyle: {
                  fontSize: 20,
                  color: textColor
                },
                formatter: function (params) {
                  if (!isNaN(params)) {
                    return [
                      params , '{name|'+ '℃}'
                    ].join('\n')
                  } else {
                    return '--'
                  }
                },
                rich: {
                  name: {
                    fontSize: 20,
                    lineHeight: 20,
                    color: '#666'
                  }
                }
              },
              //   指针样式
              itemStyle: {
                normal: {
                  color: "#FE5D5D",
                }
              },
              data: [{
                value: edata,
                name: ""
              }]
            },
          ]
        }
        vm['chart'][id].setOption(option)
      },
    },
    mounted () {
      let vm = this
      vm.drawGauge('gaugeBox', vm.value, vm.unit)
      vm.drawGauge1('temperatureBox', vm.temValue)
    },
    created:function () {
      if (sessionStorage.getItem('station') !== null) {
        this.gasStationId = JSON.parse(sessionStorage.getItem('station')).stationId
        let par  = {
          gasStationId: this.gasStationId
        }
        gasConcentration(par).then((res) => {
          if (res.data.code === 1000) {
            let con = res.data.content.gasConcentrationStatusAppVO
            let tem = res.data.content.environmentTemperatureStatusAppVO
            this.status = con.concentrationStatus
            this.value = con.concentrationValue
            this.alarmValue = con.alarmValue === null ? 4000 : con.alarmValue
            this.temStatus = tem.temperatureStatus
            this.temValue = tem.temperatureValue
            this.temAlarmValue = tem.alarmValue === null ? 0 : tem.alarmValue
            this.unit = con.unit === null ? 'ppm' : con.unit
          } else {
            this.status = ''
            this.value = 0
            this.alarmValue = 4000
            this.temStatus = ''
            this.temValue = 0
            this.temAlarmValue = 0
          }
          this.drawGauge('gaugeBox', this.value, this.unit)
          this.drawGauge1('temperatureBox', this.temValue)
        })
      }
    }
  }
</script>

<style scoped>
.itemBox{
  height:450px;
  background:#fff;
  position: relative;
  padding: 0;
  box-shadow:0px 2px 17px 0px rgba(190,190,190,0.5)
}
#gaugeBox{
  width: 100%;
  height: 400px;
}
#temperatureBox{
  width: 100%;
  height: 400px;
}
.olitankStatus{
  width:60px;
  height: 25px;
  line-height: 25px;
  border-radius: 16px;
  font-size: 14px;
  float: right;
  color: #fff;
  position: absolute;
  left:20px;
  right: 0;
  margin-left: auto;
  margin-right: auto;
  bottom:50px;
}
.greenStatus{
  background:#55CEA2;
}
.redStatus{
  background:#FF4040;
}
.yellowStatus{
  background:#FFCF74;
}
  .disStatus{
    background:#7E7E7E
  }
</style>

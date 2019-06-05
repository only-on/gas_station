<template>
  <div id="body">
   <Row class="titleBar">
      <div>北京丰辰鲁谷加油站</div>
     <Button class="logoutBtn" @click="logoutMonitor">退出监控</Button>
   </Row>
    <div class="content">
      <Row :gutter="24" style="height: 100%">
        <!--左侧-->
        <Col span="16">
          <Row class="oliGunInfo">
            <Row type="flex" justify="start" :gutter="16" style="font-size: 16px;line-height: 27px;margin-bottom: 30px">
              <Col span="3">
                基本信息
              </Col>
              <Col span="3">
                <img src="../../assets/oligun.png" alt="" style="width:20px;height: 17px">
              油枪 <span>28</span>
              </Col>
              <Col span="3">
              <img src="../../assets/tanker.png" alt="" style="width:17px;height: 17px">
              加油机 <span>6</span>
              </Col>
              <Col span="3">
              <img src="../../assets/tank.png" alt="" style="width:17px;height: 17px">
              油罐 <span>3</span>
              </Col>
            </Row>
            <div class="mainCon">
              <div class="oliItem">
                <!--第一行-->
                <div class="itemLine" v-for="(each,eachIndex) in oliList" :key="eachIndex">
                  <div class="itemSet" v-for="(item,index) in each" :key="index">
                    <!--四六个油枪-->
                   <div v-if="item.length < 7">
                     <div style="float: left;margin-right:13px">
                       <div v-for="(item1, index1) in item.children[0]" :key="index1">
                         <oligun :dir="item.length > 4 ? index1*2+2 : 4" :type="item1.type" :class="item.length > 4 ? 'dir'+(index1*2+2):'dir24'" :name="item1.name" :oliType="item1.oliType" :oliVal="item1.oliVal"></oligun>
                       </div>
                     </div>
                     <div style="float: left;position: relative;z-index:2">
                       <img src="../../assets/tankerBig.png" alt="" class="tankImage">
                       <span class="tankName" style="font-size:16px">{{item.name}}<br>加油机</span>
                       <div class="tankLine"></div>
                     </div>
                     <div style="float: right;margin-left:23px">
                       <div  v-for="(item2, index2) in item.children[1]" :key="index2">
                         <oligun :dir="item.length > 4 ? index2*2+1 : 3" :type="item2.type" :class="item.length > 4 ? 'dir'+(index2*2+1):'dir23'" :name="item2.name" :oliType="item2.oliType" :oliVal="item2.oliVal"></oligun>
                       </div>
                     </div>
                   </div>
                    <!--8个油枪-->
                    <div v-if="item.length >= 7" class="eightBox">
                      <div style="float: left;margin-right:20px" v-for="(item3, index3) in item.children[0]" :key="index3+'i'">
                        <div v-for="(item3s, index3s) in item3" :key="index3s+'i'">
                          <oligun :dir="4" :type="item3s.type" class="dir24" :name="item3s.name" :oliType="item3s.oliType" :oliVal="item3s.oliVal"></oligun>
                        </div>
                      </div>
                      <div style="float: left;position: relative;z-index:2">
                        <img src="../../assets/tankerBig.png" alt="" class="tankImage">
                        <span class="tankName" style="font-size:16px">{{item.name}}<br>加油机</span>
                        <div class="tankLine"></div>
                      </div>
                      <div  class="eightOli" v-for="(item4, index4) in item.children[1]" :key="index4+'j'">
                        <div v-for="(item4s, index4s) in item4" :key="index4s+'j'">
                          <oligun :dir="3" :type="item4s.type" class="dir23" :name="item4s.name" :oliType="item4s.oliType" :oliVal="item4s.oliVal"></oligun>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <Row class="oliBox">
                <!--连接线-->
                <Row class="contactLine"></Row>
                <!--油罐-->
                <div style="display: flex;justify-content: space-around;margin-top: 20px;">
                  <!--油罐-->
                  <div style="position: relative" v-for="(item,index) in tankList" :key="index">
                    <div class="olinum">{{item.name}}</div>
                    <div class="oliTank">
                      <span class="quantityNum">{{item.value}}%</span>
                      <div class="oliQuantity warning" :style="'height:' + item.value +'%'"></div>
                    </div>
                  </div>
                </div>
              </Row>
            </div>
          </Row>
          <Row type="flex" justify="space-between">
            <Col span="7" class="leftBottom">
              <Row type="flex" justify="start">今日数据统计</Row>
            <Row class="tipTitle">
              <Col span="8">
                <Row style="margin: 30px 0 20px">
                  加油时间<br>(h)
                </Row>
                <Row style="color:#8AFFF5;font-size: 22px">
                  20
                </Row>
              </Col>
              <Col span="8">
                <Row style="margin: 30px 0 20px">
                  加油次数<br>(次)
                </Row>
                <Row style="color:#8AFFF5;font-size: 22px">
                  120
                </Row>
              </Col>
              <Col span="8">
                <Row style="margin: 30px 0 20px">
                  平均时间<br>(min/次)
                </Row>
                <Row style="color:#8AFFF5;font-size: 22px">
                  12
                </Row>
              </Col>
            </Row>
            </Col>
            <Col span="7" class="leftBottom">
            <Row type="flex" justify="start">今日油品统计</Row>
              <Row class="tipTitle" style="margin-top: 5px">
              <Row style="margin: 10px 0 10px">
                <Col span="8">
                  92#<br>(T)
                </Col>
                <Col span="8">
                95#<br>(T)
                </Col>
                <Col span="8">
                98#<br>(T)
                </Col>
              </Row>
                <Row id="oliTypeBox"></Row>
            </Row>
            </Col>
            <Col span="9" class="leftBottom">
            <Row type="flex" justify="space-between">
              <Col>告警数量统计</Col>
              <Col style="color:#98E0FF;font-size: 16px">总计 <span style="color:#87FFE6">36</span></Col>
            </Row>
              <Row id="alarmBox"></Row>
            </Col>
          </Row>
        </Col>
        <!--右侧-->
        <Col span="8">
          <Row class="oliGunDetail" style="margin-bottom: 20px">
            <Row>
              <Col span="12">
              <Row type="flex" justify="start" style="font-size:18px;margin-bottom: 10px">
                01机03枪92#
                <span style="margin-left: 20px;color:#74FFA7">加油中...</span>
              </Row>
              <Row>
                <Col span="7">
                  <div class="olitankItem greenItem">
                    <img src="../../assets/green.png" alt="">
                  </div>
                </Col>
                <Col span="16">
                  <Row type="flex" justify="start">
                    <div class="olitankStatus greenStatus" style="margin-left: 0">正常</div>
                  </Row>
                <Row type="flex" justify="start" style="font-size:14px;margin-top: 20px">
                  平均气液比
                  <span class="gasLiquid">1.1</span>
                </Row>
                </Col>
              </Row>
              </Col>
              <Col span="12">
              <!--仪表盘-->
                <div id="gaugeBox"></div>
              </Col>
            </Row>
            <Row>
              <!--气液比-->
              <div id="lineBox"></div>
            </Row>
          </Row>
          <Row class="oliGunDetail">
            <Row type="flex" justify="start" style="font-size:18px;margin-bottom: 10px">
              <span style="margin-right: 20px">油罐监测</span>
            </Row>
            <Row>
              <div id="fourGauge"></div>
            </Row>
            <Row type="flex" justify="space-around" style="margin-left:-8px">
              <div class="olitankStatus greenStatus">正常</div>
              <div class="olitankStatus greenStatus">正常</div>
              <div class="olitankStatus greenStatus">正常</div>
              <div class="olitankStatus greenStatus">正常</div>
            </Row>
            <Row>
              <div id="pressureBox"></div>
            </Row>
          </Row>
        </Col>
      </Row>
    </div>
  </div>
</template>

<script>
  import echarts from 'echarts'
  import oligun from '@/components/oliGun'
  export default {
    components: {
      oligun
    },
    data () {
      return {
        sideRange:[-70, -50],
        oliTankRange: [-300,300],
        gasRange: [1, 1.2],
        oliList: [
          [
            {
              name: '1号',
              length: 4,
              children: [
                [{
                  name: '01枪',
                  oliType: '92#',
                  oliVal: '1.1',
                  type: 0
                },
                  {
                    name: '02枪',
                    oliType: '95#',
                    oliVal: '1.8',
                    type: 1
                  }],
                [
                  {
                    name: '03枪',
                    oliType: '92#',
                    oliVal: '1.1',
                    type: 2
                  },
                  {
                    name: '04枪',
                    oliType: '98#',
                    oliVal: '1.5',
                    type: 0
                  }
                ]
              ]
            },
            {
              name: '3号',
              length: 8,
              children: [
                [
                  [
                    {
                      name: '11枪',
                      oliType: '92#',
                      oliVal: '1.1',
                      type: 0
                    },
                    {
                      name: '12枪',
                      oliType: '95#',
                      oliVal: '1.8',
                      type: 2
                    }
                  ],
                 [
                   {
                     name: '13枪',
                     oliType: '92#',
                     oliVal: '1.1',
                     type: 3
                   },
                   {
                     name: '14枪',
                     oliType: '92#',
                     oliVal: '1.1',
                     type: 3
                   },
                 ]
                ],
                [
                  [
                    {
                      name: '15枪',
                      oliType: '98#',
                      oliVal: '1.5',
                      type: 0
                    },
                    {
                      name: '16枪',
                      oliType: '92#',
                      oliVal: '1.1',
                      type: 0
                    },
                  ],
                 [
                   {
                     name: '17枪',
                     oliType: '98#',
                     oliVal: '1.5',
                     type: 1
                   },
                   {
                     name: '18枪',
                     oliType: '98#',
                     oliVal: '1.5',
                     type: 0
                   }
                 ]
                ]
              ]
            },
            {
              name: '2号',
              length: 6,
              children: [
                [
                  {
                    name: '05枪',
                    oliType: '92#',
                    oliVal: '1.1',
                    type: 1
                  },
                  {
                    name: '06枪',
                    oliType: '95#',
                    oliVal: '1.8',
                    type: 0
                  },
                  {
                    name: '07枪',
                    oliType: '92#',
                    oliVal: '1.1',
                    type: 0
                  },
                ],
                [
                  {
                    name: '08枪',
                    oliType: '98#',
                    oliVal: '1.5',
                    type: 1
                  },
                  {
                    name: '09枪',
                    oliType: '92#',
                    oliVal: '1.1',
                    type: 3
                  },
                  {
                    name: '04枪',
                    oliType: '98#',
                    oliVal: '1.5',
                    type: 0
                  }
                ]
              ]
            },
          ],
          [
            {
              name: '1号',
              length: 4,
              children: [
                [{
                  name: '01枪',
                  oliType: '92#',
                  oliVal: '1.1',
                  type: 1
                },
                  {
                    name: '02枪',
                    oliType: '95#',
                    oliVal: '1.8',
                    type: 4
                  }],
                [
                  {
                    name: '03枪',
                    oliType: '92#',
                    oliVal: '1.1',
                    type: 2
                  },
                  {
                    name: '04枪',
                    oliType: '98#',
                    oliVal: '1.5',
                    type: 1
                  }
                ]
              ]
            },

            {
              name: '3号',
              length: 8,
              children: [
                [
                  [
                    {
                      name: '11枪',
                      oliType: '92#',
                      oliVal: '1.1',
                      type: 0
                    },
                    {
                      name: '12枪',
                      oliType: '95#',
                      oliVal: '1.8',
                      type: 1
                    }
                  ],
                  [
                    {
                      name: '13枪',
                      oliType: '92#',
                      oliVal: '1.1',
                      type: 0
                    },
                    {
                      name: '14枪',
                      oliType: '92#',
                      oliVal: '1.1',
                      type: 0
                    },
                  ]
                ],
                [
                  [
                    {
                      name: '15枪',
                      oliType: '98#',
                      oliVal: '1.5',
                      type: 1
                    },
                    {
                      name: '16枪',
                      oliType: '92#',
                      oliVal: '1.1',
                      type: 0
                    },
                  ],
                  [
                    {
                      name: '17枪',
                      oliType: '98#',
                      oliVal: '1.5',
                      type: 1
                    },
                    {
                      name: '18枪',
                      oliType: '98#',
                      oliVal: '1.5',
                      type: 0
                    }
                  ]
                ]
              ]
            },
            {
              name: '2号',
              length: 6,
              children: [
                [
                  {
                    name: '05枪',
                    oliType: '92#',
                    oliVal: '1.1',
                    type: 3
                  },
                  {
                    name: '06枪',
                    oliType: '95#',
                    oliVal: '1.8',
                    type: 1
                  },
                  {
                    name: '07枪',
                    oliType: '92#',
                    oliVal: '1.1',
                    type: 0
                  },
                ],
                [
                  {
                    name: '08枪',
                    oliType: '98#',
                    oliVal: '1.5',
                    type: 0
                  },
                  {
                    name: '09枪',
                    oliType: '92#',
                    oliVal: '1.1',
                    type: 0
                  },
                  {
                    name: '04枪',
                    oliType: '98#',
                    oliVal: '1.5',
                    type: 0
                  }
                ]
              ]
            },
          ],
        ],
        tankList: [
          {
            name: '01',
            value: '50'
          },
          {
            name: '02',
            value: '20'
          },
          {
            name: '03',
            value: '80'
          }
        ]
      }
    },
    mounted () {
      let vm = this
      vm.$nextTick(function () {
        vm.drawPie('oliTypeBox')
        vm.drawBar('alarmBox')
        vm.drawGauge('gaugeBox')
        vm.drawLine('lineBox')
        vm.drawFour('fourGauge')
        vm.drawLine1('pressureBox')
      })
    },
    methods: {
      // 圆环
      drawPie (id,edata) {
        let vm = this
        if (document.getElementById(id) === null) {
          return false
        }
        let _chart = {}
        _chart[id] = echarts.init(document.getElementById(id))
        vm.chart = Object.assign({}, vm.chart, _chart)
        var dataStyle = {
          normal: {
            labelLine: {
              show: false
            }
          }
        }
        let data = [
          {
            pos: ['15%', '50%'],
            value: 25
          },
          {
            pos: ['50%', '50%'],
            value: 25
          },
          {
            pos: ['85%', '50%'],
            value: 25
          }
        ]
        let option = {
          series: (function () {
            let result = []
            data.forEach(function (item) {
              result.push({
                name: '第一个圆环',
                type: 'pie',
                radius: [30, 40],
                hoverAnimation: false,
                center: item.pos,
                itemStyle: dataStyle,
                data: [{
                  value: 25,
                  label: {
                    normal: {
                      formatter: function(params){
                        return params.value;
                      },
                      position: 'center',
                      show: true,
                      textStyle: {
                        fontSize: '24',
                        fontWeight: 'normal',
                        color: '#8AFFF5'
                      }
                    }
                  },
                  itemStyle: {
                    normal: {
                      color: '#FFC443'
                    }
                  }
                }, {
                  value: 75,
                  itemStyle: {
                    normal: {
                      color: '#555349'
                    }
                  }
                }]
              })
            })
            return result
          })()
        }
        vm['chart'][id].setOption(option)
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
        var xdata = ['气液比', '油罐压力', '油气浓度'];
        let colorList = ['#8531E2', '#EB3B3B', '#F18B4D']
        let data = [
          [60, 85, 110],
          [60, 85, 110],
          [60, 85, 110]
        ]
        let nameList = ['告警', '报警', '预警']
        let option = {
          tooltip: {
            trigger: "item",
            show: true
          },
          legend: {
            data: nameList,
            x: 'center',
            y: -5,
            textStyle: {
              color: "#fff"
            },
            itemWidth: 12,
            itemHeight: 10,
          },
          grid: {
            left: "5%",
            top: "10%",
            bottom: "10%",
            right: "5%",
            containLabel: true
          },
          label: {
            show: true,
            position: 'top',
            color: '#87FFE6',
            fontSize: 14
          },
          xAxis: {
            data: xdata,
            type: 'category',
            splitLine: {
              show: false
            },
            axisLine: {
              show: false
            },
            axisTick: {
              show: false
            },
            axisLabel: {
              color: '#74CFFF',
              fontSize: 14
            }
          },
          yAxis: {
            type: 'value',
            splitLine: {
              show: true,
              lineStyle: {
                color: '#74CFFF'
              }
            },
            axisLine: {
              show: false,
            },
            axisTick: {
              show: false
            },
            axisLabel: {
              color: '#74CFFF',
              fontSize: 12
            }
          },
          series: (function () {
            let result = []
            data.forEach(function (item,index) {
              result.push(
                {
                  name: nameList[index],
                  type: 'bar',
                  animation: false,
                  barWidth: 14,
                  data: item,
                  tooltip: {
                    show: false
                  },
                  itemStyle: {
                    color: colorList[index],
                    barBorderRadius: 8
                  },
                }
              )
            })
            return result
          })()
        }
        vm['chart'][id].setOption(option)
      },
      // 仪表盘
      drawGauge (id,edata) {
        let vm = this
        if (document.getElementById(id) === null) {
          return false
        }
        let _chart = {}
        _chart[id] = echarts.init(document.getElementById(id))
        vm.chart = Object.assign({}, vm.chart, _chart)
        var edata = 1.1;
        let colorList = []
        let total = Math.abs(0) + Math.abs(2.6)
        let start = Math.abs(Math.abs(vm.gasRange[0]) - 0)/total
        colorList.splice(0,0,[start, '#FE876C'])
        colorList.splice(1,0,[start + (Math.abs(vm.gasRange[1]-vm.gasRange[0])/total), '#55CEA2'])
        colorList.splice(2,0,[1, '#FE876C'])
        // 文字颜色
        let textColor = ''
        if (edata > 0 && edata.value < vm.gasRange[0]) {
          textColor = '#FE876C'
        } else if (edata >= vm.gasRange[0] && edata <= vm.gasRange[1]) {
          textColor = '#55CEA2'
        } else {
          textColor = '#FE876C'
        }
        let option = {
          grid: {
            left: "5%",
            top: 5,
            right: "5%"
          },
          series: [
            {
              startAngle: 180,
              endAngle: 0,
              name: '中心圆',
              type: 'gauge',
              center: ['50%', '73%'], // 默认全局居中
              radius:28,
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

            }, {
              name: '信用分',
              type: 'gauge',
              startAngle:180,
              endAngle: 0,
              radius: 90,
              center: ['50%', '73%'], // 默认全局居中
              min: 0,
              max:2.6,
              splitNumber: 13, //刻度数量
              axisLine: {
                show: true,
                lineStyle: {
                  width:14,
                  shadowBlur: 0,
                  color: colorList
                }
              },
              axisTick: {
                show: false,
              },
              splitLine: {
                show: true,
                length: 62,
                lineStyle: {
                  color: 'rgba(255,255,255,0.4)',
                  width: 1
                }
              },
              axisLabel: {
                show:true,
                color: '#74CFFF',
                //   标签与刻度线的距离
                distance: -82
              },
              pointer: {
                show: true,
                length: '85%',
                width:6,
                position: ['50%', '30%']
              },
              detail: {
                show:true,
                offsetCenter: [0, '18%'],
                textStyle: {
                  fontSize: 18,
                  color: textColor
                }
              },
              //   指针样式
              itemStyle: {
                normal: {
                  color: "#FE5D5D",
                }
              },
              data: [{
                name: "",
                value: edata
              }]
            }]
        }
        vm['chart'][id].setOption(option)
      },
      getDate (AddDayCount) {
        var dd = new Date();
        dd.setDate(dd.getDate()+AddDayCount);//获取AddDayCount天后的日期
        var y = dd.getFullYear();
        var m = dd.getMonth()+1;//获取当前月份的日期
        var d = dd.getDate();
        return y+'/'+(m<10?'0'+m:m)+'/'+(d<10?'0'+d:d);
      },
      // 折线图
      drawLine (id) {
        let vm = this
        if (document.getElementById(id) === null) {
          return false
        }
        let _chart = {}
        _chart[id] = echarts.init(document.getElementById(id))
        vm.chart = Object.assign({}, vm.chart, _chart)
        let toady = vm.getDate(0) + ' 00:00:00'
        let tommow = vm.getDate(1) + ' 00:00:00'
        var anchor = [
          {name: toady, value:[toady, 0]},
          {name:tommow, value:[tommow, 0]}
        ]
        let data = [
          {name:'2019/06/05 6:38:08', value:['2019/06/05 6:38:08', 80]},
          {name:'2019/06/05 8:18:18', value:['2019/06/05 8:18:18', 60]},
          {name:'2019/06/05 9:18:18', value:['2019/06/05 9:18:18', 90]}
        ]
        let option = {
          tooltip: {
            trigger: 'axis',
            alwaysShowContent: true,
            position: function (pt) {
              return [pt[0], '10%'];
            },
            textStyle: {
              color: '#74CFFF',
              align: 'left'
            },
            backgroundColor: '#0E254C',
            borderColor: '#74CFFF',
            borderWidth: 1,
            formatter: function (params) {
              let time = params[0].name.split(" ")[1]
              let value = params[0].data.value[1]
              return time + '<br>' + '气液比：' + value
            },
          },
          grid: {
            bottom: '10%',
            top: '20%',
            left: '10%',
            right: '10%'
          },
          title: {
            left: 'center',
            text: '气液比实时监控数据',
            textStyle: {
              color: '#80DAFF',
              fontSize: 18
            }
          },
          xAxis: {
            type: 'time',
            name: '(时间)',
            nameTextStyle: {
              color: '#74CFFF',
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
              color: '#74CFFF',
              fontSize: 12
            }
          },
          yAxis: {
            type: 'value',
            name: '(气液比)',
            nameTextStyle: {
              color: '#74CFFF',
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
              color: '#74CFFF',
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
              symbol: 'none',
              itemStyle: {
                normal: {
                  color: '#eb2123'
                }
              },
              areaStyle: {
                normal: {
                  color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                    offset: 0,
                    color: '#eb2123'
                  },
                    {
                      offset: 0.3,
                      color: '#822134'
                    },
                    {
                      offset: 0.7,
                        color: '#43203d'
                    },
                    {
                    offset: 1,
                    color: '#1b1f41'
                  }])
                }
              },
              data: data
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
        vm['chart'][id].dispatchAction({
          type: 'showTip',
          seriesIndex: 0,
          dataIndex: data.length - 1
        })
      },
      drawFour (id,edata) {
        let vm = this
        if (document.getElementById(id) === null) {
          return false
        }
        let _chart = {}
        _chart[id] = echarts.init(document.getElementById(id))
        vm.chart = Object.assign({}, vm.chart, _chart)
        let colorList = []
        let demodata = [
          {
            name: '油罐压力',
            value: -100,
            unit: 'pa',
            pos: ['15%', '50%'],
            range: [-1500, 1000],
            color: [
              [1, '#FE876C']
            ]
          },
          {
            name: '侧漏压力',
            value: -60,
            unit: 'pa',
            pos: ['40%', '50%'],
            range: [-100, 0],
            color: [
              [1, '#FE876C']
            ]
          },
          {
            name: '油气浓度',
            value: 100,
            unit: 'g/m³',
            pos: ['65%', '50%'],
            range: [0, 200],
            color: [
              [0.125, '#55CEA2'],
              [1, '#FE876C']
            ]
            // <=25
          },
          {
            name: '油罐温度',
            value: -30,
            unit: '℃',
            pos: ['90%', '50%'],
            range: [-100, 100],
            color: [
              [0.25, '#FE876C'],
              [0.85, '#55CEA2'],
              [1, '#FE876C']
            ]
            // -50~70
          }
        ]
        let s = ''
        for(let i = 0; i < demodata.length; i++){
          if (demodata[i].name === '油罐温度') {
            s = demodata[i].value < -50 ? '#FE876C' : demodata[i].value >= -50 && demodata[i].value <= 70 ? '#55CEA2' : '#FE876C'
            colorList.splice(3, 0, s)
          } else if (demodata[i].name === '油气浓度') {
            s = demodata[i].value <= 25 ? '#55CEA2' : '#FE876C'
            colorList.splice(2, 0, s)
          } else if (demodata[i].name === '侧漏压力') {
            let total = Math.abs(-100) + Math.abs(0)
            let start = Math.abs(100 - Math.abs(vm.sideRange[0]))/total
            demodata[i].color.splice(0,0,[start, '#FE876C'])
            demodata[i].color.splice(1,0,[start + (Math.abs(vm.sideRange[1]-vm.sideRange[0])/total), '#55CEA2'])
            // 文字颜色
            if (demodata[i].value > -100 && demodata[i].value < vm.sideRange[0]) {
              s = '#FE876C'
            } else if (demodata[i].value >= vm.sideRange[0] && demodata[i].value <= vm.sideRange[1]) {
              s = '#55CEA2'
            } else {
              s = '#FE876C'
            }
            colorList.splice(1, 0, s)
          } else if (demodata[i].name === '油罐压力') {
            let total = Math.abs(-1500) + Math.abs(1000)
            let start = Math.abs(Math.abs(-1500) - Math.abs(vm.oliTankRange[0]))/total
            demodata[i].color.splice(0,0,[start, '#FE876C'])
            let middle = Math.abs(Math.abs(-50) - Math.abs(vm.oliTankRange[0]))/total
            demodata[i].color.splice(1,0,[start + middle, '#55CEA2'])
            let middle1 = Math.abs(Math.abs(50) - (-50))/total
            demodata[i].color.splice(2,0,[start + middle + middle1, '#FE876C'])
            let middle2 = Math.abs(vm.oliTankRange[1] - 50)/total
            demodata[i].color.splice(3,0,[start + middle + middle1 + middle2, '#55CEA2'])
            // 文字颜色
            if (demodata[i].value > -1500 && demodata[i].value < vm.oliTankRange[0]) {
              s = '#FE876C'
            } else if (demodata[i].value >= vm.oliTankRange[0] && demodata[i].value <= -50) {
              s = '#55CEA2'
            } else if (demodata[i].value > -50 && demodata[i].value < 50) {
              s = '#FE876C'
            } else if (demodata[i].value >= 50 && demodata[i].value <= vm.oliTankRange[1]) {
              s = '#55CEA2'
            } else {
              s = '#FE876C'
            }
            colorList.splice(0, 0, s)
          }
        }
        let option = {
          grid: {
            left: "5%",
            top: 5,
            right: "5%"
          },
          series:( function () {
            let result = []
            demodata.forEach(function (item, index) {
              result.push({
                  startAngle: 180,
                  endAngle: 0,
                  name: '中心圆',
                  type: 'gauge',
                  center: [item.pos[0], '50%'], // 默认全局居中
                  radius:20,
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
                        [1, colorList[index]]
                      ], // 属性lineStyle控制线条样式
                      width: 2
                    }
                  },
                  detail: {
                    show: false
                  },

                },
                {
                  name: '信用分',
                  type: 'gauge',
                  startAngle:180,
                  endAngle: 0,
                  radius: 50,
                  center: item.pos, // 默认全局居中
                  min: item.range[0],
                  max:item.range[1],
                  axisLine: {
                    show: true,
                    lineStyle: {
                      width:10,
                      shadowBlur: 0,
                      color: item.color
                    }
                  },
                  axisTick: {
                    show: false,
                  },
                  splitLine: {
                    show: true,
                    length: 30, //轴线长度
                    lineStyle: {
                      color: 'rgba(255,255,255,0.4)',
                      width: 1
                    }
                  },
                  axisLabel: {
                    show:false
                  },
                  pointer: {
                    show: true,
                    length: '85%',
                    width:3
                  },
                  detail: {
                    show:true,
                    offsetCenter: [0, '65%'],
                    textStyle: {
                      fontSize: 14,
                      color: colorList[index]
                    },
                    formatter: [
                      '{value}'+(item.unit || ''), '\n{name|' + item.name + '}'
                    ].join('\n'),
                    rich: {
                      name: {
                        fontSize: 16,
                        lineHeight:20,
                        color: '#74CFFF'
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
                    name: "",
                    value: item.value
                  }]
                })
            })
            return result;
          })()
        }
        vm['chart'][id].setOption(option)
      },
      // 油罐压力
      drawLine1 (id) {
        let vm = this
        if (document.getElementById(id) === null) {
          return false
        }
        let _chart = {}
        _chart[id] = echarts.init(document.getElementById(id))
        vm.chart = Object.assign({}, vm.chart, _chart)
        let toady = vm.getDate(0) + ' 00:00:00'
        let tommow = vm.getDate(1) + ' 00:00:00'
        var anchor = [
          {name: toady, value:[toady, 0]},
          {name:tommow, value:[tommow, 0]}
        ]
        var data = [
          {name:'2019/06/04 6:38:08', value:['2019/06/04 6:38:08', 80]},
          {name:'2019/06/04 10:18:18', value:['2019/06/04 10:18:18', 60]},
          {name:'2019/06/04 14:18:18', value:['2019/06/04 14:18:18', 90]}
        ]
        var data1 = [
          {name:'2019/06/04 6:38:08', value:['2019/06/04 6:38:08', 30]},
          {name:'2019/06/04 10:18:18', value:['2019/06/04 10:18:18', 80]},
          {name:'2019/06/04 14:18:18', value:['2019/06/04 14:18:18', 40]}
        ]
        let option = {
          tooltip: {
            trigger: 'axis',
            position: function (pt) {
              return [pt[0], '10%'];
            },
            textStyle: {
              color: '#74CFFF',
              align: 'left'
            },
            backgroundColor: '#0E254C',
            borderColor: '#74CFFF',
            borderWidth: 1,
            formatter: function (params) {
              let time = params[0].name.split(" ")[1]
              let value = params[0].data.value[1]
              return time + '<br>' + '油罐压力：' + value+ '<br>' + '侧漏压力：' + params[1].data.value[1]
            },
          },
          grid: {
            bottom: '10%',
            top: '20%',
            left: '10%',
            right: '10%'
          },
          title: {
            left: 'center',
            text: '压力实时监控数据',
            textStyle: {
              color: '#80DAFF',
              fontSize: 18
            }
          },
          xAxis: {
            type: 'time',
            name: '(时间)',
            nameTextStyle: {
              color: '#74CFFF',
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
              color: '#74CFFF',
              fontSize: 12
            }
          },
          yAxis: {
            type: 'value',
            name: '(pa)',
            nameTextStyle: {
              color: '#74CFFF',
              fontSize: 14
            },
            splitLine: {
              show: true,
              lineStyle: {
                color: 'rgba(129, 255, 149, 0.3)'
              }
            },
            axisLine: {
              show: false,
            },
            axisTick: {
              show: false
            },
            axisLabel: {
              color: '#74CFFF',
              fontSize: 12
            },
            boundaryGap: [0, '100%']
          },
          series: [
            {
              name:'油罐压力',
              type:'line',
              symbol: 'emptyCircle',
              itemStyle: {
                normal: {
                  color: '#F747FF'
                }
              },
              data: data
            },
            {
              name:'侧漏压力',
              type:'line',
              symbol: 'emptyCircle',
              itemStyle: {
                normal: {
                  color: '#47FFAC'
                }
              },
              data: data1
            },
            {
              name:'.anchor',
              type:'line',
              showSymbol:false,
              data:anchor,
              itemStyle:{normal:{opacity:0}},
              lineStyle:{normal:{opacity:0}}
            }
          ]
        }
        vm['chart'][id].setOption(option)
        vm['chart'][id].dispatchAction({
          type: 'showTip',
          seriesIndex: 0,
          dataIndex: data1.length - 1
        })
      },
      logoutMonitor(){
        this.$router.push({path: '/'})
      }
    },
  }
</script>

<style scoped>
#body{
  width: 100%;
  height: 100vh;
  background:#021836;
  color:#80DAFF;
  min-width: 1000px;
}
  .titleBar{
    width: 100%;
    height: 8vh;
    background: url('../../assets/nav.png') no-repeat;
    background-size: 100% 100%;
    color:#72E6FF;
    position: relative;
  }
  .titleBar>div{
    text-align: center;
    line-height: 80px;
    font-size: 22px;
    letter-spacing: 3px;
  }
  .logoutBtn{
    background:rgba(2,24,54,1);
    box-shadow:0px 0px 11px 0px rgba(108,225,255,1) inset;
    border-radius:10px;
    border:1px solid rgba(135,230,255,1);
    position: absolute;
    right:20px;
    top:25px;
    color: #87E6FF;
  }
  .content{
    padding: 0 30px 30px;
    width: 100%;
    /*height:100%;*/
    margin-top: -10px;
    /*background: red;*/
  }
  .oliGunInfo{
    width: 100%;
    height:64vh;
    background: url('../../assets/leftTop.png') no-repeat;
    background-size: 100% 100%;
    margin-bottom: 20px;
    padding: 15px 30px;
  }
  .oliGunInfo span{
    font-size: 22px;
    color:#8AFFF5;
    margin-left: 5px;
  }
  .tankImage{
    width: 73px;height: 108px;
    margin-top:10px;
    position: relative;
  }
  .tankLine{
    position: absolute;
    width:6px;
    height: 100px;
    background:#4046FF;
    left: 0;
    right: 0;
    margin-left: auto;
    margin-right: auto;
    margin-top: -8px;
  }
  .dir2{
    margin-top: -36px;
    margin-left: 14px;
  }
  .dir4{
    margin-top: 7px;
    margin-left: 14px
  }
  .dir6{
    margin-top: 6px;
    margin-left: 14px
  }
  .dir1{
    margin-top: -36px;
    margin-left: -14px;
  }
  .dir3{
    margin-top: 7px;
    margin-left: -14px
  }
  .dir5{
    margin-top: 6px;
    margin-left: -14px
  }
  .eightOli{
    float: right;
    margin-left:40px;
  }
  .eightBox>.eightOli:last-child{
    margin-left: 30px;
  }
  /*油枪数量为2且方向为4*/
  .dir23{
    margin-bottom: 10px;
    margin-left:-10px
  }
  .dir24{
    margin-bottom: 10px;
    margin-left:10px
  }
  .tankName{
    position: absolute;
    text-align: center;
    bottom:15px;
    left:0;
    right:0;
    margin-right:auto;
    margin-left:auto;
    color:#6DD3FF
  }
  /*一行加油机*/
  .itemLine{
    display: flex;
    justify-content: space-between;
    margin-top: 43px;
  }
  .oliItem>.itemLine:last-child .tankLine{
    height: 70px;
  }
  .oliBox{
    height:120px;
    background:rgba(0,63,123,0.3);
    border-radius:12px;
    margin-top: 10px;
    padding:0 118px 0 128px;
  }
  .contactLine{
    width:100%;
    height:12px;
    background:#4046FF;
  }
  /*油罐*/
  .oliTank{
    width:206px;
    height:70px;
    border: 4px solid transparent;
    background:rgba(56,120,219,0.3);
    box-shadow:0px 1px 32px 0px rgba(0,37,60,0.5);
    border-radius:51px;
    position: relative;
    overflow: hidden;
  }
  .olinum{
    width:28px;
    height:24px;
    line-height: 24px;
    background:#4046FF;
    color:#74CFFF;
    font-size: 14px;
    position: absolute;
    top:-24px;
    left:0;
    right: 0;
    margin-left: auto;
    margin-right: auto;
  }
  /*油量*/
  .oliQuantity{
    width: 100%;
    position: absolute;
    left: 0;
    bottom:0;
  }
  .oliTank > .quantityNum{
    position: absolute;
    left: 0;
    right: 0;
    top:15px;
    margin: auto;
    z-index:2;
    color: #0A2144;
  }
  .many{
    background:#3878DB;
  }
  .orange{
    background: #FF8F3E;
  }
  .warning{
    background:#EB5656;
  }
  /*左下侧*/
  .leftBottom{
    height:23vh;
    background: url('../../assets/leftBottom.png') no-repeat;
    background-size: 100% 100%;
    padding: 15px 30px;
    font-size: 18px;
  }
  .tipTitle{
    text-align: center;
    margin-top: 20px;
    color:#98E0FF;
    font-size: 16px;
  }
  #oliTypeBox{
    width:100%;
    height: 9vh;
  }
  #alarmBox{
    width:100%;
    height: 20vh;
  }
  .oliGunDetail{
    /*width: 600px;*/
    height:43.5vh;
    background: url('../../assets/rightTop.png') no-repeat;
    background-size: 100% 100%;
    padding:20px;
    color: #87E6FF;
  }
  .olitankItem{
    width:66px;
    height:66px;
    border-radius:10px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .greenItem{
    box-shadow:0px 0px 10px 0px rgba(116,255,167,1) inset;
  }
  .disItem {
    box-shadow:0px 0px 18px 0px rgba(112,112,112,1) inset;
  }
  .redItem{
    box-shadow:0px 0px 10px 0px rgba(255,64,64,1) inset;
  }
  .yellowItem{
    box-shadow:0px 0px 10px 0px rgba(255,207,116,1) inset;
  }
  .normalItem{
    box-shadow:0px 0px 18px 0px rgba(69,130,170,1) inset;
  }
  .olitankStatus{
    width:60px;
    height: 25px;
    line-height: 25px;
    border-radius: 16px;
    font-size: 14px;
    margin-left: 25px;
  }
  .greenStatus{
    color: #6EFFA4;
    border: 1px solid #6EFFA4;
  }
  .disStatus {
    color: #7E7E7E;
    border: 1px solid #7E7E7E;
  }
  .redStatus{
    color: #FF4040;
    border: 1px solid #FF4040;
  }
  .yellowStatus{
    color: #FFCF74;
    border: 1px solid #FFCF74;
  }
  .normalStatus{
    color: #74CFFF;
    border: 1px solid #74CFFF;
  }
  .gasLiquid{
    color:#98E0FF;
    margin-left:5px;
    font-size: 16px;
    font-weight: 600;
  }
  #gaugeBox{
    width: 100%;
    height:16vh;
  }
  #lineBox{
    width: 100%;
    height: 23vh;
  }
  #fourGauge{
    width: 100%;
    height: 14vh;
    margin-top: -20px;
  }
  #pressureBox{
    width: 100%;
    height:20vh;
  }
</style>

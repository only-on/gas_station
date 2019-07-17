<template>
  <div>
    <div id="lineBox1" style="height: 300px; width: 650px;margin-top: 20px"></div>
  </div>
</template>

<script>
  import echarts from 'echarts'
  export default {
    props: [
      'echartsDates'
    ],
    data () {
      return {
        chart: {}
      }
    },
    methods: {
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
        // let data = [
        //   {name:'2019/06/11 6:38:08', value:['2019/06/11 6:38:08', 80]},
        //   {name:'2019/06/11 8:18:18', value:['2019/06/11 8:18:18', 60]},
        //   {name:'2019/06/11 9:18:18', value:['2019/06/11 9:18:18', 90]}
        // ]
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
            backgroundColor: '#fff',
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
            right: '15%'
          },
          title: {
            left: 'left',
            text: '气液比今日监控数据',
            textStyle: {
              // color: '#80DAFF',
              fontSize: 18
            }
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
            name: '(气液比)',
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
              name:'气液比',
              type:'line',
              smooth: true,
              // symbol: 'none',
              itemStyle: {
                normal: {
                  color: '#FD4C17'
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
      }
    },
    created: function () {
    },
    mounted () {
      let vm = this
      vm.$nextTick(function () {
        let data = [
          {name:'2019/06/11 9:18:18', value:['2019/06/11 9:18:18', 90]}
        ]
        vm.drawLine('lineBox1', [])
      })
    },
    watch: {
      echartsDates: function () {
        let vm = this
        vm.$nextTick(function () {
          vm.drawLine('lineBox1', this.echartsDates)
        })
      }
    }
  }
</script>

<style scoped>

</style>

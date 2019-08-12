<template>
  <div :style="tankNum <= 2 ? 'width:120px;' : 'width: 80px'" >
    <div :class="changeItem()" :style="(tankNum <= 2 && (dir === 1 || dir === 3 || dir === 5)) ? 'margin-left: 30px' : dir%2===1 && tankNum > 2 ?'margin-left:8px':''">
      <Row style="font-size:14px;text-align: center">
        <Col span="12">
        {{name}}枪
        </Col>
        <Col span="12">
        {{oliType}}#
        </Col>
      </Row>
      <Row style="font-size:14px;text-align: center;margin-top: 5px">
        <Col span="12">
        <img :src="changeImage()" alt="" style="width:25px;height: 20px">
        </Col>
        <Col span="12">
        <img src="../assets/stopUse.png" alt="" v-if="status !== 2 && close === true" style="width:18px;height: 18px">
        <span v-else>{{oliVal}}</span>
        </Col>
      </Row>
      <div :class="tankNum <= 2 ? 'rightLine rightLine2' : 'rightLine rightLine1'" v-if="dir % 2 === 1">
        <div :class="changeRight()"></div>
      </div>
      <div :class="tankNum <= 2 ? 'leftLine leftLine2' : 'leftLine leftLine1'" v-if="dir % 2 === 0">
        <div :class="changeLeft()"></div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    props: ['dir', 'status', 'name', 'oliType', 'oliVal', 'refuel', 'close', 'tankNum', 'timerCount'],
    data () {
      return {
        red: require('@/assets/red.png'),
        redg: require('@/assets/red.gif'),
        dis: require('@/assets/disable.png'),
        green: require('@/assets/green.png'),
        greeng: require('@/assets/green.gif'),
        yellow: require('@/assets/yellow.png'),
        yellowg: require('@/assets/yellow.gif'),
        oligunImage: require('@/assets/oligun.png'),
        src: '',
        currentRefuel: this.refuel,
      }
    },
    created: function () {
      this.changeImage()
    },
    mounted () {
      this.test()
    },
    computed: {
      refuelStatus () {
        const { refuel, timerCount } = this
        return {refuel, timerCount}
      },
    },
    watch: {
      //同时检测refuel timerCount两个属性
      refuelStatus : {
        handler:function (val) {
          // console.log(val)
          this.currentRefuel = val.refuel
          this.test()
        }
      },
      // // 加油状态改变时触发
      // refuel(newVal, o){
      //   this.currentRefuel = newVal
      //   this.test()
      // },
      // // 定时器触发
      // timerCount(){
      //   this.currentRefuel = this.refuel
      //   this.test()
      // },
    },
    methods: {
      changeImage () {
        let result = ''
        if (this.status === 1) {
          if (this.currentRefuel === true) {
            result = this.greeng
          } else {
            result =  this.green
          }
        } else if (this.status === 2) {
          result = this.dis
        } else if (this.status === 3) {
          if (this.currentRefuel === true) {
            result = this.yellowg
          } else {
           result = this.yellow
          }
        } else {
          if (this.currentRefuel === true) {
            result = this.redg
          } else {
            result = this.red
          }
        }
        return result
      },
      test () {
        let thi = this
        if (thi.currentRefuel === true) {
          setTimeout(function () {
            thi.currentRefuel = false
            thi.changeImage()
          }, 10000)
        }
      },
      changeItem () {
        if (this.tankNum <= 2) {
          return this.status === 1 ? 'item2 green' : this.status === 2 ? 'item2 dis' : this.status === 3 ? 'item2 yellow' : 'item2 red'
        } else {
          return this.status === 1 ? 'item green' : this.status === 2 ? 'item dis' : this.status === 3 ? 'item yellow' : 'item red'
        }
      },
      changeRight () {
        if (this.tankNum <= 2) {
          return this.dir === 1 ? 'rightTop' : this.dir === 7 ? 'rightTop2 diffTop2' : ''
        } else if (this.tankNum > 2 && this.tankNum < 5) {
          // 4个加油机
          return this.dir === 1 ? 'rightTop' : this.dir === 7 ? 'rightTop2 diffTop4' : ''
        } else {
          return this.dir === 1 ? 'rightTop' : this.dir === 7 ? 'rightTop2 diffTop4' : ''
        }
      },
      changeLeft () {
        if (this.tankNum <= 2) {
          return this.dir === 2 ? 'leftTop2' : this.dir === 8 ? 'leftTop2 diffBottom2': ''
        } else if (this.tankNum > 2 && this.tankNum < 5) {
          // 4个加油机
          return this.dir === 2 ? 'leftTop' : this.dir === 8 ? 'leftTop diffBottom4': ''
        } else {
          return this.dir === 2 ? 'leftTop' : this.dir === 8 ? 'leftTop6 diffBottom6': ''
        }
      }
    }
  }
</script>

<style scoped>
  .item{
    width:70px;
    height: 60px;
    border-radius:10px;
    padding: 8px 5px;
    position: relative;
  }
  .item2{
    width:86px;
    height: 73px;
    border-radius:10px;
    padding: 8px 5px;
    position: relative;
  }
  .dis {
    box-shadow:0px 0px 18px 0px rgba(112,112,112,1) inset;
    color:#7E7E7E;
  }
  .green {
    box-shadow:0px 0px 10px 0px rgba(116,255,167,1) inset;
    color:#74FFA7;
  }
  .red{
    box-shadow:0px 0px 10px 0px rgba(255,64,64,1) inset;
    color:#FF4040;
  }
  .yellow{
    box-shadow:0px 0px 10px 0px rgba(255,207,116,1) inset;
    color:#FFCF74;
  }
  .normal{
    box-shadow:0px 0px 18px 0px rgba(69,130,170,1) inset;
    color:#74CFFF;
  }
  .rightLine{
    background:#4046FF;
    position: absolute;
    top:0;
    bottom:0;
    margin-top:auto;
    margin-bottom:auto;
  }
  .rightLine1{
    width: 30px;
    height: 5px;
    left: -30px;
  }
  .rightLine2{
    width: 55px;
    height: 5px;
    left: -55px;
  }
  .rightTop{
    width: 5px;
    height:30px;
    background:#4046FF;
  }
  .rightTop2{
    width: 5px;
    height:80px;
    background:#4046FF;
  }
  .leftLine{
    background:#4046FF;
    position: absolute;
    top:0;
    bottom:0;
    margin-top:auto;
    margin-bottom:auto;
  }
  .leftLine1{
    width: 32px;
    height: 5px;
    right: -32px;
  }
  .leftLine2{
    width: 60px;
    height: 5px;
    right: -60px;
  }
  .leftTop{
    width: 5px;
    height:53px;
    background:#4046FF;
    transform:translateX(32px);
  }
  .leftTop2{
    width: 5px;
    height:85px;
    background:#4046FF;
    transform:translateX(60px);
  }
  .leftTop6{
    width: 5px;
    height:70px;
    background:#4046FF;
    transform:translateX(60px);
  }
  .diffTop{
    transform: translateY(-15px);
  }
  .diffTop2{
    transform: translateY(-80px);
  }
  .diffTop4{
    transform: translateY(-80px);
  }
  .diffBottom{
    transform:translate(32px, -48px);
  }
  .diffBottom2{
    transform:translate(58px, -80px);
  }
  .diffBottom4{
    transform:translate(32px, -48px);
  }
  .diffBottom6{
    transform:translate(32px, -65px);
  }
</style>

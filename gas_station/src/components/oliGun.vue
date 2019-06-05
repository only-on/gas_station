<template>
  <div :class="type === 0 ? 'item dis' : type === 1 ? 'item green' : type === 2 ? 'item yellow' : type === 3 ? 'item red' : 'item normal'">
    <Row style="font-size:14px;text-align: center">
      <Col span="12">
      {{name}}
      </Col>
      <Col span="12">
      {{oliType}}
      </Col>
    </Row>
    <Row style="font-size:14px;text-align: center;margin-top: 5px">
      <Col span="12">
      <img :src="type === 0 ? dis : type === 1 ? green : type === 2 ? yellow : type === 3 ? red : oligunImage" alt="" style="width:25px;height: 20px">
      </Col>
      <Col span="12">
      {{oliVal}}
      </Col>
    </Row>
    <div class="rightLine" v-if="dir === 1 || dir === 3 || dir === 5">
      <div :class="dir === 1 ? 'rightTop' : dir === 5 ? 'rightTop diffTop' : ''"></div>
    </div>
    <div class="leftLine" v-if="dir === 2 || dir === 4 || dir === 6">
      <div :class="dir === 2 ? 'leftTop' : dir === 6 ? 'leftTop diffBottom': '' "></div>
    </div>
  </div>
</template>

<script>
  export default {
    props: ['dir', 'type', 'name', 'oliType', 'oliVal'],
    data () {
      return {
        red: require('@/assets/red.png'),
        dis: require('@/assets/disable.png'),
        green: require('@/assets/green.png'),
        yellow: require('@/assets/yellow.png'),
        oligunImage: require('@/assets/oligun.png'),
        src: ''
      }
    },
    created: function () {
    },
    watch: {
      // 'type': function () {
      //   console.log(this.type)
      //   if (this.type === 0) {
      //     this.src = dis
      //   } else if (this.type === 1) {
      //     this.src = green
      //   } else if (this.type === 2) {
      //     this.src = yellow
      //   } else if (this.type === 3) {
      //     this.src = red
      //   } else {
      //     this.src = oligunImage
      //   }
      // }
    }
  }
</script>

<style scoped>
  .item{
    width:70px;
    height: 63px;
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
    width: 30px;
    height: 5px;
    background:#4046FF;
    position: absolute;
    left: -30px;
    top:0;
    bottom:0;
    margin-top:auto;
    margin-bottom:auto;
  }
  .rightTop{
    width: 5px;
    height:20px;
    background:#4046FF;
  }
  .leftLine{
    width: 30px;
    height: 5px;
    background:#4046FF;
    position: absolute;
    right: -30px;
    top:0;
    bottom:0;
    margin-top:auto;
    margin-bottom:auto;
  }
  .leftTop{
    width: 5px;
    height:20px;
    background:#4046FF;
    transform:translateX(25px);
  }
  .diffTop{
    transform: translateY(-15px);
  }
  .diffBottom{
    transform:translate(25px, -15px);
  }
</style>

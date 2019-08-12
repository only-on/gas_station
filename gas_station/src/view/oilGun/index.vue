<template>
  <div class="body">
    <div style="text-align: left">
      <Button @click="refuse" style="margin-bottom: 20px" class="btn-system">刷新</Button>
    </div>
    <div class="body-contents" v-for="(item,index) in list" :key="index" v-show="item.nozzles !== undefined && item.nozzles.length > 0">
      <div class="oil-store-no">
        <img src="../../assets/oil_store.svg" alt="">
        <span class="oil-store-no-text">{{item.number}}&nbsp;#</span>
      </div>
      <div class="line-gun" v-for="itemGun in item.nozzles" :key="itemGun.id" >
        <div class="line-gun-img">
          <div style="height: 80px;width: 80px;margin: auto;position: relative">
            <img style="height: 80px;width: 80px;"
                 :src="changeImage(itemGun.status, itemGun.refuel)"
                 alt="" @click="gunClick(itemGun, item.number)">
            <img src="../../assets/stopUse1.png" alt="" class="stopImage" v-if="itemGun.close === true && itemGun.status !== 2" @click="gunClick(itemGun, item.number)">
          </div>
          <div class="line-gray"></div>
        </div>
        <div class="gun-oil-No">{{itemGun.number}}（{{itemGun.oilNumber}}#）</div>
        <div :class="itemGun.status === 1 ? 'gun-status': itemGun.status === 4 ? 'gun-status-red': itemGun.status === 3 ? 'gun-status-yellow': itemGun.status === 2 ? 'gun-status-gray': ''">
          <div style="margin-bottom: 3px">气液比 {{itemGun.oilValue === null ? '-' : itemGun.oilValue}}</div>
          <div :class="itemGun.status === 1 ? 'gun-status-text': itemGun.status === 4 ? 'gun-status-text-red': itemGun.status === 3 ? 'gun-status-text-yellow': itemGun.status === 2 ? 'gun-status-text-gray': ''">
            {{itemGun.close === true && itemGun.status !== 2 ? '停用' : itemGun.status === 1 ? '正常': itemGun.status === 4 && itemGun.close === false ? '报警' : itemGun.status === 4 && itemGun.close === true ? '停用': itemGun.status === 3 ? '预警': itemGun.status === 2 ? '通讯故障': ''}}
          </div>
        </div>
      </div>
    </div>

    <Modal v-model="changeModal" width="700" :mask-closable="false" >
      <p slot="header" style="color:#666;height: 60px">
        <img style="height: 50px;width: 50px;margin-right: 10px" :src="formItem.status === 1 ? oil_green : formItem.status === 4 ? oil_red : formItem.status === 3 ? oil_yellow : formItem.status === 2 ? oil_gray: 'oil_green'" alt="">
        <img src="../../assets/stopUse1.png" alt="" class="stopImageModal" v-if="formItem.close === true && formItem.status !== 2">
        <span style="font-size: 17px;position: absolute;top: 20px;left: 80px;">
            {{formItem.tanker}}机{{formItem.number}}枪{{formItem.oilNumber}}#
            <div class="switch-button-gray" v-show="!formItem.valve && roles === '0'">
              <div class="switch-inner"></div>
            </div>
            <div  @click="changeTanker" class="switch-button" v-show="formItem.close && roles === '0' && formItem.valve">
              <div class="switch-inner"></div>
            </div>
            <div @click="changeTanker" class="switch-button-checked" v-show="(!formItem.close) && roles === '0' && formItem.valve">
              <div class="switch-inner-checked"></div>
            </div>
          <span v-if="roles === '0' && (formItem.valve)" class="gun-status-gray" style="margin-left: 15px">{{formItem.close === true || formItem.close === 'true' ? '油枪已关闭' : formItem.close === false || formItem.close === 'false' ? '油枪已开启' : '-'}}</span>
          </span>
        <span :class="formItem.status === 1 ? 'gun-status': formItem.status === 4 ? 'gun-status-red': formItem.status === 3 ? 'gun-status-yellow': formItem.status === 2 ? 'gun-status-gray': ''">
              <span :class="formItem.status === 1 ? 'gun-status-text': formItem.status === 4 ? 'gun-status-text-red': formItem.status === 3 ? 'gun-status-text-yellow': formItem.status === 2 ? 'gun-status-text-gray': ''">
                {{formItem.close === true && formItem.status !== 2 ? '停用' : formItem.status === 1 ? '正常': formItem.status === 4 ? '报警': formItem.status === 3 ? '预警': formItem.status === 2 ? '通讯故障': ''}}
              </span>
              <span style="margin-left: 10px">气液比{{formItem.oilValue === null ? '-' : formItem.oilValue}}</span>
          </span>
      </p>
      <div style="text-align:center;padding: 10px 30px">
        <Row type="flex" justify="space-around" class="code-row-bg">
          <Col span="4">
          <div class="modal-text-color">
            {{formItem.seconds === null ? '-' : formItem.seconds}}
          </div>
          <div>
            加油时间（s）
          </div>
          </Col>
          <Col span="4">
          <div class="modal-text-color">
            {{formItem.gasSpeed === null ? '-' : formItem.gasSpeed}}
          </div>
          <div>
            气体平均流速（L/Min）
          </div>
          </Col>
          <Col span="4">
          <div class="modal-text-color">
            {{formItem.gasFlow === null ? '-' : formItem.gasFlow}}
          </div>
          <div>
            本次气体流量（L）
          </div>
          </Col>
          <Col span="4">
          <div class="modal-text-color">
            {{formItem.oilFlow === null ? '-' : formItem.oilFlow}}
          </div>
          <div>
            本次燃油流量（L）
          </div>
          </Col>
          <Col span="4">
          <div class="modal-text-color">
            {{formItem.liquidResistanceal === null ? '-' : formItem.liquidResistanceal}}
          </div>
          <div>
            液阻（kpa）
          </div>
          </Col>
        </Row>
        <echartsForm :echartsDates="echartsDates"></echartsForm>
      </div>
      <div slot="footer" style="text-align: center">
        <Button @click="submit" class="btn-submit">查看详情</Button>
      </div>
    </Modal>
  </div>
</template>

<script>
  import { getNozzle, getNozzleDetails, nozzleClose } from '../../api/api'
  import echartsForm from '../../components/oil_gun_echarts'
  import echarts from 'echarts'
  import oil_gif from '../../assets/oil.gif'
  import oil_red_gif from '../../assets/oil_red_gif.gif'
  import oil_yellow_gif from '../../assets/oil_yellow_gif.gif'
  import oil_red from '../../assets/oil_red.png'
  import oil_green from '../../assets/oil_green.png'
  import oil_gray from '../../assets/oil_gray.png'
  import oil_yellow from '../../assets/oil_yellow.png'
  export default {
    components: {
      echartsForm
    },
    data () {
      return {
        roles: '',
        echartsDates: [],
        chart: {},
        formItem: {
          status: '',
          number: '',
          oilNumber: '',
          oilValue: '-',
          tanker: '',
          oilFlow: '-',
          gasSpeed: '-',
          gasFlow: '-',
          seconds: '-',
          liquidResistanceal: '-'
        },
        nozzleId: '',
        changeModal: false,
        oil_gif: oil_gif,
        oil_red_gif: oil_red_gif,
        oil_yellow_gif: oil_yellow_gif,
        oil_red: oil_red,
        oil_green: oil_green,
        oil_gray: oil_gray,
        oil_yellow: oil_yellow,
        list: [{}]
      }
    },
    methods: {
      changeTanker () {
        // this.$Spin.show()
        let closestatus = this.formItem.close === true ? false : true
        let para = {
          id: this.formItem.id,
          close: closestatus
        }
        nozzleClose(para).then((res) => {
          if (res.data.code === 1000) {
            this.$Message.success('下发命令成功')
            this.changeModal = false
            let vm = this
            setTimeout(function () {
              let par = {
                gasStationId: JSON.parse(sessionStorage.getItem('station')).stationId
              }
              getNozzle(par).then((ressp) => {
                if (ressp.data.code === 1000) {
                  vm.list = ressp.data.content.tankers
                  vm.gifTimeout()
                }
              })
            }, 2000)
          } else {
            this.$Message.error(res.data.message)
          }
          // this.$Spin.hide();
        })
        // this.$Spin.hide();
      },
      gifTimeout () {
        let thi = this
        setTimeout(function () {
          for(let item of thi.list) {
            for(let itemgun of item.nozzles) {
              itemgun.refuel = false
            }
          }
          thi.imgSrc = thi.changeImage()
        }, 20000)
      },
      changeImage (status, refuel) {
        let result = ''
        if (status === 1) {
          if (refuel === 'true' || refuel === true) {
            result = this.oil_gif
          } else {
            result =  this.oil_green
          }
        } else if (status === 2) {
          result = this.oil_gray
        } else if (status === 3) {
          if (refuel === 'true' || refuel === true) {
            result = this.oil_yellow_gif
          } else {
            result = this.oil_yellow
          }
        } else {
          if (refuel === 'true' || refuel === true) {
            result = this.oil_red_gif
          } else {
            result = this.oil_red
          }
        }
        return result
      },
      refuse () {
        let par = {
          gasStationId: JSON.parse(sessionStorage.getItem('station')).stationId
        }
        getNozzle(par).then((res) => {
          if (res.data.code === 1000) {
            this.list = res.data.content.tankers
            this.$Message.success('刷新成功')
            this.gifTimeout()
          }
        })
      },
      gunClick (item, number) {
        this.echartsDates = []
        this.nozzleId = item.id
        let par = {
          nozzleId: item.id
        }
        getNozzleDetails(par).then((res) => {
          if (res.data.code === 1000) {
            let items = res.data.content
            this.formItem.id = items.id
            this.formItem.status = items.status
            this.formItem.number = items.number
            this.formItem.oilNumber = items.oilNumber
            this.formItem.oilValue = items.oilValue
            this.formItem.tanker = items.tankerNumber
            this.formItem.oilFlow = items.oilFlow
            this.formItem.gasSpeed = items.gasSpeed
            this.formItem.gasFlow = items.gasFlow
            this.formItem.seconds = items.seconds
            this.formItem.close = items.close
            this.formItem.liquidResistanceal = items.liquidResistanceal
            this.formItem.valve = items.valve
            let vm = this
            vm.changeModal = true
            vm.$nextTick(function () {
              if (items.list !== null) {
                if (items.list.length > 0) {
                  // 折线图数据
                  for (let i = 0; i < items.list.length; i++) {
                    let s = {
                      name: items.list[i].time,
                      value:[items.list[i].time, items.list[i].value]
                    }
                    vm.echartsDates.push(s)
                  }
                }
              }
            })
          } else {
            this.formItem.status = item.status
            this.formItem.number = item.number
            this.formItem.oilNumber = item.oilNumber
            this.formItem.oilValue = item.oilValue
            this.formItem.tanker = item.tankerNumber
            this.formItem.close = item.close
            this.formItem.oilFlow = '-'
            this.formItem.gasSpeed = '-'
            this.formItem.gasFlow = '-'
            this.formItem.seconds = '-'
            this.formItem.liquidResistanceal = '-'
          }
        })
        this.changeModal = true
      },
      submit () {
        this.$router.push({name: 'gun_data',params:{nozzleId: this.nozzleId}})
        this.changeModal = false
      }
    },
    created: function () {
      this.roles = JSON.parse(sessionStorage.getItem('station')).role + ''
    },
    mounted () {
      let vm = this
      vm.$nextTick(function () {
        let par = {
          gasStationId: JSON.parse(sessionStorage.getItem('station')).stationId
        }
        getNozzle(par).then((res) => {
          if (res.data.code === 1000) {
            vm.list = res.data.content.tankers
            vm.gifTimeout()
          }
        })
      })
    }
  }
</script>

<style lang="less" scoped>
  @import '../../assets/styles/variable/variable.less';
  .body-contents {
    padding: 20px;
    text-align: left;
    position: relative;
    background: @main-text-white;
    margin-bottom: 20px;
    min-width: 1600px;
    box-shadow:0px 2px 17px 0px rgba(190,190,190,0.5);
  }
  .oil-store-no-text {
    position: absolute;
    left: 45px;
    top: 30px;
    right: 0;
    bottom: 0;
  }
  .oil-store-no {
    font-size: 18px;
    position: relative;
    display: inline-block;
  }
  .line-gun {
    position: relative;
    display: inline-block;
    /*margin-left: 30px;*/
    height: 100%;
    text-align: center;
    vertical-align: top;
    padding-left: 30px;
    width: 160px;
  }
  .line-gun-img {
    position: relative;
    margin-bottom: 3px;
  }
  .stopImage{
    height: 80px;
    width: 80px;
    position: absolute;
    left:0;top:0
  }
  .stopImageModal {
    height: 50px;
    width: 50px;
    position: absolute;
    left:15px;
    top:15px;
  }
  .line-gray {
    position: absolute;
    left: -54px;
    top: 0px;
    right: 0;
    bottom: 0;
    margin-top: auto;
    margin-bottom: auto;
    height: 1px;
    width: 79px;
    background: @main-line-gray;
  }
  .gun-oil-No {
    font-size: 18px;
    margin-bottom: 2px;
  }
  .gun-status {
    font-size: 14px;
    color: @main-gun-stutas-green;
  }
  .gun-status-text {
    padding: 1px 10px;
    border-radius: 30px;
    border: 1px solid @main-gun-stutas-green;
    display: inline-block;
  }
  .gun-status-red {
    font-size: 14px;
    color: @main-gun-stutas-red;
  }
  .gun-status-text-red {
    padding: 1px 10px;
    border-radius: 30px;
    border: 1px solid @main-gun-stutas-red;
    display: inline-block;
  }
  .gun-status-yellow {
    font-size: 14px;
    color: @main-gun-stutas-yellow;
  }
  .gun-status-text-yellow {
    padding: 1px 10px;
    border-radius: 30px;
    border: 1px solid @main-gun-stutas-yellow;
    display: inline-block;
  }
  .gun-status-gray {
    font-size: 14px;
    color: @main-gun-stutas-gray;
  }
  .gun-status-text-gray {
    padding: 1px 10px;
    border-radius: 30px;
    border: 1px solid @main-gun-stutas-gray;
    display: inline-block;
  }
  .modal-text-color {
    color: @modal-text-blue;
    font-size: 20px;
    margin-bottom: 20px;
  }
  .switch-button-gray {
    margin-left: 20px;
    width: 45px;
    height: 15px;
    line-height: 15px;
    border-radius: 22px;
    vertical-align: middle;
    border: 1px solid @main-gun-stutas-gray;
    background-color: @main-gun-stutas-gray;
    display: inline-block;
    position: relative;
  }
  .switch-button {
    margin-left: 20px;
    width: 45px;
    height: 15px;
    line-height: 15px;
    border-radius: 22px;
    vertical-align: middle;
    border: 1px solid @main-gun-stutas-red;
    background-color: @main-gun-stutas-red;
    display: inline-block;
    position: relative;
  }
  .switch-inner {
    width: 22px;
    height: 22px;
    border-radius: 50px;
    background-color: #fff;
    color: #fff;
    font-size: 12px;
    position: absolute;
    top: -5px;
    left: -1px;
    box-shadow:0px 1px 4px 0px rgba(0,0,0,0.5);
  }
  .switch-button-checked {
    margin-left: 20px;
    width: 45px;
    height: 15px;
    line-height: 15px;
    border-radius: 22px;
    vertical-align: middle;
    border: 1px solid @main-gun-stutas-green;
    background-color: @main-gun-stutas-green;
    display: inline-block;
    position: relative;
  }
  .switch-inner-checked {
    width: 22px;
    height: 22px;
    border-radius: 50px;
    background-color: #fff;
    color: #fff;
    font-size: 12px;
    position: absolute;
    top: -5px;
    right: -1px;
    box-shadow:0px 1px 4px 0px rgba(0,0,0,0.5);
  }
</style>

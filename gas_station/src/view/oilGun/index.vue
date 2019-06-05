<template>
    <div class="body">
      <div class="content" v-for="item in list" :key="item.oilId">
        <div class="oil-store-no">
          <img src="../../assets/oil_store.svg" alt="" >
          <span class="oil-store-no-text">{{item.oilName}}#</span>
        </div>
        <div class="line-gun" v-for="itemGun in item.gunList" :key="itemGun.gunId">
          <div class="line-gun-img">
            <img style="height: 80px;width: 80px" :src="itemGun.status === 0 ? oil_gif: itemGun.status === 1 ? oil_red: itemGun.status === 2 ? oil_yellow: itemGun.status === 3 ? oil_gray: 'oil_gif'" alt="" >
            <div class="line-gray"></div>
          </div>
          <div>{{itemGun.gunName}}</div>
          <div :class="itemGun.status === 0 ? 'gun-status': itemGun.status === 1 ? 'gun-status-red': itemGun.status === 2 ? 'gun-status-yellow': itemGun.status === 3 ? 'gun-status-gray': ''">
            <div :class="itemGun.status === 0 ? 'gun-status-text': itemGun.status === 1 ? 'gun-status-text-red': itemGun.status === 2 ? 'gun-status-text-yellow': itemGun.status === 3 ? 'gun-status-text-gray': ''">
              {{itemGun.status === 0 ? '正常': itemGun.status === 1 ? '告警': itemGun.status === 2 ? '预警': itemGun.status === 3 ? '通讯故障': ''}}
            </div>
            <span>气液比 {{itemGun.gasLiquidRatio}}</span>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
  import oil_gif from '../../assets/oil.gif'
  import oil_red from '../../assets/oil_red.png'
  import oil_green from '../../assets/oil_green.png'
  import oil_gray from '../../assets/oil_gray.png'
  import oil_yellow from '../../assets/oil_yellow.png'
  export default {
    data () {
      return {
        oil_gif: oil_gif,
        oil_red: oil_red,
        oil_green: oil_green,
        oil_gray: oil_gray,
        oil_yellow: oil_yellow,
        list: [
          {
            oilName: '01',
            oilId: 1,
            gunList: [
              {
                gunName: '01',
                gunId: 1,
                status: 0,
                gasLiquidRatio: 1.2
              },
              {
                gunName: '02',
                gunId: 2,
                status: 1,
                gasLiquidRatio: 1.4
              },
              {
                gunName: '03',
                gunId: 3,
                status: 2,
                gasLiquidRatio: 2.2
              }
            ]
          },
          {
            oilName: '02',
            oilId: 2,
            gunList: [
              {
                gunName: '01',
                gunId: 1,
                status: 3,
                gasLiquidRatio: 1.2
              },
              {
                gunName: '02',
                gunId: 2,
                status: 2,
                gasLiquidRatio: 1.4
              },
              {
                gunName: '03',
                gunId: 3,
                status: 1,
                gasLiquidRatio: 2.2
              },
              {
                gunName: '04',
                gunId: 4,
                status: 3,
                gasLiquidRatio: 3.2
              },
              {
                gunName: '05',
                gunId: 5,
                status: 2,
                gasLiquidRatio: 3.2
              },
              {
                gunName: '06',
                gunId: 6,
                status: 1,
                gasLiquidRatio: 3.2
              },
              {
                gunName: '07',
                gunId: 7,
                status: 1,
                gasLiquidRatio: 3.2
              },
              {
                gunName: '08',
                gunId: 8,
                status: 2,
                gasLiquidRatio: 3.2
              }
            ]
          },
          {
            oilName: '03',
            oilId: 3,
            gunList: [
              {
                gunName: '01',
                gunId: 1,
                status: 3,
                gasLiquidRatio: 1.2
              },
              {
                gunName: '02',
                gunId: 2,
                status: 2,
                gasLiquidRatio: 1.4
              },
              {
                gunName: '03',
                gunId: 3,
                status: 1,
                gasLiquidRatio: 2.2
              },
              {
                gunName: '04',
                gunId: 4,
                status: 3,
                gasLiquidRatio: 3.2
              },
              {
                gunName: '05',
                gunId: 5,
                status: 2,
                gasLiquidRatio: 3.2
              },
              {
                gunName: '06',
                gunId: 6,
                status: 1,
                gasLiquidRatio: 3.2
              },
              {
                gunName: '07',
                gunId: 7,
                status: 1,
                gasLiquidRatio: 3.2
              },
              {
                gunName: '08',
                gunId: 8,
                status: 2,
                gasLiquidRatio: 3.2
              }
            ]
          }
        ]
      }
    }
  }
</script>

<style lang="less" scoped>
  @import '../../assets/styles/variable/variable.less';
  .content {
    padding: 20px;
    text-align: left;
    position: relative;
    background: @main-text-white;
    margin-bottom: 20px;
  }
  .oil-store-no-text {
    position: absolute;
    left: 40px;
    top: 30px;
    right: 0;
    bottom: 0;
  }
  .oil-store-no {
    position: relative;
    display: inline-block;
  }
  .line-gun {
    position: relative;
    display: inline-block;
    margin-left: 30px;
    text-align: center;
  }
  .line-gun-img {
    position: relative;
  }
  .line-gray {
    position: absolute;
    left: -45px;
    top: 0px;
    right: 0;
    bottom: 0;
    margin-top: auto;
    margin-bottom: auto;
    height: 1px;
    width: 70px;
    background: @main-line-gray;
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
    margin-right: 15px;
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
    margin-right: 15px;
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
    margin-right: 15px;
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
    margin-right: 15px;
  }
</style>

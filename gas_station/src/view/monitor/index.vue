<template>
  <div id="body">
   <Row class="titleBar">
      <div>CopyRight © 西安通尚电子科技有限公司 .All Rights Reserved 2019 - 2020</div>
      <div>{{stationName}}</div>
     <Button class="logoutBtn" @click="logoutMonitor">退出监控</Button>
   </Row>
    <div id="content">
      <Row :gutter="24" style="height: 100%">
        <!--左侧-->
        <Col span="16">
          <Row class="oliGunInfo">
            <Row type="flex" justify="start" :gutter="16" style="font-size: 16px;line-height: 27px;">
              <Col span="3">
                基本信息
              </Col>
              <Col span="3">
                <img src="../../assets/oligun.png" alt="" style="width:20px;height: 17px">
              油枪 <span class="basicText">{{basicData.nozzleCount}}</span>
              </Col>
              <Col span="3">
              <img src="../../assets/tanker.png" alt="" style="width:17px;height: 17px">
              加油机 <span class="basicText">{{basicData.tankerCount}}</span>
              </Col>
              <Col span="3">
              <img src="../../assets/tank.png" alt="" style="width:17px;height: 17px">
              油罐 <span class="basicText">{{basicData.oilTankCount}}</span>
              </Col>
            </Row>
            <div class="mainCon">
              <Col span="18">
              <div class="oliItem" :style="tankCount> 2 && tankCount < 5 ? 'padding:0 100px 0 90px' :'padding-right: 20px;'">
                <!--二个加油机-->
                <div class="itemLine" v-for="(each,eachIndex) in oliArr" :key="eachIndex" v-if="tankCount < 3">
                  <div class="itemSet" v-for="(item,index) in each" :key="index" style="margin-bottom: 10px">
                    <div style="float: left;margin-right:13px;">
                      <div v-for="(item1, index1) in item.children[0]" :key="index1" :style="tankCount < 3 ? 'margin-bottom: 20px': ''">
                        <oligun :dir="item.length > 4 ? index1*2+2 : 4" :tankNum="tankCount" :timerCount="timerCount" :status="item1.status" :refuel="item1.refuel" :class="item.length > 4 ? 'dir'+(index1*2+2):'dir24'" :close="item1.close" :name="item1.number" :oliType="item1.oilNumber" :oliVal="item1.oilValue === null ? '-' : item1.oilValue"></oligun>
                      </div>
                    </div>
                    <div style="float: left;position: relative;z-index:2">
                      <img src="../../assets/tankerBig.png" alt="" class="tankImage tankImage2">
                      <span class="tankName tankName2" style="font-size:16px;color:#8AFFF5">{{item.number}}号<br>加油机</span>
                    </div>
                    <div style="float: right;margin-left:23px">
                      <div  v-for="(item2, index2) in item.children[1]" :key="index2" :style="tankCount < 3 ? 'margin-bottom: 20px': ''">
                        <oligun :dir="item.length > 4 ? index2*2+1 : 3" :tankNum="tankCount" :timerCount="timerCount" :status="item2.status" :refuel="item2.refuel" :class="item.length > 4 ? 'dir'+(index2*2+1):'dir23'" :close="item2.close" :name="item2.number" :oliType="item2.oilNumber" :oliVal="item2.oilValue === null ? '-' : item2.oilValue"></oligun>
                      </div>
                    </div>
                  </div>
                </div>
                <!--四个加油机-->
                <div class="itemLine" v-for="(each,eachIndex) in oliArr" :key="eachIndex" v-if="tankCount > 2 && tankCount < 5" >
                  <div class="itemSet" v-for="(item,index) in each" :key="index" style="margin-bottom: 10px">
                    <div style="float: left;margin-right:13px;">
                      <div v-for="(item1, index1) in item.children[0]" :key="index1">
                        <oligun :dir="item.length > 4 ? index1*2+2 : 4" :tankNum="tankCount" :timerCount="timerCount" :status="item1.status" :refuel="item1.refuel" :class="item.length > 4 ? 'dir'+(index1*2+2):'dir24'" :close="item1.close" :name="item1.number" :oliType="item1.oilNumber" :oliVal="item1.oilValue === null ? '-' : item1.oilValue"></oligun>
                      </div>
                    </div>
                    <div style="float: left;position: relative;z-index:2">
                      <img src="../../assets/tankerBig.png" alt="" class="tankImage tankImage4">
                      <span class="tankName tankName4" style="font-size:16px;color:#8AFFF5">{{item.number}}号<br>加油机</span>
                    </div>
                    <div style="float: left;margin-left:23px">
                      <div  v-for="(item2, index2) in item.children[1]" :key="index2" >
                        <oligun :dir="item.length > 4 ? index2*2+1 : 3" :tankNum="tankCount" :timerCount="timerCount" :status="item2.status" :refuel="item2.refuel" :class="item.length > 4 ? 'dir'+(index2*2+1):'dir23'" :style="item.length > 7? 'margin-left: -14px': ''" :close="item2.close" :name="item2.number" :oliType="item2.oilNumber" :oliVal="item2.oilValue === null ? '-' : item2.oilValue"></oligun>
                      </div>
                    </div>
                  </div>
                </div>
                <!--六个加油机-->
                <div class="itemLine" v-for="(each,eachIndex) in oliArr" :key="eachIndex" v-if="tankCount > 4 && tankCount < 7">
                  <div class="itemSet" v-for="(item,index) in each" :key="index" :style="item.id === -1 ? 'visibility: hidden;margin-bottom:10px':'visibility: visible;margin-bottom:10px'">
                    <div style="float: left;margin-right:13px;">
                      <div v-for="(item1, index1) in item.children[0]" :key="index1">
                        <oligun :dir="item.length > 4 ? index1*2+2 : 4" :tankNum="tankCount" :timerCount="timerCount" :status="item1.status" :refuel="item1.refuel" :class="item.length > 4 ? 'dir'+(index1*2+2):'dir24'" :close="item1.close" :name="item1.number" :oliType="item1.oilNumber" :oliVal="item1.oilValue === null ? '-' : item1.oilValue"></oligun>
                      </div>
                    </div>
                    <div style="float: left;position: relative;z-index:2">
                      <img src="../../assets/tankerBig.png" alt="" class="tankImage tankImage6">
                      <span class="tankName tankName6" style="font-size:16px;color:#8AFFF5 ">{{item.number}}号<br>加油机</span>
                    </div>
                    <div style="float: left;margin-left:23px">
                      <div  v-for="(item2, index2) in item.children[1]" :key="index2" >
                        <oligun :dir="item.length > 4 ? index2*2+1 : 3" :tankNum="tankCount" :timerCount="timerCount" :status="item2.status" :refuel="item2.refuel" :class="item.length > 4 ? 'dir'+(index2*2+1):'dir23'" :style="item.length > 7? 'margin-left: -14px': ''" :close="item2.close" :name="item2.number" :oliType="item2.oilNumber" :oliVal="item2.oilValue === null ? '-' : item2.oilValue"></oligun>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              </Col>
              <Col span="6" style="min-height: 450px">
              <Carousel
                v-model="value3"
                :loop="setting.loop"
                :autoplay="setting.autoplay"
                :autoplay-speed="setting.autoplaySpeed"
                :dots="setting.dots"
                :radius-dot="setting.radiusDot"
                :trigger="setting.trigger"
                :arrow="setting.arrow" easing="none">
                <!--油罐-->
                <CarouselItem>
                  <div class="demo-carousel">
                    <div class="tankBox">
                      <div class="tankBoxTitle">油罐</div>
                          <div style="position: relative;height: 100%" >
                          <Col :span="spanVal" v-for="(items,indexs) in tankList" :key="indexs" style="height: 100%">
                            <div  style="height:100%;display: flex;flex-direction: column;justify-content: space-around">
                            <div v-for="(item,index) in items" :key="index" :style="item.id === -1 ? 'visibility:hidden': 'visibility:visble'">
                              <Row type="flex" justify="center" style="margin-bottom: 5px">
                                <div style="position: relative">
                                  <div :class="oliTankBackground(item.oilTankStatus, 1)"></div>
                                  <div :class="oliTankBackground(item.oilTankStatus, 0)">
                                    <div :class="oliTankColor(item.oilTankStatus)" :style="'height:' + (item.value === null ? 0 : item.value) +'%'"></div>
                                    <div class="numQuantity">{{item.name}}罐{{item.oilNumber}}#</div>
                                  </div>
                                  <img src="../../assets/leak.png" alt="" class="leakImage"  v-if="item.leak === true">
                                  <img src="../../assets/equipIcon.png" alt="" class="leakImage" v-if="item.signalAndExploring === true" :style="item.leak === true ? 'right:-25px' : ''">
                                </div>
                              </Row>
                              <div>
                                <Row class="oliTankInfo" type="flex" justify="start">
                                  <Col :span="oneSpan" :push="pushVal" style="text-align: left">
                                  <img :src="iconImage(item.oilTankStatus, 0)" alt="">
                                  <span :style="textColor(item.oilTankStatus)">
                                    <span>油罐压力</span>
                                    <span>{{item.pressure === null ? '-' : item.pressure + ' pa'}}</span>
                                  </span>
                                  </Col>
                                </Row>
                                <Row class="oliTankInfo" type="flex" justify="start">
                                  <Col :span="oneSpan" :push="pushVal" style="text-align: left">
                                  <img :src="iconImage(item.sidewaysStatus, 1)" alt="">
                                  <span :style="textColor(item.sidewaysStatus)">
                                    <span>测漏压力</span>
                                    <span>{{item.sidewaysPressure === null ? '-' : item.sidewaysPressure + ' pa'}}</span>
                                  </span>
                                  </Col>
                                </Row>
                                <Row class="oliTankInfo" type="flex" justify="start">
                                  <Col :span="oneSpan" :push="pushVal" style="text-align: left">
                                  <img :src="remainG" alt="">
                                  <span>
                                     <span>剩余油量</span>
                                    <span>{{item.value === null ? '未知' : item.value + '%'}}</span>
                                   </span>
                                  </Col>
                                </Row>
                              </div>
                            </div>
                          </div>
                          </Col>
                      </div>
                    </div>
                  </div>
                </CarouselItem>
                <!--双层管线-->
                <CarouselItem v-if="pipeList.length !== 0">
                  <div class="demo-carousel">
                    <div class="tankBox">
                      <div class="tankBoxTitle">管线</div>
                     <div style="width: 100%;height:95%;">
                       <happy-scroll color="#8391A5" size="4" resize hide-horizontal>
                         <div style="position: relative;height: 100%;padding:5px 0" >
                           <Col :span="spanPipe" v-for="(items,indexs) in pipeList" :key="indexs" style="height: 100%">
                           <div  style="height: 100%;display: flex;flex-direction: column;justify-content: space-around">
                             <div v-for="(item,index) in items" :key="index" :style="item.id === -1 ? 'visibility:hidden': 'visibility:visble'">
                               <div style="margin-bottom: 6px">
                                 <Row type="flex" justify="center">
                                   <div  style="position: relative">
                                     <img :src="item.status === 1 ? pipeG : item.status === 2 ? pipeH : pipeR" alt="" style="height:35px;width:70px">
                                     <img src="../../assets/leak.png" alt="" class="equipImage" v-show="item.alarm === true" :style="item.fault === true ? 'left:-20px' : ''">
                                     <img src="../../assets/equipIcon.png" alt="" class="equipImage" v-show="item.fault === true" :style="item.alarm === true ? 'left:25px;' : ''">
                                   </div>
                                 </Row>
                                 <Row style="font-size: 14px;margin-top: -5px">{{item.number}}#</Row>
                                 <Row type="flex" justify="center">
                                   <div :class="item.status === 1 ? 'olitankStatus greenStatus' : item.status === 2 ? 'olitankStatus disStatus' : 'olitankStatus redStatus'">{{item.status === 1 ? '正常' : item.status === 2 ?'离线' : '报警'}}</div>
                                 </Row>
                               </div>
                             </div>
                           </div>
                           </Col>
                         </div>
                       </happy-scroll>
                     </div>
                    </div>
                  </div>
                </CarouselItem>
                <!--复合人井-->
                <CarouselItem v-if="peopleWellList.length !== 0">
                  <div class="demo-carousel">
                    <div class="tankBox">
                      <div class="tankBoxTitle">人井</div>
                     <div style="width: 100%;height:95%;">
                       <happy-scroll color="#8391A5" size="4" resize hide-horizontal>
                         <div style="position: relative;height: 100%;padding:5px 0" >
                           <Col :span="spanPeo" v-for="(items,indexs) in peopleWellList" :key="indexs" style="height: 100%">
                           <div  style="height:100%;display: flex;flex-direction: column;justify-content: space-around">
                             <div v-for="(item,index) in items" :key="index" :style="item.id === -1 ? 'visibility:hidden': 'visibility:visble'">
                               <div style="margin-bottom: 6px">
                                 <Row type="flex" justify="center">
                                   <div  style="position: relative">
                                     <img :src="item.status === 1 ? wellG : item.status === 2 ? wellH : wellR" alt="" style="width:62px;height:50px;">
                                     <img src="../../assets/leak.png" alt="" class="equipImage" v-show="item.alarm === true" :style="item.fault === true ? 'left:-20px' : ''">
                                     <img src="../../assets/equipIcon.png" alt="" class="equipImage" v-show="item.fault === true" :style="item.alarm === true ? 'left:25px;' : ''">
                                   </div>
                                 </Row>
                                 <Row style="font-size: 14px;margin-top: -5px">{{item.number}}#</Row>
                                 <Row type="flex" justify="center">
                                   <div :class="item.status === 1 ? 'olitankStatus greenStatus' : item.status === 2 ? 'olitankStatus disStatus' : 'olitankStatus redStatus'">{{item.status === 1 ? '正常' : item.status === 2 ?'离线' : '报警'}}</div>
                                 </Row>
                               </div>
                             </div>
                           </div>
                           </Col>
                         </div>
                       </happy-scroll>
                     </div>
                    </div>
                  </div>
                </CarouselItem>
                <!--加油机底槽-->
                <CarouselItem v-if="oliBasinList.length !== 0">
                  <div class="demo-carousel">
                    <div class="tankBox">
                      <div class="tankBoxTitle">油盆</div>
                      <div style="width: 100%;height:95%;">
                        <happy-scroll color="#8391A5" size="4" resize hide-horizontal>
                      <div style="position: relative;height: 100%;padding:5px 0" >
                        <Col :span="spanOli" v-for="(items,indexs) in oliBasinList" :key="indexs" style="height: 100%">
                        <div  style="height:100%;display: flex;flex-direction: column;justify-content: space-around">
                          <div v-for="(item,index) in items" :key="index" :style="item.id === -1 ? 'visibility:hidden': 'visibility:visble'">
                            <div style="margin-bottom: 6px">
                              <Row type="flex" justify="center">
                                <div  style="position: relative">
                                  <img :src="item.status === 1 ? bottomG : item.status === 2 ? bottomH : bottomR" alt="" style="width:60px;height:45px;">
                                  <img src="../../assets/leak.png" alt="" class="equipImage" v-show="item.alarm === true" :style="item.fault === true ? 'left:-20px' : ''">
                                  <img src="../../assets/equipIcon.png" alt="" class="equipImage" v-show="item.fault === true" :style="item.alarm === true ? 'left:25px;' : ''">
                                </div>
                              </Row>
                              <Row style="font-size: 14px;">{{item.number}}#</Row>
                              <Row type="flex" justify="center">
                                <div :class="item.status === 1 ? 'olitankStatus greenStatus' : item.status === 2 ? 'olitankStatus disStatus' : 'olitankStatus redStatus'">{{item.status === 1 ? '正常' : item.status === 2 ?'离线' : '报警'}}</div>
                              </Row>
                            </div>
                          </div>
                        </div>
                        </Col>
                      </div>
                        </happy-scroll>
                      </div>
                    </div>
                  </div>
                </CarouselItem>
              </Carousel>
              </Col>
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
                  {{dataStastic.time}}
                </Row>
              </Col>
              <Col span="8">
                <Row style="margin: 30px 0 20px">
                  加油次数<br>(次)
                </Row>
                <Row style="color:#8AFFF5;font-size: 22px">
                  {{dataStastic.number}}
                </Row>
              </Col>
              <Col span="8">
                <Row style="margin: 30px 0 20px">
                  平均时间<br>(min/次)
                </Row>
                <Row style="color:#8AFFF5;font-size: 22px">
                  {{dataStastic.average}}
                </Row>
              </Col>
            </Row>
            </Col>
            <Col span="7" class="leftBottom">
            <Row type="flex" justify="start">今日油品统计</Row>
              <Row class="tipTitle" style="margin-top: 5px">
              <Row style="margin: 10px 0 10px">
                <Col span="8">
                  92#<br>(L)
                </Col>
                <Col span="8">
                95#<br>(L)
                </Col>
                <Col span="8">
                98#<br>(L)
                </Col>
              </Row>
                <Row id="oliTypeBox"></Row>
            </Row>
            </Col>
            <Col span="9" class="leftBottom" style="position: relative">
              <Row type="flex" justify="space-between">
                <Col>当前告警数量统计</Col>
                <Col style="color:#98E0FF;font-size: 16px">总计 <span style="color:#87FFE6">{{alarmTotal}}</span></Col>
              </Row>
              <Row id="alarmBox" style="position: absolute;bottom: 0;left: 20px;"></Row>
            </Col>
          </Row>
        </Col>
        <!--右侧-->
        <Col span="8">
          <Row class="oliGunDetail" style="margin-bottom: 20px">
            <Row>
              <Col span="12">
              <Row type="flex" justify="start" style="font-size:18px;margin-bottom: 10px">
                {{nozzleObj.tankerNumber}}机{{nozzleObj.number}}枪{{nozzleObj.oilNumber}}#
                <!--<span style="margin-left: 20px;color:#74FFA7">加油中</span>-->
              </Row>
              <Row>
                <Col span="7">
                  <div :class="nozzleClass" style="position: relative">
                    <img :src="nozzleImage" alt="">
                    <img src="../../assets/stopUse.png" alt="" v-if="nozzleObj.status !== 2 && nozzleObj.close === true" style="width:18px;height: 18px;position: absolute;bottom:10px;left:10px">
                  </div>
                </Col>
                <Col span="16">
                  <Row type="flex" justify="start">
                    <div :class="nozzleStatus" style="margin-left: 0">{{nozzleObj.status !== 2 && nozzleObj.close === true ? '停用' : nozzleObj.status === 1 ? '正常' : nozzleObj.status === 2 ? '离线' : nozzleObj.status === 3 ? '预警' : '报警'}}</div>
                  </Row>
                <Row type="flex" justify="start" style="font-size:14px;margin-top: 20px">
                  平均气液比
                  <span class="gasLiquid">{{nozzleObj.oilAverageValue}}</span>
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
            <Row type="flex" justify="start" style="font-size:18px;margin-bottom:15px">
              <span style="margin-right: 20px">环境监测</span>
            </Row>
            <Row>
              <div id="fourGauge"></div>
            </Row>
            <Row type="flex" justify="space-around" style="margin-top:-8px;margin-bottom: 10px">
                <div v-for="(item,index) in statusList" :key="index + 'a'" >
                  <span class="gaugeTitle">{{item.name}}</span>
                  <div :class="item.value === '1' ? 'olitankStatus greenStatus' : item.value === '2' ? 'olitankStatus disStatus' : item.value === '3' ? 'olitankStatus yellowStatus' : 'olitankStatus redStatus'">{{item.value === '1' ? '正常' : item.value === '2' ? '离线' : item.value === '3' ? '预警' : '报警'}}</div>
                </div>
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
  import { todayData, oliTankMonitor, monitorAlarm, monitorBasic, monitorNozzle, monitorThresold, monitorTank, userLogOut, pipeLine, peopleWell, oliBasin } from '../../api/api'
  export default {
    components: {
      oligun
    },
    data () {
      return {
        timerCount: 0,
        isLimit: false,
        value3: 0,
        pushVal: 0,
        oneSpan: 0,
        setting: {
          loop: false,
          autoplay: false,
          autoplaySpeed: 10000,
          dots: 'inside',
          radiusDot: false,
          trigger: 'click',
          arrow: 'never'
        },
        pipeList:[],
        peopleWellList: [],
        oliBasinList: [],
        spanPipe: 12,
        spanPeo: 12,
        spanOli: 12,
        onlyFlag: true,
        conType: '',
        conStatus: 0,
        spanVal: 12,
        tankCount: 0,
        alarmTypeList: [],
        lineNum: 0,
        stationName: '北京丰辰鲁谷加油站',
        nozzleTimer: null,
        red: require('@/assets/red.png'),
        dis: require('@/assets/disable.png'),
        green: require('@/assets/green.png'),
        yellow: require('@/assets/yellow.png'),
        guanyaG: require('@/assets/guanya_g.png'),
        remainG: require('@/assets/remain_g.png'),
        celouG: require('@/assets/celou_g.png'),
        guanyaY: require('@/assets/guanya_y.png'),
        celouY: require('@/assets/celou_y.png'),
        guanyaR: require('@/assets/guanya_r.png'),
        celouR: require('@/assets/celou_r.png'),
        guanyaH: require('@/assets/guanya_h.png'),
        celouH: require('@/assets/celou_h.png'),
        pipeG: require('@/assets/pipe_g.png'),
        pipeR: require('@/assets/pipe_r.png'),
        pipeH: require('@/assets/pipe_h.png'),
        wellG: require('@/assets/peopleWell_g.png'),
        wellR: require('@/assets/peopleWell_r.png'),
        wellH: require('@/assets/peopleWell_h.png'),
        bottomG: require('@/assets/tankBottom_g.png'),
        bottomR: require('@/assets/tankBottom_r.png'),
        bottomH: require('@/assets/tankBottom_h.png'),
        nozzleList: [],
        nozzleObj: {
          tankerNumber: '',
          number: '',
          oilNumber: '',
          oilValue: 0,
          oilAverageValue: 0,
          status: '',
          refuel: false,
          list: []
        },
        nozzleStatus: '',
        nozzleImage: '',
        nozzleClass: '',
        widthLen: false,
        oliArr: [],
        oliArr1: [
          [
            {
              number: '1',
              length: 6,
              children: [
                [{
                  number: '01枪',
                  oilNumber: '92#',
                  oliVal: '1.1',
                  status: 1,
                  refuel: false,
                  close: false
                },
                  {
                    number: '02枪',
                    oilNumber: '95#',
                    oliVal: '1.8',
                    status: 1,
                    refuel: false,
                    close: false
                  },
                  {
                    number: '02枪',
                    oilNumber: '95#',
                    oliVal: '1.8',
                    status: 1,
                    refuel: false,
                    close: false
                  }
                  ],
                [
                  {
                    number: '03枪',
                    oilNumber: '92#',
                    oliVal: '1.1',
                    status: 1,
                    refuel: false,
                    close: false
                  },
                  {
                    number: '04枪',
                    oilNumber: '98#',
                    oliVal: '1.5',
                    status: 1,
                    refuel: false,
                    close: false
                  },
                  {
                    number: '04枪',
                    oilNumber: '98#',
                    oliVal: '1.5',
                    status: 1,
                    refuel: false,
                    close: false
                  }
                ]
              ]
            },
            {
              number: '3',
              length: 8,
              children: [
                [
                  {
                    number: '11枪',
                    oilNumber: '92#',
                    oliVal: '1.1',
                    status: 1,
                    refuel: false,
                    close: false
                  },
                  {
                    number: '12枪',
                    oilNumber: '95#',
                    oliVal: '1.8',
                    status: 1,
                    refuel: false,
                    close: false
                  },
                  {
                    number: '13枪',
                    oilNumber: '92#',
                    oliVal: '1.1',
                    status: 1,
                    refuel: false,
                    close: false
                  },
                  {
                    number: '13枪',
                    oilNumber: '92#',
                    oliVal: '1.1',
                    status: 1,
                    refuel: false,
                    close: false
                  },
                ],
                [
                  {
                    number: '15枪',
                    oilNumber: '98#',
                    oliVal: '1.5',
                    status: 1,
                    refuel: false,
                    close: false
                  },
                  {
                    number: '16枪',
                    oilNumber: '92#',
                    oliVal: '1.1',
                    status: 1,
                    refuel: false,
                    close: false
                  },
                  {
                    number: '13枪',
                    oilNumber: '92#',
                    oliVal: '1.1',
                    status: 1,
                    refuel: false,
                    close: false
                  },
                  {
                    number: '13枪',
                    oilNumber: '92#',
                    oliVal: '1.1',
                    status: 1,
                    refuel: false,
                    close: false
                  },
                ]
              ]
            },
          ],
          [
            {
              number: '1',
              length: 8,
              children: [
                [{
                  number: '01枪',
                  oilNumber: '92#',
                  oliVal: '1.1',
                  status: 1,
                  refuel: false,
                  close: false
                },
                  {
                    number: '02枪',
                    oilNumber: '95#',
                    oliVal: '1.8',
                    status: 1,
                    refuel: false,
                    close: false
                  },
                  {
                    number: '02枪',
                    oilNumber: '95#',
                    oliVal: '1.8',
                    status: 1,
                    refuel: false,
                    close: false
                  }
                ],
                [
                  {
                    number: '03枪',
                    oilNumber: '92#',
                    oliVal: '1.1',
                    status: 1,
                    refuel: false,
                    close: false
                  },
                  {
                    number: '04枪',
                    oilNumber: '98#',
                    oliVal: '1.5',
                    status: 1,
                    refuel: false,
                    close: false
                  },
                  {
                    number: '02枪',
                    oilNumber: '95#',
                    oliVal: '1.8',
                    status: 1,
                    refuel: false,
                    close: false
                  }
                ]
              ]
            },
            {
              number: '3',
              length: 8,
              children: [
                [
                  {
                    number: '11枪',
                    oilNumber: '92#',
                    oliVal: '1.1',
                    status: 1,
                    refuel: false,
                    close: false
                  },
                  {
                    number: '12枪',
                    oilNumber: '95#',
                    oliVal: '1.8',
                    status: 1,
                    refuel: false,
                    close: false
                  },
                  {
                    number: '13枪',
                    oilNumber: '92#',
                    oliVal: '1.1',
                    status: 1,
                    refuel: false,
                    close: false
                  },
                  {
                    number: '13枪',
                    oilNumber: '92#',
                    oliVal: '1.1',
                    status: 1,
                    refuel: false,
                    close: false
                  },
                ],
                [
                  {
                    number: '15枪',
                    oilNumber: '98#',
                    oliVal: '1.5',
                    status: 1,
                    refuel: false,
                    close: false
                  },
                  {
                    number: '16枪',
                    oilNumber: '92#',
                    oliVal: '1.1',
                    status: 1,
                    refuel: false,
                    close: false
                  },
                  {
                    number: '13枪',
                    oilNumber: '92#',
                    oliVal: '1.1',
                    status: 1,
                    refuel: false,
                    close: false
                  },
                  {
                    number: '13枪',
                    oilNumber: '92#',
                    oliVal: '1.1',
                    status: 1,
                    refuel: false,
                    close: false
                  },
                ]
              ]
            },
          ]
        ],
        param: {
          gasStationId: ''
        },
        dataStastic: {
          time: 0,
          number: 0,
          average: 0
        },
        basicData: {
          tankerCount: 0,
          nozzleCount: 0,
          oilTankCount: 0
        },
        pieData: [],
        pieTotal: 0,
        alarmList: [],
        alarmTotal: 0,
        oliTankMax: [-300,300],
        oliTankMin: [-50,50],
        gasRange: [0.9, 1.3],
        gasContent: 25,
        tankList: [],
        tankInfo:[],
        statusList: [],
        tankLineData: [],
        websock: null,
        mytimer: null,
        allTime: 120000,
        nozzleTime: 10000
      }
    },
    mounted () {
      let vm = this
      vm.$nextTick(function () {
        vm.drawPie('oliTypeBox', vm.pieData, vm.pieTotal)
        vm.drawBar('alarmBox', vm.alarmList, vm.alarmTypeList)
        vm.drawGauge('gaugeBox', vm.nozzleObj.oilValue)
        vm.drawLine('lineBox', vm.nozzleObj.list)
        vm.drawFour('fourGauge', vm.tankInfo, vm.conType)
        vm.drawLine1('pressureBox', vm.tankLineData)
      })
    },
    methods: {
      oliTankColor (status) {
        if (status === 1) {
          return 'oliQuantity oliG'
        } else if (status === 2) {
          return 'oliQuantity oliH'
        } else if (status === 3) {
          return 'oliQuantity oliY'
        } else {
          return 'oliQuantity oliR'
        }
      },
      oliTankBackground (status, type) {
        let name = ''
        if (type === 0) {
          name = 'oliTank'
        } else {
          name = 'olinum'
        }
        if (status === 1) {
          return name + ' tankG'
        } else if (status === 2) {
          return name + ' tankH'
        } else if (status === 3) {
          return name + ' tankY'
        } else {
          return name + ' tankR'
        }
      },
      iconImage (status, type) {
        let name = ''
        if (type === 0) {
          name = 'guanya'
        } else {
          name = 'celou'
        }
        if (status === 1) {
          return this[name + 'G']
        } else if (status === 2) {
          return this[name + 'H']
        } else if (status === 3) {
          return this[name + 'Y']
        } else {
          return this[name + 'R']
        }
      },
      textColor (status) {
        if (status === 1) {
          return 'color: #74FFA7'
        } else if (status === 2) {
          return 'color: #7E7E7E'
        } else if (status === 3) {
          return 'color: #FFCF74'
        } else {
          return 'color: #FF4040'
        }
      },
      // 圆环
      drawPie (id,edata,total) {
        let vm = this
        if (document.getElementById(id) === null) {
          return false
        }
        let _chart = {}
        _chart[id] = echarts.init(document.getElementById(id))
        vm.chart = Object.assign({}, vm.chart, _chart)
        for (let i = 0; i < edata.length; i++) {
          edata[i].pos = [15+35*i + '%', '50%']
          edata[i].value = edata[i].value === null ? 0 : edata[i].value
        }
        var dataStyle = {
          normal: {
            labelLine: {
              show: false
            }
          }
        }
        let option = {
          series: (function () {
            let result = []
            edata.forEach(function (item) {
              result.push({
                name: '第一个圆环',
                type: 'pie',
                radius: [35, 45],
                hoverAnimation: false,
                center: item.pos,
                itemStyle: dataStyle,
                data: [{
                  value: item.value,
                  label: {
                    normal: {
                      formatter: function(params){
                        return params.value;
                      },
                      position: 'center',
                      show: true,
                      textStyle: {
                        fontSize: '18',
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
                  value: total - item.value,
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
      drawBar (id,edata,alarmTypeList) {
        let vm = this
        if (document.getElementById(id) === null) {
          return false
        }
        let _chart = {}
        _chart[id] = echarts.init(document.getElementById(id))
        vm.chart = Object.assign({}, vm.chart, _chart)
        let colorList = ['#F18B4D','#EB3B3B']
        let nameList = ['预警','报警']
        let option = {
          tooltip: {
            trigger: "item",
            show: true
          },
          legend: {
            data: nameList,
            x: 'center',
            y: '15',
            textStyle: {
              color: "#80DAFF"
            },
            itemWidth: 12,
            itemHeight: 10,
          },
          grid: {
            left: "5%",
            top: "30%",
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
            data: alarmTypeList,
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
              fontSize: 12,
              interval:0
            }
          },
          yAxis: {
            min: vm.isLimit === true ? 0 : 2,
            type: 'value',
            minInterval: 1,
            splitLine: {
              show: true,
              lineStyle: {
                color: 'rgba(116, 207, 255, 0.3)'
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
            edata.forEach(function (item,index) {
              result.push(
                {
                  name: nameList[index],
                  type: 'bar',
                  animation: false,
                  barWidth: 11,
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
        let start = (vm.gasRange[0]/2.6)
        let middle = (vm.gasRange[1] - vm.gasRange[0])/2.6
        let colorList =  [
          {
            offset: 0,
            color: '#FF5050' // 0% 处的颜色
          },
          {
            offset: start.toFixed(2) - 0.08,
            color: '#FFC22F' // 0% 处的颜色
          },
          {
            offset: (start + middle).toFixed(2) - 0.08,
            color: '#4CE398' // 100% 处的颜色
          },
          {
            offset: 1,
            color: '#FF5050' // 100% 处的颜色
          }]
        // 文字颜色
        let textColor = ''
        if (edata >= vm.gasRange[0] && edata <= vm.gasRange[1]) {
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
              //渐变圆环
              name: "",
              type: "pie",
              radius: ["70%", "88%"],
              center: ['50%', '70%'],
              startAngle: 0,
              hoverAnimation: false,
              avoidLabelOverlap: true,
              z: 0,
              zlevel: 0,
              label: {
                show: false,
                normal: {show: false}
              },
              data: [{
                value: 270,
                itemStyle: {
                  normal: {
                    color: "rgba(80,150,224,0)"
                  }
                }
              },
                {
                  value: 270,
                  itemStyle: {
                    normal: {
                      color: {
                        x: 0,
                        y: 0,
                        x2: 1,
                        y2: 0,
                        colorStops: colorList,
                        globalCoord: false
                      }
                    }
                  }

                },
                {
                  value: 0,
                  itemStyle: {
                    normal: {
                      color: "rgba(80,150,224,0)"
                    }
                  }
                },

              ]
            },
            {
              startAngle: 180,
              endAngle: 0,
              name: '中心圆',
              type: 'gauge', // 默认全局居中
              radius:28,
              center: ['50%', '70%'],
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
              radius:65,
              center: ['50%', '70%'],
              startAngle: 180,
              endAngle: 0,
              clockwise:true,
              min: 0,
              max:2.6,
              splitNumber: 13, //刻度数量
              hoverAnimation: true,
              axisTick: {
                show: false
              },
              splitLine: {
                length: 37,
                lineStyle: {
                  width: 1,
                  color: "rgba(255,255,255,0.4)"
                }
              },
              axisLabel: {
                show:true,
                color: '#74CFFF',
                //   标签与刻度线的距离
                distance: -60
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
                position: ['50%', '30%']
              },
              detail: {
                show:true,
                offsetCenter: [0, '30%'],
                textStyle: {
                  fontSize: 18,
                  color: textColor
                },
                // formatter: function (params) {
                //   if (!isNaN(params)) {
                //     return [
                //       params
                //     ].join('\n')
                //   } else {
                //     return '--'
                //   }
                // },
              },
              //   指针样式
              itemStyle: {
                normal: {
                  color: "#FE5D5D",
                }
              },
              data: [{
                value: edata === null ? 0 : edata,
                name: ""
              }]
            },
          ]
        }
        vm['chart'][id].setOption(option)
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
            bottom: '9%',
            top: '20%',
            left: '10%',
            right: '10%'
          },
          title: {
            left: 'center',
            text: '气液比今日监控数据',
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
              symbol: 'emptyCircle',
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
        if (edata.length !== 0) {
          vm['chart'][id].dispatchAction({
            type: 'showTip',
            seriesIndex: 0,
            dataIndex: edata.length - 1
          })
        }
      },
      drawFour (id,edata, type) {
        let vm = this
        if (document.getElementById(id) === null) {
          return false
        }
        let _chart = {}
        _chart[id] = echarts.init(document.getElementById(id))
        vm.chart = Object.assign({}, vm.chart, _chart)
        let colorList = []
        let nameList = ['管道压力', '油气浓度', '环境温度']
        let unitList = ['pa', '', '℃']
        let rangeList = [[-1000, 1000], [0, 100],[-50, 70]]
        let splitList = [1000, 100, 50]
        let data = []
        if (type === 1) {
          rangeList[1] = [0, 10000]
          splitList[1] = 10000
          unitList[1] = 'ppm'
        } else if (type === 2) {
          rangeList[1] = [0, 100]
          splitList[1] = 100
          unitList[1] = '%LEL'
        }
        for (let i = 0; i < edata.length; i++) {
          let s = {
            name: nameList[i],
            value: edata[i],
            pos: [i * 34 + 17 + '%', '58%'],
            range: rangeList[i],
            unit: unitList[i],
            splitNum: splitList[i],
            color: [
              {
                offset: 0,
                color: '#FFC22F' // 100% 处的颜色
              },
              {
                offset: 0.3,
                color: '#4CE398' // 0% 处的颜色
              },
              {
                offset: 1,
                color: '#FF5050' // 100% 处的颜色
              },]
          }
          data.push(s)
        }
        let s = ''
        let offset = {}
        for(let i = 0; i < data.length; i++){
          if (data[i].name === '环境温度') {
            s = '#4CE398'
            // s = data[i].value !== null && data[i].value >= -50 && data[i].value <= 70 ? '#4CE398' : '#FF5050'
            colorList.splice(2, 0, s)
          } else if (data[i].name === '油气浓度') {
            s = (data[i].value <= vm.gasContent && data[i].value !== null) ? '#4CE398' : '#FF5050'
            colorList.splice(1, 0, s)
            data[i].color[0] = {
              offset: 0,
              color: '#4CE398'
            }
            offset = {
              offset: vm.gasContent/data[i].range[1],
              color: '#FFC22F'
            }
            data[i].color[1] = offset
            data[i].color[2] = {
              offset: 1,
              color: '#FF5050'
            }
          } else if (data[i].name === '管道压力') {
            // data[i].color = [
            //   {
            //     offset: 0,
            //     color: '#4CE398' // 100% 处的颜色
            //   },
            //   {
            //     offset: 0.3,
            //     color: '#FFC22F' // 0% 处的颜色
            //   },
            //   {
            //     offset: 1,
            //     color: '#FF5050' // 100% 处的颜色
            //   },]
            let total = Math.abs(-1000-1000)
            let start = Math.abs(-1000 - vm.oliTankMax[0])/total
            data[i].color[0] = {
              offset: 0,
              color: '#FF5050'
            }
            offset = {
              offset: start,
              color: '#4CE398'
            }
            data[i].color[1] = offset
            let middle = Math.abs(vm.oliTankMin[0] - vm.oliTankMax[0])/total
            offset = {
              offset: (start + middle) + 0.05,
              color: '#FF5050'
            }
            data[i].color[2] = offset
            let middle1 = Math.abs(vm.oliTankMin[1] - vm.oliTankMin[0])/total
            offset = {
              offset: (start + middle + middle1) + 0.05,
              color: '#4CE398'
            }
            data[i].color[3] = offset
            data[i].color[4] = {
              offset: 1,
              color: '#FF5050'
            }
            // 文字颜色
            // s = '#4CE398'
            if (data[i].value !== null && (data[i].value >= vm.oliTankMax[0] && data[i].value <= vm.oliTankMin[0] || data[i].value >= vm.oliTankMin[1] && data[i].value <= vm.oliTankMax[1])) {
              s = '#4CE398'
            } else {
              s = '#FF5050'
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
            data.forEach(function (item, index) {
              result.push(
                {
                  //渐变圆环
                  name: "",
                  type: "pie",
                  radius: ["85%", "100%"],
                  center: item.pos,
                  startAngle: 0,
                  hoverAnimation: false,
                  avoidLabelOverlap: true,
                  z: 0,
                  zlevel: 0,
                  label: {
                    show: false,
                    normal: {show: false}
                  },
                  data: [{
                    value: 270,
                    itemStyle: {
                      normal: {
                        color: "rgba(80,150,224,0)"
                      }
                    }
                  },
                    {
                      value: 270,
                      itemStyle: {
                        normal: {
                          color: {
                            x: 0,
                            y: 0,
                            x2: 1,
                            y2: 0,
                            colorStops: item.color,
                            globalCoord: false
                          }
                        }
                      }

                    },
                    {
                      value: 0,
                      itemStyle: {
                        normal: {
                          color: "rgba(80,150,224,0)"
                        }
                      }
                    },

                  ]
                },
                {
                  startAngle: 180,
                  endAngle: 0,
                  name: '中心圆',
                  type: 'gauge',
                  splitNumber: 0, //刻度数量
                  radius:24,
                  center: [item.pos[0], '60%'], // 默认全局居中
                  axisLabel: {
                    show: false
                  },
                  splitLine: { // 分隔线
                    length: 8, // 属性length控制线长
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
                  radius:59,
                  center: item.pos, // 默认全局居中
                  min: item.range[0],
                  max:item.range[1],
                  axisLine: {
                    lineStyle: {
                      opacity:0
                    }
                  },
                  axisTick: {
                    show: false,
                  },
                  splitLine: {
                    show: true,
                    length: 36, //轴线长度
                    lineStyle: {
                      color: 'rgba(255,255,255,0.4)',
                      width: 1
                    }
                  },
                  axisLabel: {
                    show:true,
                    color: '#74CFFF',
                    //   标签与刻度线的距离
                    distance: index === 0 ? -70 : index === 1 && type === 1 ? -55 : -60,
                    formatter:function(param){
                      if (param % splitList[index] === 0 || param % splitList[index] === 1 || (param % splitList[index] === 20 && index === 2)) {
                        return param
                      }
                    }
                  },
                  pointer: {
                    show: true,
                    length: '85%',
                    width:3
                  },
                  detail: {
                    show: true,
                    offsetCenter: [0, '40%'],
                    textStyle: {
                      fontSize: 14,
                      color: colorList[index]
                    },
                    formatter: function (params) {
                      if (!isNaN(params)) {
                        return [
                          params +(item.unit || '')
                        ].join('\n')
                      } else {
                        return '--'
                      }
                    },
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
      drawLine1 (id,edata, nameList) {
        let vm = this
        if (document.getElementById(id) === null) {
          return false
        }
        let _chart = {}
        _chart[id] = echarts.init(document.getElementById(id))
        vm.chart = Object.assign({}, vm.chart, _chart)
        let colrList = ['#FF0404', '#47FFAC', '#FFE164', '#8531E2']
        let toady = vm.getTime(0) + ' 00:00:00'
        let tommow = vm.getTime(1) + ' 00:00:00'
        var anchor = [
          {name: toady, value:[toady, 0]},
          {name:tommow, value:[tommow, 0]}
        ]
        // var data = [
        //   {name:'2019/06/11 6:38:08', value:['2019/06/11 6:38:08', 80]},
        //   {name:'2019/06/11 10:18:18', value:['2019/06/11 10:18:18', 60]},
        //   {name:'2019/06/11 14:18:18', value:['2019/06/11 14:18:18', 90]}
        // ]
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
              let name =''
              let time = params[0].data.value[0]
              let value = 0
              let result = time + '<br>'
              for (let i = 0; i < params.length; i++) {
                if (params[i].seriesName !== '.anchor') {
                  name =  params[i].data.number +'#罐'
                  value = params[i].data.value[1]
                  // result +=  name + '：' + value + ' pa<br>'
                  if (i < 7) {
                    result +=  name + '：' + value + ' pa<br>'
                  } else {
                    result +=  '...'
                    return
                  }
                }
              }
              return result
              // let time = params[0].name.split(" ")[1]
              // let value = params[0].data.value[1]
              // return time + '<br>' + '油罐压力：' + value
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
            text: '油罐压力今日监控数据',
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
                      color: colrList[index]
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
        vm['chart'][id].setOption(option)
        if (edata !== null && edata.length !== 0) {
          vm['chart'][id].dispatchAction({
            type: 'showTip',
            seriesIndex: 0,
            dataIndex: edata.length - 1
          })
        }
      },
      logoutMonitor(){
        userLogOut().then((res) => {
          if (res.data.code === 1000) {
            sessionStorage.removeItem('station')
            sessionStorage.removeItem('authorization')
            window.clearInterval(this.nozzleTimer)
            window.clearTimeout(this.mytimer)
            this.nozzleTimer = null
            this.mytimer = null
            this.$router.push({path: '/'})
          } else {
            this.$Message.error(res.data.message)
          }
        })
      },
      // 今日数据
      getTodayData (par) {
        todayData(par).then((res) => {
          if (res.data.code === 1000) {
            let result = res.data.content
            this.dataStastic = {
              time: result.time === 0 || result.time === null? 0 : result.time.toFixed(2),
              number: result.number,
              average: result.average === 0 || result.average === null ? 0 : result.average.toFixed(2)
            }
            this.pieData[0] = {value: result.value92}
            this.pieData[1] = {value: result.value95}
            this.pieData[2] = {value: result.value98}
            this.pieTotal = result.total === null ? 0 : result.total
          } else {
            this.dataStastic = {
              time: 0,
              number: 0,
              average: 0
            }
            this.pieData[0] = {value: 0}
            this.pieData[1] = {value: 0}
            this.pieData[2] = {value: 0}
            this.pieTotal = 0
          }
          this.drawPie('oliTypeBox', this.pieData, this.pieTotal)
        })
      },
      // 油罐信息
      getOliTank (par) {
        oliTankMonitor(par).then((res) => {
          if (res.data.code === 1000) {
            let even = [], odd = []
            for (let i = 0; i < res.data.content.length; i++) {
              if (i % 2 === 0) {
                even.push(res.data.content[i])
              } else {
                odd.push(res.data.content[i])
              }
            }
            let s = {
              id: -1,
              name: '',
              value: '',
              pressure: '',
              sidewaysPressure: ''
            }
            if (even.length > odd.length && odd.length !== 0) {
              odd.push(s)
            } else if (even.length < odd.length && even.length !== 0) {
              even.push(s)
            }
            if (odd.length !== 0) {
              this.tankList = [even, odd]
              this.spanVal = 12
              this.pushVal = 0
              this.oneSpan = 0
            } else {
              this.tankList = [even]
              this.spanVal = 24
              this.pushVal = 6
              this.oneSpan = 12
            }
          } else {
            this.tankList = []
          }
        })
      },
      // 告警信息
      getAlarm (par) {
        this.alarmList= []
        this.alarmTypeList = []
        monitorAlarm(par).then((res) => {
          if (res.data.code === 1000) {
            let result = res.data.content
            this.alarmTotal = result.total
            let s = [], ss = []
            for (let i = 0; i < result.list.length; i++) {
              if (result.list[i].earlyWarningCount > 0 || result.list[i].alarmCount > 0) {
                this.isLimit = true
              }
              s.push(result.list[i].earlyWarningCount)
              this.alarmList[0] = s
              ss.push(result.list[i].alarmCount)
              this.alarmList[1] = ss
              this.alarmTypeList.push(result.list[i].alarmTypeName)
            }
          } else {
            this.alarmList = []
            this.alarmTotal = 0
          }
          this.drawBar('alarmBox', this.alarmList, this.alarmTypeList)
        })
      },
      // 基本信息
      getBasic (par) {
        monitorBasic(par).then((res) => {
          if (res.data.code === 1000) {
            let result = res.data.content
            this.basicData = {
              tankerCount: result.tankerCount,
              nozzleCount: result.nozzleCount,
              oilTankCount: result.oilTankCount,
            }
            this.tankCount = result.tankers.length
            // 所有加油枪的id
            for (let n = 0; n < result.tankers.length; n++) {
              for (let sn = 0; sn < result.tankers[n].nozzles.length; sn++) {
                this.nozzleList.push(result.tankers[n].nozzles[sn].id)
              }
            }
            //油枪信息定时器
            window.clearInterval(this.nozzleTimer)
            this.nozzleTimer = null
            if (this.nozzleList.length !== 0) {
              let thi = this
              thi.getNozzleDetail(thi.nozzleList[0])
              let count = 1
              this.nozzleTimer = setInterval(function () {
                thi.getNozzleDetail(thi.nozzleList[count % thi.nozzleList.length])
                count ++
              },thi.nozzleTime)
            }
          //  -----------------------
            // 一行放置加油机的个数
            if (result.tankers.length < 5) {
              this.lineNum = 2
            } else {
              this.lineNum = 3
            }
            let t = 0
            let rowNum = result.tankers.length % this.lineNum === 0 ? result.tankers.length/ this.lineNum : Math.ceil(result.tankers.length/ this.lineNum)
            let finishItem = []
            for (let i = 0; i < rowNum; i++) {
              let rowList = [] //每一行
              for (let j = 0; j < this.lineNum; j++) {
                if (result.tankers[t] !== undefined) {
                  rowList[j] = result.tankers[t]
                  t++
                }
                var finArr = []
                for (let k = 0; k < rowList.length; k++) {
                  // 将每一个加油机的加油枪数据处理
                  let s = {
                    id: rowList[k].id,
                    number: rowList[k].number,
                    length: rowList[k].length,
                    children: []
                  }
                  let oddList = [], evenList = []
                  for (let a = 0; a < rowList[k].nozzles.length; a++) {
                    if (a % 2 === 0) {
                      evenList.push(rowList[k].nozzles[a])
                    } else {
                      oddList.push(rowList[k].nozzles[a])
                    }
                  }
                  s.children[0] = evenList
                  s.children[1] = oddList
                  finArr.push(s)
                }
              }
              finishItem.push(finArr)
            }
            this.oliArr = finishItem
            // 占位
            if (this.tankCount === 5) {
              let s = {
                id: -1,
                number: 0,
                length: 0,
                children: [[
                  {
                    status: 1,
                    refuel: false,
                    close: false
                  }
                ],[{
                  status: 1,
                  refuel: false,
                  close: false
                }]]
              }
              this.oliArr[1].push(s)
            }
          } else {
            this.basicData = {
              tankerCount: 0,
              nozzleCount: 0,
              oilTankCount: 0,
            }
            this.oliArr = []
            this.nozzleList = []
            this.tankCount = 0
          }
        })
      },
      // 油枪信息
      getNozzleDetail (id) {
        let par = {
          nozzleId: id
        }
        monitorNozzle(par).then((res) => {
          if (res.data.code === 1000) {
            let result = res.data.content
            this.nozzleObj = {
              tankerNumber: result.tankerNumber,
              number: result.number,
              oilNumber: result.oilNumber,
              oilValue: result.oilValue,
              oilAverageValue: result.oilAverageValue === 0 ? 0 : result.oilAverageValue === null ? '-' : result.oilAverageValue.toFixed(1),
              status: result.status,
              refuel: result.refuel,
              close: result.close,
              list: []
            }
            // 样式
            if (result.status === 1) {
              this.nozzleStatus = 'olitankStatus greenStatus'
              this.nozzleImage = this.green
              this.nozzleClass = 'olitankItem greenItem'
            } else if (result.status === 2) {
              this.nozzleStatus = 'olitankStatus disStatus'
              this.nozzleImage = this.dis
              this.nozzleClass = 'olitankItem disItem'
            } else if (result.status === 3) {
              this.nozzleStatus = 'olitankStatus yellowStatus'
              this.nozzleImage = this.yellow
              this.nozzleClass = 'olitankItem yellowItem'
            } else {
              this.nozzleStatus = 'olitankStatus redStatus'
              this.nozzleImage = this.red
              this.nozzleClass = 'olitankItem redItem'
            }
            // 折线图数据
            for (let i = 0; i < result.list.length; i++) {
              let s = {
                name: result.list[i].time,
                value:[result.list[i].time, result.list[i].value]
              }
              this.nozzleObj.list[i] = s
            }
          } else {
            this.nozzleObj = {
              tankerNumber: '',
              number: '',
              oilNumber: '',
              oilValue: 0,
              oilAverageValue: 0,
              status: '',
              refuel: '',
              list: []
            }
          }
          this.drawGauge('gaugeBox', this.nozzleObj.oilValue)
          this.drawLine('lineBox', this.nozzleObj.list)
        })
      },
      // 监测信息
      getTankInfo (par) {
        this.tankLineData= []
        let nameList = []
        monitorTank(par).then((res) => {
          if (res.data.code === 1000) {
            let result = res.data.content
            // 仪表盘数据
            this.tankInfo = [result.pipePressure, result.concentration, result.temperature]
            this.conType = result.type
            this.conStatus = result.concentrationStatus === 4 ? 1 : 0
            this.statusList = [
              {
                name: '管道压力',
                value: result.pipePressureStatus + ''
              },
              {
                name: '油气浓度',
                value: result.concentrationStatus + ''
              },
              {
                name: '环境温度',
                value: result.temperatureStatus + ''
              }
            ]
            // 折线图数据
            this.tankLineData = result.oilTankDataVOS
            if (result.list !== null) {
              for (let i = 0; i < result.oilTankDataVOS.length; i++) {
               for (let j = 0; j < result.oilTankDataVOS[i].length; j++) {
                 let s = {
                   name: result.oilTankDataVOS[i][j].time,
                   value:[result.oilTankDataVOS[i][j].time, result.oilTankDataVOS[i][j].value],
                   number: result.oilTankDataVOS[i][j].number
                 }
                 this.tankLineData[i][j] = s
                 nameList.push(result.oilTankDataVOS[i][j].number)
               }
              }
            }
          } else {
            this.tankInfo = []
            this.statusList = []
            this.tankLineData = []
            this.conType = 0
          }

          if (this.onlyFlag) {
            // 油罐压力、气液比阈值
            this.getThresold()
            this.onlyFlag = false
          }
          this.drawFour('fourGauge', this.tankInfo, this.conType)
          this.drawLine1('pressureBox', this.tankLineData, nameList)
        })
      },
      // 油罐压力、气液比阈值
      getThresold () {
        monitorThresold().then((res) => {
          if (res.data.code === 1000) {
            let result = res.data.content
            this.gasRange = [result.minAL, result.maxAL]
            this.oliTankMin = [result.min1Pressure, result.max1Pressure]
            this.oliTankMax = [result.min2Pressure, result.max2Pressure]
            for (let i = 0; i < result.maxConcentrationVOS.length; i++) {
              if (result.maxConcentrationVOS[i].type === this.conType && result.maxConcentrationVOS[i].alarmType === this.conStatus) {
                this.gasContent = result.maxConcentrationVOS[i].value
              }
            }
          } else {
            this.gasRange = []
            this.oliTankMax = []
            this.oliTankMin = []
            this.gasContent = 0
          }
          this.drawFour('fourGauge', this.tankInfo, this.conType)
        })
      },
      commonInfo (arr, result, spanType) {
        let even = [], odd = []
        for (let i = 0; i < result.length; i++) {
          if (i % 2 === 0) {
            even.push(result[i])
          } else {
            odd.push(result[i])
          }
        }
        let s = {
          id: -1,
          number: '',
          status: '',
          fault: '',
          alarm: ''
        }
        if (even.length > odd.length && odd.length !== 0) {
          odd.push(s)
        } else if (even.length < odd.length && even.length !== 0) {
          even.push(s)
        }
        if (odd.length !== 0) {
          arr = [even, odd]
          spanType = 12
        } else {
          arr = [even]
          spanType = 24
        }
        return arr
      },
      // 管线信息
      getPipe (par) {
        pipeLine(par).then((res) => {
          if (res.data.code === 1000) {
            this.pipeList = this.commonInfo(this.pipeList, res.data.content,this.spanPipe)
          } else {
            this.pipeList = []
          }
        })
      },
      // 人井信息
      getPeopleWell (par) {
        peopleWell(par).then((res) => {
          if (res.data.code === 1000) {
            this.peopleWellList = this.commonInfo(this.peopleWellList, res.data.content,this.spanPeo)
          } else {
            this.peopleWellList = []
          }
        })
      },
      // 油盆信息
      getoliBasin (par) {
        oliBasin(par).then((res) => {
          if (res.data.code === 1000) {
            this.oliBasinList = this.commonInfo(this.oliBasinList, res.data.content,this.spanOli)
          } else {
            this.oliBasinList = []
          }
        })
      },
      // 定时器
      allTimer () {
        let thi = this
        // 今日数据
        thi.getTodayData(thi.param)
        // 基本信息
        thi.getBasic(thi.param)
        // 油罐信息
        thi.getOliTank(thi.param)
        thi.getPipe(thi.param)
        thi.getPeopleWell(thi.param)
        thi.getoliBasin(thi.param)
        // 告警信息
        thi.getAlarm(thi.param)
        // 油罐监测
        thi.getTankInfo(thi.param)
        thi.timerCount ++
        thi.mytimer = setTimeout(thi.allTimer, thi.allTime)
      },
    },
    created:function () {
      if (sessionStorage.getItem('station') !== null) {
        let stations = JSON.parse(sessionStorage.getItem('station'))
        this.param.gasStationId = stations.stationId
        this.stationName = stations.stationName
        this.allTimer()
      }
      // this.param.gasStationId = 12
      // // 油罐压力、气液比阈值
      // this.getThresold()
      // this.allTimer()
    },
    destroyed () {
      window.clearInterval(this.nozzleTimer)
      window.clearTimeout(this.mytimer)
      this.nozzleTimer = null
      this.mytimer = null
    }
  }
</script>

<style scoped>
#body{
  width: 100%;
  height: 100vh;
  color:#80DAFF;
  min-width: 1000px;
  background:#021836;
  overflow: auto;
}
  .titleBar{
    width: 100%;
    height: 8vh;
    background: url('../../assets/nav.png') no-repeat;
    background-size: 100% 100%;
    color:#72E6FF;
    position: relative;
  }
  .titleBar>div:nth-child(1){
    float: left;
    margin-top: 7px;
    margin-left: 20px;
    font-size: 14px;
  }
  .titleBar>div:nth-child(2){
    position: absolute;
    left:0;
    right: 0;
    margin: auto;
    font-size: 22px;
    letter-spacing: 3px;
    line-height: 65px;
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
  #content{
    padding: 0 30px 30px;
    width: 100%;
    /*height:100%;*/
    margin-top: -10px;
    background:#021836;
    /*background: red;*/
  }
  .oliGunInfo{
    width: 100%;
    height:64vh;
    background: url('../../assets/leftTop.png') no-repeat;
    background-size: 100% 100%;
    margin-bottom: 20px;
    padding: 15px;
  }
  .oliGunInfo>span{
    font-size: 22px;
    color:#8AFFF5;
    margin-left: 5px;
  }
  .basicText{
    font-size: 22px;
    color:#8AFFF5;
    margin-left: 5px;
  }
  .mainCon{
    display: flex;
    align-items: center;
    width: 100%;
    min-height:450px;
  }
  .tankImage{
    /*width: 73px;height: 108px;*/
    margin-top:10px;
    position: relative;
  }
  .tankImage2{
    width: 120px;height: 200px;
  }
  .tankImage4{
    width: 100px;height: 160px;
  }
  .tankImage6{
    width: 80px;height: 140px;
  }
  .tankBox{
    background:url('../../assets/rightTank.png') no-repeat;
    background-size: 99% 100%;
    height:56vh;
    padding: 0 5px 0;
  }
  .tankBoxTitle{
    font-size: 13px;
    line-height:25px
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
  .dir8{
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
  .dir7{
    margin-top: 6px;
    margin-left: 14px
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
    /*bottom:15px;*/
    left:0;
    right:0;
    margin-right:auto;
    margin-left:auto;
    color:#6DD3FF
  }
  .tankName2{
    bottom:50px;
  }
  .tankName4{
    bottom:30px;
  }
  .tankName6{
    bottom:15px;
  }
  /*一行加油机*/
  .itemLine{
    display: flex;
    justify-content: space-between;
    margin-top: 43px;
  }
  /*油罐*/
  .oliTank{
    width:100px;
    height:40px;
    border: 2px solid transparent;
    border-radius:51px;
    position: relative;
    overflow: hidden;
  }
  .tankG{
    background:rgba(56,120,219,0.3);
    box-shadow:0px 1px 32px 0px rgba(9,164,255,1) inset;
  }
    .tankH{
      box-shadow:0px 1px 32px 0px rgba(112,112,112,1) inset;
    }
    .tankY{
      box-shadow:0px 1px 32px 0px rgba(255,207,116,1) inset;
    }
    .tankR{
      box-shadow:0px 1px 32px 0px rgba(255,64,64,1) inset;
    }
  .olinum{
    width:30px;
    height:8px;
    line-height: 24px;
    color:#74CFFF;
    font-size: 14px;
    position: absolute;
    top:-8px;
    left:20px;
    border-radius:2px 2px 0px 0px;
  }
  .oliTankInfo{
    /*margin-top: 5px;*/
    color:#74FFA7;
  }
  .oliTankInfo>img{
    width:18px;
    height: 14px;
  }
  .oliTankInfo span{
    font-size: 13px;
    /*margin-left: 3px;*/
  }
  /*油量*/
  .oliQuantity{
    width: 100%;
    position: absolute;
    left: 0;
    bottom:0;
  }
  .oliG {
    background:#00A5FF;
  }
  .oliH {
    background:#7E7E7E;
  }
  .oliY {
    background:#FFCF74;
  }
  .oliR {
    background:#FF4040;
  }
  .numQuantity{
    font-size: 14px;
    position: absolute;
    top:8px;
    left: 0;
    right: 0;
    margin:auto;
    z-index: 2;
  }
  .leakImage{
    width: 18px;
    height: 20px;
    position: absolute;
    right: 0;
    top:-3px;
  }
  .equipImage{
    width: 16px;
    height: 17px;
    position: absolute;
    left:0;
    right:0;
    top:0;
    bottom: 0;
    margin: auto
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
    height: 10vh;
  }
  #alarmBox{
    width:90%;
    height: 100%;
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
    float: right;
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
  .gaugeTitle{
    margin-right: 10px;
    line-height: 24px;
    font-size: 16px;
    color: #74CFFF
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
    height: 13vh;
    margin-top: -20px;
  }
  #pressureBox{
    width: 100%;
    height:20vh;
  }
</style>

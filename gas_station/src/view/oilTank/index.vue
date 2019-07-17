<template>
  <div class="body" style="text-align: center">
    <Row :gutter="16">
      <Col span="12" v-for="item in tankList" :key="item.id">
      <div class="content" style="margin-bottom: 20px;">
        <div style="padding: 30px">
          <div style="position: relative;width: 200px;margin: auto;">
            <div class="tank-top-left"></div>
            <div class="tank-top-two-left"></div>
            <div class="tank-top-right"></div>
            <div class="tank-top-two-right"></div>
            <div class="tank">
              <div class="tank-oil" :style="'height:' + item.remain +'%'"></div>
            </div>
          </div>
          <div style="padding: 20px">{{item.number}}#&nbsp;储油罐</div>
          <Form :label-width="100" style="text-align: left;margin-top: 30px;color: #333;font-size: 20px">
            <Row type="flex" justify="start">
              <Col span="12" push="2">
              <FormItem label="油品">
                {{item.oilNumber}}
              </FormItem>
              </Col>
              <Col span="12">
              <FormItem label="油罐压力">
                {{item.tankPressure !== null ? item.tankPressure : '-'}} &nbsp;
                <span v-show="item.tankPressure !== null">pa</span>
              </FormItem>
              </Col>
            </Row>
            <Row type="flex" justify="start">
              <Col span="12" push="2">
              <FormItem label="油罐容积">
                {{item.size !== null ? item.size : '-'}}&nbsp;
                <span v-show="item.size !== null">T</span>
              </FormItem>
              </Col>
              <Col span="12">
              <FormItem label="回气压力">
                {{item.gasPressure !== null ? item.gasPressure : '-'}}&nbsp;
                <span v-show="item.gasPressure !== null">pa</span>
              </FormItem>
              </Col>
            </Row>
            <Row type="flex" justify="start">
              <Col span="12" push="2">
              <FormItem label="剩余油量">
                {{item.remain !== null ? item.remain : '-'}}&nbsp;
                <span v-show="item.remain !== null">L</span>

              </FormItem>
              </Col>
              <Col span="12">
              <FormItem label="管道压力">
                {{item.pipelinePressure !== null ? item.pipelinePressure : '-'}}&nbsp;
                <span v-show="item.pipelinePressure !== null">pa</span>
              </FormItem>
              </Col>
            </Row>
            <Row type="flex" justify="start">
              <Col span="12" push="2">
              <FormItem label="油罐温度">
                {{item.temperature !== null ? item.temperature : '-'}}&nbsp;
                <span v-show="item.temperature !== null">pa</span>
              </FormItem>
              </Col>
              <Col span="12">
              <FormItem label="测漏压力">
                {{item.leakagePressure !== null ? item.leakagePressure : '-'}} &nbsp;
                <span v-show="item.leakagePressure !== null">pa</span>
              </FormItem>
              </Col>
            </Row>
          </Form>
        </div>
      </div>
      </Col>
    </Row>
  </div>
</template>

<script>
  import { getTank } from '../../api/api'
  export default {
    data () {
      return {
        tankList: []
      }
    },
    methods: {
      getDetail () {
        let par = {
          gasStationId: JSON.parse(sessionStorage.getItem('station')).stationId
        }
        getTank(par).then((res) => {
          if (res.data.code === 1000) {
            this.tankList = res.data.content
          }
        })
      }
    },
    created: function () {
      this.getDetail()
    }
  }
</script>

<style lang="less"  scoped>
  @import '../../assets/styles/variable/variable.less';
  .tank {
    width: 200px;
    height: 60px;
    background-color: @oil-tank-backgroup;
    border-radius: 97px;
    border: 6px solid @oil-tank-border;
    margin: auto;
    position: relative;
    overflow: hidden;
  }
  .tank-top-left {
    position: absolute;
    top: -12px;
    left: 35px;
    width: 21px;
    height: 8px;
    background: @oil-tank-border;
  }
  .tank-top-two-left {
    position: absolute;
    top: -5px;
    left: 37px;
    width: 17px;
    height: 6px;
    background: @oil-tank-border;
  }
  .tank-top-right {
    position: absolute;
    top: -12px;
    right: 35px;
    width: 21px;
    height: 8px;
    background: @oil-tank-border;
  }
  .tank-top-two-right {
    position: absolute;
    top: -5px;
    right: 37px;
    width: 17px;
    height: 6px;
    background: @oil-tank-border;
  }
  .tank-oil {
    position: absolute;
    bottom: 0;
    width: 100%;
    background:-webkit-gradient(linear, 0% 0%, 0% 100%,from(@oil-tank-oil-height-light), to(@oil-tank-oil-height-dark));/*谷歌*/
  }
</style>

<template>
  <div class="login-body">
    <div class="login-content">
      <div class="login-content-left">
        <div class="login-content-left-title">
          <div class="left-content-title-top">
            Gas100VRS加油站油气回收在线监测
          </div>
          <div class="left-content-title-bottom">
            Gas station oil and gas recovery online monitoring system
          </div>
        </div>
      </div>
      <div class="login-content-right">
        <div class="right-content">
          <div class="right-content-title">请选择加油站</div>
          <Form  :label-width="0"  style="margin-top: 20px;">
            <div>
              <Row type="flex" justify="center">
                <Col span="15" >
                <FormItem label="">
                  <Select v-model="stationIndex" style="width:300px;" :label-in-value="true" @on-change="stationChange">
                    <Option v-for="(item,index) in stationsList" :key="index"  :value="index">{{item.stationName}}</Option>
                  </Select>
                </FormItem>
                </Col>
              </Row>
              <Row type="flex" justify="center">
                <Col span="24" push="2">
                <FormItem>
                  <Button @click="submitStation"  class="btn-login" style="width: 100px;margin-top: 100px;margin-right: 20px">确认</Button>
                  <Button @click="back"  class="btn-login" style="width: 100px;margin-top: 100px">返回</Button>
                </FormItem>
                </Col>
              </Row>
            </div>
          </Form>
        </div>
      </div>
    </div>
  </div>
</template>


<script type="application/ecmascript">
  import { userStations } from '../api/api'
  import * as types from '../store/types'
  import store from '../store/store'
  export default {
    data () {
      return {
        role: '',
        stationIndex: '',
        stationName: '',
        stationId: '',
        stationsList: []
      }
    },
    created: function () {
      userStations().then((res) => {
        if (res.data.code === 1000) {
          this.stationsList = res.data.content
          if (sessionStorage.getItem('station') !== undefined) {
            let station = JSON.parse(sessionStorage.getItem('station'))
            for (let i = 0; i < this.stationsList.length; i++) {
              let id = this.stationsList[i].stationId
              let ids = station.stationId
              if (ids === id) {
                this.stationIndex = i
                this.stationName = this.stationsList[i].stationName
                this.role = this.stationsList[i].roleId
                this.stationId = this.stationsList[i].stationId
              }
            }
          }
          if (this.stationsList.length > 0) {
            this.stationName = this.stationsList[0].stationName
            this.role = this.stationsList[0].roleId
            this.stationId = this.stationsList[0].stationId
          }
        }
      })
    },
    methods: {
      back () {
        this.$router.push({path: '/oil_nozzle'})
      },
      submitStation () {
        var s = {
          stationId: this.stationId,
          stationName: this.stationName,
          role: this.role
        }
        store.commit(types.Station, JSON.stringify(s))
        this.$router.push({path: '/oil_nozzle'})
        this.$Message.success('加油站切换成功')
      },
      stationChange (change) {
        this.stationName = change.label
        this.role = this.stationsList[change.value].roleId
        this.stationId = this.stationsList[change.value].stationId
      }
    }
  }
</script>
<style  lang="less" scoped>
  @import '../assets/styles/variable/variable.less';
  .login-body {
    position: relative;
    height: 100vh;
    width: 100%;
    background: url("../assets/login-backgroup.png");
  }
  .login-content {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    margin: auto;
    text-align: center;
    height: 400px;
    width: 1000px;
    background: @login-color;
    border-radius:10px;
    overflow: hidden;
  }
  .login-content-left {
    display: table;
    float: left;
    width: 50%;
    height: 400px;
    background: url("../assets/login-title.png");
  }
  .login-content-right {
    position: relative;
    float: left;
    width: 50%;
    height: 100%;
  }
  .right-content-title {
    color: @login-title-color;
    line-height:28px;
  }
  .right-content {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    margin: auto;
    width: 400px;
    height: 200px;
  }
  .login-content-left-title {
    display: table-cell;
    vertical-align: middle;
  }
  .left-content-title-top {
    font-size: 24px;
    color: @login-color;
  }
  .left-content-title-bottom {
    font-size: 14px;
    color: @login-color;
  }
</style>

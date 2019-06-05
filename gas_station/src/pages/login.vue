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
          <div class="right-content-title">欢迎登陆</div>
          <Form :model="form" :label-width="0" ref="form" style="margin-top: 20px;">
            <Row type="flex" justify="center">
              <Col span="15">
              <FormItem label="">
                <Input type="text" v-model="form.userId" placeholder="请输入用户名" size="large" style="width: 300px;">
                <Icon type="md-person" slot="prepend" size="20" color="#666666"></Icon>
                </Input>
              </FormItem>
              </Col>
            </Row>
            <Row type="flex" justify="center">
              <Col span="15" >
              <FormItem label="">
                <Input type="password" v-model="form.password" placeholder="请输入用户密码" @on-enter="submit" size="large" style="width: 300px;">
                <Icon type="ios-lock" slot="prepend" size="20" color="#666666"></Icon>
                </Input>
              </FormItem>
              </Col>
            </Row>
            <Row type="flex" justify="center">
              <Col span="24" push="2">
              <FormItem>
                <Button @click="submitMonitor"  class="btn-monitor">登录监控中心</Button>
                <Button @click="submit"  class="btn-login">登录数据平台</Button>
              </FormItem>
              </Col>
            </Row>
            <Alert type="warning" show-icon v-show="showNotice">
              请正确填写账号和密码！
            </Alert>
          </Form>
        </div>
      </div>
    </div>
  </div>
</template>


<script type="application/ecmascript">
  // import { Login } from '../api/api'
  import * as types from '../store/types'
  import store from '../store/store'
  export default {
    data () {
      return {
        showNotice: false,
        single: true,
        form: {
          userId: '',
          password: ''
        },
        token: ''
      }
    },
    created: function () {
    },
    methods: {
      remember (change) {
        // if (change === true) {
        //   store.commit(types.Rem, JSON.stringify(this.form))
        // } else {
        //   var s = {
        //     userId: '',
        //     password: ''
        //   }
        //   store.commit(types.Rem, JSON.stringify(s))
        // }
      },
      pwd () {
        this.$router.push({path: '/password'})
      },
      submitMonitor () {
        if (this.single === true) {
          store.commit(types.Rem, JSON.stringify(this.form))
        } else {
          var s = {
            userId: '',
            password: ''
          }
          store.commit(types.Rem, JSON.stringify(s))
        }
        this.$Message.success('登录成功! 欢迎使用监控中心')
        this.$router.push({path: '/monitor'})
      },
      submit () {
        if (this.single === true) {
          store.commit(types.Rem, JSON.stringify(this.form))
        } else {
          var s = {
            userId: '',
            password: ''
          }
          store.commit(types.Rem, JSON.stringify(s))
        }
        this.$Message.success('登录成功! 欢迎使用数据中心')
        this.$router.push({path: '/oil_gun'})
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
  }
  .login-content-left {
    display: table;
    float: left;
    width: 50%;
    height: 400px;
    border-bottom-left-radius:10px;
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

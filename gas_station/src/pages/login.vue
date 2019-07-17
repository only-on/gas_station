<template>
  <div class="login-body">
    <div class="login-content">
      <div class="login-content-left">
        <div class="login-content-left-title">
          <div class="left-content-title-top">
            加油站油气回收在线监测
          </div>
          <div class="left-content-title-bottom">
            Gas station oil and gas recovery online monitoring system
          </div>
        </div>
      </div>
      <div class="login-content-right">
        <div class="right-content">
          <div class="right-content-title" v-show="showStations">欢迎登录</div>
          <div class="right-content-title" v-show="!showStations">请选择加油站</div>
          <Form :model="form" :label-width="0" ref="form" style="margin-top: 20px;">
            <div v-show="showStations">
              <Row type="flex" justify="center">
                <Col span="15">
                <FormItem label="">
                  <Input type="text" v-model="form.phone" placeholder="请输入用户名" size="large" style="width: 300px;">
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
              <div style="text-align: right;margin-right: 10px;margin-bottom: 20px">
                <Button @click="reset" type="text" >
                  <div style="color: #1A9CF4;text-decoration: underline;">
                    忘记密码
                  </div>
                </Button>
              </div>
              <Row type="flex" justify="center">
                <Col span="24" push="2">
                <FormItem>
                  <Button @click="submitMonitor"  class="btn-monitor">登录监控中心</Button>
                  <Button @click="submit"  class="btn-login">登录数据平台</Button>
                </FormItem>
                </Col>
              </Row>
            </div>
            <div v-show="!showStations">
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
                <Col span="24">
                <FormItem>
                  <Button @click="submitStation"  class="btn-login" style="width: 100px;margin-top: 100px">确认</Button>
                </FormItem>
                </Col>
              </Row>
            </div>
          </Form>
          <Modal v-model="changeModal" width="700" :mask-closable="false" >
            <p slot="header" style="color:#666;">重置密码
          </span>
            </p>
            <div style="text-align:center;padding: 10px 20px 10px ">
              <Form :model="formItem" :label-width="100" ref="formItem">
                <Row type="flex">
                  <FormItem label="新密码" class="selfValidate">
                    <Input  v-model="formItem.newPassword" type="password"  placeholder="新密码" style="width: 300px; float: left" @on-change="checkPassword(formItem.newPassword)"></Input>
                    <span class="notice" v-if="passNotice">请输入6~11位的数字</span>
                  </FormItem>
                </Row>
                <Row type="flex">
                  <FormItem label="确认新密码" class="selfValidate">
                    <Input  v-model="formItem.passwords"type="password" style="width: 300px;float: left" placeholder="确认新密码" @on-change="checkPasswords(formItem.passwords, formItem.newPassword)"></Input>
                    <span class="notice" v-if="passwordNotice">密码不一致</span>
                  </FormItem>
                </Row>
                <Row type="flex">
                  <FormItem label="手机号码" class="selfValidate">
                    <div style="width: 200px;display: inline-block;text-align: left">{{formItem.mobile}}</div>
                    <!--<Input  v-model="formItem.mobile"   placeholder="手机号码" style="width: 300px; float: left;margin-right: 20px" @on-change="mobilePhoneVal(formItem.mobile)"></Input>-->
                    <Button @click="sendCode" class="btn-submit" v-show="send">发送验证码</Button>
                    <Button class="btn-cancel" v-show="!send">已发送</Button>
                    <!--<div class="notice" v-if="mobilePhoneNotice">请输入合法的手机号码</div>-->
                  </FormItem>
                </Row>
                <Row type="flex">
                  <FormItem label="短信验证码" class="selfValidate">
                    <Input  v-model="formItem.mobileCode" style="width: 300px;float: left;margin-right: 20px" placeholder="验证码" ></Input>
                    <span class="noticeTextGray">验证码半小时内有效</span>
                  </FormItem>
                </Row>
              </Form>
            </div>
            <div slot="footer" style="text-align: center">
              <Button @click="submitPassword" class="btn-submit">确定修改</Button>
              <Button @click="cancel" class="btn-cancel">取消</Button>
            </div>
          </Modal>
        </div>
      </div>
    </div>
  </div>
</template>


<script type="application/ecmascript">
  import { userLogin, sendPhoneCodes, resetPassword } from '../api/api'
  import * as types from '../store/types'
  import store from '../store/store'
  export default {
    data () {
      return {
        stationIndex: '',
        stationName: '',
        stationId: '',
        send: true,
        mobilePhoneNotice: false,
        passwordNotice: false,
        passNotice: false,
        changeModal: false,
        formItem: {
          passwords: '',
          mobile: '',
          mobileCode: '',
          newPassword: ''
        },
        type: 1,
        stationsList: [],
        showStations: true,
        single: true,
        form: {
          phone: '',
          password: ''
        },
        token: ''
      }
    },
    created: function () {
      if (sessionStorage.getItem('user') !== null) {
        this.form.phone = JSON.parse(sessionStorage.getItem('user'))
        this.form.password = JSON.parse(sessionStorage.getItem('pwd'))
      }
    },
    methods: {
      stationChange (change) {
        this.stationName = change.label
        var s = {
          stationId: this.stationsList[change.value].stationId,
          stationName: this.stationName,
          role: this.stationsList[change.value].roleId
        }
        store.commit(types.Station, JSON.stringify(s))
      },
      checkPasswords (string, pass) {
        if (string !== pass) {
          this.passwordNotice = true
        } else {
          this.passwordNotice = false
        }
      },
      // 密码
      checkPassword (string) {
        if (string !== '' && string !== undefined) {
          let validate = /^[0-9]*$/
          string = string.replace(/\s+/g, '')
          if (validate.test(string)) {
            if (string.length > 5 && string.length < 12) {
              this.passNotice = false
            } else {
              this.passNotice = true
            }
          } else {
            this.passNotice = true
          }
        } else {
          this.passNotice = false
        }
      },
      mobilePhoneVal (string) {
        this.formItem.phone = string.trim()
        var validataPrice = /(^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[89])\d{8}$)/
        if (!validataPrice.test(string.trim())) {
          this.mobilePhoneNotice = true
        } else {
          this.mobilePhoneNotice = false
        }
      },
      sendCode () {
        this.formItem.mobile = this.formItem.mobile.trim()
        if (this.formItem.mobile !== '') {
          let param = {
            type: 1,
            mobile: this.formItem.mobile
          }
          sendPhoneCodes(param).then((res) => {
            if (res.data.code === 1000) {
              this.send = false
              this.$Message.success('验证码发送成功')
            } else {
              this.$Message.error(res.data.message)
            }
          })
        } else {
          this.$Message.error('手机号码不能为空')
        }
      },
      cancel () {
        this.formItem.mobile = JSON.parse(sessionStorage.getItem('user'))
        this.formItem = {
          passwords: '',
          mobile: '',
          mobileCode: '',
          newPassword: ''
        }
        this.passNotice = false
        this.passwordNotice = false
        this.mobilePhoneNotice = false
        this.send = true
        this.changeModal = false
      },
      submitPassword () {
        if (this.formItem.newPassword !== '') {
          if (this.passNotice === false) {
            if (this.formItem.passwords !== '') {
              if (this.passwordNotice === false) {
                if (this.formItem.mobileCode) {
                  resetPassword(this.formItem).then((res) => {
                    if (res.data.code === 1000) {
                      this.changeModal = false
                      this.$Message.success('密码重置成功')
                    } else {
                      this.send = true
                      this.$Message.error(res.data.message)
                    }
                  })
                } else {
                  this.$Message.error('短信验证码不能为空')
                }
              } else {
                this.$Message.error('密码不一致')
              }
            } else {
              this.$Message.error('确认密码不能为空')
            }
          } else {
            this.$Message.error('密码请输入6~11位的数字')
          }
        } else {
          this.$Message.error('新密码不能为空')
        }
      },
      reset () {
        this.formItem = {
          passwords: '',
          mobile: '',
          mobileCode: '',
          newPassword: ''
        }
        this.formItem.mobile = JSON.parse(sessionStorage.getItem('user'))
        this.send = true
        this.passNotice = false
        this.passwordNotice = false
        this.mobilePhoneNotice = false
        this.changeModal = true
      },
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
      submitStation () {
        if (this.type === 1) {
          this.$Message.success('欢迎使用监控中心')
          this.$router.push({path: '/monitor'})
        } else {
          this.$Message.success('欢迎使用数据中心')
          this.$router.push({path: '/oil_nozzle'})
        }
      },
      submitMonitor () {
        this.type = 1
        if (this.form.phone === '') {
          this.$Message.error('用户名不能为空')
        } else {
          this.form.phone = this.form.phone.trim()
          if (this.form.password === '') {
            this.$Message.error('用户密码不能为空')
          } else {
            if (this.single === true) {
              userLogin(this.form).then((res) => {
                if (res.data.code === 1000) {
                  this.token = res.data.content.token
                  this.$Message.success('登录成功!')
                  this.stationsList = res.data.content.userRoleVOS
                  if (this.stationsList.length > 0) {
                    this.stationId = this.stationsList[0].stationId
                    this.stationName = this.stationsList[0].stationName
                    this.stationIndex = 0
                  }
                  if (this.stationsList.length === 1) {
                    this.$router.push({path: '/monitor'})
                  } else {
                    this.showStations = false
                  }
                  var s = {
                    stationId: this.stationId,
                    stationName: this.stationName,
                    role: this.stationsList[0].roleId
                  }
                  sessionStorage.setItem('authorization', JSON.stringify(res.data.content.token))
                  sessionStorage.setItem('user', JSON.stringify(this.form.phone))
                  sessionStorage.setItem('pwd', JSON.stringify(this.form.password))
                  store.commit(types.Station, JSON.stringify(s))
                } else {
                  this.token = ''
                  this.$Message.error(res.data.message)
                }
              })
            } else {
              var s = {
                stationId: '',
                stationName: '',
                role: ''
              }
              sessionStorage.setItem('user', JSON.stringify(this.form.phone))
              sessionStorage.setItem('pwd', JSON.stringify(this.form.password))
              store.commit(types.Station, JSON.stringify(s))
            }
          }
        }
      },
      submit () {
        this.type = 2
        if (this.form.phone === '') {
          this.$Message.error('用户名不能为空')
        } else {
          this.form.phone = this.form.phone.trim()
          if (this.form.password === '') {
            this.$Message.error('用户密码不能为空')
          } else {
            if (this.single === true) {
              userLogin(this.form).then((res) => {
                if (res.data.code === 1000) {
                  this.token = res.data.content.token
                  this.$Message.success('登录成功!')
                  this.stationsList = res.data.content.userRoleVOS
                  if (this.stationsList.length > 0) {
                    this.stationId = this.stationsList[0].stationId
                    this.stationName = this.stationsList[0].stationName
                    this.stationIndex = 0
                  }
                  if (this.stationsList.length === 1) {
                    this.$router.push({path: '/oil_nozzle'})
                  } else {
                    this.showStations = false
                  }
                  var s = {
                    stationId: this.stationId,
                    stationName: this.stationName,
                    role: this.stationsList[0].roleId
                  }
                  sessionStorage.setItem('authorization', JSON.stringify(res.data.content.token))
                  sessionStorage.setItem('user', JSON.stringify(this.form.phone))
                  sessionStorage.setItem('pwd', JSON.stringify(this.form.password))
                  store.commit(types.Station, JSON.stringify(s))
                } else {
                  this.token = ''
                  this.$Message.error(res.data.message)
                }
              })
            } else {
              var s = {
                stationId: '',
                stationName: '',
                role: ''
              }
              sessionStorage.setItem('user', JSON.stringify(this.form.phone))
              sessionStorage.setItem('pwd', JSON.stringify(this.form.password))
              store.commit(types.Station, JSON.stringify(s))
            }
          }
        }
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
    font-size: 26px;
    color: @login-color;
  }
  .left-content-title-bottom {
    font-size: 14px;
    color: @login-color;
  }
</style>

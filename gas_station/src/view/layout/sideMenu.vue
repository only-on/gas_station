<template>
  <div class="layout">
    <div class="top-layout">
      <div class="top-layout-left">{{stationName}}</div>
      通尚科技&nbsp;油气回收在线监测系统

      <div class="person-info">
        <div style="height: 35px;width: 35px;border-radius: 50%;background: #CAEBFE;display: inline-block;margin-top: 15px;position: relative">
          <icon v-if="role === 0" name="layout_admin" :w="35" :h="35" style="position: absolute;top: 2px;left: 4px"></icon>
          <icon v-if="role === 1" name="layout_user" :w="35" :h="35" style="position: absolute;top: 2px;left: 4px"></icon>
          <Icon type="md-arrow-dropup" size="20" color="#fff" style="position: absolute;bottom: -17px;left: 7px"></Icon>
        </div>
        <div class="slider">
          <div class="slideItem" style="display: none">
            <Row type="flex" class="menuItem" justify="start" @click.native="resetPasswword" style="height: 40px;text-align: center;line-height: 40px">
              <Icon type="ios-unlock-outline" size="20" color="#858D94" style="margin-top:12px;margin-left: 10px;margin-right: 5px"></Icon>
              <span style="font-size: 14px">修改密码</span>
            </Row>
            <Row type="flex" class="menuItem" justify="start" @click.native="setting" style="height: 40px;text-align: center;line-height: 40px">
              <Icon type="ios-swap" size="20" color="#858D94" style="margin-top:12px;margin-left: 10px;margin-right: 5px"></Icon>
              <span style="font-size: 14px">切换油站</span>
            </Row>
            <Row type="flex" class="menuItem" justify="start" @click.native="logoutUser" style="text-align: center;line-height: 40px;margin-top: 0px;">
              <Icon type="ios-log-out" size="20" color="#858D94" style="margin-top:12px;margin-left:10px;margin-right: 5px"></Icon>
              <span style="font-size: 14px">注销</span>
            </Row>
          </div>
        </div>
      </div>
      <span style="float: right;margin-right: 20px">{{date}}</span>
    </div>
    <nav class="side-menu" >
      <Menu style="width:250px;text-align: left;" :open-names="[getCurrentMenu()]" :active-name="getCurrentMenu()" @on-select="clickMenuItems" ref="sideMenu"  >
        <MenuItem name="oil_nozzle">
          <div >
            <icon name="layout_oil_gun" :w="30" :h="30"></icon>
            <span style="margin-left: 15px">油枪信息</span>
          </div>
        </MenuItem>
        <MenuItem name="oil_tank">
          <div >
            <icon name="layout_oil_store" :w="30" :h="30"></icon>
            <span style="margin-left: 15px">储油罐</span>
          </div>
        </MenuItem>
        <MenuItem name="oliGas_index">
          <div>
            <icon name="layout_co2" :w="30" :h="30"></icon>
            <span style="margin-left: 15px">环境信息</span>
          </div>
        </MenuItem>
        <MenuItem name="alarm_index">
          <div>
            <icon name="layout_notice" :w="30" :h="30"></icon>
            <span style="margin-left: 15px">告警查询</span>
          </div>
        </MenuItem>
        <MenuItem name="user_index" v-if="role === 0">
          <div>
            <icon name="layout_users" :w="28" :h="28"></icon>
            <span style="margin-left: 15px">用户管理</span>
          </div>
        </MenuItem>
        <MenuItem name="videos_index">
          <div>
            <icon name="layout_video" :w="30" :h="30"></icon>
            <span style="margin-left: 15px">视频监控</span>
          </div>
        </MenuItem>
        <Submenu name="tank_index">
          <template slot="title">
            <icon name="layout_dates" :w="30" :h="30"></icon>
            <span style="margin-left: 15px">数据查询</span>
          </template>
          <MenuItem name="nozzle_index">
            <span style="margin-left: 50px">
            油枪数据查询
            </span>
          </MenuItem>
          <MenuItem name="press_index">
            <span style="margin-left: 50px">
            压力数据查询
            </span>
          </MenuItem>
          <MenuItem name="fluid_resistance_index">
            <span style="margin-left: 50px">
            液阻压力数据查询
            </span>
          </MenuItem>
        </Submenu>
        <Submenu name="6">
          <template slot="title">
            <icon name="layout_count" :w="30" :h="30"></icon>
            <span style="margin-left: 15px">统计分析</span>
          </template>
          <!--<MenuItem name="gun_data">油枪数据分析</MenuItem>-->
          <!--<MenuItem name="tank_data">油罐数据分析</MenuItem>-->
          <!--<MenuItem name="alarm_data">告警数据分析</MenuItem>-->
          <MenuItem name="gun_data">
            <span style="margin-left: 50px">
            油枪数据分析
            </span>
          </MenuItem>
          <MenuItem name="tank_analyse">
            <span style="margin-left: 50px">
            油罐数据分析
            </span>
          </MenuItem>
          <MenuItem name="environment_analyse">
            <span style="margin-left: 50px">
            环境数据分析
            </span>
          </MenuItem>
          <MenuItem name="alarm_data">
            <span style="margin-left: 50px">
            告警数据分析
            </span>
          </MenuItem>
        </Submenu>
      </Menu>
    </nav>
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
</template>

<script>
  // import store from '@/store/store'
  // import { Logout, getPersonal, headUpload, personInfoEdit, personPwdEdit } from '@/api/api'
  import { Logout, resetPassword, sendPhoneCodes } from '../../api/api'
  export default {
    data () {
      return {
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
        role: '',
        stationName: '',
        date: '',
        userName: 'ADMIN',
        userRole: 'layout_admin'
      }
    },
    created () {
      this.date = this.formatDate(new Date())
      this.clickMenuItems(this.getCurrentMenu())
      if (sessionStorage.getItem('station') !== null) {
        this.stationName = JSON.parse(sessionStorage.getItem('station')).stationName
        if (this.stationName.length > 11) {
          this.stationName = this.stationName.substr(0,11) + '...'
        }
        this.role = JSON.parse(sessionStorage.getItem('station')).role
      }
    },
    methods: {
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
            }
          })
        } else {
          this.$Message.error('手机号码不能为空')
        }
      },
      cancel () {
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
                      sessionStorage.removeItem('authorization')
                      sessionStorage.removeItem('station')
                      sessionStorage.removeItem('pwd')
                      this.$router.push({ path: '/' })
                    } else {
                      this.send = true
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
      resetPasswword () {
        this.formItem = {
          passwords: '',
          mobile: '',
          mobileCode: '',
          newPassword: ''
        }
        this.send = true
        this.passNotice = false
        this.passwordNotice = false
        this.mobilePhoneNotice = false
        this.changeModal = true
      },
      formatDate (date) {
        var y = date.getFullYear()
        var m = date.getMonth() + 1
        m = m < 10 ? '0' + m : m
        var d = date.getDate()
        d = d < 10 ? ('0' + d) : d
        var h = date.getHours()
        h = h < 10 ? ('0' + h) : h
        var minute = date.getMinutes()
        var seconds = date.getSeconds()
        minute = minute < 10 ? ('0' + minute) : minute
        seconds = seconds < 10 ? ('0' + seconds) : seconds
        var newDate = y + '-' + m + '-' + d + ' ' + h + ':' + minute + ':' + seconds
        // var newDate = y + '-' + m + '-' + d
        return newDate
      },
      changeRole () {
        if (this.userRole === 'layout_admin') {
          this.userName = 'USER'
          this.userRole = 'layout_user'
        } else {
          this.userName = 'ADMIN'
          this.userRole = 'layout_admin'
        }
      },
      getCurrentMenu () {
        let path = this.$route.path
        path = path.indexOf('/') === 0 ? path.substr(1) : path
        this.clickMenuItems(path)
        return path
      },
      clickMenuItems (key) {
        key = key.indexOf('/') === 0 ? key : '/' + key
        this.$router.push({ path: key })
      },
      setting () {
        this.$router.push({ path: '/station' })
      },
      logoutUser () {
        Logout().then((res) => {
          if (res.data.code === 1000) {
            sessionStorage.removeItem('authorization')
            sessionStorage.removeItem('station')
            this.$router.push({ path: '/' })
          } else {
            this.$Message.error(res.data.message)
          }
        })
      }
    },
    mounted() {
      let _this = this; // 声明一个变量指向Vue实例this，保证作用域一致
      this.timer = setInterval(() => {
        _this.date = this.formatDate(new Date()); // 修改数据date
      }, 1000)
    },
    beforeDestroy () {
      if(this.timer) {
        window.clearInterval(this.timer)
      }
    }
  }
</script>

<style lang='less' scoped>
  @import '../../assets/styles/variable/variable.less';
  .person-info{
    width: 50px;
    height: 60px;
    float: right;
    margin-right: 30px;
    line-height: 60px;
    text-align: center;
    position: relative;
    color: @login-title-color;
  }
  .slider{
    width: 100px;
    position: absolute;
    top: 60px;
    right: 10px;
    background:@main-text-white;
    z-index:2;
    transition: all 0.3s;
    color: @login-title-color;
  }
  .person-info:hover{
    cursor: pointer;
  }
  .person-info:hover .slider{
    display: block;
    /*height: 70px;*/
    cursor: pointer;
  }
  .person-info:hover .slideItem{
    display: block !important;
  }
  .menuItem:hover {
    background: @main-line-gray;
  }
  .shadow{
    width:5px;
    height:5px;
    background: red;
    border-radius: 50%;
    margin-left:15px;
    margin-top: 19px;
    position: relative;
    animation: flash 1s linear infinite;
  }
  @keyframes flash {
    0% {
      box-shadow:0 0 0 0px rgba(224,36,51,0.8)
    }
    100%{
      box-shadow:0 0 0 5px rgba(224,36,51,0.8)
    }
  }
  .layout{
    font-family:PingFangSC-Regular;
    background: @main-text-white;
    font-size: 17px;
  }
  .person {
    border-top: 1px solid rgba(30,172,252,0.33);
    color: @main-text-white;
    background: @layout-blue-dark;
    line-height: 60px;
    width: 249px;
  }
  .top-layout {
    font-family:PingFangSC-Regular;
    color: @main-text-white;
    background: @layout-blue-light;
    line-height: 60px;
  }
  .top-layout-left {
    color: @main-text-white;
    background: @layout-blue-dark;
    float: left;
    width: 249px;
  }
  .side-menu {
    font-family: MicrosoftYaHei-Bold;
    font-weight: bold;
    position: relative;
    width: 100%;
    left: 0;
    top: 0;
    color: @main-text-white;
    .ivu-menu-item.is-active,
    .ivu-menu-item.is-active {
      color: @main-text-white;
      background-color: @layout-blue-dark-checked !important;
    }
    .ivu-menu-light.ivu-menu-vertical .ivu-menu-item-active:not(.ivu-menu-submenu) {
      color: @main-text-white;
      background-color: @layout-blue-dark-checked !important;
    }
    /*菜单选中激活*/
    .ivu-menu-vertical {
      .ivu-menu-item.sm-active,
      .ivu-menu-item.sm-active {
        color: @main-text-white !important;
        background-color: @layout-blue-dark-checked !important;
      }
    }
    .ivu-menu-item {
      .ivu-menu-item.sm-active,
      .ivu-menu-item.sm-active {
        color: @main-text-white !important;
        background-color: @layout-blue-dark-checked !important;
      }
    }
    .ivu-menu {
      background-color: transparent !important;
      .fa {
        margin-right: 10px;
        speak: none;
        font-family: MicrosoftYaHei-Bold;
        font-style: normal;
        font-weight: 400;
        font-variant: normal;
        text-transform: none;
        line-height: 3;
        vertical-align: baseline;
        display: inline-block;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
      }
    }
    &>.ivu-menu,
    &>.ivu-menu>.ivu-menu-item:last-child {
      border-bottom: 1px solid rgba(30,172,252,0.2);
    }
    .ivu-menu-item,
    .ivu-menu-submenu {
      border-top: 1px solid rgba(30,172,252,0.33);
      line-height: 45px !important;
    }
    .ivu-menu-submenu .ivu-menu-item {
      background-color: transparent !important;
      border-top: 0;
    }
    .ivu-menu-item,
    .ivu-menu-submenu .ivu-menu-submenu-title {
      color: @main-text-white;
    }
    .ivu-menu-item:hover {
      background-color: @layout-blue-dark-checked;
    }
    /*鼠标滑过css*/
    .ivu-menu-item:hover,
    .ivu-menu-submenu .ivu-menu-item:hover,
    .ivu-menu-submenu-title:hover {
      background-color: @layout-blue-dark-checked;
      color: @main-text-white;
    }
    .ivu-menu-submenu .ivu-menu-item:hover,
    .ivu-menu-submenu-title:hover {
      background-color: @layout-blue-dark-checked !important;
      color: @main-text-white;
    }
    .ivu-menu-vertical .ivu-menu-submenu-title-icon {
      top: 12px;
    }
  }

  .side-menu {
    color: @main-text-white;
    padding: 0 !important;
    position: absolute;
    top: 60px;
    bottom: 0;
    left: 0;
    width: 250px;
    padding-top: 10px;
    z-index: 1;
    overflow-x: hidden;
    background: -webkit-linear-gradient(rgba(1,77,129,1), rgba(1,77,129,0.8)); /* Safari 5.1 - 6.0 */
    background: -o-linear-gradient(rgba(1,77,129,1), rgba(1,77,129,0.8)); /* Opera 11.1 - 12.0 */
    background: -moz-linear-gradient(rgba(1,77,129,1), rgba(1,77,129,0.8)); /* Firefox 3.6 - 15 */
    background: linear-gradient(rgba(1,77,129,1), rgba(1,77,129,0.8));
    border-right: 1px solid #e5e5e5;
    transition: all .45s cubic-bezier(.23, 1, .32, 1);
    .ivu-menu-submenu .ivu-menu-item:hover,
    .ivu-menu-submenu-title:hover {
      background-color: @layout-blue-dark-checked;
    }
  }
  .side-menu.show {
    left: -250px;
  }
</style>

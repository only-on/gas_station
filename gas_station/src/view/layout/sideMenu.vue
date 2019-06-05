<template>
  <div class="layout">
    <div class="top-layout">
      <div class="top-layout-left">北京丰辰鲁谷加油站</div>
      Gas100VRS加油站油气回收在线监测
      <span style="float: right;margin-right: 20px">{{date}}</span>
    </div>
    <div class="person">
      <div style="height: 30px;width: 30px;border-radius: 50%;background: #20C6FF;position: relative;float: left;margin-top: 15px;margin-left: 40px">
        <icon v-if="userRole === 'layout_admin'" name="layout_admin" :w="30" :h="30" style="position: absolute;left:3px;top: 0;bottom: 0;right: 0;margin: auto;"></icon>
        <icon v-if="userRole === 'layout_user'" name="layout_user" :w="30" :h="30" style="position: absolute;left:3px;top: 0;bottom: 0;right: 0;margin: auto;"></icon>
      </div>
      <span style="margin-right: 20px;margin-left: 15px;float: left">{{userName}}</span>
      <Button shape="circle" size="small" @click="changeRole" >切换</Button>
    </div>
    <nav class="side-menu" >
      <Menu style="width:250px;text-align: left;" :open-names="[getCurrentMenu()]" :active-name="getCurrentMenu()" accordion @on-select="clickMenuItems" ref="sideMenu"  >
        <MenuItem name="oil_gun">
          <div style="margin-left: 30px">
            <icon name="layout_oil_gun" :w="30" :h="30"></icon>
            <span style="margin-left: 15px">油枪信息</span>
          </div>
        </MenuItem>
        <MenuItem name="2">
          <div style="margin-left: 30px">
            <icon name="layout_oil_store" :w="30" :h="30"></icon>
            <span style="margin-left: 15px">储油罐</span>
          </div>
        </MenuItem>
        <MenuItem name="3">
          <div style="margin-left: 30px">
            <icon name="layout_co2" :w="30" :h="30"></icon>
            <span style="margin-left: 15px">油气浓度</span>
          </div>
        </MenuItem>
        <MenuItem name="4">
          <div style="margin-left: 30px">
            <icon name="layout_dates" :w="30" :h="30"></icon>
            <span style="margin-left: 15px">数据查询</span>
          </div>
        </MenuItem>
        <MenuItem name="5">
          <div style="margin-left: 30px">
            <icon name="layout_notice" :w="30" :h="30"></icon>
            <span style="margin-left: 15px">告警</span>
          </div>
        </MenuItem>
        <MenuItem name="6">
          <div style="margin-left: 30px">
            <icon name="layout_count" :w="30" :h="30"></icon>
            <span style="margin-left: 15px">统计分析</span>
          </div>
        </MenuItem>
      </Menu>
    </nav>
  </div>
</template>

<script>
  // import store from '@/store/store'
  // import { Logout, getPersonal, headUpload, personInfoEdit, personPwdEdit } from '@/api/api'
  export default {
    data () {
      return {
        date: '',
        userName: 'ADMIN',
        userRole: 'layout_admin'
      }
    },
    created () {
      this.date = this.formatDate(new Date())
      this.clickMenuItems(this.getCurrentMenu())
      // this.getPersonalDates()
    },
    methods: {
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
      logout () {
        Logout().then((res) => {
          if (res.data.code !== 1000) {
            this.$Message.error(res.data.message)
          }
          sessionStorage.removeItem('token')
          this.$router.push({path: '/'})
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
    .ivu-menu-vertical .ivu-menu-item,
    .ivu-menu-vertical .ivu-menu-submenu-title {
      padding: 0 0 0 10px;
    }
    /*菜单选中激活*/
    .ivu-menu-vertical {
      .ivu-menu-item.sm-active,
      .ivu-menu-item.sm-active {
        color: @main-text-white;
        background-color: @layout-blue-dark-checked !important;
      }
    }
    .ivu-menu-item {
      .ivu-menu-item.sm-active,
      .ivu-menu-item.sm-active {
        color: @main-text-white;
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
    .ivu-menu-submenu {
      line-height: 45px;
    }
    .ivu-menu-item,
    .ivu-menu-submenu {
      border-top: 1px solid rgba(30,172,252,0.33);
      line-height: 45px;
    }
    .ivu-menu-submenu .ivu-menu-item {
      background-color: transparent !important;
      border-top: 0;
      padding-left: 34px;
    }
    .ivu-menu-item,
    .ivu-menu-submenu .ivu-menu-submenu-title {
      height: 45px;
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
    top: 120px;
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

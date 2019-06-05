<template>
  <div>
    <div class="main-content">
      <transition mode="out-in" enter-active-class="bounceInleft" leave-active-class="bounceOutRight">
        <router-view class="tab-content animated"></router-view>
      </transition>
    </div>
  </div>
</template>
<script>
  export default {
    data () {
      return {
      }
    }
  }
</script>
<style lang='scss'scoped>
  .el-tabs__item {
    color: #fff
  }

  .main-content {
    width: 100% -250px;
    position: absolute;
    top: 60px;
    right: 0;
    bottom: 0;
    left: 250px;
    overflow: auto;
    z-index: 1;
    background-color: #f5f7f9;
    transition: left .45s cubic-bezier(.23, 1, .32, 1);
    .tabs-content {
      height: 100%;
    }
  }
  .layout-footer-center{
    width:100% !important;
    text-align: center;
    padding: 25px !important;
    bottom:0px;
    right: 0;
  }
</style>


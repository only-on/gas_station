<template>
  <div>
    <Sidemenu @menu="sidemenu"></Sidemenu>
    <MainCont :sideMenuVal="sideMenuVals"></MainCont>
  </div>
</template>

<script>
import Sidemenu from '../view/layout/sideMenu.vue'
import MainCont from '../view/layout/mainContext.vue'
export default {
  components: {
    Sidemenu,
    MainCont
  },
  data () {
    return {
      sideMenuVals: [],
      sonMenu: {}
    }
  },
  methods: {
    sidemenu (datas) {
      var s = {
        keyName: datas
      }
      this.sonMenu = s
      this.sideMenuVals = [this.sonMenu]
    }
  }
}
</script>

<style scoped>
</style>

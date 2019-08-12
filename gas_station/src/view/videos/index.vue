<template>
    <div  class="body" >
      <Row type="flex" justify="start" >
        <Button :class="isDefault === true ? 'btn1 btn' : 'btn2 btn'" @click="changeBtn">视频监控</Button>
        <Button :class="isDefault === false ? 'btn1 btn' : 'btn2 btn'" @click="changeBtn">视频图片</Button>
      </Row>
      <div class="content" style="min-height: 600px;">
        <div style="padding: 30px;" v-show="!isDefault">
          <Row>
            <Select v-model="param.cameraId" style="width:150px;margin-right:20px;float: left;margin-bottom: 30px" placeholder="摄像头" clearable :transfer='true' @on-change="changeVideoImage">
              <Option v-for="(item,index) in list" :key="index"  :value="item.id">{{item.name}}</Option>
            </Select>
            <DatePicker :transfer='true' format="yyyy-MM-dd" type="daterange" placement="bottom-start" placeholder="时间" @on-change="timeChangeImage" style="width: 300px;float: left" :tranfer="true"></DatePicker>

          </Row>
          <div class="contents">
            <div class="empty" v-if="isEmpty">暂无数据</div>
            <div class="imageItem" v-if="!isEmpty" v-for="(item, index) in imageList" :key="index" :style="{'visibility': item.url === -1 ? 'hidden': 'visible'}">
              <a :href="item.imageUrl" target="_blank">
                <img :src="item.imageUrl" alt="" style="width: 370px;height: 220px;">
              </a>
              <div class="tip">
                <Row class="tipInfo">
                  <div style="float:left;margin-top: 5px">{{item.createTime}}</div>
                </Row>
              </div>
            </div>
          </div>
          <div style="padding-top: 30px;text-align: left" v-if="!isEmpty">
            <Page :total="total" :page-size="rows" @on-page-size-change="doPageSizeChange" @on-change="change" show-sizer show-total :page-size-opts="size"
                  ref="tablePage" show-elevator :transfer="true"></Page>
          </div>

        </div>
        <div v-show="isDefault" style="">
          <Select v-model="paramnter.cameraId" style="width:150px;margin-right:20px;float: left;margin-bottom: 30px" placeholder="摄像头" :transfer='true' @on-change="changeVideo">
            <Option v-for="(item,index) in list" :key="index"  :value="item.id">{{item.name}}</Option>
          </Select>
          <DatePicker :transfer='true' type="datetimerange" placement="bottom-start" placeholder="时间" @on-change="timeChange" style="width: 300px;float: left" :tranfer="true"></DatePicker>
          <div style="padding: 0px;">
            <div id="play_first" style=""></div>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
  import { getCamerasList, getCamerasNowUrl, getCamerasOldUrl, getImagesList } from '../../api/api'
  export default {
    data () {
      return {
        isEmpty: true,
        param: {
          pageNum: 1,
          pageSize: 8,
          cameraId: '',
          startTime: '',
          endTime: '',
          gasStationId: ''
        },
        size: [8, 16, 32, 40, 48],
        total: 0,
        page: 1,
        rows: 8,
        userList: [],
        imageList: [],
        list: [],
        paramnter: {
          cameraId: '',
          startTime: '',
          endTime: ''
        },
        isDefault: true,
        player_first: ''
      }
    },
    mounted () {
      let th = this
      th.$nextTick(() => {
        let para = {
          gasStationId: JSON.parse(sessionStorage.getItem('station')).stationId
        }
        getCamerasList(para).then((res) => {
          if (res.data.code === 1000) {
            th.list = res.data.content
            if (th.list.length > 0) {
              th.paramnter.cameraId = th.list[0].id
              let p = {
                cameraId: th.list[0].id
              }
              getCamerasNowUrl(p).then((resp) => {
                if (resp.data.code === 1000) {
                  th.player_first = new EZUIKit.EZUIPlayer({
                    id: 'play_first',
                    autoplay: true,
                    url: resp.data.content.address,
                    accessToken: resp.data.content.accessToken,
                    decoderPath: '../../../static/ezopen/',
                    width: 800,
                    height: 400,
                    // splitBasis: 2
                  })
                }
              })
            }
          }
        })
      })
    },
    destroyed: function () {
      if (this.player_first !== '') {
        this.player_first.stop()
      }
    },
    methods: {
      changeVideoImage (change) {
        if (change !== undefined) {
          this.param.cameraId = change
        } else {
          this.param.cameraId = ''
        }
        this.getImage(this.param)
      },
      timeChangeImage (change) {
        if (change[0] !== '' && change[1] !== '') {
          this.param.startTime = change[0]
          this.param.endTime = change[1]
        } else {
          this.param.startTime = ''
          this.param.endTime = ''
        }
        this.getImage(this.param)
      },
      changeVideo (change) {
        if (change !== undefined) {
          this.paramnter.cameraId = change
        } else {
          this.paramnter.cameraId = ''
        }
        if (this.player_first !== '') {
          this.player_first.stop()
        }
        getCamerasOldUrl(this.paramnter).then((resp) => {
          if (resp.data.code === 1000) {
            this.player_first = new EZUIKit.EZUIPlayer({
              id: 'play_first',
              autoplay: true,
              url: resp.data.content.address,
              accessToken: resp.data.content.accessToken,
              decoderPath: '../../../static/ezopen/',
              width: 800,
              height: 400,
            })
          }
        })
      },
      timeChange (change) {
        if (change[0] !== '' && change[1] !== '') {
          this.paramnter.startTime = change[0]
          this.paramnter.endTime = change[1]
        } else {
          this.paramnter.startTime = ''
          this.paramnter.endTime = ''
        }
        if (this.player_first !== '') {
          this.player_first.stop()
        }
        getCamerasOldUrl(this.paramnter).then((resp) => {
          if (resp.data.code === 1000) {
            this.player_first = new EZUIKit.EZUIPlayer({
              id: 'play_first',
              autoplay: true,
              url: resp.data.content.address,
              accessToken: resp.data.content.accessToken,
              decoderPath: '../../../static/ezopen/',
              width: 800,
              height: 400,
            })
          }
        })
      },
      // 点击分页页码
      change (page) {
        this.page = page
        this.param.pageNum = this.page
        this.getImage(this.param)
      },
      // 改变当前显示的行数
      doPageSizeChange: function (size) {
        this.rows = size
        this.param.pageSize = this.rows
        this.getImage(this.param)
      },
      // 视频图片
      getImage (par) {
        let vm = this
        getImagesList(par).then((res) => {
          if (res.data.code === 1000) {
            vm.imageList = res.data.content.list
            vm.total = res.data.content.total
            let num = vm.imageList.length % 4
            if (num !== 0) {
              for (let i = 0; i < (4 - num); i++) {
                vm.imageList.push({url: -1})
              }
            }
            if (vm.total === 0) {
              vm.isEmpty = true
            } else {
              vm.isEmpty = false
            }
          } else {
            vm.imageList = []
            vm.total = 0
            vm.isEmpty = true
          }
        })
      },
      changeBtn () {
        this.isDefault = !this.isDefault
        if (this.isDefault === false) {
          this.param.gasStationId = JSON.parse(sessionStorage.getItem('station')).stationId
          this.page = 1
          this.param.pageNum = 1
          this.getImage(this.param)
        }
      },
    }
  }
</script>

<style lang="less"  scoped>
  @import '../../assets/styles/variable/variable.less';
  .btn{
    background: #F0F0F0 !important;
    border-radius:18px 18px 0px 0px !important;
    padding: 5px 20px !important;
    font-size: 16px !important;
    border: 1px solid #C0C0C0;
    border-bottom: none;
  }
  .btn:last-child{
    border-left: none;
  }
  .btn2{
    background: #eee !important;
  }
  .btn1{
    background:#fff !important;
    color: #1A9CF4 !important;
  }
  .contents{
    margin-top: 30px;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
  }
  .imageItem{
    width: 370px;
    height: 220px;
    position: relative;
    margin-bottom: 30px;
  }
  .tip{
    position: absolute;
    bottom: 0px;
    width: 100%;
    height: 40px;
    background: @main-image-mask;
    transition: height .5s;
    font-size: 16px;
    color: #fff;
    opacity: 0.9;
  }
  .imageItem:hover .tip{
    height: 0px;
    color: transparent;
  }
  .tipInfo{
    padding: 5px 30px 0;
  }
  .empty{
    position: absolute;
    top:0;
    bottom:0;
    left: 0;
    right: 0;
    margin-top: auto;
    margin-bottom: auto;
    height: 30px;
    font-size:22px;
    text-align: center;
    /*width: 80%;*/
  }

</style>

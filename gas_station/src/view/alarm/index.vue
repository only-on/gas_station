<template>
  <div>
    <Row type="flex" justify="start" style="padding: 30px 0 0 20px">
      <Button :class="isDefault === true ? 'btn1 btn' : 'btn2 btn'" @click="changeBtn">当前告警</Button>
      <Button :class="isDefault === false ? 'btn1 btn' : 'btn2 btn'" @click="changeBtn">历史告警</Button>
    </Row>
    <div class="body" style="margin-top: 0 !important;">
      <div class="content">
        <div class="searchBox">
          <DatePicker :transfer='true' @on-change="timeChange" placement="bottom-start" format="yyyy-MM-dd" type="daterange" placeholder="告警日期" style="width: 200px" :tranfer="true"></DatePicker>
          <Select :transfer='true' v-model="paramnter.type" style="width:150px;margin-left:20px" clearable placeholder="告警类型" @on-change="changeType">
            <Option v-for="(item,index) in typeList" :key="index"  :value="item.id">{{item.name}}</Option>
          </Select>
          <Select v-model="paramnter.level" style="width:150px;margin-left:20px" @on-change="changeType" placeholder="告警级别" clearable>
            <Option value="0" key="0">预警</Option>
            <Option value="1" key="1">报警</Option>
          </Select>
        </div>
        <div class="body-content">
          <Table stripe  :columns="columns" :data="dataTable" ></Table>
          <div class="pages-block">
            <div class="pages-right">
              <Page :total="total" :page-size="rows" @on-page-size-change="doPageSizeChange" @on-change="change" show-sizer show-total :page-size-opts="size"
                    ref="tablePage" show-elevator :tranfer="true"></Page>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import { alarmList, alarmPullList } from '../../api/api'
  export default {
    data () {
      return {
        isDefault: true,
        name: '0',
        typeList: [],
        columns: [
          {
            title: '序号',
            width: 100,
            align: 'center',
            render: (h, params) => {
              let type
              if (this.paramnter.pageNum > 1) {
                type = (this.page - 1) * this.rows + params.index + 1
              } else {
                type = params.index + 1
              }
              return h('div', type)
            }
          },
          {
            title: '告警名称',
            key: 'name',
            align: 'center'
          },
          {
            title: '告警类型',
            key: 'type',
            align: 'center',
            render: (h, params) => {
              let type = ''
              for (let i = 0; i < this.typeList.length; i++) {
                if (params.row.type === this.typeList[i].id) {
                  type = this.typeList[i].name
                }
              }
              return h('div', type)
            }
          },
          {
            title: '告警级别',
            key: 'level',
            align: 'center',
            render: (h, params) => {
              if (params.row.level === 0) {
                return h ('div', '预警')
              } else {
                return h('div',{
                  domProps:
                    {innerHTML: `<span style="color:red">报警</span>`}
                })
              }
            }
          },
          {
            title: '告警位置',
            key: 'locationName',
            align: 'center'
          },
          {
            title: '告警时间',
            key: 'createTime',
            align: 'center'
          },
          {
            title: '告警原因',
            key: 'description',
            align: 'center'
          }
        ],
        dataTable: [],
        size: [10, 50, 100, 200],
        total: 0,
        rows: 10,
        page: 1,
        paramnter: {
          gasStationId: '',
          pageNum: 1,
          pageSize: 10,
          startTime: '',
          endTime: '',
          alarmType: '0',
          type: ''
        }
      }
    },
    methods: {
      changeBtn () {
        this.isDefault = !this.isDefault
        if (this.isDefault === true) {
          this.paramnter.alarmType = '0'
        } else {
          this.paramnter.alarmType = '1'
        }
        this.page = 1
        this.paramnter.pageNum = 1
        this.getTableDatas(this.paramnter)
      },
      // 日期格式转换-------------------
      formatDate (date) {
        var y = date.getFullYear()
        var m = date.getMonth() + 1
        m = m < 10 ? '0' + m : m
        var d = date.getDate()
        d = d < 10 ? ('0' + d) : d
        var newDate = y + '-' + m + '-' + d
        return newDate
      },
      timeChange (change) {
        if (change[0] !== '' && change[1] !== undefined) {
          this.paramnter.startTime = this.formatDate(new Date(change[0]))
          this.paramnter.endTime = this.formatDate(new Date(change[1]))
        } else {
          this.paramnter.startTime = ''
          this.paramnter.endTime = ''
        }
        this.page = 1
        this.paramnter.pageNum = 1
        this.getTableDatas(this.paramnter)
      },
      changeType () {
        this.page = 1
        this.paramnter.pageNum = 1
        this.getTableDatas(this.paramnter)
      },
      // 告警类型下拉
      getTypeList () {
        alarmPullList().then((res) => {
          if (res.data.code === 1000) {
            this.typeList = res.data.content
          } else {
            this.typeList = []
          }
        })
      },
      // 点击分页页码
      change (page) {
        this.page = page
        this.paramnter.pageNum = this.page
        this.getTableDatas(this.paramnter)
      },
      // 改变当前显示的行数
      doPageSizeChange: function (size) {
        this.rows = size
        this.paramnter.pageSize = this.rows
        this.getTableDatas(this.paramnter)
      },
      getTableDatas (params) {
        alarmList(params).then((res) => {
          if (res.data.code === 1000) {
            this.dataTable = res.data.content.list
            this.total = res.data.content.total
            this.rows = res.data.content.pageSize
            this.page = res.data.content.pageNum
            if (this.$refs.tablePage !== undefined) {
              this.$refs.tablePage.currentPage = this.page
            }
          } else {
            this.dataTable = []
          }
        })
      }
    },
    created: function () {
      if (sessionStorage.getItem('station') !== null) {
        this.paramnter.gasStationId = JSON.parse(sessionStorage.getItem('station')).stationId
        this.getTableDatas(this.paramnter)
        this.getTypeList()
      }
    }
  }
</script>

<style lang="less" scoped>
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
</style>

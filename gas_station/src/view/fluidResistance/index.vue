<template>
  <div class="body">
    <div class="content">
      <div class="searchBox">
        <Select v-model="paramnter.tankerId" style="width:150px;margin-right:20px;" clearable placeholder="加油机" :transfer='true' @on-change="changeNozzle">
          <Option v-for="(item,index) in tankerList" :key="index"  :value="item.id">{{item.name}}#加油机</Option>
        </Select>
        <DatePicker :transfer='true' format="yyyy-MM-dd" type="daterange" placement="bottom-start" placeholder="时间" @on-change="timeChange" style="width: 200px" :tranfer="true"></DatePicker>
        <Button @click="export2Excel" style="float: right" class="btn-system">生成报表</Button>
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
</template>

<script>
  import { getLiquidResistance, tankerPullList } from '../../api/api'
  export default {
    data () {
      return {
        tankerList: [],
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
            title: '加油机编号',
            key: 'oilTankNumber',
            align: 'center',
            render: (h, params) => {
              let type = ''
              if (params.row.oilTankNumber !== null) {
                type = params.row.oilTankNumber + '#'
              }
              return h('div', type)
            }
          },
          {
            title: '压力(kpa)',
            key: 'value',
            align: 'center'
          },
          {
            title: '时间',
            key: 'time',
            align: 'center'
          }
        ],
        dataTable: [],
        size: [10, 50, 100, 200],
        total: 0,
        rows: 10,
        page: 1,
        paramnter: {
          pageNum:1,
          pageSize: 10,
          startTime: '',
          endTime: '',
          tankerId: ''
        }
      }
    },
    methods: {
      export2Excel () {
        for (let i = 0;i < this.dataTable.length; i++) {
          this.dataTable[i].index = i + 1
          if (this.dataTable[i].oilTankNumber !== null) {
            this.dataTable[i].oilTank = this.dataTable[i].oilTankNumber + '#'
          }
        }
        require.ensure([], () => {
          const { export_json_to_excel } = require('@/vendor/Export2Excel')
          const tHeader = ['序号', '加油机编号','压力（kpa）', '时间']
          const filterVal = ['index','oilTank','value', 'time']
          const list = this.dataTable
          const data = this.formatJson(filterVal, list)
          let date = '液阻压力数据' + this.formatDate(new Date())
          export_json_to_excel(tHeader, data, date)
        })
      },
      formatJson (filterVal, jsonData) {
        return jsonData.map(v => filterVal.map(j => v[j]))
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
      changeNozzle () {
        this.page = 1
        this.paramnter.pageNum = 1
        this.getTableDatas(this.paramnter)
      },
      getTankerList (id) {
        let par = {
          gasStationId: id
        }
        tankerPullList(par).then((res) => {
          if (res.data.code === 1000) {
            this.tankerList = res.data.content
            // if (this.tankerList.length > 0) {
            //   this.paramnter.tankerId = this.tankerList[0].id
            //   this.getTableDatas(this.paramnter)
            // }
          } else {
            this.tankerList = []
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
      getTableDatas (param) {
        getLiquidResistance(param).then((res) => {
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
        this.paramnter.stationId = JSON.parse(sessionStorage.getItem('station')).stationId
        this.getTankerList(this.paramnter.stationId)
        this.getTableDatas(this.paramnter)
      }
    }
  }
</script>

<style lang="less" scoped>
  @import '../../assets/styles/variable/variable.less';
</style>

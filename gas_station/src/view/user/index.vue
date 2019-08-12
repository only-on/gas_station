<template>
  <div class="body">
    <div class="content">
      <div class="searchBox">
          <span class="searchBox-title">
            关键字
          </span>
        <Input placeholder="真实姓名/手机号码" style="margin-right: 20px" class="searchInput" v-model="paramnter.keyword" @on-change="keywordChange" icon="ios-close-circle" @on-click="backKeyword"></Input>
        <Button @click="add" style="float: right" class="btn-system">新增用户</Button>
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
  import { getUserList, deleteUser } from '../../api/api'
  export default {
    data () {
      return {
        stationList: [],
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
          // {
          //   title: '昵称',
          //   key: 'petName',
          //   align: 'left'
          // },
          {
            title: '真实姓名',
            key: 'name',
            align: 'left'
          },
          {
            title: '性别',
            key: 'sex',
            align: 'left',
            render: (h, params) => {
              let type = params.row.sex === '0' || params.row.sex === 0 ? '女' : '男'
              return h('div', type)
            }
          },
          {
            title: '年龄/岁',
            key: 'age',
            align: 'center'
          },
          {
            title: '手机号码',
            key: 'phone',
            align: 'center'
          },
          // {
          //   title: '地址',
          //   key: 'address',
          //   align: 'left',
          //   render: (h, params) => {
          //     let type = params.row.regionName === undefined ? '' : params.row.regionName
          //     let type1 = params.row.address === undefined ? '' : params.row.address
          //     return h('div', type + type1)
          //   }
          // },
          {
            title: '注册时间',
            key: 'createTime',
            width: 160,
            align: 'center'
          },
          {
            title: '操作',
            align: 'center',
            width: 160,
            render: (h, params) => {
              return h('div', [
                h('Button', {
                  props: {
                    type: 'text',
                    shape: 'circle',
                    icon: 'ios-paper-outline'
                  },
                  style: {
                    color: '#1A9CF4',
                    fontSize: '24px'
                  },
                  on: {
                    click: () => {
                      this.$router.push({name: 'user/details', params: {params: this.paramnter, form: params.row}})
                    }
                  }
                }),
                h('Button', {
                  props: {
                    type: 'text',
                    shape: 'circle',
                    icon: 'ios-create-outline'
                  },
                  style: {
                    color: '#1A9CF4',
                    fontSize: '24px'
                  },
                  on: {
                    click: () => {
                      this.$router.push({name: 'user/edit', params: {params: this.paramnter, form: params.row}})
                    }
                  }
                }),
                h('Button', {
                  props: {
                    type: 'text',
                    shape: 'circle',
                    icon: 'ios-trash-outline'
                  },
                  style: {
                    color: '#1A9CF4',
                    fontSize: '24px'
                  },
                  on: {
                    click: () => {
                      this.delete(params.row)
                    }
                  }
                })
              ])
            }
          }
        ],
        dataTable: [
          {
            id: 2
          },
          {
            id: 3
          }
        ],
        size: [10, 50, 100, 200],
        total: 0,
        rows: 10,
        page: 1,
        paramnter: {
          gasStationId: '',
          keyword: '',
          pageNum: 1,
          pageSize: 10
        }
      }
    },
    methods: {
      delete (row) {
        var th = this
        th.$Modal.confirm({
          title: `<div style="font-size: 18px">删除用户信息</div>`,
          content: `<div style="font-size: 20px; margin-top: 50px;margin-bottom: 50px;text-align: center">确定删除` + row.name + `的信息？</div>`,
          onOk: function () {
            let par = {
              id: row.id,
              gasStationId: JSON.parse(sessionStorage.getItem('station')).stationId
            }
            deleteUser(par).then((res) => {
              if (res.data.code === 1000) {
                if (th.paramnter.pageNum > 1 && th.dataTable.length === 1) {
                  th.paramnter.pageNum = th.paramnter.pageNum - 1
                }
                th.$Message.success('用户删除成功！')
                th.getTableDatas(th.paramnter)
              } else {
                th.$Message.error(res.data.message)
              }
            })
          },
          onCancel: function () {
            th.$Message.info('取消删除操作！')
          }
        })
      },
      add () {
        this.$router.push({name: 'user/creat'})
      },
      keywordChange () {
        this.paramnter.keyword = this.paramnter.keyword.trim()
        this.page = 1
        this.paramnter.pageNum = 1
        this.getTableDatas(this.paramnter)
      },
      backKeyword () {
        this.paramnter.keyword = ''
        this.page = 1
        this.paramnter.pageNum = 1
        this.getTableDatas(this.paramnter)
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
        getUserList(param).then((res) => {
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
    },
    mounted () {
      this.$nextTick(function () {
        this.paramnter.gasStationId = JSON.parse(sessionStorage.getItem('station')).stationId
        if (this.$route.params.params !== undefined) {
          this.paramnter = this.$route.params.params
        }
        this.getTableDatas(this.paramnter)
      })
    }
  }
</script>

<style lang="less" scoped>
  @import '../../assets/styles/variable/variable.less';
</style>

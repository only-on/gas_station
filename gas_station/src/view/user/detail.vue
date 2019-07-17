<template>
  <div class="body">
    <div class="content">
      <Button class="btn-system" @click="back" style="float: right;">返回</Button>
      <div class="layout-content-form">
        <Form :model="formDates" :label-width="150" ref="formDates">
          <Row type="flex">
            <FormItem label="用户昵称" >{{formDates.petName}}
            </FormItem>
          </Row>
          <Row type="flex">
            <FormItem label="真实姓名" >{{formDates.name}}
            </FormItem>
          </Row>
          <Row type="flex">
            <FormItem label="手机号码" >{{formDates.phone}}
            </FormItem>
          </Row>
          <Row type="flex" >
            <FormItem label="用户性别" >{{formDates.sex === '0' ? '女' : '男'}}
            </FormItem>
          </Row>
          <Row type="flex" >
            <FormItem label="用户年龄" >{{formDates.age}} 岁
            </FormItem>
          </Row>
          <Row type="flex">
            <FormItem label="用户区域" >{{formDates.regionName}}
            </FormItem>
          </Row>
          <Row type="flex">
            <FormItem label="详细地址" >{{formDates.address}}
            </FormItem>
          </Row>
          <Row type="flex" v-if="formDates.gasStationName !== undefined">
            <FormItem label="所属加油站" >{{formDates.gasStationName}}
            </FormItem>
          </Row>
          <Row type="flex" v-if="formDates.role !== undefined && formDates.role !== 'undefined'">
            <FormItem label="用户角色" >{{formDates.role === '0' ? '站长' : formDates.role === '1' ? '员工' : '-'}}
            </FormItem>
          </Row>
          <Row type="flex" justify="center">
            <Col span="24" >
            <FormItem>
              <Button  @click="back" class="btn-system" >返回</Button>
            </FormItem>
            </Col>
          </Row>
        </Form>
      </div>
    </div>
  </div>
</template>
<script>
  import { userDetail } from '../../api/api'
  export default {
    components: {
    },
    data () {
      return {
        regionIds: [],
        addressNotice: false,
        passNotice: false,
        mobilePhoneNotice: false,
        formDates: {
          name: '',
          sex: '0',
          password: '123456',
          age: null,
          phone: '',
          regionId: '',
          address: ''
        }
      }
    },
    methods: {
      back () {
        this.$router.push({name: 'user_index', params: {params: this.$route.params.params}})
      }
    },
    created: function () {
    },
    mounted () {
      this.$nextTick(function () {
        if (this.$route.params.form !== undefined) {
          let par = {
            id: this.$route.params.form.id
          }
          userDetail(par).then((res) => {
            if (res.data.code === 1000) {
              let dates = res.data.content
              this.formDates = {
                id: dates.id,
                name: dates.name,
                petName: dates.petName,
                sex: dates.sex + '',
                password: '',
                age: dates.age + 0,
                phone: dates.phone,
                regionId: dates.regionId,
                address: dates.address,
                regionName: dates.regionName,
                gasStationName: dates.gasStationName,
                role: dates.role + ''
              }
              let stationId = dates.regionId + ''
              this.regionIds = [parseInt(stationId.substr(0,2)), parseInt(stationId.substr(0,4)), parseInt(stationId.substr(0,6)),parseInt(stationId)]
            }
          })
        }
      })
    }
  }
</script>
<style scoped>
</style>

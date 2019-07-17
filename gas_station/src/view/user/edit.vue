<template>
  <div class="body">
    <div class="content">
      <Button class="btn-system" @click="back" style="float: right;">返回</Button>
      <div class="layout-content-form">
        <Form :model="formDates" :label-width="150" ref="formDates">
          <Row type="flex">
            <FormItem label="用户昵称" class="selfValidate">
              <Input  v-model="formDates.petName" style="width: 300px;float: left" placeholder="用户昵称" ></Input><br>
            </FormItem>
          </Row>
          <Row type="flex">
            <FormItem label="真实姓名" class="selfValidate">
              <Input  v-model="formDates.name" style="width: 300px;float: left" placeholder="真实姓名" ></Input><br>
            </FormItem>
          </Row>
          <Row type="flex">
            <FormItem label="手机号码" class="selfValidate">
              <Input  v-model="formDates.phone"   placeholder="手机号码" style="width: 300px; float: left" @on-change="mobilePhoneVal(formDates.phone)"></Input>
              <span class="notice" v-if="mobilePhoneNotice">请输入合法的手机号码</span><br>
            </FormItem>
          </Row>
          <Row type="flex">
            <FormItem label="重置密码" class="selfValidate" style="margin-bottom: 0px">
              <Input v-model="formDates.password" type="password" style="width: 300px;float: left" @on-change="checkPassword(formDates.password)"></Input>
              <span class="notice" v-if="passNotice">请输入6~11位的数字</span><br>
            </FormItem>
          </Row>
          <Row type="flex" >
            <FormItem style="margin-top: 0px;margin-bottom: 0px">
              <div class="noticeTextGray">用户密码默认是123456</div>
            </FormItem>
          </Row>
          <Row type="flex" >
            <FormItem label="用户性别" class="selfValidate">
              <RadioGroup v-model="formDates.sex">
                <Radio label="1" >男</Radio>
                <Radio label="0" >女 </Radio>
              </RadioGroup>
            </FormItem>
          </Row>
          <Row type="flex" >
            <FormItem label="用户年龄" class="selfValidate">
              <InputNumber  v-model="formDates.age"  style="width: 280px; float: left;margin-right: 5px" :formatter="value => `${value}`.replace('.', '')"
                            :parser="value => value.replace('-', '')" :min="1" :max="99"></InputNumber>岁
            </FormItem>
          </Row>
          <Row type="flex">
            <FormItem label="用户区域">
              <region @region="regionChange" style="float:left;" :regionIds="regionIds"></region>
              <span class="notice" v-if="addressNotice">请选择具体区县</span>
            </FormItem>
          </Row>
          <Row type="flex">
            <FormItem label="详细地址">
              <Input  v-model="formDates.address" style="width: 450px;float: left" placeholder="村 街道" ></Input><br>
            </FormItem>
          </Row>
          <Row type="flex" justify="center">
            <Col span="24" >
            <FormItem>
              <Button  @click="submit" class="btn-system" >提交</Button>
            </FormItem>
            </Col>
          </Row>
        </Form>
      </div>
    </div>
  </div>
</template>
<script>
  import { userDetail, updateUser } from '../../api/api'
  import region from '../../components/region'
  export default {
    components: {
      region
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
      regionChange (data) {
        if (data.length > 0) {
          this.addressNotice = false
          this.formDates.regionId = data[data.length - 1].value
          // if (data.length < 4) {
          //   this.addressNotice = true
          //   this.formDates.regionId = ''
          // } else {
          //   this.addressNotice = false
          //   this.formDates.regionId = data[3].value
          // }
        } else {
          this.formDates.regionId = ''
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
        this.formDates.phone = string.trim()
        var validataPrice = /(^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[89])\d{8}$)/
        if (!validataPrice.test(string.trim())) {
          this.mobilePhoneNotice = true
        } else {
          this.mobilePhoneNotice = false
        }
      },
      submitVal (formDates) {
        if (formDates.petName.trim().length === 0) {
          this.$Message.error('昵称不能为空！')
          return false
        } else if (formDates.name.trim().length === 0) {
          this.$Message.error('真实姓名不能为空！')
          return false
        } else if (formDates.name.trim().length > 255) {
          this.$Message.error('真实姓名不能超过255字！')
          return false
        } else if (formDates.phone === '') {
          this.$Message.error('手机号码不能为空！')
          return false
        } else if (this.mobilePhoneNotice === true) {
          this.$Message.error('请输入合法的手机号码！')
          return false
        } else if (this.passNotice === true) {
          this.$Message.error('密码请输入6~11位的数字！')
          return false
        } else if (formDates.age === null) {
          this.$Message.error('用户年龄不能为空！')
          return false
        } else if (formDates.age < 10) {
          this.$Message.error('用户年龄不能小于10岁！')
          return false
          // } else if (formDates.regionId === '') {
          //   this.$Message.error('用户区域不能为空！')
          //   return false
          // } else if (formDates.address === '') {
          //   this.$Message.error('详细地址不能为空！')
          //   return false
        } else {
          return true
        }
      },
      //  编辑
      submit () {
        if (this.submitVal(this.formDates)) {
          updateUser(this.formDates).then((res) => {
            if (res.data.code === 1000) {
              this.$Message.success('编辑用户成功！')
              this.$router.push({name: 'user_index', params: {params: this.$route.params.params}})
            } else {
              this.$Message.error(res.data.message)
            }
          })
        }
      },
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
                gasStationId: JSON.parse(sessionStorage.getItem('station')).stationId,
                id: dates.id,
                name: dates.name,
                petName: dates.petName,
                sex: dates.sex + '',
                password: '',
                age: dates.age + 0,
                phone: dates.phone,
                regionId: dates.regionId,
                address: dates.address
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

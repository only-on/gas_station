import axios from './index'
import Qs from 'qs'
let base = '/olmgs/web'
let managerBase = '/olmgs/sys'
// 关闭或开启阀门
export const nozzleClose = params => { return axios.post(`${base}/nozzle/close`, Qs.stringify(params)) }
// 关闭或开启阀门
// export const nozzleClose = params => { return axios.post(`${managerBase}/nozzle/close`, Qs.stringify(params)) }
// 区域选择
export const getRegion = params => { return axios.get(`${base}/region/get_all_region`, {params: params}) }
// 登录
export const userLogin = params => { return axios.post(`${base}/user/login`, Qs.stringify(params)) }
// 手机验证码
export const sendPhoneCodes = params => { return axios.post(`${base}/user/get_verification_code`, Qs.stringify(params)) }
// 重置密码
export const resetPassword = params => { return axios.post(`${base}/user/retrieve_password`, Qs.stringify(params)) }
// 退出登录
export const Logout = params => { return axios.post(`${base}/user/logout`, Qs.stringify(params)) }
// 用户加油站
export const userStations = params => { return axios.post(`${base}/user/get_gas_station`, Qs.stringify(params)) }
// 监控页面 今日数据
export const todayData = params => { return axios.post(`${base}/monitor/today/data`, Qs.stringify(params)) }
// 监控页面 油罐信息
export const oliTankMonitor = params => { return axios.post(`${base}/monitor/list/oil/tank`, Qs.stringify(params)) }
// 监控页面 告警信息
export const monitorAlarm = params => { return axios.post(`${base}/monitor/alarm`, Qs.stringify(params)) }
// 监控页面 基本信息
export const monitorBasic = params => { return axios.post(`${base}/monitor/item`, Qs.stringify(params)) }
// 监控页面 油枪信息
export const monitorNozzle = params => { return axios.post(`${base}/monitor/nozzle`, Qs.stringify(params)) }
// 监控页面 油罐压力、气液比阈值
export const monitorThresold = params => { return axios.post(`${base}/monitor/threshold/value`, Qs.stringify(params)) }
// 监控页面 油罐检测
export const monitorTank = params => { return axios.post(`${base}/monitor/tank`, Qs.stringify(params)) }
// 监控页面 退出登录
export const userLogOut = params => { return axios.post(`${base}/user/logout`, Qs.stringify(params)) }
// 监控页面 管线
export const pipeLine = params => { return axios.post(`${base}/monitor/pipeline`, Qs.stringify(params)) }
// 监控页面 人井
export const peopleWell = params => { return axios.post(`${base}/monitor/people_well`, Qs.stringify(params)) }
// 监控页面 油盆
export const oliBasin = params => { return axios.post(`${base}/monitor/oil_basin`, Qs.stringify(params)) }
// 数据中心 油枪信息
export const getNozzle = params => { return axios.post(`${base}/nozzle/item`, Qs.stringify(params)) }
// 数据中心 油枪详情信息
export const getNozzleDetails = params => { return axios.post(`${base}/nozzle/detail`, Qs.stringify(params)) }
// 数据中心 告警列表
export const alarmList = params => { return axios.post(`${base}/alarm/list`, Qs.stringify(params)) }
// 数据中心 油枪下拉列表
export const nozzlePullList = params => { return axios.post(`${base}/nozzle/pull/list`, Qs.stringify(params)) }
// 数据中心 油枪数据查询
export const nozzleQuery = params => { return axios.post(`${base}/nozzle/query`, Qs.stringify(params)) }
// 数据中心 压力数据查询
export const tankDataQuery = params => { return axios.post(`${base}/oil/tank/pressure_data_statistics`, Qs.stringify(params)) }
// 数据中心 油灌信息
export const getTank = params => { return axios.post(`${base}/oil/tank/list`, Qs.stringify(params)) }
// 数据中心 用户列表
export const getUserList = params => { return axios.post(`${base}/user/list`, Qs.stringify(params)) }
// 数据中心 用户新增
export const addUser = params => { return axios.post(`${base}/user/add`, Qs.stringify(params)) }
// 数据中心 用户编辑
export const updateUser = params => { return axios.post(`${base}/user/update`, Qs.stringify(params)) }
// 数据中心 用户删除
export const deleteUser = params => { return axios.post(`${base}/user/delete`, Qs.stringify(params)) }
// 数据中心 油气浓度、温度
export const gasConcentration = params => { return axios.post(`${base}/oil/tank/environmental_information`, Qs.stringify(params)) }
// 数据中心 用户详情
export const userDetail = params => { return axios.post(`${base}/user/detail`, Qs.stringify(params)) }
// 数据中心 用户详情
export const userPhoneList = params => { return axios.post(`${base}/user/phone/number/list`, Qs.stringify(params)) }
// 数据中心 气液比统计
export const nozzleStatistics = params => { return axios.post(`${base}/nozzle/statistics/al`, Qs.stringify(params)) }
// 数据中心 加油次数统计
export const nozzleRefuel = params => { return axios.post(`${base}/nozzle/statistics/refuel`, Qs.stringify(params)) }
// 数据中心 油品占比统计
export const oliStatistics = params => { return axios.post(`${base}/nozzle/statistics/oil`, Qs.stringify(params)) }
// 数据中心 油罐压力数据统计分析
export const tankAnalyse = params => { return axios.post(`${base}/oil/tank/data_statistics`, Qs.stringify(params)) }
// 数据中心 测漏压力数据统计分析
export const tankLeakageAnalyse = params => { return axios.post(`${base}/oil/tank/sideways_pressure_data_analysis`, Qs.stringify(params)) }
// 数据中心 油气浓度数据统计分析
export const gasOilAnalyse = params => { return axios.post(`${base}/oil/tank/gas_concentration_data_analysis`, Qs.stringify(params)) }
// 数据中心 油罐温度数据统计分析
export const temperatureAnalyse = params => { return axios.post(`${base}/oil/tank/tank_temperature_data_analysis`, Qs.stringify(params)) }
// 数据中心 告警次数统计
export const alarmStatistics = params => { return axios.post(`${base}/alarm/statistics/count`, Qs.stringify(params)) }
// 数据中心 告警数据占比
export const alarmStatisticsType = params => { return axios.post(`${base}/alarm/statistics/type`, Qs.stringify(params)) }
// 数据中心 告警次数分类统计
export const alarmStatisticsCountType = params => { return axios.post(`${base}/alarm/statistics/count/type`, Qs.stringify(params)) }
// 数据中心 告警类型下拉
export const alarmPullList = params => { return axios.post(`${base}/alarm/get_alarm_type`, Qs.stringify(params)) }
// 数据中心 环境信息  管道压力数据统计分析
export const pipelinePressureAnalyse = params => { return axios.post(`${base}/oil/tank/pipeline_pressure_statistics`, Qs.stringify(params)) }
// 数据中心 环境信息  环境温度数据统计分析
export const environmentTemperatureAnalyse = params => { return axios.post(`${base}/station/get_temperature_analyze`, Qs.stringify(params)) }
// 数据中心 数据查询  加油机下拉列表
export const tankerPullList = params => { return axios.post(`${base}/oil/tank/tanker_drop_down`, Qs.stringify(params)) }
// 数据中心 数据查询  液阻压力数据查询
export const getLiquidResistance = params => { return axios.post(`${base}/oil/tank/get_liquid_resistance`, Qs.stringify(params)) }
// 数据中心 摄像头列表
export const getCamerasList = params => { return axios.post(`${base}/camera/pull_list`, Qs.stringify(params)) }
// 数据中心 直播地址
export const getCamerasNowUrl = params => { return axios.post(`${base}/camera/live/address`, Qs.stringify(params)) }
// 数据中心 回放地址
export const getCamerasOldUrl = params => { return axios.post(`${base}/camera/playback/address`, Qs.stringify(params)) }
// 数据中心 历史图片
export const getImagesList = params => { return axios.post(`${base}/camera/get_camera_image`, Qs.stringify(params)) }

import api from 'axios'
const service = api.create({
  headers: {
    // 'authorization': JSON.parse(sessionStorage.getItem('authorization'))
  }
})
service.interceptors.request.use(
  config => {
    // config.headers.authorization = JSON.parse(sessionStorage.getItem('authorization'))
    if (config.url !== '/olmgs/sys/nozzle/close') {
      config.headers.authorization = JSON.parse(sessionStorage.getItem('authorization'))
      // console.log(config)
    }
    return config
  },
  error => {
    return Promise.reject(error)
  }
)
service.interceptors.response.use(
  res => {
    if (res.data.code === 2002){
      window.location.href = res.request.responseURL.substr(0,res.request.responseURL.lastIndexOf('/olmgs') + 1)
    }
    return res
  },
  res => {
    return Promise.reject(res)
  }
)
export default service

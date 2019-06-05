import api from 'axios'
const service = api.create({})
service.interceptors.request.use(
  config => {
    return config
  },
  error => {
    return Promise.reject(error)
  }
)
service.interceptors.response.use(
  res => {
    return res
  },
  res => {
    return Promise.reject(res)
  }
)
export default service

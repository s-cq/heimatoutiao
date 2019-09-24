import axios from 'axios'
import router from '../permission'
import { Message } from 'element-ui'
import jsonBig from 'json-bigint'
axios.defaults.baseURL = 'http://ttapi.research.itcast.cn/mp/v1_0'
axios.defaults.transformResponse = [function (data) {
  // return jsonBig.parse(data) // 换了一个转化方法 使得 计算更精确 保证id不失真
  return data ? jsonBig.parse(data) : {} // 换了一个转化方法 使得 计算更精确 保证id不失真
}]
axios.interceptors.request.use(function (config) {
  // 在发起请求请做一些业务处理
  let token = window.localStorage.getItem('user-token')
  config.headers.Authorization = `Bearer ${token}`
  return config
}, function (error) {
  // 对请求失败做处理
  return Promise.reject(error)
})

axios.interceptors.response.use(function (response) {
  // 对响应数据做处理

  return response.data ? response.data : {}
}, function (error) {
  // 对响应错误做处理
  let status = error.response.status // 获取失败的状态码
  let message = '未知错误'
  switch (status) {
    case 400:
      message = '请求参数错误'
      break
    case 403:
      message = '403 refresh_token未携带或已过期'
      break
    case 507:
      message = '服务器数据库异常'
      break
    case 401:
      message = 'token过期或未出'
      window.localStorage.clear() // 清空缓存
      router.push('/login') // this.$router.push()
      break
    case 404:
      message = '手机号不正确'
      break
    default:
      break
  }
  Message({ message })

  return Promise.reject(error)
})
export default axios
// export default {
//   install (Vue){
//     Vue.pototype.$axios = axios
//   }
// }

import axios from 'axios'
import qs from 'qs'
import { isQianfan } from '../utils/common'

axios.defaults.timeout = 5000 // 超时5s
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8'
axios.defaults.baseURL = process.env.API_ROOT


// 添加请求拦截器
axios.interceptors.request.use(config => {
  // 在请求头里面塞beartoken
  if (localStorage.getItem('bearerToken')&&!isQianfan()) {
    config.headers.Authorization = 'Bearer ' + localStorage.getItem('bearerToken')
  }
  return config
}, error => {
  // 请求错误时做些事
  return Promise.reject(error)
})

// 传参结构之一
const getJson = function () {
  let obj = { }
  obj.params = data
  let postData = { }
  postData.data = JSON.stringify(obj)
  return qs.stringify(postData)
}

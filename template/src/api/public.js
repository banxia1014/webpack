import axios from 'axios'
import qs from 'qs'
import { isQianfan } from '../utils/common'
import store from '../store'

axios.defaults.timeout = 10000 // 超时10s
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8'
axios.defaults.baseURL = process.env.API_ROOT


// 添加请求拦截器
axios.interceptors.request.use(config => {
  // 在请求头里面塞beartoken
  if (store.state.bearToken &&!isQianfan()) {
    config.headers.Authorization = 'Bearer ' + store.state.bearToken
  }
  return config
}, error => {
  // 请求错误时做些事
  return Promise.reject(error)
})

// 响应时拦截
axios.interceptors.response.use(function(response){
  return response
},function(error){
  if(error&&error.response) {
    switch(error.response.status) {
      case 404:
        store.commit('updateError',error.response.data.text)
        break

      case 401:
        store.commit('updateNologin', true)
        break
    }
  }
})

// 客户端传参接口
export function appParams() {
  let obj = { }
  obj.params = data
  let postData = { }
  postData.data = JSON.stringify(obj)
  return qs.stringify(postData)
}

// wap传参结构
export function wapParams() {
  let postData = { }
  postData.data = JSON.stringify(data)
  return qs.stringify(postData)
}


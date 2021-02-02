import axios from 'axios'
import qs from 'qs'
import { isQianfan } from '../utils/common'
import store from '../store'
import url from '../utils/Url'

// 创建axios实例
const service = axios.create({
	baseURL: process.env.API_ROOT,
	timeout: 10000, // 超时10s
	headers: {
		post:{
			'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
		}
	}
})

// 添加请求拦截器
service.interceptors.request.use(config => {
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
service.interceptors.response.use(function(response){
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

// wap传参结构
export function getJson(data) {
  let obj = {}
  obj.params = data
  let post_data = {}
  post_data.data = JSON.stringify(obj)
  return qs.stringify(post_data)
}

export function get(postUrl, params) {
	return service.get(url.getPath(postUrl), params)
}

export function post(postUrl, params) {
	return service.post(postUrl, getJson(params))
}



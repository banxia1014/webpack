// 微信授权
export function getOpenid(data) {
  return axios.post('/wap_api/wechat/get-openid', getJson(data), {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  })
}

// 检查是否登录
export function callBack(data){
  return axios.post('/wap_api/wechat/call-back', getJson(data), {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  })
}

import axios from 'axios'
import store from '../store'
import { getOpenid, callBack } from '../api/index'

axios.defaults.timeout = 10000
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8'
axios.defaults.baseURL = process.env.API_ROOT

// 是否是微信浏览器
const isWeiXin = function () {
  let ua = window.navigator.userAgent.toLowerCase()
  if (ua.match(/micromessenger/i) == 'micromessenger') {
    return true
  } else {
    return false
  }
}

// 是否是千帆app
const isQianfan = function () {
  let ua = window.navigator.userAgent.toLowerCase()
  if (ua.toLowerCase().search('qianfan') !== -1) {
    return true
  } else {
    return false
  }
}

// 是否是移动端
const isIphone = function () {
  if (navigator.userAgent.match(/(iPhone|iPod|Android|ios)/i)) {
    return true
  }
}

const isAndroid = function () {
  var u = navigator.userAgent
  var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Linux') > -1
  if (isAndroid) {
    return true
  } else {
    return false
  }
}

let loadedJs = []
const loadJs = async function (url) {
  return new Promise((resolve, reject) => {
    if (loadedJs.indexOf(url) > -1) {
      resolve()
      return
    }
    let script = document.createElement('script')
    script.type = 'text/javascript'
    script.src = url
    script.onload = function () {
      loadedJs.push(url)
      resolve()
    }
    script.onerror = function (err) {
      console.log(err)
      reject(err)
    }
    document.head.appendChild(script)
  })
}

// moblink 跳页面
const loadMobJs = async function (url, className, params = {}) {
  let mobKey = store.state.siteInfo.mob_key
  // console.log(url)
  // console.log(mobKey)
  await loadJs('//f.moblink.mob.com/3.0.1/moblink.js?appkey=' + mobKey)
  if (url === '') {
    MobLink([
      {
        el: '.' + className, path: '/qianfan/startapp', params: params
      }
    ])
  } else {
    MobLink([
      {
        el: '.' + className, path: '/qianfan/webview', params: {url: url}
      }
    ])
  }
}

const schemeUrlToRouter = function (direct) {
  if(isQianfan()) {
    return direct
  }
  let host = store.state.host
  let url = ''
  if (direct.indexOf('http') >= 0) {
    if (direct.indexOf('://webview/') > 0 || direct.indexOf('card/index') > 0 || direct.indexOf('assign/index') > 0 || direct.indexOf('invite/index') > 0 || direct.indexOf('game/index') > 0 || direct.indexOf('authentication/group') > 0) {
      // 改名卡 签到 邀请 游戏坛子
      url = ''
    } else {
      url = direct
    }
  } else if (direct.indexOf('://user/') > 0) {
    let appname = direct.split('://')
    if (appname.length > 0) {
      appname = appname[0]
    }
    if (typeof appname === 'string') {
      let preg = appname + '://user/?uid='
      let re = direct.split(preg)
      if (re.length > 1) {
        url = host + 'wap/thread/personal?uid=' + re[1]
      }
    }
  } else if (direct.indexOf('://myfollow/') > 0) {
    let appname = direct.split('://')
    if (appname.length > 0) {
      appname = appname[0]
    }
    if (typeof appname === 'string') {
      let preg = appname + '://myfollow/?type='
      let re = direct.split(preg)
      if (re.length > 1) {
        if (Number(re[1]) === 0) {
          // 关注
          url = host + 'wap/user/my-friends?type=1'
        } else {
          // 粉丝
          url = host + 'wap/user/my-friends?type=0'
        }
      }
    }
  } else if (direct.indexOf('://mypai') > 0) {
    url = host + 'wap/user/my-sides'
  } else if (direct.indexOf('://myforum') > 0) {
    url = host + 'wap/user/user-threads'
  } else if (direct.indexOf('://mycollection') > 0) {
    url = host + 'wap/user/my-collections'
  } else if (direct.indexOf('://thread/') > 0) {
    let appname = direct.split('://')
    if (appname.length > 0) {
      appname = appname[0]
    }
    if (typeof appname === 'string') {
      let preg = appname + '://thread/?tid='
      let re = direct.split(preg)
      if (re.length > 1) {
        url = host + 'wap/thread/view-thread/tid/' + parseInt(re[1])
      }
    }
  } else if (direct.indexOf('://threadforum/') > 0) {
    let appname = direct.split('://')
    if (appname.length > 0) {
      appname = appname[0]
    }
    if (typeof appname === 'string') {
      let preg = appname + '://threadforum/?fid='
      let re = direct.split(preg)
      if (re.length > 1) {
        url = host + 'wap/community/list?fid=' + re[1]
      }
    }
  } else if (direct.indexOf('://specialtopic/') > 0) {
    let appname = direct.split('://')
    if (appname.length > 0) {
      appname = appname[0]
    }
    if (typeof appname === 'string') {
      let preg = appname + '://specialtopic/?sid='
      let re = direct.split(preg)
      if (re.length > 1) {
        url = host + 'wap/#/subject?sid=' + re[1]
      }
    }
  } else if (direct.indexOf('://side/') > 0) {
    let appname = direct.split('://')
    if (appname.length > 0) {
      appname = appname[0]
    }
    if (typeof appname === 'string') {
      let preg = appname + '://side/?sid='
      let re = direct.split(preg)
      if (re.length > 1) {
        url = host + 'wap/side/side?id=' + re[1]
      }
    }
  } else if (direct.indexOf('://sidetag/') > 0) {
    let appname = direct.split('://')
    if (appname.length > 0) {
      appname = appname[0]
    }
    if (typeof appname === 'string') {
      let preg = appname + '://sidetag/?tid='
      let re = direct.split(preg)
      if (re.length > 1) {
        url = host + 'wap/topic/index?topic_id=' + re[1]
      }
    }
  } else if (direct.indexOf('://alltopic') > 0) {
    url = host + 'wap/side/topics-rank'
  } else if (direct.indexOf('://paihot/') > 0) {
    let appname = direct.split('type=')
    url = host + 'wap/side/hot-list?type=' + (Number(appname[1]) - 1)
  } else if (direct.indexOf('://allforum') > 0) {
    url = host + 'wap/community/index'
  } else if (direct.indexOf('://webview/') >= 0) {
    url = ''
  } else if (direct.indexOf('://specialtopic/') > 0) {
    let appname = direct.split('://specialtopic/')
    url = host + 'wap/#/subject' + appname[1]
  }
  return url
}

// 通过moblink跳转链接
const jumpLink = function (url, need, nowUrl) {
  // 判断是否登录，没有登录，跳登录的弹框
  // 登录后查看 0无需先登录 1需要先登录
  if (need === 0) {
    publicLink(url)
  } else {
    if (store.state.isGuest) {
      let ua = window.navigator.userAgent.toLowerCase()
      if (ua.match(/MicroMessenger/i) && ua.match(/MicroMessenger/i)[0] === 'micromessenger') {
        if (store.state.siteInfo.is_allow_wap) {
          wxGrant(nowUrl, 'register')
        } else {
          wxGrant(nowUrl, 'login')
        }
      } else {
        wxGrant(nowUrl, 'login')
      }
    } else {
      publicLink(url)
    }
  }
  return false
}

const publicLink = function (url) {
  let direct = schemeUrlToRouter(url)
  if (direct === '') {
      // 弹窗跳出，初始化moblink
    store.commit('updateDialog', true)
    loadMobJs(url, 'goBind')
  } else {
    window.location.href = direct
  }
}

// 跳转弹框
const wxGrant = function (url, type) {
  // console.log(store.state.siteInfo)
  // 是否开启引导下载
  if (!store.state.siteInfo.is_allow_interactive) {
    let ua = window.navigator.userAgent.toLowerCase()
    if (ua.match(/MicroMessenger/i) && ua.match(/MicroMessenger/i)[0] === 'micromessenger') {
      console.log('在微信中')
      // 在微信浏览器  先授权 再登录
      if (store.state.siteInfo.is_allow_wap) {
        if (store.state.isGuest) {
          console.log('是游客')
          // 未登录,有unioind去授权，没有就去登录
          if (localStorage.getItem('unionid') && localStorage.getItem('bearerToken')) {
            // 老用户
            console.log('老用户')
            if (type === 'register') {
              isBearerToken()
            }
            store.commit('updateGuest', false)
          } else if (localStorage.getItem('unionid')) {
            console.log('已授权')
            store.commit('updateWeixin', true)
            store.commit('updateLayers', true)
            // store.commit('updateJumpRegister', true)
            // 是否开启绑定账户
            if (store.state.siteInfo.mobile_bind) {
              store.commit('updateJumpRegister', true)
            } else {
              store.commit('updateProfile', true)
            }
          } else {
            console.log('准备授权')
            let postObj = {}
            postObj.url = url
            postObj.unionid = localStorage.getItem('unionid')

            getOpenid(postObj).then(function (res) {
              var data = res.data.data
              console.log(data)
              if (res.data.ret === 0) {
                // 授权 判断登录成功
                console.log('授权 判断登录成功')
                if (data.BearToken && data.BearToken !== '') {
                  // 登录成功
                  console.log('登录成功')
                  localStorage.setItem('bearerToken', data.BearToken)
                  if (type === 'register') {
                    isBearerToken()
                  }
                  store.commit('updateGuest', false)
                } else {
                  window.location.href = data.url
                }
              } else {
                this.showToast(true, 'text', res.data.txt, '6em')
              }
            })
          }
        }
      } else {
        store.commit('updateWeixin', false)
        store.commit('updateLayers', true)
        if (type === 'register') {
          store.commit('updateJumpRegister', true)
        } else {
          store.commit('updateJumpLogin', true)
        }
      }
    } else {
      // 不是微信浏览器 账户密码登录
      store.commit('updateWeixin', false)
      store.commit('updateLayers', true)
      if (type === 'register') {
        store.commit('updateJumpRegister', true)
      } else {
        store.commit('updateJumpLogin', true)
      }
    }
  } else {
    loadMobJs(url, 'moblink')
  }
}

// 检查是否登录
const checkLogin = function (code) {
  console.log(localStorage.getItem('updateType'))
  // let type = Number(localStorage.getItem('updateType')) // 0 登录 1 注册
  let postObj = {}
  postObj.code = code
  callBack(postObj).then(function (res) {
    console.log(res)
    var data = res.data.data
    if (res.data.ret === 0) {
      if (data.nickname !== '') {
        store.commit('updateName', data.nickname)
      }
      if (data.unionid !== '') {
        localStorage.setItem('unionid', data.unionid)
      }
      if (localStorage.getItem('unionid')) {
        if (data.BearToken && data.BearToken !== '') {
            // 微信授权 并且 登录成功了
          localStorage.setItem('bearerToken', data.BearToken)
          isBearerToken()
          store.commit('updateGuest', false)
        } else {
          store.commit('updateWeixin', true)
          store.commit('updateLayers', true)
          // store.commit('updateJumpRegister', true)
          if (store.state.siteInfo.is_allow_wap) {
            if (store.state.siteInfo.mobile_bind) {
              store.commit('updateJumpRegister', true)
            } else {
              store.commit('updateProfile', true)
            }
          }
        }
      }
    }
  })
}

//检查是否登录(针对于分类)
const checkFenleiLogin = function (code) {
  let postObj = {}
  postObj.code = code
  callBack(postObj).then(function (res) {
      var data = res.data.data
      if (res.data.ret === 0) {
          if (data.nickname !== '') {
              store.commit('updateName', data.nickname)
          }
          if (data.unionid !== '') {
              store.commit('updateUnionid', data.unionid)
              localStorage.setItem('unionid', data.unionid)
          }
          if (store.state.unionid) {
              if (data.BearToken && data.BearToken !== '') {
                  // 微信授权 并且 登录成功了
                  localStorage.setItem('bearerToken', data.BearToken)
                  store.dispatch('analysisBearToken',data.BearToken)
              } else {
                  store.commit('updateShowWxLayer', true)
                  store.commit('updateJumpRegister',true)
                  if (store.state.siteInfo.is_allow_wap) {
                      if (store.state.siteInfo.mobile_bind) {
                          store.commit('updateJumpRegister', true)
                          store.commit('updateMobile', true)
                      } else {
                          store.commit('updateProfile', true)
                      }
                  }
              }
          }
      }
  })
}

const isBearerToken = function () {
  console.log(123)
  if (localStorage.getItem('bearerToken') && localStorage.getItem('bearerToken') !== 'undefined') {
    console.log('user')
    let token = localStorage.getItem('bearerToken')
    token = token.split('.')
    let user = JSON.parse(decodeBase64Content(token[1]))
    let timestamp = new Date().getTime()
    console.log(user)
    if (user && user.exp && user.exp * 1000 > timestamp) {
      store.commit('updateGuest', false)
      let wapUser = []
      wapUser.uid = user.jti
      wapUser.username = user.username
      wapUser.avatar = user.avatar
      store.commit('updateUser', wapUser)
    }
  }
}

const decodeBase64Content = function (base64Content) {
  let commonContent = base64Content.replace(/\s/g, '+')
  commonContent = Buffer.from(commonContent, 'base64').toString()
  return commonContent
}

export { isWeiXin, isQianfan, isIphone, loadJs, loadMobJs, schemeUrlToRouter, jumpLink, wxGrant, checkLogin,checkFenleiLogin, isBearerToken, isAndroid }

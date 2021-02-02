import store from '../store'
import schemeUrl from '../model/schemeUrl'
import { getUserInfo,getOpenid,loginMagApp,callBack } from '../api/user.js'
import { getCookie, setCookie } from './authService'

// 是否是微信浏览器
export function isWeiXin () {
  let ua = window.navigator.userAgent.toLowerCase()
  if (ua.match(/micromessenger/i) == 'micromessenger') {
    return true
  } else {
    return false
  }
}

// 是否是千帆app
export function isQianfan () {
  let ua = window.navigator.userAgent.toLowerCase()
  if (ua.toLowerCase().search('qianfan') !== -1) {
    return true
  } else {
    return false
  }
}

// 是否是移动端
export function isIphone () {
  if (navigator.userAgent.match(/(iPhone|iPod|Android|ios)/i)) {
    return true
  }
}

export function isAndroid  () {
  var u = navigator.userAgent
  var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Linux') > -1
  if (isAndroid) {
    return true
  } else {
    return false
  }
}

// 是否是ios
export function isIos () {
	var u = navigator.userAgent
	var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/) //ios终端
	return isiOS
}

// 是否是马甲app
const isMagApp = function () {
	let ua = window.navigator.userAgent.toLowerCase()
	if (ua.toLowerCase().search('magappx') !== -1) {
		return true
	} else {
		return false
	}
}

let loadedJs = []
export async function loadJs(url) {
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
export async function  loadMobJs(url, className, params = {}) {
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

export function schemeUrlToRouter (direct) {
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

export function decodeBase64Content(base64Content) {
  let commonContent = base64Content.replace(/\s/g, '+')
  commonContent = Buffer.from(commonContent, 'base64').toString()
  return commonContent
}

//获取url参数值
export function getUrlParam (name) {
  var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)') // 构造一个含有目标参数的正则表达式对象
  var r = window.location.search.substr(1).match(reg) // 匹配目标参数
  if (r !== null) {
    // console.log(unescape(r[2]))
    return unescape(r[2])
  } else {
    return null
  } // 返回参数值
}

// wap打开app指定页面，没有下载app就跳应用宝下载
// className: 需要跳转的按钮的classname
// scheme：需要打开的app的页面对应的协议
export function jumpOpenApp (className, type, param = '') {
	let siteInfo = store.state.siteInfo
	if (siteInfo.need_use_new_jump_app) {
		let jumpUrl = newJumpUrl(type, param)
		if (!document.getElementsByClassName(className)[0]) {
			return false
		}
		for (var i = 0; i < document.getElementsByClassName(className).length; i++) {
			document.getElementsByClassName(className)[i].addEventListener('click', function () {
				window.location.href = jumpUrl
			})
		}
	} else {
		if (store.state.siteInfo.mob_key === '') {
			if (!document.getElementsByClassName(className)[0]) {
				return false
			}
			for (var i = 0; i < document.getElementsByClassName(className).length; i++) {
				document.getElementsByClassName(className)[i].addEventListener('click', function () {
					window.location.href = store.state.host + store.state.siteInfo.downloadUrl.substr(1)
				})
			}
		} else {
			initMob(className, type, param)
		}
	}
}

// 老的moblink跳转app的方法
const initMob = async function (className, type, param) {
	let mobKey = store.state.siteInfo.mob_key
	if (mobKey) {
		await loadJs('//f.moblink.mob.com/3.0.1/moblink.js?de=14&appkey=' + mobKey)
		let scheme_url = ''
		let params = {}

		switch (type) {
			case schemeUrl.H5_WEB:
				scheme_url = '/qianfan/webview'
				params = { url: param }
				break
			case schemeUrl.THREAD_INFO:
				scheme_url = '/qianfan/thread'
				params = { tid: param }
				break
			case schemeUrl.SIDE_INFO:
				scheme_url = '/qianfan/side'
				params = { sid: param }
				break
			case schemeUrl.TOPIC_INDEX:
				scheme_url = '/qianfan/sidetag'
				params = { tid: param }
				break
			case schemeUrl.GROUP_INFO:
				scheme_url = '/qianfan/group'
				params = { gid: param }
				break
			default:
				scheme_url = '/qianfan/startapp'
		}
		MobLink([
			{
				el: '.' + className,
				path: scheme_url,
				params: params,
			},
		])
	}
}

export function wxGrant(url, type) {
	if (!store.state.siteInfo.is_allow_interactive) {
		if (type === 'register') {
			// 浏览器注册关闭
			// store.commit('updateWeixin', false)
			// store.commit('updateLayers', true)
			// if (type === 'register') {
			//     store.commit('updateJumpRegister', true)
			// } else {
			//     store.commit('updateJumpLogin', true)
			// }
			jumpOpenApp(type, schemeUrl.H5_WEB, url)
			return false
		}
		CheckLoginAndBindPhone(true)
	}
}

// 新的wap跳转app的方法
const newJumpUrl = function (type, param) {
	let scheme_url = getSchemeUrl(type)
	let request_host = store.state.siteInfo.request_host
	let app_pinyin = store.state.siteInfo.app_pinyin
	let jump_url = ''
	if (isIos()) {
		jump_url = request_host + scheme_url + param
		return jump_url
	}
	scheme_url = scheme_url + param
	scheme_url = encodeURIComponent(scheme_url)
	jump_url = 'http://a.app.qq.com/o/simple.jsp?pkgname=' + app_pinyin + '&android_schema=' + scheme_url
	return jump_url
}

// 根据不同类型获取客户端协议
const getSchemeUrl = function (type) {
	let scheme_url = ''
	let package_name = store.state.siteInfo.package_name
	switch (type) {
		case schemeUrl.H5_WEB:
			scheme_url = package_name + '://webview/?url='
			break
		case schemeUrl.THREAD_INFO:
			scheme_url = package_name + '://thread/?tid='
			break
		case schemeUrl.SIDE_INFO:
			scheme_url = package_name + '://side/?sid='
			break
		case schemeUrl.TOPIC_INDEX:
			scheme_url = package_name + '://sidetag/?tid='
			break
		case schemeUrl.GROUP_INFO:
			scheme_url = package_name + '://group/?gid='
			break
		default:
			scheme_url = package_name + '://startapp'
	}
	return scheme_url
}

// 登录+手机号绑定函数
export function CheckLoginAndBindPhone(isBind, ApploginCallBack = {}, loginFun = {}) {
	// 千帆app
	if (isQianfan()) {
		qianfanLogin(isBind, ApploginCallBack)
		return false
	}
	// 如果是马甲app
	if (isMagApp()) {
		if (store.state.isGuest) {
			magLogin(isBind, ApploginCallBack, loginFun)
			return false
		}
		if (!isBind) {
			if (typeof ApploginCallBack !== 'undefined') ApploginCallBack()
			return false
		}
		getUserInfo(store.state.bearToken).then(res => {
			let data = res.data.data
			if (res.data.ret == 0 && data.has_phone) {
				if (typeof ApploginCallBack !== 'undefined') ApploginCallBack()
				return false
			}
			mag.phoneBind(function (phone) {
				if (phone && phone !== '') {
					magLogin(isBind, ApploginCallBack, loginFun, true)
				}
			})
		})
		return false
	}

	// 已登录
	if (!store.state.isGuest) {
		// 微信
		if (isWeiXin()) {
			// 不需要绑定手机
			if (!isBind) {
				loginFun()
				return
			}
			// 需要绑定手机
			let token = localStorage.getItem('bearerToken')
			getUserInfo(token).then(res => {
				let data = res.data.data
				if (res.data.ret == 0 && data.has_phone) {
					if (typeof loginFun !== 'undefined') loginFun()
					return false
				}
				if (res.data.ret === 0 && !data.has_phone) {
					store.commit('updateShowWxLayer', true)
					store.commit('updateNoPhone', true)
					return false
				}
			})
			return
		}

		// 独立分类信息站，浏览器直接跳帮助页面
		if (store.state.siteInfo.is_fenlei === 1) {
			window.location.href = store.state.host+'wap-view/fenlei/help'
            return
		}

		// 非独立分类信息站点，如果未开启交互，直接跳引导下载弹窗
		if (store.state.siteInfo.is_allow_interactive) {
			store.commit('updateDialog', true)
            return
		}

		// 浏览器
		//不需要绑定手机号
		if (!isBind) {
            loginFun()
            return
        }

		// 需要绑定手机号
		store.commit('updateDialog', true)
		// store.commit('updateMobile', false)
		// store.commit('updateShowWxLayer', true)
		return
	}

	// 未登录微信
	if (isWeiXin()) {
		//如果在weixin内

		// 非独立分类信息站点并且微信内未开启微信授权登录
		if (!store.state.siteInfo.is_allow_wap) {
			if (store.state.siteInfo.is_fenlei === 0) {
				store.commit('updateDialog', true)
				return
			}
			// 单独分类站点
			window.location.href = store.state.host+'wap-view/fenlei/help'
			return
		}

		// if (store.state.siteInfo.fenlei_wap_setting.open_pay === 0) {
		//     if (store.state.siteInfo.is_fenlei === 0) {
		//         //zunxiang
		//         store.commit('updateDialog', true)
		//     } else {
		//         //单独分类信息站点
		//         router.push({
		//             path: '/wap-view/fenlei/help'
		//         })
		//     }
		//     return
		// }

		let href = window.location.href
		let newUrl = href.split('?code')
		let postObj = {}
		postObj.url = newUrl[0]
		// postObj.unionid = localStorage.getItem('unionid')
		getOpenid(postObj).then(function (res) {
			var data = res.data.data
			if (res.data.ret === 0) {
				// 跳code链接
				window.location.href = data.url
			} else {
				this.$vux.toast.text('res.data.txt')
			}
		})
		return
	}

	// 未登录浏览器
	// 开启浏览器交互，弹浏览器弹窗,账号密码登录
	if (store.state.siteInfo.is_fenlei === 0) {
		if (!store.state.siteInfo.is_allow_interactive) {
			store.commit('updateLayers', true)
			store.commit('updateJumpLogin', true)
			return
		}
		store.commit('updateDialog', true)
		return
	}

	// 独立分类信息站点浏览器
	if (store.state.siteInfo.is_fenlei === 1) {
		window.location.href = store.state.host+'wap-view/fenlei/help'
	}
}

// 千帆登录
export function qianfanLogin(isBind, ApploginCallBack) {
	QFH5.getUserInfo(function (state, data) {
		if (state === 1) {
			if (!isBind) {
				if (typeof ApploginCallBack !== 'undefined') ApploginCallBack()
				return false
			}
			let phone = data.phone
			if (phone !== '' && phone !== null) {
				if (typeof ApploginCallBack !== 'undefined') ApploginCallBack()
				return false
			}
			QFH5.jumpBindMobile(function (state, data) {
				if (state === 1) {
					if (typeof ApploginCallBack !== 'undefined') ApploginCallBack()
				} else {
					QFH5.jumpLogin(function (state, data) {})
				}
			})
		} else {
			QFH5.jumpLogin(function (state, data) {})
		}
	})
}

// 马甲login
export function magLogin(isBind, ApploginCallBack, loginFun, fromBind = false) {
	let _this = this
	// 如果从绑定完手机号再来换取beartoken就执行绑定操作
	if (fromBind) {
		if (typeof ApploginCallBack !== 'undefined') ApploginCallBack()
	} else {
		mag.toLogin(function (rs) {
			if (rs.token && rs.token !== '') {
				let obj = {}
				obj.token = rs.token
				obj.uid = rs.user_id
				loginMagApp(obj).then(res => {
					let data = res.data.data
					if (res.data.ret == 0 && data.BearToken !== '') {
						localStorage.setItem('bearerToken', data.BearToken)
						setCookie('bearToken', data.BearToken, 'd1')
						store.dispatch('analysisBearToken', data.BearToken)
						store.commit('updateGuest', false)
						// if(!isBind) {
						//   if(typeof(ApploginCallBack) !== 'undefined') ApploginCallBack()
						//   return false
						// } else {
						//   getUserInfo(store.state.bearToken).then(res => {
						//     let data = res.data.data
						//     if(res.data.ret == 0 && data.has_phone){
						//       if(typeof(ApploginCallBack) !== 'undefined') ApploginCallBack()
						//       return false
						//     } else {
						//     }
						//   })
						// }
					}
				})
			}
		})
	}
}

/**
 * 删除URL中的指定参数
 * @param {*} url
 * @param {*} name
 */
export function delUrlParams(url, name) {
	//根据#号拆分
	let poundArr = url.split('#')
	//？拆分
	let questionArr = []
	if (poundArr) {
		//把#接上
		poundArr.forEach((element, index) => {
			if (index > 0) {
				element = '#' + element
			}

			let tempArr = element.split('?')
			if (!tempArr) {
				return true
			}
			tempArr.forEach((item, idx) => {
				//保留问号
				if (idx > 0) {
					item = '?' + item
				}
				questionArr.push(item)
			})
		})
	} else {
		questionArr = url.split('?')
		if (questionArr) {
			questionArr.forEach((item, idx) => {
				if (idx > 0) {
					item = '?' + item
				}
			})
		}
	}

	if (!questionArr) {
		return url
	}

	//&符号的处理
	let andArr = []
	questionArr.forEach((item, index) => {
		let andIdx = item.indexOf('&')
		if (andIdx <= -1) {
			andArr.push(item)
			return true
		}

		let tempAndArr = item.split('&')
		tempAndArr.forEach((ele, idx) => {
			if (idx > 0) {
				ele = '&' + ele
			}
			andArr.push(ele)
		})
	})

	let newUrl = ''
	andArr.forEach((item, index) => {
		let nameIndex = item.indexOf(name + '=')
		//不拼接要删除的参数
		if (nameIndex > -1) {
			//保留第一个问号
			let questionIdx = item.indexOf('?')
			if (questionIdx == 0) {
				newUrl += '?'
			}
			return true
		}
		newUrl += item
	})

	return newUrl.replace(/\?\&/g, '?').replace(/\?$/g, '')
}

// 微信登录code换user
export function changeWxCodeToUser(code) {
	return new Promise(async (resolve, reject) => {
		// if (!!localStorage.getItem('unionid') && store.state.isGuest) {
		// 	if (store.state.isJumpLogin) {
		// 		store.commit('updateJumpLogin', false)
		// 	}
		// 	store.commit('updateShowWxLayer', true)
		// 	store.commit('updateJumpRegister', true)
		// 	if (store.state.siteInfo.is_allow_wap) {
		// 		store.commit('updateJumpRegister', true)
		// 		store.commit('updateMobile', true)
		// 	}
		// 	resolve(false)
		// 	return
		// }
		let res = await callBack({ code })
		let data = res.data.data
		if (res.data.ret === 0) {
			if (!!data.unionid) {
                store.commit('updateSiteUser', data)
                store.commit('updateName')
				store.commit('updateUnionid')
				localStorage.setItem('unionid', data.unionid)
				if (data.BearToken && data.BearToken !== '') {
					// 微信授权 并且 登录成功了
					localStorage.setItem('bearerToken', data.BearToken)
					store.dispatch('analysisBearToken', data.BearToken)
					resolve(true)
				} else {
					if (store.state.isJumpLogin) {
						store.commit('updateJumpLogin', false)
					}
					store.commit('updateShowWxLayer', true)
					store.commit('updateJumpRegister', true)
					if (store.state.siteInfo.is_allow_wap) {
						// if (store.state.siteInfo.mobile_bind) {
						store.commit('updateJumpRegister', true)
						store.commit('updateMobile', true)
						// } else {
						//     store.commit('updateProfile', true)
						// }
					}
					resolve(false)
				}
			} else {
				console.log('code已过期')
                resolve(false)
			}
		}
	})
}
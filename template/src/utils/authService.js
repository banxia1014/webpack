// 获取cookie、
export function getCookie(name) {
	let reg = new RegExp('(^|)' + name + '=([^;]*)(;|$)')
	let arr = document.cookie.match(reg)
	if (arr) {
		return arr[2]
	} else {
		return null
	}
}

// 设置cookie,增加到vue实例方便全局调用
export function setCookie(cName, value, time) {
	let exdate = new Date()
	exdate.setTime(exdate.getTime() + time * 1000)
	// console.log(exdate.toUTCString())
	document.cookie = cName + '=' + escape(value) + ';expires=' + exdate.toUTCString()
}

//删除cookie
export function delCookie(name) {
	var exp = new Date()
	exp.setTime(exp.getTime() - 1)
	var cval = getCookie(name)
	if (cval != null) {
		document.cookie = name + '=' + cval + ';expires=' + exp.toGMTString()
	}
}

//清除所有cookie函数
export function clearAllCookie() {
	var date = new Date()
	date.setTime(date.getTime() - 10000)
	var keys = document.cookie.match(/[^ =;]+(?=\=)/g)
	if (keys) {
		for (var i = keys.length; i--; ) document.cookie = keys[i] + '=0; expire=' + date.toGMTString() + '; path=/'
	}
}

//获取url参数值
export function getUrlParam(name) {
	var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)') // 构造一个含有目标参数的正则表达式对象
	var r = window.location.search.substr(1).match(reg) // 匹配目标参数
	if (r !== null) {
		// console.log(unescape(r[2]))
		return unescape(r[2])
	} else {
		return null
	} // 返回参数值
}

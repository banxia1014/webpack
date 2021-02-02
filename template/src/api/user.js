import { get,post } from "./public";

export function getUserInfo(data) {
	return get('/wap_api/user/info',data)
}

export function publicDate(data) {
	return post('/wap_api/public/index',data)
}

// 登录
export function userLogin(data) {
	return post('/user/login',data)
}

// 发送验证码
export function sendVerifyCode(data) {
	return post('/wap_api/login/send-verify-code',data)
}

// 检查验证码
export function checkVerifyCode(data) {
	return post('/wap_api/login/check-verify-code',data)
}

// 微信中注册
export function defalutRegister(data) {
	return post('/wap_api/user/default-register',data)
}

// wap浏览器中注册 /wap_api/user/register
export function userRegister(data) {
	return post('/user/register',data)
}

// 账户密码绑定
export function bindAccount(data) {
	return post('wap_api/user/bind-account',data)
}

// 微信授权
export function getOpenid(data) {
	return post('/wap_api/wechat/get-openid',data)
}

// 马甲app登录
export function loginMagApp(data) {
	return post('/wap_api/login/mag-app',data)
}

// 检查是否登录
export function callBack(data) {
	return post('/wap_api/wechat/call-back',data)
}

//国际号数据
export function countryList(data) {
	return post('/wap_api/public/mobile-prefix',data)
}

//绑定手机号
export function bindPhone(data) {
	return post('/wap_api/user/change-mobile',data)
}
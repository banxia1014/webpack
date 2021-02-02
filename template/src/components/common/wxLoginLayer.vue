<template>
	<div class="layer_container">
		<div class="login_layer" v-show="isWxLayer">
			<!--遮罩层-->
			<i></i>
			<!--关闭按钮-->
			<img class="login_close" src="../../assets/images/login_close.png" @click="closeWxLayer" />
			<!--登录-->
			<div class="common_box middle" v-show="isJumpLogin">
				<!--<div class="common_box middle" v-show="false">-->
				<div class="nav">
					<p class="title">账户密码绑定</p>
				</div>
				<div class="">
					<div v-if="if_open_national">
						<div class="login_way" @click="changeLoginWay()" v-if="!loginWay">手机号登录</div>
						<div class="login_way" @click="changeLoginWay()" v-if="loginWay">账号登录</div>
					</div>
					<ul class="info_area">
						<li>
							<div v-if="if_open_national">
								<div class="edit_input clearfix" v-if="loginWay">
									<span class="fl username"></span>
									<input
										type="text"
										class="fl"
										id="username"
										v-model.trim="username"
										name="username"
										placeholder="请输入手机号"
									/>
								</div>
								<div class="edit_input clearfix" v-if="!loginWay">
									<span class="fl username"></span>
									<div class="nationalNum" @click="showNationalChoose()" v-if="if_open_national">
										+{{ nationalPhone }}
									</div>
									<input
										type="text"
										class="fl"
										:class="{ nationalInput: if_open_national }"
										v-model.trim="username"
										name="username"
										placeholder="请输入用户名"
									/>
								</div>
							</div>
							<div v-if="!if_open_national">
								<div class="edit_input clearfix">
									<span class="fl username"></span>
									<input
										type="text"
										class="fl"
										v-model.trim="username"
										name="username"
										placeholder="请输入用户名/手机号"
									/>
								</div>
							</div>
							<div class="edit_input clearfix">
								<span class="fl password"></span>
								<input
									type="password"
									id="password"
									v-model.trim="password"
									class="fl"
									name="password"
									placeholder="请输入密码"
								/>
							</div>
							<!--<div class="Bind_account linkApp">去App找回密码</div>-->
							<div class="Bind_account linkApp" @click="jumpRegister">立即注册</div>
							<p class="warn_txt">{{ warn_login }}</p>
						</li>
					</ul>
				</div>
				<div class="btn_line clearfix">
					<a href="javascript:void(0);" class="close" @click="closeWxLayer">返回</a>
					<a href="javascript:void(0);" class="btn_bg" @click="bindAccounts">立即绑定</a>
				</div>
			</div>

			<!--第二步绑定手机号-->
			<!--<div class="common_box middle" id="mobile_box" v-show="false">-->
			<div class="common_box middle" id="mobile_box" v-show="isMobile">
				<div class="nav">
					<p class="title">请输入您的手机号</p>
				</div>

				<div class="">
					<ul class="info_area">
						<li>
							<div class="edit_input clearfix">
								<span class="fl code_phone"></span>
								<div class="nationalNum" @click="showNationalChoose()" v-if="if_open_national">
									+{{ nationalPhone }}
								</div>
								<input
									type="text"
									:class="{ nationalInput: if_open_national }"
									class="fl"
									id="phone"
									name="phone"
									v-model.trim="phone"
									placeholder="请输入您的手机号"
								/>
							</div>
							<div class="edit_input clearfix pr" v-show="siteInfo.cfgCache">
								<span class="fl code_img"></span>
								<input
									type="text"
									id="code"
									class="fl"
									name="code"
									v-model.trim="code"
									placeholder="请输入图片验证码"
								/>
								<span class="img_code" @click="refrechCode"
									><img :src="imgCode" class="num-img"
								/></span>
							</div>
							<div class="edit_input clearfix pr">
								<span class="fl txt_img"></span>
								<input
									type="text"
									id="verifyCode"
									class="fl"
									name="verifyCode"
									v-model.trim="verifyCode"
									placeholder="请输入短信验证码"
								/>
								<span class="txt_code" v-show="showTime" @click="getCode(0)">获取验证码</span>
								<span class="txt_code con" v-show="!showTime">剩余{{ count }}s</span>
							</div>
							<div class="Bind_account" v-if="isJumpRegister && is_fenlei === 0" @click="bindAccount">
								账户密码绑定
							</div>
							<p class="warn_txt">{{ warn_login }}</p>
						</li>
					</ul>
				</div>

				<div class="btn_line clearfix">
					<span class="complete" @click="Continue">下一步</span>
				</div>
			</div>

			<!--完善资料-->
			<div class="middle" v-show="isProfile && !isJumpLogin && !isMobile">
				<div class="common_box" id="profile_box">
					<div class="nav">
						<p class="title">完善资料</p>
					</div>
					<ul class="info_area">
						<li>
							<div class="edit_input clearfix">
								<span class="fl username"></span>
								<input
									value=""
									type="text"
									class="fl"
									id="nickname"
									name="nickname"
									v-model.trim="nickname"
									placeholder="用户名(确认后不可修改)"
								/>
							</div>
							<div class="Bind_account" v-if="is_fenlei === 0" @click="bindAccount">账户密码绑定</div>
							<p class="warn_txt">{{ warn_login }}</p>
						</li>
					</ul>
					<div class="btn_line clearfix">
						<span class="complete" @click="Register">完成</span>
					</div>
				</div>
				<div class="close_btn" @click="closeWxLayer">
					<img class="img" src="../../assets/images/layer_close.png" />
				</div>
			</div>

			<!--绑定手机号-->
			<!--<div class="common_box middle" id="mobile_box_bind" v-show="true">-->
			<div class="common_box middle" id="mobile_box_bind" v-show="hasNoPhone">
				<div class="nav">
					<p class="title">绑定手机号</p>
				</div>

				<div class="">
					<ul class="info_area">
						<li>
							<div class="edit_input clearfix">
								<span class="fl code_phone"></span>
								<div class="nationalNum" @click="showNationalChoose()" v-if="if_open_national">
									+{{ nationalPhone }}
								</div>
								<input
									type="text"
									:class="{ nationalInput: if_open_national }"
									class="fl"
									id="phone_bind"
									name="phone"
									v-model.trim="phone"
									placeholder="请输入您的手机号"
								/>
							</div>
							<div class="edit_input clearfix pr" v-show="siteInfo.cfgCache">
								<span class="fl code_img"></span>
								<input
									type="text"
									id="code_bind"
									class="fl"
									name="code"
									v-model.trim="code"
									placeholder="请输入图片验证码"
								/>
								<span class="img_code" @click="refrechCode"
									><img :src="imgCode" class="num-img"
								/></span>
							</div>
							<div class="edit_input clearfix pr">
								<span class="fl txt_img"></span>
								<input
									type="text"
									id="verifyCode_bind"
									class="fl"
									name="verifyCode"
									v-model.trim="verifyCode"
									placeholder="请输入短信验证码"
								/>
								<span class="txt_code" v-show="showTime" @click="getCode(4)">获取验证码</span>
								<span class="txt_code con" v-show="!showTime">剩余{{ count }}s</span>
							</div>
							<p class="warn_txt">{{ warn_login }}</p>
						</li>
					</ul>
				</div>

				<div class="btn_line clearfix">
					<span class="complete" @click="bindTelphone">立即绑定</span>
				</div>
			</div>
		</div>
		<national-choose v-if="showNational" @nationalNum="nationalNum"></national-choose>
	</div>
</template>
<script>
import { sendVerifyCode, checkVerifyCode, defalutRegister, bindAccount, getOpenid, bindPhone,publicDate } from '../../api/user'
import { setCookie } from '../../utils/authService'
import nationalChoose from './phoneNational.vue'
import { mapState } from 'vuex'
import store from '../../store'

export default {
	name: 'layer_container',
	data() {
		return {
			username: '', // 登录的账户名
			password: '', // 登录的密码
			usernames: '', // 绑定的账户名
			passwordss: '', // 完善资料的时候输入的密码
			passwords: '', // 绑定的密码
			nickname: '', // 自己设定的昵称
			warn_login: '', // 登录时报错的文案提示
			//              mobile_bind: false, // 后台是否要求绑定手机或邮箱
			phone: '', // 电话号码
			code: '', // 图片验证
			verifyCode: '', // 短信验证码
			gender: '', // 性别
			imgCode: '', // 图片验证
			showTime: true,
			count: '',
			timer: null,
			is_fenlei: this.$store.state.siteInfo.is_fenlei,
			loginWay: true,

			/*国际号参数*/
			showNational: false, //是否展示国际号选择区域
			nationalPhone: '', //选择的国际号
			if_open_national: false, //是否开启国际号
		}
	},
	props: {
		needEmit: {
			type: Boolean,
			default: false,
		},
	},
	components: {
		nationalChoose,
	},
	computed: {
		...mapState({
			isWxLayer: state => state.showWxLayer,
			isJumpLogin: state => state.isJumpLogin,
			isJumpRegister: state => state.isJumpRegister,
			siteInfo: state => state.siteInfo,
			isProfile: state => state.isProfile,
			nickName: state => state.nickName,
			isMobile: state => state.isMobile,
			hasNoPhone: state => state.no_phone,
		}),
	},
	watch: {},
	mounted() {
		var exp = new Date()
		document.cookie = 'uid' + '=' + escape(1242) + ';expires=' + exp.toGMTString()
		let _this = this
		if (_this.nickName !== '') {
			_this.nickname = _this.nickName
		}
		// 判断是绑定还是注册
		if (_this.isJumpRegister) {
			_this.$store.commit('updateMobile',true)
		}
		// if (isWeiXin()) {
		// this.$store.commit('updateWeixin', false)
		// }
		let host = process.env.NODE_ENV === 'production' ? window.location.host : 'qianfan13.qianfanapi.com'
		let protocal = process.env.NODE_ENV === 'production' ? window.location.protocol : 'http:'
		_this.imgCode = protocal + '//' + host + '/wap_api/login/authcode'
		// 图片验证
		//_this.imgCode = 'https://qianfan-weekly.qianfanapi.com/wap_api/login/authcode'
		//      _this.imgCode = 'https://qianfan-dev.qianfanapi.com/wap_api/login/authcode'
		// loadMobJs('', 'linkApp')
		_this.getNationalSetting()
	},
	methods: {
		showNationalChoose() {
			this.showNational = true
		},
		/*获取新区号，国际号*/
		nationalNum(num) {
			console.info(num)
			this.nationalPhone = num
			this.showNational = false
		},
		/*获取站点国际号配置*/
		getNationalSetting() {
			this.if_open_national = this.$store.state.siteInfo.open_national == 1 ? true : false
			if (this.if_open_national) {
				this.nationalPhone = ''
			} else {
				this.nationalPhone = '86'
			}
		},
		changeLoginWay() {
			this.loginWay = !this.loginWay
		},
		bindAccount() {
			this.$store.commit('updateMobile', false)
			this.$store.commit('updateProfile', false)
			this.$store.commit('updateJumpLogin', true)
		},
		Continue() {
			let _this = this
			_this.code = _this.siteInfo.cfgCache ? _this.code : ''
			if (_this.isPhoneNum(_this.phone)) {
				var postObj = {}
				postObj.phone = _this.phone
				if (_this.if_open_national) {
					postObj.phone = '+' + _this.nationalPhone + ' ' + _this.phone
				}
				postObj.verifyCode = _this.verifyCode
				checkVerifyCode(postObj).then(function (res) {
					var data = res.data
					if (res.data.ret === 0) {
						_this.warn_login = ''
						_this.$store.commit('updateMobile', false)
						_this.$store.commit('updateJumpLogin', false)
						//                        _this.$store.commit('login/updateJumpRegister', false)
						_this.$store.commit('updateProfile', true)
						_this.nickname = ''
					} else {
						_this.warn_login = data.text
					}
				})
			}
		},
		// 获取短信验证
		getCode(num) {
			let _this = this
			_this.code = _this.siteInfo.cfgCache ? _this.code : ' '
			if (_this.isPhoneNum(_this.phone)) {
				var postObj = {}
				postObj.code = _this.code
				postObj.type = num
				postObj.phone = _this.phone
				if (_this.if_open_national) {
					postObj.phone = '+' + _this.nationalPhone + ' ' + _this.phone
				}

				// 微信授权登录时，如果服务器cookie过期，拿不到unionid，但是本地还有unionid的情况下，服务器重新返回需要登录的状态，并且重新授权
				sendVerifyCode(postObj).then(function (res) {
					var data = res.data
					if (res.data.ret === 0) {
						_this.warn_login = ''
						const TIME_COUNT = 60
						if (!_this.timer) {
							_this.count = TIME_COUNT
							_this.showTime = false
							_this.timer = setInterval(() => {
								if (_this.count > 0 && _this.count <= TIME_COUNT) {
									_this.count--
								} else {
									_this.showTime = true
									clearInterval(_this.timer)
									_this.timer = null
								}
							}, 1000)
						}
					} else if (res.data.ret === 4) {
						// 服务器unionid过期，重新授权
						_this.$store.commit('updateUnionid', '')
						let href = window.location.href
						let newUrl = href.split('?code')
						_this.redelegation(newUrl[0])
					} else {
						_this.warn_login = data.text
						_this.refrechCode()
					}
				})
			}
		},
		isPhoneNum(phone) {
			if (this.if_open_national) {
				if ('86' == this.nationalPhone) {
                    let reg = /^1\d{10}$/
					if (!reg.test(phone)) {
						this.warn_login = '手机号码填写有误，请重新填写'
						return false
					} else {
						return true
					}
				} else {
					if (phone.length > 20) {
						this.warn_login = '手机号码填写不得超过20位，请重新填写'
						return false
					} else {
						return true
					}
				}
			} else {
                let reg = /^1\d{10}$/
				if (!reg.test(phone)) {
					this.warn_login = '手机号码填写有误，请重新填写'
					return false
				} else {
					return true
				}
			}
		},
		// 微信注册
		Register() {
			let _this = this
			var postObj = {}
			postObj.username = _this.nickname
			postObj.phone = _this.phone
			if (_this.if_open_national) {
				postObj.phone = '+' + _this.nationalPhone + ' ' + _this.phone
			}
			postObj.verifyCode = _this.verifyCode
			defalutRegister(postObj).then(function (res) {
				var data = res.data.data
				if (res.data.ret === 0) {
					setCookie('bearToken', data.bearerToken, 'd1')
					_this.warn_login = ''
					// 注册成功
					_this.showToast(true, 'text', '注册成功！')
					localStorage.setItem('bearerToken', data.bearerToken)
					_this.$store.dispatch('analysisBearToken', data.bearerToken)
					_this.isVal()
				} else {
					_this.warn_login = res.data.text
				}
			})
		},
		// 账户密码绑定
		bindAccounts() {
			let _this = this
			let postObj = {}
			let loginNameOrPhone = ''

			if (!this.loginWay) {
				loginNameOrPhone = '+' + _this.nationalPhone + ' ' + _this.username
			} else {
				loginNameOrPhone = _this.username
			}
			postObj.username = loginNameOrPhone
			postObj.password = _this.password

			bindAccount(postObj).then(function (res) {
				var data = res.data.data
				if (res.data.ret === 0) {
					_this.warn_login = ''
					setCookie('bearToken', data.bearerToken, 'd1')
					localStorage.setItem('bearerToken', data.bearerToken)
					console.log('bearerToken', data.bearerToken)
					console.log('bearerToken', localStorage.getItem('bearerToken'))
					store.dispatch('analysisBearToken', data.bearerToken)
					// 绑定成功
					_this.$store.commit('updateGuest', false)
					_this.isVal()
					_this.showToast(true, 'text', '绑定成功！')
				} else if (res.data.ret === 4) {
					// 服务器unionid过期，重新授权
					_this.$store.commit('updateUnionid', '')
					let href = window.location.href
					let newUrl = href.split('?code')
					_this.redelegation(newUrl[0])
				} else {
					_this.warn_login = res.data.text
				}
			})
		},
		// 刷新验证码
		refrechCode() {
			let _this = this
			let timestamp = new Date().getTime()
			//        _this.imgCode = 'https://qianfan-dev.qianfanapi.com/wap_api/login/authcode?random=' + timestamp
			let host = window.location.host
			let protocal = window.location.protocol
			_this.imgCode = protocal + '//' + host + '/wap_api/login/authcode?random=' + timestamp
		},
		closeWxLayer() {
			if (this.hasNoPhone) {
				this.$store.commit('updateNoPhone', false)
			}
			this.$store.commit('updateShowWxLayer', false)
		},
		jumpRegister() {
			this.$store.commit('updateJumpLogin', false)
			this.$store.commit('updateJumpRegister', true)
			this.$store.commit('updateMobile', true)
		},
		//unionid重新授权
		redelegation(url) {
			console.log('准备授权')
			let postObj = {}
			postObj.url = url
			postObj.unionid = this.$store.state.unionid

			getOpenid(postObj).then(function (res) {
				var data = res.data
				console.log(data)
				if (res.data.ret === 0) {
					// 授权 判断登录成功
					console.log('授权 判断登录成功')
					if (data.BearToken && data.BearToken !== '') {
						// 登录成功
						console.log('登录成功')
						localStorage.setItem('bearerToken', data.BearToken)
						store.dispatch('analysisBearToken', data.BearToken)
						store.commit('updateGuest', false)
					} else {
						window.location.href = data.url
					}
				} else {
					this.showToast(true, 'text', res.data.txt, '6em')
				}
			})
		},
		//绑定手机号
		async bindTelphone() {
			let postObj = {}
			if (this.if_open_national) {
				this.phone = '+' + this.nationalPhone + ' ' + this.phone
			}
			postObj.phone = this.phone
			postObj.type = 1
			postObj.code = this.verifyCode
			let res = await bindPhone(postObj)
			// Promise.then(res=>{return res.json()}).then(res=>console.log(res));
			if (res.data.ret === 0) {
				this.$store.commit('updateShowWxLayer', false)
				this.$store.commit('updateNoPhone', false)
				this.showToast(true, 'text', '手机绑定成功！')
			} else {
				this.warn_login = res.data.text
				this.refrechCode()
			}
		},
		isVal() {
			if (this.needEmit) {
				this.$emit('initData')
			}
			this.$store.commit('updateJumpLogin', false)
			this.$store.commit('updateShowWxLayer', false)
			this.$store.commit('updateJumpRegister', false)
			this.$store.commit('updateProfile', false)
			this.$store.commit('updateMobile', false)
		},
	},
}
</script>
<style>
/*弹窗*/
.login_layer {
	position: fixed;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	z-index: 100;
}

.login_layer i {
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	background: rgba(0, 0, 0, 0.5);
	z-index: 1;
}

.login_layer > .login_close {
	position: absolute;
	top: 0.2rem;
	right: 0.2rem;
	width: 0.6rem;
	height: 0.6rem;
	display: block;
	z-index: 10;
}

.login_layer .middle {
	position: absolute;
	left: 50%;
	top: 30%;
	z-index: 1;
	margin-left: -3.2rem;
	/*transform: translate(-50%,-50%);*/
	/*-webkit-transform: translate(-50%,-50%);*/
	/*-o-transform: translate(-50%,-50%);*/
	/*-moz-transform: translate(-50%,-50%);*/
	/*-ms-transform: translate(-50%,-50%);*/
}

.login_layer .common_box {
	width: 6.4rem;
	background: #ffffff;
	border-radius: 5px;
	min-height: 2.12rem;
	padding-bottom: 0.42rem;
}

.login_layer .common_box .nav {
	width: 5rem;
	margin: 0 auto;
	text-align: center;
	padding-bottom: 0.2rem;
}

.login_layer .common_box .nav .title {
	font-size: 0.34rem;
	color: #333333;
	padding-top: 0.34rem;
	text-align: center;
}

.login_layer .common_box .nav .tip {
	text-align: center;
	font-size: 0.24rem;
	color: #8e8e8e;
	margin-top: 0.2rem;
}

.login_layer .common_box .btn_line {
	width: 5.5rem;
	margin: 0 auto;
	margin-top: 0.3rem;
}

.login_layer .common_box .btn_line .complete {
	display: block;
	width: 5rem;
	height: 0.72rem;
	line-height: 0.72rem;
	font-size: 0.34rem;
	margin: 0 auto;
	text-align: center;
	background: #15bfff;
	color: #fff;
	border-radius: 38px;
	box-shadow: 0px 0.08rem 0.2rem #8cdfff;
	-moz-box-shadow: 0px 0.08rem 0.2rem #8cdfff;
}

.login_layer .common_box .close {
	display: block;
	height: 0.72rem;
	line-height: 0.72rem;
	text-align: center;
	width: 2.47rem;
	border: 1px solid #15bfff;
	border-radius: 0.5rem;
	font-size: 0.34rem;
	color: #15bfff;
	margin: 0 auto;
	float: left;
}

.login_layer .common_box .notice {
	margin: 0.5rem auto;
	text-align: center;
	font-size: 0.34rem;
	color: #333;
}

.login_layer .common_box .btn_bg {
	display: block;
	height: 0.72rem;
	line-height: 0.72rem;
	text-align: center;
	width: 2.47rem;
	background: #15bfff;
	border-radius: 0.5rem;
	font-size: 0.34rem;
	border: 1px solid #15bfff;
	color: #ffffff;
	margin: 0 auto;
	float: right;
	box-shadow: 0px 0.08rem 0.2rem #8cdfff;
	-moz-box-shadow: 0px 0.08rem 0.2rem #8cdfff;
}

.login_layer .common_box .nav li {
	width: 50%;
	float: left;
	text-align: center;
	color: #a5a5a5;
	font-size: 0.28rem;
	border-bottom: 1px solid #a5a5a5;
	height: 1rem;
	line-height: 1rem;
}

.login_layer .common_box .nav li.cur {
	color: #15bfff;
	border-bottom: 2px solid #15bfff;
}

.login_layer .common_box .nav li span {
	padding-left: 0.37rem;
	/*background: url("../images/phone.png") no-repeat 0 0.05rem;*/
	background-size: 0.15rem 0.24rem;
}

.login_layer .common_box .nav li.cur span {
	/*background: url("../images/phone_lan.png") no-repeat 0 0.05rem;*/
	background-size: 0.15rem 0.24rem;
}

.login_layer .common_box .nav li:last-child span {
	/*background: url("../images/lock.png") no-repeat 0 0.05rem;*/
	background-size: 0.21rem 0.24rem;
}

.login_layer .common_box .nav li:last-child.cur span {
	/*background: url("../images/lock_lan.png") no-repeat 0 0.05rem;*/
	background-size: 0.21rem 0.24rem;
}

.login_layer .common_box .login_way {
	text-align: right;
	margin-right: 0.5rem;
	font-size: 0.18rem;
}

.login_layer .common_box .info_area {
	margin-top: 0.26rem;
}

.login_layer .common_box .info_area .nationalNum {
	font-size: 0.2rem;
	border: 1px solid #cccccc;
	width: 0.7rem;
	height: 0.54rem;
	line-height: 0.54rem;
	text-align: center;
}

.login_layer .common_box .info_area .nationalInput {
	width: 3.3rem;
	margin: 0 0 0 0.3rem;
}

.login_layer .common_box .info_area li .edit_input {
	height: 0.74rem;
	line-height: 0.74rem;
	margin: 0 0.7rem;
	margin-top: 0.3rem;
	display: flex;
	align-items: center;
}

.login_layer .common_box .info_area li div input {
	height: 0.54rem;
	width: 4.14rem;
	border: 1px solid #cccccc;
	padding: 0.1rem 0.2rem;
	border-radius: 3px;
	outline: none;
	font-size: 0.28rem;
	box-shadow: 0px 0px 0px rgba(0, 0, 0, 0);
	-webkit-appearance: none;
}

.login_layer .common_box .info_area li div input.half {
	width: 1.55rem;
}

.login_layer .common_box .info_area li div span.fl {
	font-size: 0.3rem;
	color: #333;
	width: 0.8rem;
	text-align: center;
	height: 0.74rem;
}

.login_layer .common_box .info_area li div span.fl.username {
	background: url('../../assets/images/user_bg.png') no-repeat 0 center;
	background-size: 0.42rem 0.43rem;
}

.login_layer .common_box .info_area li div span.fl.password {
	background: url('../../assets/images/password.png') no-repeat 0 center;
	background-size: 0.39rem 0.43rem;
}

.login_layer .common_box .info_area li div a.get_code {
	height: 0.7rem;
	background: #15bfff;
	width: 1.83rem;
	text-align: center;
	line-height: 0.7rem;
	color: #ffffff;
	border-radius: 5px;
	font-size: 0.28rem;
	float: left;
	margin-left: 0.36rem;
	margin-top: 1px;
}

.login_layer .common_box .info_area p.warn_txt {
	color: #ff4f4f;
	font-size: 0.28rem;
	text-align: center;
	margin-top: 0.1rem;
	padding-bottom: 0.2rem;
	padding-top: 0.2rem;
}

.pr {
	position: relative;
}

.img_code {
	display: inline-block;
	width: 1.03rem;
	height: 0.56rem;
	font-size: 0;
	position: absolute;
	right: 0rem;
}

.img_code:after {
	content: ''; /* 注意这里为双引号 */
	position: absolute;
	left: 0;
	top: 0;
	width: 200%;
	height: 200%;
	border: 1px solid #ccc;
	-webkit-transform-origin: 0 0;
	-moz-transform-origin: 0 0;
	-ms-transform-origin: 0 0;
	-o-transform-origin: 0 0;
	transform-origin: 0 0;
	-webkit-transform: scale(0.5, 0.5);
	-ms-transform: scale(0.5, 0.5);
	-o-transform: scale(0.5, 0.5);
	transform: scale(0.5, 0.5);
	-webkit-box-sizing: border-box;
	-moz-box-sizing: border-box;
	box-sizing: border-box;
	z-index: 1;
	-webkit-transform: scale(0.5);
}

.img_code img {
	display: inline-block;
	vertical-align: top;
	width: 100%;
	height: 100%;
}

.txt_code {
	position: absolute;
	right: 0;
	top: 0.18rem;
	font-size: 0.28rem;
	color: #15bfff;
	height: 0.44rem;
	line-height: 0.44rem;
	border-left: 1px solid #ccc;
	padding: 0 0.1rem;
}

.txt_code.con {
	color: #ccc;
}

.code_phone {
	background: url('../../assets/images/phone_code.png') no-repeat 0 center;
	background-size: 0.42rem 0.48rem;
}

.code_img {
	background: url('../../assets/images/img_code.png') no-repeat 0 center;
	background-size: 0.42rem 0.3rem;
}

.txt_img {
	background: url('../../assets/images/txt_code.png') no-repeat 0 center;
	background-size: 0.42rem 0.3rem;
}

input::-webkit-input-placeholder {
	/*WebKit browsers*/
	color: #dddddd;
}

input::-moz-input-placeholder {
	/*Mozilla Firefox*/
	color: #dddddd;
}

input::-ms-input-placeholder {
	/*Internet Explorer*/
	color: #dddddd;
}

.Bind_account {
	color: #507dad;
	font-size: 0.26rem;
	padding-left: 0.8rem;
	margin: 0 0.7rem;
	margin-top: 0.3rem;
}

.close_btn {
	display: block;
	margin: 0 auto;
	margin-top: 0.48rem;
	width: 0.78rem;
	height: 0.78rem;
}

.close_btn .img {
	display: inline-block;
	text-align: center;
	width: 0.78rem;
	height: 0.78rem;
}
</style>

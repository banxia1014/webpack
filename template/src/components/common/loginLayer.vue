<template>
	<div class="layer_container">
		<div class="login_layer" v-show="isLayers">
			<i @click="closeLayer"></i>
			<!--登录-->
			<div class="common_box middle" v-show="isJumpLogin">
				<div class="nav">
					<p class="title" v-if="isJumpLogin && !isWeixin">登录</p>
					<p class="title" v-else>账户密码绑定</p>
				</div>
				<div class="">
					<ul class="info_area">
						<li>
							<div class="edit_input clearfix">
								<span class="fl username"></span>
								<input
									type="text"
									class="fl"
									id="username"
									v-model.trim="username"
									name="username"
									placeholder="请输入用户名/手机号"
								/>
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
							<div class="Bind_account linkApp">去App找回密码</div>
							<p class="warn_txt">{{ warn_login }}</p>
						</li>
					</ul>
				</div>
				<div class="btn_line clearfix" v-if="isJumpLogin && !isWeixin">
					<a href="javascript:void(0);" class="close" @click="closeLayer">返回</a>
					<a href="javascript:void(0);" class="btn_bg" @click="login">登录</a>
				</div>
				<div class="btn_line clearfix" v-else="">
					<a href="javascript:void(0);" class="close" @click="closeLayer">返回</a>
					<a href="javascript:void(0);" class="btn_bg" @click="bindAccounts">立即绑定</a>
				</div>
			</div>

			<!--账户密码绑定 这个div 暂时无用-->
			<div class="common_box middle" id="bind_box" v-show="isBind">
				<div class="nav">
					<p class="title">账户密码绑定</p>
					<!--<p class="tip">跳过生成新账号，无法再次绑定</p>-->
				</div>
				<div class="">
					<ul class="info_area">
						<li>
							<div class="edit_input clearfix">
								<span class="fl username"></span>
								<input
									type="text"
									class="fl"
									name="username"
									v-model.trim="usernames"
									placeholder="请输入账号"
								/>
							</div>
							<div class="edit_input clearfix">
								<span class="fl password"></span>
								<input
									type="password"
									class="fl"
									name="password"
									v-model.trim="passwords"
									placeholder="请输入密码"
								/>
							</div>
							<div class="Bind_account">去APP找回密码</div>
							<p class="warn_txt"></p>
						</li>
					</ul>
				</div>
				<div class="btn_line clearfix">
					<a href="javascript:void(0);" class="close" id="jump">返回</a>
					<a href="javascript:void(0);" class="btn_bg" @click="userRegister">立即绑定</a>
				</div>
			</div>

			<!--第二步绑定手机号-->
			<div class="common_box middle" id="mobile_box" v-show="isMobile">
				<div class="nav">
					<p class="title" v-if="isJumpRegister && !isWeixin">注册</p>
					<p class="title" v-else>请输入您的手机号</p>
				</div>

				<div class="">
					<ul class="info_area">
						<li>
							<div class="edit_input clearfix">
								<span class="fl code_phone"></span>
								<input
									type="text"
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
								<span class="txt_code" v-show="showTime" @click="getCode">获取验证码</span>
								<span class="txt_code con" v-show="!showTime">剩余{{ count }}s</span>
							</div>
							<div class="Bind_account" v-if="isJumpRegister" @click="bindAccount">账号密码登录</div>
							<p class="warn_txt">{{ warn_login }}</p>
						</li>
					</ul>
				</div>

				<div class="btn_line clearfix">
					<span class="complete" @click="Continue" v-if="isJumpRegister && !isWeixin">注册</span>
					<span class="complete" @click="Continue" v-else>下一步</span>
				</div>
			</div>

			<!--完善资料-->
			<div class="middle" v-show="isProfile">
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
							<div class="edit_input clearfix" v-if="!isWeixin">
								<span class="fl password"></span>
								<input
									type="password"
									v-model.trim="passwordss"
									class="fl"
									name="password"
									placeholder="请输入密码"
								/>
							</div>
							<div class="Bind_account" v-if="!siteInfo.mobile_bind" @click="bindAccount">
								绑定已有账号
							</div>
							<p class="warn_txt">{{ warn_login }}</p>
						</li>
					</ul>
					<div class="btn_line clearfix">
						<span class="complete" v-if="!isWeixin" @click="finish">完成</span>
						<span class="complete" v-else="" @click="Register">完成</span>
					</div>
				</div>
				<div class="close_btn" @click="closeLayer">
					<img class="img" src="../../assets/images/layer_close.png" />
				</div>
			</div>
		</div>
	</div>
</template>
<script>
import {
	userLogin,
	sendVerifyCode,
	checkVerifyCode,
	defalutRegister,
	userRegister,
	bindAccount,
} from '../../api/user.js'
import { isWeiXin, wxGrant, jumpOpenApp } from '../../utils/common.js'
import store from '../../store'
import { mapState } from 'vuex'

export default {
	name: 'layer_container',
	props: [],
	data() {
		return {
			isWeixin: false,
			isBind: false, // 是否显示绑定账号密码
			isMobile: false, // 是否绑定手机
			username: '', // 登录的账户名
			password: '', // 登录的密码
			usernames: '', // 绑定的账户名
			passwordss: '', // 完善资料的时候输入的密码
			passwords: '', // 绑定的密码
			nickname: '', // 自己设定的昵称
			warn_login: '', // 登录时报错的文案提示
			phone: '', // 电话号码
			code: '', // 图片验证
			verifyCode: '', // 短信验证码
			gender: '', // 性别
			imgCode: '', // 图片验证
			showTime: true,
			count: '',
			timer: null,
		}
	},
	components: {},
	computed: {
		...mapState({
			isGuest: state => state.user.isGuest,
			isLayers: state => state.isLayers,
			isJumpLogin: state => state.isJumpLogin,
			isJumpRegister: state => state.isJumpRegister,
			siteInfo: state => state.siteInfo,
			isProfile: state => state.isProfile,
			nickName: state => state.nickName,
		}),
	},
	watch: {
		isJumpRegister(newVal, oldVal) {
			this.isMobile = newVal
		},
	},
	mounted() {
		if (this.nickName !== '') {
			this.nickname = this.nickName
		}
		// 判断是绑定还是注册
		if (this.isJumpRegister) {
			this.isMobile = true
		}
		if (isWeiXin()) {
			this.isWeixin = true
		}
		// 图片验证
		var host = window.location.host
		var protocal = window.location.protocol
		this.imgCode = protocal + '//' + host + '/wap_api/login/authcode'
		//      _this.imgCode = 'https://qianfan-dev.qianfanapi.com/wap_api/login/authcode'
		this.$nextTick(() => {
			jumpOpenApp('linkApp', -1)
		})
	},
	methods: {
		login() {
			let postObj = {}
			postObj.username = this.username
			postObj.password = this.password

			userLogin(postObj).then(res => {
				var data = res.data.data
				if (res.data.ret === 0) {
					this.$vux.toast.text('登录成功')
					localStorage.removeItem('unionid') // 兼容授权之后 未绑定用户 后来开启账号密码登录的情况
					localStorage.setItem('bearerToken', data.bearerToken)
					this.$store.dispatch('analysisBearToken', data.bearerToken)
					this.closeLayer()
				} else {
					this.warn_login = res.data.text
				}
			})
		},
		bindAccount() {
			let _this = this
			if (_this.isGuest) {
				_this.isMobile = false
				store.commit('updateProfile', false)
				store.commit('updateJumpLogin', true)
			} else {
				// alert('是新建用户，不跳转')
			}
		},
		Continue() {
			let _this = this
			_this.code = _this.siteInfo.cfgCache ? _this.code : ' '
			if (_this.isPhoneNum(_this.phone)) {
				var postObj = {}
				postObj.phone = _this.phone
				postObj.verifyCode = _this.verifyCode

				checkVerifyCode(postObj).then(function (res) {
					console.log(res)
					var data = res.data
					if (res.data.ret === 0) {
						_this.warn_login = ''
						_this.isMobile = false
						store.commit('updateProfile', true)
					} else {
						_this.warn_login = data.text
					}
				})
			}
		},
		finish() {
			let _this = this
			let pattern = new RegExp("[`~!@#$^&*()=|{}':;',\\[\\].<>《》/?~！@#￥……&*（）——|{}【】‘；：”“'。，、？]")
			if (_this.nickname === '') {
				_this.warn_login = '用户名不得为空，请输入用户名'
				return false
			}
			if (pattern.test(this.nickname)) {
				_this.warn_login = '用户名中含有特殊字符，请重新输入'
				return false
			}
			if (_this.isPhoneNum(_this.phone) && _this.code !== '') {
				_this.userRegister()
			}
		},
		// 获取短信验证
		getCode() {
			let _this = this
			_this.code = _this.siteInfo.cfgCache ? _this.code : ' '
			if (_this.isPhoneNum(_this.phone)) {
				var postObj = {}
				postObj.code = _this.code
				postObj.type = 2
				postObj.phone = _this.phone

				// 微信授权登录时，如果服务器cookie过期，拿不到unionid，但是本地还有unionid的情况下，服务器重新返回需要登录的状态，并且重新授权
				sendVerifyCode(postObj).then(function (res) {
					console.log(res)
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
						localStorage.removeItem('unionid')
						let href = window.location.href
						let newUrl = href.split('?code')
						wxGrant(newUrl[0], 'register')
					} else {
						_this.warn_login = data.text
					}
				})
			}
		},
		isPhoneNum(phone) {
			var myreg = /^1\d{10}$/
			if (!myreg.test(phone)) {
				this.warn_login = '手机号码填写有误，请重新填写'
				return false
			} else {
				return true
			}
		},
		// 微信注册
		Register() {
			var postObj = {}
			postObj.username = this.nickname
			postObj.phone = this.phone
			postObj.verifyCode = this.verifyCode

			defalutRegister(postObj).then(res => {
				var data = res.data
				if (res.data.ret === 0) {
					localStorage.setItem('bearerToken', data.data.bearerToken)
					this.$store.dispatch('analysisBearToken', data.data.bearerToken)
					this.warn_login = ''
					// 注册成功
					this.showToast(true, 'text', '注册成功！')
					this.closeLayer()
				} else {
					this.warn_login = data.text
				}
			})
		},
		// 浏览器注册 或  微信绑定已有账号
		userRegister() {
			var postObj = {}
			postObj.username = this.nickname
			postObj.password = this.passwordss ? this.passwordss : this.passwords
			postObj.gender = this.gender
			postObj.phone = this.phone
			postObj.verifyCode = this.verifyCode

			userRegister(postObj).then(res => {
				var data = res.data
				if (res.data.ret === 0) {
					localStorage.setItem('bearerToken', data.data.bearerToken)
					this.$store.dispatch('analysisBearToken', data.data.bearerToken)
					this.warn_login = ''
					// 注册成功
					this.showToast(true, 'text', '注册成功！')
					this.closeLayer()
				} else {
					this.warn_login = data.text
				}
			})
		},
		// 账户密码绑定
		bindAccounts() {
			var postObj = {}
			postObj.username = this.username
			postObj.password = this.password

			bindAccount(postObj).then(res => {
				var data = res.data
				if (res.data.ret === 0) {
					localStorage.setItem('bearerToken', data.data.bearerToken)
					this.$store.dispatch('analysisBearToken', data.data.bearerToken)
					this.warn_login = ''
					// 注册成功
					this.showToast(true, 'text', '绑定成功！')
					store.commit('updateGuest', false)
					this.closeLayer()
				} else if (res.data.ret === 4) {
					// 服务器unionid过期，重新授权
					localStorage.removeItem('unionid')
					let href = window.location.href
					let newUrl = href.split('?code')
					wxGrant(newUrl[0], 'register')
				} else {
					this.warn_login = data.text
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
		closeLayer() {
			store.commit('updateLayers', false)
		},
	},
}
</script>
<style lang="scss">
@import '../../assets/css/layer.scss';
</style>

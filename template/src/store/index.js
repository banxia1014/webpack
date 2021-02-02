import Vue from 'vue'
import Vuex from 'vuex'
import { publicDate } from '../api/user.js'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    /*用户相关的*/
	siteUser: {},
    avatar: '',
    bearToken: '',
    isGuest: true,
	nickName: '',
    /*--end--*/
	/*登录弹窗的状态*/
	isLayers: false,
	isJumpLogin: false,
	isJumpRegister: false,
	isProfile: false, // 是否开启绑定已有账户
	isMobile: true, // 是否绑定手机
	/*--end--*/
    errorMessage: '', // 接口返回的报错信息
    showNoLogin: false, // 未登录弹窗
	siteInfo: {}, //站点信息
	host: '',
	shareInfo: {}, // 分享信息
	open_whole_wap: 1, // 是否购买了wap
	social: {},
	unionid: '',
	showWxLayer: false,
	no_phone: false, // 没有绑定手机号
	showDialog: false,
	schemeUrl: '', // 协议
  },
  mutations: {
    /*用户相关的*/
	updateName(state, name) {
		state.nickName = state.siteUser.nickName
	},
	updateAvatar(state, data) {
		state.avatar = data
	},
	updateToken(state, token) {
		state.bearToken = token
	},
	updateGuest(state, data) {
		state.isGuest = data
	},
    /*--end--*/
    /*--全局报错类--*/
    updateError(state, error) {
      state.errorMessage = error
    },
    updateNologin(state, login) {
      state.showNoLogin = login
    },
    /*--end--*/
	updateLayers(state, layers) {
		state.isLayers = layers
	},
	updateJumpLogin(state, jumpLogin) {
		state.isJumpRegister = !jumpLogin
		state.isJumpLogin = jumpLogin
	},
	updateJumpRegister(state, jumpRegister) {
		state.isJumpLogin = !jumpRegister
		state.isJumpRegister = jumpRegister
	},
	updateProfile(state, Profile) {
		state.isProfile = Profile
	},
	updateMobile(state, mobile) {
		state.isMobile = mobile
	},
	updateSiteInfo(state, info) {
		state.siteInfo = info
	},
	updateHost(state, url) {
		state.host = url
	},
	updateShareInfo(state, info) {
		state.shareInfo = info
	},
	updateOpenWholeWap(state, open) {
		state.open_whole_wap = open
	},
	updateSocial(state, socialObj) {
		state.social = socialObj
	},
	updateSiteUser(state, user) {
		state.siteUser = user
	},
	updateUnionid(state, id) {
		state.unionid = state.siteUser.unionid
	},
	updateShowWxLayer(state, show) {
		state.showWxLayer = show
	},
	updateNoPhone(state, flag) {
		state.no_phone = flag
	},
	updateDialog(state, dialog) {
		state.showDialog = dialog
	},
	updateSchemeUrl(state, direct) {
		state.schemeUrl = direct
	},
  },
  actions: {
	  analysisBearToken({ state, commit }, token) {
		  this.commit('updateToken',token)
	  	publicDate().then(res => {
	  		this.dispatch('updatePublicData', res.data)
	  	})
	  },
	  updatePublicData({ state, commit }, data) {
	  	this.commit('updateSiteInfo', data.siteInfo)
	  	this.commit('updateSiteUser', data.user)
	  	this.commit('updateShareInfo', data.share)
	  	this.commit('updateHost', data.share_url)
	  	this.commit('updateOpenWholeWap', data.open_whole_wap)
	  	this.commit('updateSocial', data.social)
	  	this.commit('updateGuest',data.user.is_guest)
		this.commit('updateToken',data.user.bearerToken)
		this.commit('updateAvatar',data.user.avatar)
	  },
  }
})

// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import "babel-polyfill"
import { publicDate } from './api/user.js'
import { CheckLoginAndBindPhone,changeWxCodeToUser,delUrlParams } from './utils/common.js'
import { WechatPlugin, ToastPlugin, ConfirmPlugin, AlertPlugin, DatetimePlugin, LoadingPlugin } from 'vux'
import { getUrlParam } from './utils/authService'

Vue.use(WechatPlugin)
Vue.use(ToastPlugin)
Vue.use(ConfirmPlugin)
Vue.use(AlertPlugin)
Vue.use(LoadingPlugin)
Vue.use(DatetimePlugin)

Vue.config.productionTip = false
Vue.prototype.$store = store
Vue.prototype.CheckLoginAndBindPhone = CheckLoginAndBindPhone

// 全局钩子
router.beforeEach(async (to, from, next) => {
	if (localStorage.getItem('bearerToken') && localStorage.getItem('bearerToken') !== '' && localStorage.getItem('bearerToken') !== 'undefined') {
		let token = localStorage.getItem('bearerToken')
		store.dispatch('analysisBearToken', token)
	}else{
		/* 判断store里面是否有站点信息 */
		if (!!store.state.siteInfo && Object.keys(store.state.siteInfo) <= 0) {
			let res = await publicDate()
			await store.dispatch('updatePublicData', res.data)
		}
		/*--end--*/
	}
	if (getUrlParam('code') && store.state.isGuest) {
		let res = await changeWxCodeToUser(getUrlParam('code'))
		if (res) {
			let url = delUrlParams(window.location.href, 'code')
			window.location.href = url
		}
	}
	next()
})


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})

import Vue from 'vue'
import Vuex from 'vuex'
import { decodeBase64Content } from '../utils/common'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    /*用户相关的*/
    isGuest: false, // 是否是游客
    wapUser: [], // wap用户，通过beartoken来解析的用户
    bearToken: '', // header Authorization的值，用来跟接口校验用户的
    /*--end--*/
    errorMessage: '', // 接口返回的报错信息
    showNoLogin: false, // 未登录弹窗
  },
  mutations: {
    /*用户相关的*/
    updateUser(state, user) {
      state.wapUser = user
    },
    updateGuest(state, guest) {
      state.isGuest = guest
    },
    updateToken(state, token) {
      state.bearToken = token
    },
    /*--end--*/
    /*--全局报错类--*/
    updateError(state, error) {
      state.errorMessage = error
    },
    updateNologin(state, login) {
      state.showNoLogin = login
    }
    /*--end--*/
  },
  actions: {
    analysisBearToken({state,commit}, token) {
      let result = token.split('.')
      let user = JSON.parse(decodeBase64Content(result[1]))
      let timestamp = new Date().getTime()
      if (user && user.exp && user.exp * 1000 > timestamp) {
        commit('updateGuest', false)
        let wapUser = []
        wapUser.uid = user.jti
        wapUser.username = user.username
        wapUser.avatar = user.avatar
        commit('updateUser', wapUser)
        commit('updateToken',token)
      }
    }
  }
})

{{#if_eq build "standalone"}}
// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
{{/if_eq}}
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import "babel-polyfill"

Vue.config.productionTip = false
Vue.prototype.$store = store

// 全局钩子
router.beforeEach((to, from, next) => {
  /* 将登录之后存在本地的bearerToken提交到store*/
  if (localStorage.getItem('bearerToken') && localStorage.getItem('bearerToken') !== 'undefined') {
    let token = localStorage.getItem('bearerToken')
    store.dispatch('analysisBearToken', token)
  }
  /*--end--*/
  next()
})


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  {{#if_eq build "runtime"}}
  render: h => h(App)
  {{/if_eq}}
  {{#if_eq build "standalone"}}
  components: { App },
  template: '<App/>'
  {{/if_eq}}
})

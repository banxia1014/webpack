<template>
  <div id="app">
    <router-view/>
    <noLogin v-show="$store.state.showNoLogin"></noLogin>
    <commonError v-show="$store.state.errorMessage !== ''"></commonError>
	<!-- <login></login> -->
	<wxLogin></wxLogin>
	<Dialog :showDialog="$store.state.showDialog"></Dialog>
  </div>
</template>

<script>
import noLogin from '@/components/common/noLogin'
import commonError from '@/components/common/error'
import login from '@/components/common/loginLayer.vue'
import wxLogin from '@/components/common/wxLoginLayer.vue'
import Dialog from '@/components/common/dialog.vue'
export default {
  name: 'App',
  components: {
    noLogin,
    commonError,
	login,
	wxLogin,
	Dialog
  }
}
</script>

<style lang="scss">
	@import "./assets/css/base.scss";
	@import "./assets/css/mixin.scss";
	@import "./assets/css/reset.scss";
</style>

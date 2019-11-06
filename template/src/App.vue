<template>
  <div id="app">
    <img src="./assets/logo.png">
    <router-view/>
    <noLogin v-show="$store.state.showNoLogin"></noLogin>
    <commonError v-show="$store.state.errorMessage !== ''"></commonError>
  </div>
</template>

<script>
import noLogin from '@/components/common/noLogin'
import commonError from '@/components/common/error'
export default {
  name: 'App',
  components: {
    noLogin,
    commonError
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>

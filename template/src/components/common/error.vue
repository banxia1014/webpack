<template>
  <div class="error">
    <img src="../../assets/images/error.png">
    <p v-html="errorMsg"></p>
  </div>
</template>
<script>
  import { mapState } from 'vuex'
  export default {
    data() {
      return {}
    },
    computed:{
      ...mapState({
        errorMsg:state=>state.errorMessage
      })
    }
  }
</script>
<style lang="scss">
  .error{
    width: 100%;
    height: 100%;
    text-align: center;
    img{
      width: 2.1rem;
      height: 2.1rem;
      margin:3.82rem auto 0.08rem;
    }
    p{
      font-size: 0.3rem;
      color: #999999;
      text-align: center;
      font-family: PingFangSC-Regular, sans-serif;
    }
  }
</style>

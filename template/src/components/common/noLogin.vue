<template>
  <div class="no_content">
    <div class="noContent">
      <img src="../../assets/images/no_content.png" class="img"/>
      <p class="txt">请先登录</p>
      <span class="go_login" @click.prevent="login()">去登录</span>
    </div>
  </div>
</template>
<script>
    export default{
        name:'no_login',
        props:{

        },
        data(){
            return {

            }},
        components: {

        },
        mounted(){

        },
        methods:{
          login: function(){
            QFH5.jumpLogin(function(state,data){

            })
          }
        }
    }
</script>

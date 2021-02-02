<template>
  <div>
	<button @click="test">test</button>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data () {
    return {
		
    }
  },
  components:{
	 
  },
  mounted() {
  	
  },
  methods:{
	test(){
		let callBack = function(){
			console.log(1)
		}
		this.CheckLoginAndBindPhone(true,callBack,callBack)
	}
  }
}
</script>

<style scoped>
	
</style>

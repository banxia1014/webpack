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
		this.CheckLoginAndBindPhone()
	}
  }
}
</script>

<style scoped>
	
</style>

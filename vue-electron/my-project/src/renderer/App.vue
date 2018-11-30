<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App',
  mounted(){
		//我的监控台弹出下拉菜单
	  $(document).on("click",".el-menu .clickShow",function(){
	  		if($(this).closest("div").next("div").find(".el-submenu").is(":visible")){
	  			$(this).closest("div").next("div").find(".el-submenu").hide();
	  		}else{
	  			$(this).closest("div").next("div").find(".el-submenu").show();
	  		}
	
	  	})
  }
}
</script>
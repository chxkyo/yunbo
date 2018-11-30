
<template>
	<div>
		<component v-bind="linkProps(to)" v-if="!isOperate">
    	<slot/>
  	</component>
	  <div class="opearte-menuitem-wrap" v-else @click="deleteCamera(cameraIndex,itemMeta,$event)">
	  	 <slot/>
	  </div>
	</div>
  <!-- eslint-disable vue/require-component-is-->

</template>

<script>
import { isExternal } from '@/utils'
import { mapGetters } from 'vuex'
import flv from 'flv'
export default {
  props: {
    to: {
      type: String,
      required: true
    },
    isOperate:{
    	type:Boolean,
    	default:false
    },
    cameraIndex:{
    	type:Number,
    	default:0
    },
    itemMeta:{
    	type:Object,
    	default:function(){
    		return {}
    	}
    }
  },
  computed:{
	...mapGetters([
      'liveArrs',
      'device'
    ])
  },
  methods: {
    isExternalLink(routePath) {
      return isExternal(routePath)
    },
    linkProps(url) {

    	if (this.isExternalLink(url)) {
	        return {
	          is: 'a',
	          href: url,
	          target: '_blank',
	          rel: 'noopener'
	        }
	    }
    	if(url === '/myDevice/monitorConsole'){
    		return {
	        	is: 'router-link',
	        	to: url,
	        	class:"clickShow"
	        }
	
    	}else{
    	   	return {
		        is: 'router-link',
		        to: url
	      	}
	
    	}
    },
    deleteCamera(index,meta,event){
    	if(meta.icon === 'add'){
    		let i = 0,streamurl = '';
    		this.liveArrs.forEach(function(val,index){
    			if(val.isAddVideo){
    				i++
    			}
    		});
    		if(this.device === 'mobile'){
    			if(i === 1){
	    			this.$message({
	    				message: '监控台已经添加了1台设备，请移除后再添加！',
	          			type: 'warning'
	    			});
	    			return false;
	    		}
    		}else{
    			if(i === 4){
	    			this.$message({
	    				message: '监控台已经添加了4台设备，请移除后再添加！',
	          			type: 'warning'
	    			});
	    			return false;
	    		}
    		}

    		let index = this.liveArrs.findIndex(function(val,index){
    			return !val.isAddVideo;
    		});
    		meta.settingPosition = index;
    		if(flv.isSupported() && this.device === 'desktop'){
    			streamurl = meta.flv;
    		}else{
    			streamurl = meta.hls;
    		}
    		this.$set(this.liveArrs,index,{
    			isAddVideo:true,
    			url:streamurl,
    			title:meta.title
    		})
			this.$notify({
				title: '成功',
				message: '设备添加成功!',
				type: 'success',
				duration: 2000
			});
    		meta.icon = 'delete';
    		
    	}else if(meta.icon === 'delete'){
				this.$confirm('此操作将此设备移除, 是否继续?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
						this.$set(this.liveArrs,meta.settingPosition,{
							isAddVideo:false,
							url:'',
							title:''
						})
						meta.settingPosition = 'undefined';
					    meta.icon = "add";
						this.$notify({
							title: '成功',
							message: '移除成功',
							type: 'success',
							duration: 2000
						});
						
				}).catch(() => {});
    	}
    }
  }
}
</script>
<style type="text/css">
	.opearte-menuitem-wrap .el-menu-item{
		color: rgb(191, 203, 217) !important;
	}
</style>

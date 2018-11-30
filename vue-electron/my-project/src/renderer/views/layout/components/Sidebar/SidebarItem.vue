<template>
  <div class="menu-wrapper">
    <template v-for="item in routes" v-if="!item.hidden&&item.children">
      <router-link v-if="hasOneShowingChildren(item.children) && !item.children[0].children&&!item.alwaysShow" :to="item.path+'/'+item.children[0].path"
        :key="item.children[0].name">
        <el-menu-item :index="item.path+'/'+item.children[0].path" :class="{'submenu-title-noDropdown':!isNest}">
          <svg-icon v-if="item.children[0].meta&&item.children[0].meta.icon" :icon-class="item.children[0].meta.icon"></svg-icon>
          <span v-if="item.children[0].meta&&item.children[0].meta.title" slot="title">{{item.children[0].meta.title}}</span>
        </el-menu-item>
      </router-link>
      

      <el-submenu v-else :index="item.name||item.path" :key="item.name">
        <template slot="title">
          <svg-icon v-if="item.meta&&item.meta.icon" :icon-class="item.meta.icon"></svg-icon>
          <span v-if="item.meta&&item.meta.title" slot="title">{{item.meta.title}}</span>
        </template>

        <template v-for="(child,index) in item.children" v-if="!child.hidden">
          <sidebar-item :is-nest="true" class="nest-menu" v-if="child.children&&child.children.length>0" :routes="[child]" :key="child.path"></sidebar-item>
          <div v-else>
          	<div v-if="child.meta.isOperate" class="opearte-menuitem-wrap" @click="deleteCamera(index,child.meta,$event)">
							<el-menu-item :index="item.path+'/'+child.path">
	              <svg-icon v-if="child.meta&&child.meta.icon" :icon-class="child.meta.icon"></svg-icon>
	              <span v-if="child.meta&&child.meta.title" slot="title">{{child.meta.title}}</span>
	            </el-menu-item>
						</div>
						<div v-else>
							<router-link  :to="item.path+'/'+child.path" :key="child.name">
		            <el-menu-item :index="item.path+'/'+child.path">
		              <svg-icon v-if="child.meta&&child.meta.icon" :icon-class="child.meta.icon"></svg-icon>
		              <span v-if="child.meta&&child.meta.title" slot="title">{{child.meta.title}}</span>
		            </el-menu-item>
		          </router-link>
						</div>
          </div>
        </template>
      </el-submenu>

    </template>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import flv from 'flv'
export default {
  name: 'SidebarItem',
  props: {
    routes: {
      type: Array
    },
    isNest: {
      type: Boolean,
      default: false
    }
  },
  computed:{
		...mapGetters([
	      'liveArrs',
	      'device'
	    ])
  },
  methods: {
    hasOneShowingChildren(children) {
      const showingChildren = children.filter(item => {
        return !item.hidden
      })
      if (showingChildren.length === 1) {
        return true
      }
      return false
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

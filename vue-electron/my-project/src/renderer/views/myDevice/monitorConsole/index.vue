<template>
	<div class="app-container" :class="{'mobile-app-container':device === 'mobile'}">
		<el-row :gutter="20" style="height: calc((100vh - 144px)/2);" v-if="device === 'desktop'">
			<el-col :span="12" style="height: 100%;margin-bottom: 20px;" v-for="(item,index) in liveArrs" :key="index">
				<div class="video-wrap remove-video-wrap">
					<div class="video-weizhi-tips">位置编号：{{index+1}}</div>
					<div class="video-device-name" v-if="!item.isAddVideo">未添加任何设备</div>
					<div class="video-inner-wrap" v-else>
						<video-player :videourl="item.url"></video-player>
						<div class="video-device-innername" v-if="item.title">摄像机：{{item.title}}</div>
					</div>
				</div>
			</el-col>
		</el-row>
		<div v-else>
			<el-tabs type="border-card" :stretch="true" @tab-click="tabClick">
			  <el-tab-pane label="我的监控台">
			  	<keep-alive>
					  	<el-row :gutter="20" v-if="activeTab == 0">
							<el-col :span="24" v-for="(item,index) in camera_list" :key="index">
								<div class="video-wrap">
									<div class="video-inner-wrap">
										<video-player :videourl="item.hls"></video-player>
									</div>
								</div>
								<div class="video-title" v-if="item.title"><svg-icon icon-class="camera2" style="margin-right: 5px;"/> {{item.title}}</div>
							</el-col>
						</el-row>
				</keep-alive>
			  </el-tab-pane>
			  <el-tab-pane label="监控回放">
			  	<keep-alive >
					<replay-list v-if="activeTab == 1"></replay-list>
				</keep-alive>
			  </el-tab-pane>
			</el-tabs>
		</div>

	</div>
</template>

<script>
	import VideoPlayer from '@/components/VideoPlayer'
	import ResizeMixin from '@/views/layout/mixin/ResizeHandler'
	import ReplayList from '@/components/cameraReplayList'
	import { mapGetters } from 'vuex'
	import request from '@/utils/request'
	export default{
		name:'monitorConsole',
		data(){
			return {
				activeTab:0
			}
		},
		components:{VideoPlayer,ReplayList},
		computed:{
			...mapGetters([
		      'liveArrs'
		    ]),
			device() {
			    return this.$store.state.app.device
			},
			camera_list(){
				return this.$store.state.video.camera_list
			}
		},
		methods:{
			tabClick(e){
				$(".video_load").hide();
				this.activeTab = e.index;
			}
		}
	}
</script>

<style>
	.app-container{padding: 20px 20px 0;}
	.mobile-app-container.app-container{padding: 0px;min-height: calc(100vh - 50px);background-color: #2c3134;}
	.mobile-app-container.app-container .el-tabs--border-card{background-color: #2c3134;}
	.video-wrap {position: relative;height: 100%;z-index: 1;}
	.remove-video-wrap {background-color: #666;}
	.video-weizhi-tips,.video-device-name,.video-device-innername{position: absolute;font-size: 18px;color: #fff;}
	.video-weizhi-tips{top: 40px;left: 20px;}
	.video-device-name,.video-device-innername{bottom: 20px;left: 20px;z-index: -1;}
	.video-device-innername{z-index: 1;}
	.video-wrap .container,.video-wrap .player,.video-inner-wrap{height: 100%;}
	.el-tabs--border-card{border: 0 none;box-shadow: none}
	.video-title{padding-left: 10px;line-height: 50px;color: #fff;}
</style>
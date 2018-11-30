<template>
	<div class="camera-replay-list-wrap" >
		<el-row>
			<el-col :span="24" >
				<div class="video-wrap">
					<div class="video-inner-wrap" >
						<ali-player  v-if="list.length>0" ref="aliplayer" :videoList="list"></ali-player>
					</div>
				</div>
			</el-col>
		</el-row>
		<div class="camera-split"></div>
		<div class="camera-wrap-list">
			<div class="camera-wrap-list-header">
				录像列表
			</div>
			<div class="camera-list-scroll" v-infinite-scroll="loadMore" infinite-scroll-disabled="busy" infinite-scroll-distance="5">
				<div class="camera-list" >
					<div class="camera-list-item" v-for="(item,index) in list" :key="index" @click="changePlayer(item)" v-if="index !==0 "> 
						<div class="img-wrap">
							<span class="video-time">{{item.replay_length|timeFilter}}</span>
							<div class="play-cover"></div>
						</div>
						<div class="con-wrap">
							<div class="title">设备号：{{item.serial_number}}</div>
							<div class="title">时间：{{item.replay_time}}</div>
						</div>
					</div>
				</div>
				<none v-show="tips"></none>
				<loading v-show="loading"></loading>
			</div>
		</div>
	</div>
</template>

<script>
	import {getCameraReplayList} from '@/api/userCamera'
	import AliPlayer from '@/components/aliPlayer'
	import None from '@/components/None'
	import Loading from '@/components/Loading'
	export default{
		name:'repalyList',
		components:{None,Loading,AliPlayer},
		filters: {
			timeFilter(time){
				return time.split(".")[0]
			}
		},
		data(){
			return{
				list:[],
				tips:false,
				loading:true,
				num:10,
    			busy: false,
			}
		},
		created(){
			this.page = 1;
			this.getData();
		},
		methods:{
			getData(){
				getCameraReplayList({page:this.page++,limit:5}).then(res=>{
					if(res.data.user_cameras_replay_list.data.length>0){
						this.list.push(...res.data.user_cameras_replay_list.data);
						this.busy = false;
					}else{
						this.busy = true;
						this.tips = true;
						this.loading = false;
					}
				})
			},
			loadMore(){
				let vm = this;
				this.busy = true;
		      	this.loading = true;
		      	setTimeout(() => {
			        vm.getData();
			    }, 1000);
			},
			changePlayer(item){
				this.$refs.aliplayer.playVideo(item)
			}
		}
	}
</script>

<style> 
	.camera-wrap-list-header{font-size: 20px;color: #fff;letter-spacing: 0;text-align: left;margin: 20px 0;line-height: 24px;}
	.camera-split{border-bottom: 1px solid #73777a;}
	.camera-list-item{margin-bottom: 10px;overflow: hidden;}
	.img-wrap{float:left;height: 100px;position: relative;width: 175px;}
	.video-time{-moz-osx-font-smoothing: grayscale;-webkit-font-smoothing: antialiased;background-color: rgba(0, 0, 0, 0.8);bottom: 5px;color: #fff;display: block;font-size: 12px;font-weight: bold;padding: 0 5px;position: absolute;right: 5px;text-align: right;z-index: 1;}
	.play-cover{position: absolute;top: 0;left: 0;right: 0;bottom: 0;background: rgba(0, 0, 0, 0.8) url(../../assets/images/small-play.png) center center no-repeat;background-size: 22px 22px;}
	.con-wrap{overflow: hidden;}
	.con-wrap .title{-webkit-box-orient: vertical;-webkit-line-clamp: 5;color: #fff;display: -webkit-box;font-size: 16px;letter-spacing: 0;line-height: 18px;text-align: left;text-overflow: ellipsis;white-space: normal;overflow: hidden;margin-left: 10px;margin-bottom: 10px;}
	.camera-list-scroll{max-height: 300px;-webkit-overflow-scrolling:touch;overflow-y:scroll;}
</style>
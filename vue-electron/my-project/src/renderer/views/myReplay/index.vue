<template>
	<div class="app-container">
		<div class="replay-wrapper">
			<!--<el-row :gutter="20">-->
			  <!--<el-col :span="18">-->
			  	<div class="replay-right-wrapper">
			  		<div class="filter-container">
					    <el-date-picker
					      v-model="alltime"
					      type="datetimerange"
					      start-placeholder="开始日期"
					      end-placeholder="结束日期"
					      align="right"
					      :picker-options="pickerOptions1" size="small" value-format="yyyy-MM-dd HH:mm:ss">
					    </el-date-picker>
					    <el-button class="filter-item" type="primary" v-waves icon="el-icon-search" @click="handleFilter" size="small" style="margin-left: 10px;">搜索</el-button>
			  		</div>
			  		<div class="replay-list-wrap">
			  			<div class="replay-list-inner-wrap" v-infinite-scroll="loadMore" infinite-scroll-disabled="busy" infinite-scroll-distance="5">
			  				<ul class="replay-list-ul" v-for="(item,index) in list">
				  				<li class="replay-list-item" @click="changePlayer(item)">
				  					<div class="img-wrap">
				  						<span class="video-time">05:37</span>
				  						<div class="play-cover"></div>
				  					</div>
				  					<div class="con-wrap">
				  						<div class="serial-number">设备号：{{item.serial_number}}</div>
				  						<div class="replay-length">时长：{{item.replay_length}}</div>
				  						<div class="replay-length">开始时间：{{item.replay_time}}</div>
				  					</div>
				  				</li>
				  			</ul>
				  			<none v-show="tips"></none>
							<loading v-show="loading"></loading>
			  			</div>
			  		</div>
			  	</div>
			  	<div class="replay-left-wrapper">
			  		<ali-player  v-if="list.length>0" ref="aliplayer" :videoList="list" :height="height"></ali-player>
			  	</div>
			  <!--</el-col>-->
			  <!--<el-col :span="6" style="min-width: 400px;">-->
			  <!--</el-col>-->
			<!--</el-row>-->
		</div>
	</div>
</template>

<script>
	import {getCameraReplayList} from '@/api/userCamera'
	import AliPlayer from '@/components/aliPlayer'
	import None from '@/components/None'
	import Loading from '@/components/Loading'
	import waves from '@/directive/waves'
	export default{
		name:'myReplay',
		components:{None,Loading,AliPlayer},
		directives: {
    		waves
 		},
		data(){
			return{
				list:[],
				tips:false,
				loading:true,
				num:10,
    			busy: false,
    			height:'calc(100vh - 148px)',
    			alltime:'',
    			listQuery:{
    				start_time:'',
    				end_time:'',
    				page:1,
    				limit:10,
    			},
    			pickerOptions1: {
		          shortcuts: [{
		            text: '今天',
		            onClick(picker) {
		              const end = new Date();
		              const start = new Date();
		              start.setTime(new Date(new Date().toLocaleDateString()).getTime());
		              picker.$emit('pick', [start, end]);
		            }
		          }, {
		            text: '昨天',
		            onClick(picker) {
		              const yesterday = new Date(new Date().getTime() - 3600 * 1000 * 24);
		              const end = new Date();
		              const start = new Date();
		              start.setTime(new Date(yesterday.toLocaleDateString()).getTime());
		              end.setTime(new Date(yesterday.toLocaleDateString()).getTime() + 24 * 60 * 60 * 1000 - 1);
		              picker.$emit('pick',[start, end]);
		            }
		          }, {
		            text: '最近一周',
		            onClick(picker) {
		              const end = new Date();
		              const start = new Date();
		              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
		              picker.$emit('pick', [start, end]);
		            }
		          }]
		        }
			}
		},
		created(){
			this.getData();
		},
		methods:{
			getData(){
				getCameraReplayList(this.listQuery).then(res=>{
					if(res.data.user_cameras_replay_list.data.length>0){
						this.list.push(...res.data.user_cameras_replay_list.data);
						this.busy = false;
					}else{
						this.busy = true;
						this.tips = true;
						this.loading = false;
					}
					this.listQuery.page++;
				})
			},
			loadMore(){
				let vm = this;
				this.busy = true;
		      	this.loading = true;
		      	this.tips = false;
		      	setTimeout(() => {
			        vm.getData();
			    }, 1000);
			},
			changePlayer(item){
				this.$refs.aliplayer.playVideo(item)
			},
			handleFilter() {
				this.listQuery.page = 1;
				getCameraReplayList(this.listQuery).then(res=>{
					if(res.data.user_cameras_replay_list.data.length>0){
						this.busy = false;
						this.listQuery.page++;
					}
					this.list = res.data.user_cameras_replay_list.data;
				})
			}
		},
		watch:{
			alltime:function(val){
				this.listQuery.start_time = val[0];
				this.listQuery.end_time = val[1];
			}
		}
	}
</script>

<style scoped>
	.replay-wrapper{overflow: hidden;height: calc(100vh - 124px);}
	.replay-left-wrapper{overflow: hidden;}
	.replay-right-wrapper{float:right;height: calc(100vh - 124px);margin-left: 20px;}
	.img-wrap{position: relative;float: left;height: 100px;width: 175px;margin-right: 20px;}
	.img-wrap:hover .play-cover{opacity: 1;visibility: visible;}
	.play-cover{position: absolute;top: 0;left: 0;right: 0;bottom: 0;background: rgba(0, 0, 0, 0.8) url(../../assets/images/small-play.png) center center no-repeat;background-size: 22px 22px;opacity: 1;visibility: visible;transition: opacity .4s;}
	.con-wrap{display: -webkit-box;-webkit-box-orient: vertical;-webkit-line-clamp: 5;overflow: hidden;}
	.replay-list-item{margin-bottom:20px;overflow: hidden;color: #fff;cursor: pointer;}
	.replay-list-wrap{height: calc(100vh - 200px);background-color: #2e2e36;overflow-y: scroll;}
	.replay-list-inner-wrap{padding: 20px;}
	.video-time{-moz-osx-font-smoothing: grayscale;-webkit-font-smoothing: antialiased;background-color: rgba(0, 0, 0, 0.8);bottom: 5px;color: #fff;display: block;font-size: 12px;font-weight: bold;padding:5px;position: absolute;right: 5px;text-align: right;z-index: 1;}
	.serial-number{font-size: 20px;}
	.replay-length{margin-top: 10px;}
</style>
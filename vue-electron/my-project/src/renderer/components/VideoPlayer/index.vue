<template>
	<div class="container" ref="videocontainer">
        <div class="player">
			<video  ref="videoelement" controls autoplay width="100%" height="100%" v-if="isSupport && device === 'desktop'" class="video">Your browser is too old which doesn't support HTML5 video.</video>
			<div class="video_wrap videolive" ref="videolive" v-else>
            	<p class="video_load">视频加载中,您请稍后...</p>
            	<p class="change_load">视频切换中...</p>
            </div>
			<!--<video  ref="videoelement" x-webkit-airplay="true" webkit-playsinline="" x5-video-player-type="h5" x5-video-player-fullscreen="true" playsinline="" width="100%" height="100%" :src="videourl"   poster="@/assets/images/default-avatar.gif" autoplay v-else></video>-->
 		</div>
 	</div>
</template>

<script>
import flv from 'flv'
import {html5playerRun} from '@/utils/html5player'
export default {
    name: 'VideoPlayer',
    data(){
    	return {
    		html5player:null
    	}
    },
    props:{
    	videoId:{
    		type:Number
    	},
    	videourl:{
    		type:String
    	}
    },
    computed:{
    	isSupport(){
    		return flv.isSupported();
    	},
		device() {
		    return this.$store.state.app.device
		}
    },
    mounted(){
    	let that = this;
    	if (flv.isSupported() && that.device === 'desktop') {
    		let videoElement = this.$refs.videoelement;
    		const loading = this.$loading({
	          text: '加载中...',
	          spinner: 'el-icon-loading',
	          background: 'rgba(0, 0, 0, 0.7)',
	          target:this.$refs.videocontainer
	        });
	        let flvPlayer = flv.createPlayer({
	        	isLive:true,
	            type: 'flv',
	            url: that.videourl
	        });
	        flvPlayer.attachMediaElement(videoElement);
	        flvPlayer.load();
	        flvPlayer.play().then(res=>{
	        	loading.close();
	        })
	    }else{
	    	this.html5player = new html5playerRun({
					autostart:false,
					container:this.$refs.videolive,
					controlbardisplay:"enable",
					height:"100%",
					hlsUrl:that.videourl,
					isPc:false,
					isdefaultfull:true,
					mobilefullscreen:true,
					width:"100%",
					mode:1
				});
	    }
   }
}
</script>
<style>
	.video_wrap {
	    width: 100%;
	    height: 100%;
	    overflow: hidden;
	    position: absolute;
	}
	.videoBox{background: #000000 !important;}
	.video_load ,.change_load{
	    position: absolute;
	    z-index: 10;
	    left: 0;
	    top: 50%;
	    color: #fff;
	    text-align: center;
	    font-size: 14px;
	    width: 100%;
	    display: none;
	    margin:  -8px 0 0 0;
    }
    .player_btn{
    	position: absolute;
	    width: 93px;
	    height: 93px;
	   	left: 50%;
	    top:50%;
	    margin: -46.5px 0 0 -46.5px;
	    z-index: 1;
    }
    .player_btn_bg{
		width: 100%;
		height: 100%;
	    background: url(../../assets/images/play.png) no-repeat;
	    background-size: contain;
    }
    .mps-danmu{z-index: 1;}
</style>
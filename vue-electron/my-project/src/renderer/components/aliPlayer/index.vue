<template>
	<div class="container">
		<div class="player">
			<div class="player-olympic player-olympic-sm-screen"  ref="playerTemp">
			</div>
		</div>
	</div>
</template>

<script>
	import playerNextComponent from '@/components/playerNextComponent';
	import playerTipComponent from '@/components/playerTipComponent';

	export default {
		name: 'aliPlayer',
		props: {
			videoList: {
				type: Array,
				default() {
					return []
				}
			},
			height:{
				type:String,
				default:'300px'
			}
		},
		data() {
			return {
				player: null,
				playingVideo: {},
				fullScreen: false
			}
		},
		mounted: function() {
			this.createDemoPlayer(this.videoList[0].server_url+this.videoList[0].replay_url);
			this.playingVideo = this.videoList[0];
			this.videoLoading = false;
		},
		methods: {
			playVideo(video) {
				if(this.player === null || this.playingVideo.replay_url === video.replay_url) {
					return;
				}
				this.player.loadByUrl(video.server_url+video.replay_url);
				this.playingVideo = video;
				return;
			},
			createDemoPlayer(source, cover) {
				if(document.getElementById('player-con') === null) {
					let playerDomWrap = this.$refs.playerTemp;
					let playerDom = document.createElement('div');
					playerDom.setAttribute('id', 'player-con');
					playerDomWrap.appendChild(playerDom);
				}

				let props = {
					id: 'player-con',
					width: '100%',
					height:this.height,
					autoplay: true,
					language: "en-us",
					source: source,
					isLive: false,
					cover: cover,
					language: 'zh-cn',
					playsinline:true,
					components: [{
						name: 'playerNextComponent',
						type: playerNextComponent,
						args: [this.playNextVideo]
					}, {
						name: 'playerTipComponent',
						type: playerTipComponent
					}],
					x5_type: 'h5', //通过 video 属性 “x5-video-player-type” 声明启用同层H5播放器，支持的值：h5 https://x5.tencent.com/tbs/guide/video.html
					skinLayout: [{
							name: "bigPlayButton",
							align: "blabs",
							x: 30,
							y: 80
						},
						{
							name: "H5Loading",
							align: "cc"
						},
						{
							name: "errorDisplay",
							align: "tlabs",
							x: 0,
							y: 0
						},
						{
							name: "infoDisplay"
						},
						{
							name: "tooltip",
							align: "blabs",
							x: 0,
							y: 56
						},
						{
							name: "thumbnail"
						},
						{
							name: "controlBar",
							align: "blabs",
							x: 0,
							y: 0,
							children: [{
									name: "progress",
									align: "blabs",
									x: 0,
									y: 44
								},
								{
									name: "playButton",
									align: "tl",
									x: 15,
									y: 12
								},
								{
									name: "timeDisplay",
									align: "tl",
									x: 10,
									y: 7
								},
								{
									name: "fullScreenButton",
									align: "tr",
									x: 10,
									y: 12
								},
								{
									name: "setting",
									align: "tr",
									x: 15,
									y: 12
								},
								{
									name: "volume",
									align: "tr",
									x: 15,
									y: 10
								}
							]
						}
					]

				}
				this.player = new Aliplayer(props);
				this.player.on('requestFullScreen', this.fullScreenHandle);
				this.player.on('cancelFullScreen', this.cancelFullScreenHandel);
			},
			playNextVideo() {
				let videoList = this.videoList;
				let index = videoList.findIndex(item => item.replay_url === this.playingVideo.replay_url);
				if(index === -1 || index === videoList.length - 1) {
					this.player.getComponent('playerTipComponent').fadeOutTip();
					return;
				}
				this.playVideo(videoList[index + 1]);
			},
			fullScreenHandle() {
				this.fullScreen = true;
			},
			cancelFullScreenHandel() {
				this.fullScreen = false;
			}
		}
	}
</script>

<style lang="scss">
	::-webkit-scrollbar    
    {    
        width: 6px;    
        height: 6px;    
        background-color: #F5F5F5;    
    }    
        
    ::-webkit-scrollbar-track    
    {    
        -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.3);    
        border-radius: 10px;    
        background-color: #FFF;    
    }    
        
    ::-webkit-scrollbar-thumb    
    {    
        border-radius: 10px;    
        -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,.3);    
        background-color: #AAA;    
    } 
                .player-olympic {
                    background: #fff;
                    position: relative;
                    background-color: #373d41;
                    .prism-progress-cursor {
                        background-position: center center;
                    }
                    .az-loading {
                        line-height: 485px;
                    }
                    .prism-player .prism-big-play-btn {
                        top: 50% !important;
                        left: 50% !important;
                        margin-top: -32px;
                        margin-left: -32px;
                    }
                    .prism-player .prism-fullscreen-btn {
                        width: 38px;
                        height: 38px;
                        margin-top: 7px !important;
                        margin-right: 15px !important;
                    }
                    .prism-player .prism-volume {
                        margin-right: 15px !important;
                    }
                    .prism-player .prism-cc-btn {
                        margin-right: 25px !important;
                    }
                    .prism-player .prism-setting-btn {
                        margin-right: 25px !important;
                    }
                    .prism-player .prism-volume-control {
                        left: auto !important;
                        right: 165px;
                    }
                    &.player-olympic-sm-screen {
                        .prism-player .prism-volume-control {
                            left: auto !important;
                            right: 125px;
                        }
                        .prism-player .prism-fullscreen-btn {
                            margin-top: 15px !important;
                            width: 24px;
                            height: 24px;
                        }
                        .prism-player .prism-thumbnail {
                            border: none;
                        }
                        .prism-player .prism-play-btn {
                            width: 28px;
                            height: 28px;
                        }
                        .player-olympic-player-next {
                            width: 24px;
                            height: 28px;
                        }
                        .prism-volume {
                            margin-top: 14px !important;
                            margin-right: 12px !important;
                        }
                        .prism-player .prism-volume .volume-icon {
                            width: 27px;
                            height: 26px;
                            background-repeat: no-repeat;
                            .short-horizontal {
                                width: 2px;
                                height: 7px;
                            }
                            .long-horizontal {
                                width: 2px;
                                height: 13px;
                            }
                            &.mute {
                                .short-horizontal {
                                    height: 13px;
                                    top: 7px;
                                }
                                .long-horizontal {
                                    top: 7px;
                                    height: 13px;
                                }
                            }
                        }
                        .prism-player .prism-cc-btn {
                            height: 24px;
                            width: 20px;
                            margin-top: 14px !important;
                            margin-right: 22px !important;
                        }
                        .prism-player .prism-setting-btn {
                            width: 20px;
                            height: 22px;
                            margin-top: 15px !important;
                            margin-right: 23px !important;
                        }
                        .prism-time-display {
                            margin-top: 4px !important;
                            margin-left: 20px !important;
                        }
                    }
                }
</style>
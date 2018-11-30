<template>
	<div class="player-olympic player-olympic-sm-screen"  ref="playerTemp">
	</div>
</template>

<script>
	import playerNextComponent from '@/components/playerNextComponent';
//	import playerFullScreenTitle from '@/components/playerFullScreenTitle';
	import playerTipComponent from '@/components/playerTipComponent';
	import { videoList } from '@/js/testVideoList'

	export default {
		name: 'app',
		data() {
			return {
				videoList: videoList,
				player: null,
				playingVideo: {},
//				loadingColor: ['#276cb3', '#f2ac1a', '#28130e', '#229849', '#db2344'],
				videoLoading: true,
				fullScreen: false
			}
		},
		mounted: function() {
			this.createDemoPlayer('http://218.92.216.69/live/c46894839.m3u8', this.videoList[0].CoverURL);
			this.playingVideo = videoList[0];
			this.videoLoading = false;
		},
		methods: {
			playVideo(video) {
				if(this.player === null || this.playingVideo.VideoId === video.VideoId) {
					return;
				}
				this.player.loadByUrl(video.source);
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
					autoplay: true,
					language: "en-us",
					source: source,
					isLive: true,
					cover: cover,
					language: 'zh-cn',
					components: [{
						name: 'playerNextComponent',
						type: playerNextComponent,
						args: [this.playNextVideo]
					}, {
						name: 'playerTipComponent',
						type: playerTipComponent
					}],
					x5_type: 'h5', //通过 video 属性 “x5-video-player-type” 声明启用同层H5播放器，支持的值：h5 https://x5.tencent.com/tbs/guide/video.html
					x5_fullscreen: true,
					skinLayout: [
						{ name: "bigPlayButton", align: "blabs", x: 30, y: 80 },
						{
							name: "H5Loading",
							align: "cc"
						},
						{ name: "errorDisplay", align: "tlabs", x: 0, y: 0 },
						{ name: "infoDisplay" },
						{ name: "tooltip", align: "blabs", x: 0, y: 56 },
						{ name: "thumbnail" },
						{
							name: "controlBar",
							align: "blabs",
							x: 0,
							y: 0,
							children: [
								{ name: "progress", align: "blabs", x: 0, y: 44 },
								{ name: "playButton", align: "tl", x: 15, y: 12 },
								{ name: "timeDisplay", align: "tl", x: 10, y: 7 },
								{ name: "fullScreenButton", align: "tr", x: 10, y: 12 },
								{ name: "setting", align: "tr", x: 15, y: 12 },
								{ name: "volume", align: "tr", x: 15, y: 10 }
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
				let index = videoList.findIndex(item => item.VideoId === this.playingVideo.VideoId);
				if(index === -1 || index === videoList.length - 1) {
					this.player.getComponent('playerTipComponent').fadeOutTip();
					return;
				}
				console.log(videoList[index + 1].source)
				this.playVideo(videoList[index + 1]);
			},
			fullScreenHandle() {
				let title = this.playingVideo.Title;
				this.fullScreen = true;
			},
			cancelFullScreenHandel() {
				this.fullScreen = false;
			}
		}
	}
</script>

<style lang="scss">
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
<template>
    <div class="player-demo">
        <div class="header">
            <div class="main-content">
                <img class="logo" src="./images/logo.png">                
            </div>
        </div>
        <div class="main-content clearfix">
            <div class="m-left">
                <div class="player-olympic" :class="{'player-olympic-sm-screen': !fullScreen}" ref="playerTemp">
                    <Loading v-show="videoLoading" :color-list="loadingColor"/>
                </div>
                <div class="vd-info">
                    <p class="vd-title">{{playingVideo.Title}}</p>
                    <p class="vd-duration"><i class="iconfont icon-time"></i>{{playingVideo.Duration}}</p>
                </div>
                <div class="vd-split" v-if="playingVideo.Description"></div>
                <div class="vd-intro">{{playingVideo.Description}}</div>
            </div>
            <div class="m-right">
                <div class="play-list">Play List</div>
                <div class="play-content">
                    <div class="item clearfix" v-for="video in videoList" :key="video.VideoId" @click="playVideo(video)">
                        <div class="img-wrap">
                            <img :src="video.CoverURL">
                            <span class="video-time">{{video.Duration}}</span>
                            <div class="play-cover"></div>
                        </div>
                        <div class="con-wrap">
                            <p class="title">{{video.Title}}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import playerNextComponent from './components/playerNextComponent';
    import playerFullScreenTitle from './components/playerFullScreenTitle';
    import playerTipComponent from './components/playerTipComponent';
    import {videoList} from './js/testVideoList'

    export default {
        name: 'app',
        data() {
            return {
                videoList: videoList,
                player: null,
                playingVideo: {},
                loadingColor: ['#276cb3', '#f2ac1a', '#28130e', '#229849', '#db2344'],
                videoLoading: true,
                fullScreen: false
            }
        },
        mounted: function() {
            this.createDemoPlayer(this.videoList[0].source, this.videoList[0].CoverURL);
            this.playingVideo = videoList[0];
            this.videoLoading = false;
        },
        methods: {
            playVideo(video) {
                if (this.player === null || this.playingVideo.VideoId === video.VideoId) {
                    return;
                }
                this.player.loadByUrl(video.source);
                this.playingVideo = video;
                return;
            },
            createDemoPlayer(source, cover) {
                if (document.getElementById('player-con') === null) {
                    let playerDomWrap = this.$refs.playerTemp;
                    let playerDom = document.createElement('div');
                    playerDom.setAttribute('id', 'player-con');
                    playerDomWrap.appendChild(playerDom);
                }

                let props = {
                    id: 'player-con',
                    width: '100%',
                    height: '485px',
                    autoplay: true,
                    language:"en-us",
                    source: source,
                    isLive: false,
                    cover: cover,
                    language:'zh-cn',
                    components: [{
                        name: 'playerNextComponent',
                        type: playerNextComponent,
                        args: [this.playNextVideo] 
                    }, {
                        name: 'playerFullScreenTitle',
                        type: playerFullScreenTitle
                    }, {
                        name: 'playerTipComponent',
                        type: playerTipComponent
                    }],
                    x5_type:'h5', //通过 video 属性 “x5-video-player-type” 声明启用同层H5播放器，支持的值：h5 https://x5.tencent.com/tbs/guide/video.html
          			x5_fullscreen:true,
          			skinLayout:[
    {name: "bigPlayButton", align: "blabs", x: 30, y: 80},
    {
      name: "H5Loading", align: "cc"
    },
    {name: "errorDisplay", align: "tlabs", x: 0, y: 0},
    {name: "infoDisplay"},
    {name:"tooltip", align:"blabs",x: 0, y: 56},
    {name: "thumbnail"},
    {
      name: "controlBar", align: "blabs", x: 0, y: 0,
      children: [
        {name: "progress", align: "blabs", x: 0, y: 44},
        {name: "playButton", align: "tl", x: 15, y: 12},
        {name: "timeDisplay", align: "tl", x: 10, y: 7},
        {name: "fullScreenButton", align: "tr", x: 10, y: 12},
        {name:"setting", align:"tr",x:15, y:12},
        {name: "volume", align: "tr", x: 15, y: 10}
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
                if (index === -1 || index === videoList.length - 1) {
                    this.player.getComponent('playerTipComponent').fadeOutTip();
                    return;
                }
                this.playVideo(videoList[index + 1]);
            },
            fullScreenHandle() {
                let title = this.playingVideo.Title;
                this.player.getComponent('playerFullScreenTitle').fullScreenHandle(title);
                this.fullScreen = true;
            },
            cancelFullScreenHandel() {
                this.player.getComponent('playerFullScreenTitle').cancelFullScreenHandle();
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
    .player-demo {
        min-height: 100%;
        color: #f3f3f3;
        background: #2c3134;
        .header {
            height: 58px;
            background-color: #373d41;
            img {
                margin-top: 20px;
            }
        }
        .main-content {
            width: 1300px;
            margin: 0 auto;
            .m-left {
                float: left;
                width: 864px;
                .vd-type {
                    margin-top: 25px;
                    .wrap {
                        float: left;
                        border: 1px solid #73777a;
                    }
                    a {
                        font-size: 18px;
                        color: #ffffff;
                        letter-spacing: 0;
                        text-align: center;
                        width:105px;
                        height:38px;
                        display: block;
                        float: left;
                        line-height: 38px;
                        cursor: pointer;
                        &.active {
                            background: #30adf2;
                        }
                    }
                }
                .player-olympic {
                    height: 485px;
                    background: #fff;
                    margin-top: 62px;
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
                .vd-info {
                    padding: 20px 0;
                    .vd-title {
                        font-size: 20px;
                        color: #fff;
                        letter-spacing: 0;
                        text-align: left;
                        font-weight: bold;
                    }
                    .vd-duration {
                        font-size: 20px;
                        color: #c3c5c6;
                        letter-spacing: 0;
                        text-align: left;
                        &.live {
                            color: #fc4347;
                        }
                        .icon-time {
                            font-size: 20px;
                            margin-right: 5px;
                        }
                    }
                }
                .vd-split {
                    border-bottom: 1px solid #73777a;
                }
                .vd-intro {
                    font-size: 14px;
                    color: #ffffff;
                    letter-spacing: 0;
                    line-height: 22px;
                    text-align: left;
                    padding: 22px 0;
                }
            }
            .m-right {
                float: right;
                width: 412px;
                .play-list {
                    margin-top: 20px;
                    font-size:20px;
                    color: #fff;
                    letter-spacing: 0;
                    text-align: left;
                    margin-bottom: 20px;
                    line-height: 24px;
                }
                .play-content {
                    height: 485px;
                    overflow-y: scroll;
                    .item {
                        margin-bottom: 8px;
                        cursor: pointer;
                    }
                    .img-wrap {
                        float: left;
                        height: 100px;
                        position: relative;
                        width: 175px;
                        img {
                            display: block;
                            width: 175px;
                            height:100px;
                        }
                        .video-time {
                            -moz-osx-font-smoothing: grayscale;
                            -webkit-font-smoothing: antialiased;
                            background-color: rgba(0, 0, 0, .8);
                            bottom: 5px;
                            color: #fff;
                            display: block;
                            font-size: 12px;
                            font-weight: bold;
                            padding: 0 5px;
                            position: absolute;
                            right: 5px;
                            text-align: right;
                        }
                        .play-cover {
                            position: absolute;
                            display: none;
                            top: 0;
                            left: 0;
                            right: 0;
                            bottom: 0;
                            background: rgba(0,0,0, .8) url('./images/play.png') center center no-repeat;
                            background-size: 22px 22px;
                        }
                        &:hover {
                            .play-cover {
                                display: block;
                            }
                        }
                    }
                    .con-wrap {
                        width: 215px;
                        float: right;
                        .title {
                            -webkit-box-orient: vertical;
                            -webkit-line-clamp: 5;
                            color: #fff;
                            display: -webkit-box;
                            font-size: 16px;
                            letter-spacing: 0;
                            line-height: 18px;
                            overflow: hidden;
                            text-align: left;
                            text-overflow: ellipsis;
                            white-space: normal;
                            max-height: 92px;
                            overflow: hidden;
                        }
                        .author {
                            color: #c3c5c6;
                            font-size: 12px;
                            letter-spacing: 0;
                            margin-top: 8px;
                            text-align: left;
                        }
                    }

                }
            }
        }
    }
    @media (max-width: 768px) {
        .player-demo .main-content {
            width: 100%;
            padding: 0 20px;
        }
        .player-demo .main-content .m-left {
            width: 100%;
        }
        .player-demo .main-content .m-right {
            width: 100%;
        }
        .player-demo .main-content .m-right .play-content .con-wrap {
            width: 185px;
        }
    }
    /*@import "./icon";*/

html,
body
{
  height: 100%;
    margin:0;
    padding:0;
}

body
{
  font-size:16px !important;
}

ul
{
	padding:0px;
	margin:0px;
}

ul li
{
    list-style-type:none;
}

.player-area
{
}

.content-container
{
	position:absolute;
	top:252px;
}

// @import "./icon";

/*! normalize.css v4.2.0 | MIT License | github.com/necolas/normalize.css */
/**
 * 1. Change the default font family in all browsers (opinionated).
 * 2. Correct the line height in all browsers.
 * 3. Prevent adjustments of font size after orientation changes in IE and iOS.
 */


/* Document
   ========================================================================== */
html {
    font-family             : sans-serif;
    /* 1 */
    line-height             : 1.15;
    /* 2 */
    -ms-text-size-adjust    : 100%;
    /* 3 */
    -webkit-text-size-adjust: 100%;
    /* 3 */
}
/* Sections
   ========================================================================== */
/**
 * Remove the margin in all browsers (opinionated).
 */
body {
    margin: 0;
    -webkit-font-smoothing: antialiased;
}
/**
 * Add the correct display in IE 9-.
 */
article,
aside,
footer,
header,
nav,
section {
    display: block;
}
/**
 * Correct the font size and margin on `h1` elements within `section` and
 * `article` contexts in Chrome, Firefox, and Safari.
 */
h1 {
    font-size: 2em;
    margin   : 0.67em 0;
}
/* Grouping content
   ========================================================================== */
/**
 * Add the correct display in IE 9-.
 * 1. Add the correct display in IE.
 */
figcaption,
figure,
main {
    /* 1 */
    display: block;
}
/**
 * Add the correct margin in IE 8.
 */
figure {
    margin: 1em 40px;
}
/**
 * 1. Add the correct box sizing in Firefox.
 * 2. Show the overflow in Edge and IE.
 */
hr {
    box-sizing: content-box;
    /* 1 */
    height    : 0;
    /* 1 */
    overflow  : visible;
    /* 2 */
}
/**
 * 1. Correct the inheritance and scaling of font size in all browsers.
 * 2. Correct the odd `em` font sizing in all browsers.
 */
pre {
    font-family: monospace, monospace;
    /* 1 */
    font-size  : 1em;
    /* 2 */
}
/* Text-level semantics
   ========================================================================== */
/**
 * 1. Remove the gray background on active links in IE 10.
 * 2. Remove gaps in links underline in iOS 8+ and Safari 8+.
 */
a {
    background-color            : transparent;
    /* 1 */
    -webkit-text-decoration-skip: objects;
    /* 2 */
}
/**
 * Remove the outline on focused links when they are also active or hovered
 * in all browsers (opinionated).
 */
a:active,
a:hover {
    outline-width: 0;
}
/**
 * 1. Remove the bottom border in Firefox 39-.
 * 2. Add the correct text decoration in Chrome, Edge, IE, Opera, and Safari.
 */
abbr[title] {
    border-bottom  : none;
    /* 1 */
    text-decoration: underline;
    /* 2 */
    text-decoration: underline dotted;
    /* 2 */
}
/**
 * Prevent the duplicate application of `bolder` by the next rule in Safari 6.
 */
b,
strong {
    font-weight: inherit;
}
/**
 * Add the correct font weight in Chrome, Edge, and Safari.
 */
b,
strong {
    font-weight: bolder;
}
/**
 * 1. Correct the inheritance and scaling of font size in all browsers.
 * 2. Correct the odd `em` font sizing in all browsers.
 */
code,
kbd,
samp {
    font-family: monospace, monospace;
    /* 1 */
    font-size  : 1em;
    /* 2 */
}
/**
 * Add the correct font style in Android 4.3-.
 */
dfn {
    font-style: italic;
}
/**
 * Add the correct background and color in IE 9-.
 */
mark {
    background-color: #ff0;
    color           : #000;
}
/**
 * Add the correct font size in all browsers.
 */
small {
    font-size: 80%;
}
/**
 * Prevent `sub` and `sup` elements from affecting the line height in
 * all browsers.
 */
sub,
sup {
    font-size     : 75%;
    line-height   : 0;
    position      : relative;
    vertical-align: baseline;
}
sub {
    bottom: -0.25em;
}
sup {
    top: -0.5em;
}
/* Embedded content
   ========================================================================== */
/**
 * Add the correct display in IE 9-.
 */
audio,
video {
    display: inline-block;
}
/**
 * Add the correct display in iOS 4-7.
 */
audio:not([controls]) {
    display: none;
    height : 0;
}
/**
 * Remove the border on images inside links in IE 10-.
 */
img {
    border-style: none;
}
/**
 * Hide the overflow in IE.
 */
svg:not(:root) {
    overflow: hidden;
}
/* Forms
   ========================================================================== */
/**
 * 1. Change font properties to `inherit` in all browsers (opinionated).
 * 2. Remove the margin in Firefox and Safari.
 */
button,
input,
optgroup,
select,
textarea {
    font  : inherit;
    /* 1 */
    margin: 0;
    /* 2 */
}
/**
 * Restore the font weight unset by the previous rule.
 */
optgroup {
    font-weight: bold;
}
/**
 * Show the overflow in IE.
 * 1. Show the overflow in Edge.
 */
button,
input {
    /* 1 */
    overflow: visible;
}
/**
 * Remove the inheritance of text transform in Edge, Firefox, and IE.
 * 1. Remove the inheritance of text transform in Firefox.
 */
button,
select {
    /* 1 */
    text-transform: none;
}
/**
 * 1. Prevent a WebKit bug where (2) destroys native `audio` and `video`
 *    controls in Android 4.
 * 2. Correct the inability to style clickable types in iOS and Safari.
 */
button, html [type="button"],
/* 1 */
[type="reset"],
[type="submit"] {
    -webkit-appearance: button;
    /* 2 */
}
/**
 * Remove the inner border and padding in Firefox.
 */
[type="button"]::-moz-focus-inner,
[type="reset"]::-moz-focus-inner,
[type="submit"]::-moz-focus-inner,
button::-moz-focus-inner {
    border-style: none;
    padding     : 0;
}
/**
 * Restore the focus styles unset by the previous rule.
 */
[type="button"]:-moz-focusring,
[type="reset"]:-moz-focusring,
[type="submit"]:-moz-focusring,
button:-moz-focusring {
    outline: 1px dotted ButtonText;
}
/**
 * Change the border, margin, and padding in all browsers (opinionated).
 */
fieldset {
    border : 1px solid #c0c0c0;
    margin : 0 2px;
    padding: 0.35em 0.625em 0.75em;
}
/**
 * 1. Correct the text wrapping in Edge and IE.
 * 2. Correct the color inheritance from `fieldset` elements in IE.
 * 3. Remove the padding so developers are not caught out when they zero out
 *    `fieldset` elements in all browsers.
 */
legend {
    box-sizing : border-box;
    /* 1 */
    color      : inherit;
    /* 2 */
    display    : table;
    /* 1 */
    max-width  : 100%;
    /* 1 */
    padding    : 0;
    /* 3 */
    white-space: normal;
    /* 1 */
}
/**
 * 1. Add the correct display in IE 9-.
 * 2. Add the correct vertical alignment in Chrome, Firefox, and Opera.
 */
progress {
    display       : inline-block;
    /* 1 */
    vertical-align: baseline;
    /* 2 */
}
/**
 * Remove the default vertical scrollbar in IE.
 */
textarea {
    overflow: auto;
}
/**
 * 1. Add the correct box sizing in IE 10-.
 * 2. Remove the padding in IE 10-.
 */
[type="checkbox"],
[type="radio"] {
    box-sizing: border-box;
    /* 1 */
    padding   : 0;
    /* 2 */
}
/**
 * Correct the cursor style of increment and decrement buttons in Chrome.
 */
[type="number"]::-webkit-inner-spin-button,
[type="number"]::-webkit-outer-spin-button {
    height: auto;
}
/**
 * 1. Correct the odd appearance in Chrome and Safari.
 * 2. Correct the outline style in Safari.
 */
[type="search"] {
    -webkit-appearance: textfield;
    /* 1 */
    outline-offset    : -2px;
    /* 2 */
}
/**
 * Remove the inner padding and cancel buttons in Chrome and Safari on OS X.
 */
[type="search"]::-webkit-search-cancel-button,
[type="search"]::-webkit-search-decoration {
    -webkit-appearance: none;
}
/**
 * 1. Correct the inability to style clickable types in iOS and Safari.
 * 2. Change font properties to `inherit` in Safari.
 */
::-webkit-file-upload-button {
    -webkit-appearance: button;
    /* 1 */
    font              : inherit;
    /* 2 */
}
/* Interactive
   ========================================================================== */
/*
 * Add the correct display in IE 9-.
 * 1. Add the correct display in Edge, IE, and Firefox.
 */
details,
/* 1 */
menu {
    display: block;
}
/*
 * Add the correct display in all browsers.
 */
summary {
    display: list-item;
}
/* Scripting
   ========================================================================== */
/**
 * Add the correct display in IE 9-.
 */
canvas {
    display: inline-block;
}
/**
 * Add the correct display in IE.
 */
template {
    display: none;
}
/* Hidden
   ========================================================================== */
/**
 * Add the correct display in IE 10-.
 */
[hidden] {
    display: none;
}
body,
html {
    -webkit-box-sizing: border-box;
    box-sizing        : border-box;
}
*,
*::after,
*::before {
    -webkit-box-sizing: inherit;
    box-sizing        : inherit;
}
body {
    -webkit-font-smoothing: antialiased;
    font-family: "PingFang SC","Microsoft YaHei", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
             "Helvetica Neue", Helvetica,  "Hiragino Sans GB",
             SimSun, sans-serif;
    word-break            : break-all;
    line-height: 1.5;
}
body {
    word-break: break-word;
}
body.no-scroll {
    overflow: hidden;
    position: relative;
}
a {
    text-decoration: none;
}
li {
    list-style: none;
}
input:-webkit-autofill,
textarea:-webkit-autofill,
select:-webkit-autofill {
  -webkit-box-shadow: 0 0 0 1000px white inset;
}

@mixin clearfix {
    zoom: 1;
    &:after,
    &:before {
        content: "";
        display: table;
    }
    &:after {
        clear     : both;
        visibility: hidden;
        font-size : 0;
        height    : 0;
    }
}

.clearfix {
    @include clearfix;
}

::-webkit-input-placeholder { /* WebKit browsers */
    color:    #c5c5c5;
}
:-moz-placeholder { /* Mozilla Firefox 4 to 18 */
   color:    #c5c5c5;
   opacity:  1;
}
::-moz-placeholder { /* Mozilla Firefox 19+ */
   color:    #c5c5c5;
   opacity:  1;
}
:-ms-input-placeholder { /* Internet Explorer 10+ */
   color:    #c5c5c5;
}
input::-moz-placeholder {
    color: #B7BCBF;
}
input::-webkit-input-placeholder {
    color: #B7BCBF;
}
input:-ms-input-placeholder {
    color: #B7BCBF;
}

p, h1, h2, h3 {
    margin: 0;
}

.fl {
    float: left;
}

.fr {
    float: right;
}

@charset "UTF-8";

.overh {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}

a {
    color: inherit;
}

@media (max-width: 768px) {
    html {
        font-size: 14px;
    }
}
.player-olympic-tips {
    padding: 5px 15px;
    position: absolute;
    top: 50%;
    left: 50%;
    z-index: 30;
    line-height: 32px;
    font-size: 16px;
    margin-left: -96px;
    margin-top: -25px;
    border-radius: 4px;
    background: rgba(255, 255, 255, .8);
    color: #000;
    text-align: center;
    display: none;
}
.full-screen-title {
    position: absolute;
    width: 100%;
    height: 44px;
    line-height: 44px;
    background-color: rgba(0, 0, 0, .5);
    color: #fff;
    font-size: 24px;
    padding-left: 25px;
    display: none;
    top: 0;
}
.full-screen-title {
    position: absolute;
    width: 100%;
    height: 44px;
    line-height: 44px;
    background-color: rgba(0, 0, 0, .5);
    color: #fff;
    font-size: 24px;
    padding-left: 25px;
    display: none;
    top: 0;
}
.player-olympic-player-next {
    width: 32px;
    height: 32px;
    background: url(./next.png) center no-repeat;
    background-size: contain;
    float: left;
    margin-left: 15px;
    margin-top: 12px;
    cursor: pointer;
    position: relative;
}
.player-olympic-player-next-tip {
    position: absolute;
    top: -45px;
    display: none;
    font-size:12px;
    color:#ffffff;
    line-height: 28px;
    letter-spacing:0;
    text-align:center;
    background:#3c3c3c;
    box-shadow:0 0 5px 0 rgba(0,0,0,0.10);
    width:58px;
    height:28px;
    left: 50%;
    margin-left: -29px;
}
.player-olympic-player-next:hover .player-olympic-player-next-tip {
    display: block;
}
.player-olympic-tips {
    padding: 5px 15px;
    position: absolute;
    top: 50%;
    left: 50%;
    z-index: 30;
    line-height: 32px;
    font-size: 16px;
    margin-left: -96px;
    margin-top: -25px;
    border-radius: 4px;
    background: rgba(255, 255, 255, .8);
    color: #000;
    text-align: center;
    display: none;
}
.player-olympic-tips {
    padding: 5px 15px;
    position: absolute;
    top: 50%;
    left: 50%;
    z-index: 30;
    line-height: 32px;
    font-size: 16px;
    margin-left: -96px;
    margin-top: -25px;
    border-radius: 4px;
    background: rgba(255, 255, 255, .8);
    color: #000;
    text-align: center;
    display: none;
}

</style>
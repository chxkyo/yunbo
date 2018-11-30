var HTML5_ID_BASE=0;
var _weiWidth;

var cdn = '';
export function html5playerRun(conf){
	var mode = /^\d{0,6}(\%)?$/;
	var width = mode.test(conf.width) ? conf.width : '100%';
	var height = mode.test(conf.height) ? conf.height : '100%';

	HTML5_ID_BASE++;
	this.uuid  /*string*/ = 'html5Media' + HTML5_ID_BASE;
	this.hlsUrl=conf.hlsUrl;
	//this.container=conf.mediaid;
	this.container=conf.container;
	this.switchContainer = conf.switchContainer;
	this.autostart=conf.autostart;
	this.volume = conf.volume ? conf.volume : 80;//音量	
	this.adveDeAddr = conf.adveDeAddr ? conf.adveDeAddr : '';                               //播放前显示封面图片地址
	this.watermark = conf.watermark ? conf.watermark : '';                                  //播放水印
	this.watermarkPosition = conf.watermarkPosition ? conf.watermarkPosition : '';          //水印四个位置
	this.isfullscreen = typeof(conf.mobilefullscreen) == 'boolean' ? conf.mobilefullscreen : true; //安卓控制是否全屏
    
    if(conf.hlsUrl.indexOf('m3u8') != 0){
        var str =conf.hlsUrl.indexOf('//');
            str = conf.hlsUrl.substring(str+2,conf.hlsUrl.length);
            conf.rtmpDomain = str.substring(0,str.indexOf('/'));
            str = str.substring(str.indexOf('/')+1,str.length);
            conf.lssApp = str.substring(0,str.indexOf('/'));
            conf.lssStream = str.substring(str.indexOf('/')+1,str.indexOf('.'));
    }

    this.watermark2 = conf.watermark2 ? conf.watermark2 : '';                               //播放水印2
	this.watermarkPosition2 = conf.watermarkPosition2 ? conf.watermarkPosition2 : '';       //水印2四个位置

	this.logoAddr = conf.logoAddr ? conf.logoAddr : '';                                     //播放logo
	this.logoPosition = conf.logoPosition ? conf.logoPosition : '';                         //logo四个位置
	this.buffertitle = conf.buffertitle ? conf.buffertitle : '';                            //缓冲片头
	this.adveReAddr = conf.adveReAddr ? conf.adveReAddr : 'javascript:void(0);';            //点击logo跳转点击链接

    
    this.isdefaultfull = typeof(conf.isdefaultfull) == 'boolean' ? conf.isdefaultfull : false; //安卓控制是否全屏;
    this.currenturl_index;
    //流数组
	this.url_arr = conf.url_arr;
	//默认自动切流
	if(typeof(conf.auto_change) == 'undefined'){
		this.auto_change = true;
	}else{
		this.auto_change = conf.auto_change;
	}
	this.hasPlaying = false;
	this.mode = conf.mode;
	var _this=this;		            
    var u = navigator.userAgent, app = navigator.appVersion, ua = navigator.userAgent.toLowerCase();
	var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Linux') > -1; //android终端或者uc浏览器
	var isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);               //ios终端
	var isWeixin = ua.match(/MicroMessenger/i) == "micromessenger";       //是否微信
	var isqq = u.match(/\sQQ/i) == " QQ";                                 //是否qq
	var html='';
    if(isAndroid && !this.isfullscreen){
        if(isqq || isWeixin){
        	if(this.isdefaultfull){
               html = '<div class="videoBox" style="position:relative;overflow:hidden;background: url('+ this.adveDeAddr +') 50% 50% / cover no-repeat rgb(0, 0, 0);">\
                       <video class="video-js" webkit-playsinline="" playsinline="" x5-playsinline="" x-webkit-airplay="allow"\
                           src="'+this.hlsUrl+'" width="100%" height="100%" style="object-position:0px 0px;background-size: cover;"></video>'
        	}
        	else{
        		html = '<div class="videoBox" style="position:relative;overflow:hidden;background:#000000;">\
                        <canvas style="display: none;"></canvas>\
                       <video class="video-js" x5-video-player-type="h5" x5-video-player-fullscreen="true" x-webkit-airplay="allow" webkit-playsinline="true" \
                           src="'+this.hlsUrl+'" width="100%" height="3000" style="object-position:0px 0px;background-size: cover;"></video>'
        	}
                if(!this.adveDeAddr){
                  html += '<image class="mps-advDeAddr"src="'+this.adveDeAddr +'" style="opacity:0;width: 100%;height: 100%;position: absolute;top: 0;left: 0;">'

                }
                else{
                  html += '<image class="mps-advDeAddr"src="'+this.adveDeAddr +'" style="width: 100%;height: 100%;position: absolute;top: 0;left: 0;">'                	
                }
    	  
               html += '<div class ="mps-danmu" style="width: 100%;height: 100%;position: absolute;top: 0;left: 0;overflow: hidden;"></div>';
               		html += '<div class="video-action" style="position:absolute;left:0px;top:0px;width:100%;height:100%;overflow:hidden;">\
		                       <i class="video-action-play" style="width:50px;height:50px;background:url('+cdn+'./static/images/video_action_play.png) no-repeat;\
			                      background-size:100% 100%;position:absolute;z-index:9;left:calc(50% - 25px);top:calc(50% - 25px);display:block;"></i>\
		                    </div>';
                if(this.watermark)
                   html +=  '<image id="video-adveDeAddr" src="'+ this.watermark +'" style="width:60px;height:50px;position:absolute;top:20px;left:20px;">'

                   html +=  '<div class="video-Control" style="position: absolute;bottom: 0;width: 100%;height: 40px;background-color:rgba(0,0,0,0.4);z-index: 10;">\
                    \
			         <image class="video-play" src="./static/images/play3.png" style="width: 22px;height: 22px;left:calc(5%);top:calc(50% - 11px);\
			               background-size: 100% 100%;position: absolute;"></i>\
                    \
                    <font class="current_left" style="color:#ffffff;font-size:12px;position: absolute;left:calc(15%);top:calc(50% - 7px);" face="微软雅黑">00:00:00</font>\
                    \
			           <div id="progressBar" style="display:none;position:absolute; height:4px;left:28%;right:28%;top:calc(50% - 2px); background-color:#313237;">\
			               <div id="bar" style="position:absolute;left:0px;width:0px; height:4px;background-color:#1E90FF;top:calc(50% - 2px);"></div>\
			               <div id="bufferBar2" style="position:absolute;left:0px;width:14px; height:14px;border:1px solid #fff;background-color:#ffffff;margin-top:-6px;border-radius:50%;"></div>\
				           <div id="bufferBar" style="opacity:0;position:absolute;margin-left:-15px;width:50px; height:40px;border:1px solid #fff;background-color:#fffsde;margin-top:-17px;border-radius:50%;z-index:121;"></div>\
				        </div>\
				        \
			        \
			         <font id="current_right" style="display:none;color:#ffffff;font-size:12px;position: absolute;right:calc(15%);top:calc(50% - 7px);" face="微软雅黑">00:00:00</font>\
		          </div>\
                  </div>';
        }
        else{

          if(!this.isfullscreen && !isWeixin && !isqq){
    	     html = '<div class="videoBox" style="position:relative;overflow:hidden;background:url('+ this.adveDeAddr +') 50% 50% / cover no-repeat;">\
		             <video class="video-js" style="width: 100%;height: 100%;" preload="auto" webkit-playsinline playsinline type="application/x-mpegURL" src="'+this.hlsUrl+'"></video>'	
    	  }
    	  else{
    	     html = '<div class="videoBox" style="position:relative;overflow:hidden;background:url('+ this.adveDeAddr +') 50% 50% / cover no-repeat;">\
		          <video class="video-js" style="width: 100%;height: 100%;" preload="auto" type="application/x-mpegURL" src="'+this.hlsUrl+'"></video>'
    	  }
	         html += '<div class ="mps-danmu" style="width: 100%;height: 100%;position: absolute;top: 0;left: 0;overflow: hidden;"></div>\
	         <div class="video-action" style="width: 100%;height: 100%;position: absolute;top: 0;left: 0;overflow: hidden;">\
			        <i class="video-action-play" style="background: url('+cdn+'./static/images/video_action_play.png);\
			               width: 50px;height: 50px;background-size: 100% 100%;position: absolute;top: calc(50% - 25px);left: calc(50% - 25px);display: block;z-index: 9;"></i>\
		          </div>'
		        if(this.watermark)
               html +=  '<image id="video-adveDeAddr" src="'+ this.watermark +'" style="width:60px;height:50px;position:absolute;top:20px;left:20px;">'

               html +=  '<div class="video-Control" style="position: absolute;bottom: 0;width: 100%;height: 40px;background-color:rgba(0,0,0,0.4);z-index: 10;">\
		            \
			        <image class="video-play" src="../static/images/play3.png" style="width: 22px;height: 22px;left:calc(5%);top:calc(50% - 11px);\
			               background-size: 100% 100%;position: absolute;"></i>\
			        <span class="current_left" style="color:#ffffff;font-size:12px;position: absolute;left:calc(15%);top:calc(50% - 6px);">00:00:00</span>\
			        \
			            <div id="progressBar" style="display:none;position:absolute; height:4px;left:27%;right:27%;top:calc(50% - 2px); background-color:#313237;">\
			               <div id="bar" style="position:absolute;left:0px;width:0px; height:4px;background-color:#1E90FF;top:calc(50% - 2px);"></div>\
			               <div id="bufferBar2" style="position:absolute;left:0px;width:14px; height:14px;border:1px solid #fff;background-color:#ffffff;margin-top:-6px;border-radius:50%;"></div>\
				           <div id="bufferBar" style="opacity:0;position:absolute;left:0px;width:35px; height:35px;border:1px solid #fff;background-color:#ffffff;margin-top:-17px;border-radius:50%;"></div>\
				        </div>\
			        \
			        <span id="current_right" style="display:none;color:#ffffff;font-size:12px;position: absolute;right:calc(15%);top:calc(50% - 6px);">00:00:00</span>\
		          </div>\
	            </div>';
        }
    }
    else{

    	   html = '<div class="videoBox" style="width:100%;height:100%;position:relative;overflow:hidden;background:#000000;">\
		           <video class="video-js" style="width: 100%;height: 100%;" webkit-playsinline playsinline type="application/x-mpegURL" src="'+this.hlsUrl+'"></video>'	
    	

    	   if(!this.adveDeAddr){
    	   	
             html += '<image class="mps-advDeAddr" src="'+this.adveDeAddr +'" style="opacity:0;width: 100%;height: 100%;position: absolute;top: 0;left: 0;">'
    	   }
    	   else{
             html += '<image class="mps-advDeAddr" src="'+this.adveDeAddr +'" style="width: 100%;height: 100%;position: absolute;top: 0;left: 0;">'
	       
    	   	}
	       html += '<div class ="mps-danmu" style="width: 100%;height: 100%;position: absolute;top: 0;left: 0;overflow: hidden;"></div>\
	              <div class="video-action" style="width: 100%;height: 100%;position: absolute;top: 0;left: 0;overflow: hidden;">\
			        <i class="video-action-play" style="background: url('+cdn+'./static/images/video_action_play.png);\
			               width: 50px;height: 50px;background-size: 100% 100%;position: absolute;top: calc(50% - 25px);left: calc(50% - 25px);display: block;z-index: 9;"></i>\
		          </div>'
		        if(this.watermark)
               html +=  '<image id="video-adveDeAddr" src="'+ this.watermark +'" style="width:60px;height:50px;position:absolute;top:20px;left:20px;">'

               html +=  '<div class="video-Control" style="position: absolute;bottom: 0;width: 100%;height: 40px;background-color:rgba(0,0,0,0.4);z-index: 10;">\
		            \
			        <image class="video-play" src="./static/images/play3.png" style="width: 22px;height: 22px;left:calc(5%);top:calc(50% - 11px);\
			               background-size: 100% 100%;position: absolute;"></i>\
			        <font class="current_left" size="1" color="white" style="position: absolute;left:calc(15%);top:calc(50% - 8px);" face="微软雅黑">00:00:00</font>\
			        \
			            <div id="progressBar" style="display:none;position:absolute; height:4px;left:27%;right:27%;top:calc(50% - 2px); background-color:#313237;">\
			               <div id="bar" style="position:absolute;left:0px;width:0px; height:4px;background-color:#1E90FF;top:calc(50% - 2px);"></div>\
			               <div id="bufferBar2" style="position:absolute;left:0px;width:14px; height:14px;border:1px solid #fff;background-color:#ffffff;margin-top:-6px;border-radius:50%;"></div>\
				           <div id="bufferBar" style="opacity:0;position:absolute;left:0px;width:35px; height:35px;border:1px solid #fff;background-color:#ffffff;margin-top:-17px;border-radius:50%;"></div>\
				        </div>\
			        \
			        <font id="current_right" size="1" color="white" style="display:none;position: absolute;right:calc(15%);top:calc(50% - 8px);" face="微软雅黑">00:00:00</font>\
			        <i class="video-fillscreen" style="width: 22px;height: 22px;right:calc(5%);top:calc(50% - 11px);background: url('+cdn+'./static/images/fillscreen3.png);\
			               background-size: 100% 100%;position: absolute;"></i>\
		          </div>\
	            </div>';
    }
    if(!this.mode){
    	html = '<video class="video-js" x-webkit-airplay="true" webkit-playsinline="" x5-video-player-type="h5" x5-video-player-fullscreen="true" playsinline="" width="100%" height="100%" src="'+this.hlsUrl+'"></video>';
    }
	$(conf.container).append(html);
	$(".player_btn").show();
	if(isIOS && isWeixin){
		$(".player_btn").hide();
	}
    var Media = $(conf.container).find(".video-js")[0];
// 	setMedia(Media);
    if(isAndroid && !this.isfullscreen){
      if(isqq || isWeixin){
         calculateSize(_this.container,_this,Media);
      }
      else{
         if(!this.isfullscreen && !isWeixin && !isqq){
         	//var videoBoxHeight = $(document).width() * 480 / 852;
            //$(".videoBox").height(videoBoxHeight);//设置视频高度
            calculateSize(_this.container,_this,Media);
              
         }
       }
    }
    else{
        var videoBoxHeight = $(document).width() * 9 / 16;
        $(conf.container).find(".videoBox").height(videoBoxHeight);//设置视频高度
        $(".video_wrap,.player").height(videoBoxHeight)
    }
    var _timeoutcon;

    var _html5loadTime = new Date().getTime();

	Media.addEventListener('touchstart', function(event) { //点击隐藏进度条的
       displayhide();
	}, false);

    setTimeout(function(){
    	$(conf.container).find(".video-Control").fadeOut();
    },4000);
	if(this.mode){
		var _progress = document.getElementById("progressBar");
	    var _videocontrol = $(conf.container).find(".video-Control")[0];
	    var _mps_danmu = $(conf.container).find(".mps-danmu")[0];
	
	
		_progress.addEventListener('touchstart', function(event) {//点击隐藏进度条 
	      displayhide();
		}, false);
	    
	    _mps_danmu.addEventListener('touchstart', function(event) {//点击隐藏进度条 
	    	$(".teacher_info").toggleClass("active");
	      	displayhide();
	      	if(event.stopPropagation){
		        event.stopPropagation();
	        }else{
				event.cancelBubble=true;
	        }
		}, false);
	
		_videocontrol.addEventListener('touchstart', function(event) { //点击隐藏进度条
	      displayhide();
		}, false);
		
		
		var BufferBar = document.getElementById('progressBar');
    	var _bufferBar = document.getElementById('bufferBar');


	    _bufferBar.addEventListener('touchstart', function(event) {
	
	  // clearInterval(progressFlag);
	    	_move =false;
	    	Media.pause();
			
		}, false);
	
		var _clientX;
		var _percent;
		var _maxduration;
		_bufferBar.addEventListener('touchmove', function(event) {
	    event.preventDefault();
	        displayhide(); //显示控制条
			_clientX = event.touches[0].clientX;
	        
	        
	        if(_clientX < progress.offset().left)//拖动到进度条右侧之外
	           var length = 0;
	        else if(_clientX > (progress.offset().left + progress.width()))//拖动到进度条左侧之外
				var length = progress.width();
	        else
			   var length = _clientX - progress.offset().left;
	
	
			_percent = length / progress.width();
			$('#bufferBar').css('left', _percent * (progress.width()) - 5 + "px");
			$('#bufferBar2').css('left', _percent * (progress.width()) - 5 + "px");
			$('#bar').css('width', _percent * (progress.width()) - 5 + "px");
			
			
		}, false);
	
		_bufferBar.addEventListener('touchend', function(event) {
			_maxduration = Media.duration; //Video duraiton
	        Media.currentTime = _percent * _maxduration;
			_move =true;
	    	Media.playAuto();
		
		}, false);

	}


    var progress = $('#progressBar');
    
      Media.addEventListener("timeupdate",function(){
 	     var maxduration = Media.duration;
         
	     var currenTtime = Media.currentTime;
		 var percent = currenTtime / maxduration;
             //$('#bufferBar').css('width', percent * (progress.width()) - 5 + "px");
             $('#bar').css('width', percent * (progress.width()) + "px");
             $('#bufferBar').css('left', percent * (progress.width()) + "px");
             $('#bufferBar2').css('left', percent * (progress.width()) + "px");
    },false);
    
    

    var displayhide = function(){     //显示或者控制条函数
    	if(!$(conf.container).find(".video-Control").is(":visible")){
    		$(conf.container).find(".video-Control").fadeIn();
    	}
        clearTimeout(_timeoutcon);
        _timeoutcon = setTimeout(function(){
    	   $(conf.container).find(".video-Control").fadeOut();
        },3000);
    }

	var updatebar = function(x) {
		clearInterval(progressFlag);
		//if (_this.buffertitle != '')
        //    $("#bufferpic").show();

		var maxduration = Media.duration; //Video duraiton
		var length = x - progress.offset().left;
		var percent = length / progress.width();
		//$('#bufferBar').css('left', percent * (progress.width()) - 5 + "px");
		$('#bufferBar').css('left', percent * (progress.width()) - 5 + "px");
		$('#bufferBar2').css('left', percent * (progress.width()) - 5 + "px");
		$('#bar').css('width', percent * (progress.width()) - 5 + "px");
		Media.currentTime = percent * maxduration;         
   };
    $('.player_btn_bg').click(function(){//播放器中间按钮
    	 _playstarttime = new Date().getTime();
    	 if(!_this.mode){
    	 	$(this).hide();
    	 }
         videoplay();
	});
	$(conf.container).find(".video-action-play").on("click",function(){
		_playstarttime = new Date().getTime();
    	 if(!_this.mode){
    	 	$(this).hide();
    	 }
         videoplay();
	})
	$(conf.container).find(".video-play").click(function(){
		 _playstarttime = new Date().getTime();
         videoplay();
	});
   
    var progressFlag,
        _playstatus,
        _buffered,
        _playStartuptime,
        _iosstatus=false,
        _playstarttime,
        _playendtime;
    var videoplay = function(){//控制播放
        if(Media.paused){
           $(conf.container).find(".video-action").fadeOut();
           $(conf.container).find(".video-play").attr("src","./static/images/pause3.png");
		   Media.playAuto();
        }else{
           $(conf.container).find(".video-action").fadeIn();
           $(conf.container).find(".video-play").attr("src","./static/images/play3.png");
           Media.pause();
        }     	
    }

//获取系统时间
    var getSystemTime = function(){
        var date = new Date();    
	    var seperator = ":";
        var getHours = date.getHours();
        var getMinutes = date.getMinutes();
        var getSeconds = date.getSeconds();
        if(getHours <= 9)
                getHours = "0"+date.getHours();
        if(getMinutes <= 9)
                getMinutes = "0"+date.getMinutes();
        if(getSeconds <= 9)
                getSeconds = "0"+date.getSeconds();

	    var currenttime = getHours + seperator + getMinutes + seperator + getSeconds;

	    return currenttime;
    }
	var fullscreen = function(elem) {
	    var prefix = 'webkit';
	      if ( elem[prefix + 'EnterFullScreen'] ) {
	        return prefix + 'EnterFullScreen';
	      } else if( elem[prefix + 'RequestFullScreen'] ) {
	        return prefix + 'RequestFullScreen';
	      };
	    return false;
};
//点击全屏    
    $(conf.container).find(".video-fillscreen").click(function(){//全屏播放
		if (Media.requestFullscreen) {
          Media.requestFullscreen();
      } else if (Media.mozRequestFullScreen) {
          Media.mozRequestFullScreen();
      	} else if (Media.webkitRequestFullScreen) {
          Media.webkitRequestFullScreen();
  		}else if(Media.webkitEnterFullscreen){
	    	Media.webkitEnterFullscreen();
	    }
  		if(typeof self.enterFullScreenCallback == 'function'){
		    self.enterFullScreenCallback();
		}
    });
    Media.addEventListener("x5videoexitfullscreen", function () {//安卓退出全屏
	       if(typeof self.exitFullScreenCallback == 'function'){
		      self.exitFullScreenCallback();
		   }
	});

    Media.addEventListener('webkitendfullscreen', function () {//ios退出全屏
           if(typeof self.exitFullScreenCallback == 'function'){
		      self.exitFullScreenCallback();
		   }
    }, false);

    /*Media.addEventListener('webkitbeginfullscreen', function () {//ios进入全屏
    }, false);*/

//自动播放    
    function wxPlayVideo(video) {

        WeixinJSBridge.invoke('getNetworkType', {}, function (e) {
            video.play();
        });
    }

    function playAuto() {
        var self = this;
        self.play();
		$(this).closest(".video_wrap").find(".video_load").show();
        var evtFns = [];
        try {
            wxPlayVideo(self);
            return;
        } catch (ex) {
            evtFns.push("WeixinJSBridgeReady", function evt() {
                wxPlayVideo(self);
                for (var i = 0; i < evtFns.length; i += 2) document.removeEventListener(evtFns[i], evtFns[i + 1], false);
            });
            document.addEventListener("WeixinJSBridgeReady", evtFns[evtFns.length - 1], false);
        }
    }
    HTMLVideoElement.prototype.playAuto = playAuto;

    if(this.autostart){
       //if(isqq || isWeixin)
       if(isIOS && isWeixin){
       	  _playstarttime = new Date().getTime();
          videoplay();
       }
    }  

    //解析时间
   	var parseTime = function(Time) {	
		var minute;
		var second;
		minute = parseInt(Time/60);
		second = Time - (minute*60);
		var d;
		if(minute < 10 && second < 10)
			d = "0" + minute.toFixed(0)+":"+ "0" + second.toFixed(0);
		else if(minute < 10 && second >= 10)
			d = "0" + minute.toFixed(0)+":"+ second.toFixed(0);
		else if(minute >= 10 && second < 10)
			d = minute.toFixed(0)+":"+ "0" + second.toFixed(0);
		else if(minute >= 10 && second >= 10)
			d = minute.toFixed(0)+":"+ second.toFixed(0);
		return d;  
   	}
	
	if(typeof(conf.lssCallBackFunction) == 'function'){

		conf.lssCallBackFunction();
	}
    
    if(conf.onReady) conf.onReady();
    
	this.startPlay = function(){

		Media.playAuto();
	}
    
	// 暂停播放
	this.pausePlay = function () {
		Media.pause();
	}
	// 设置音量
	this.setVolume = function (volume) {
		volume=(volume/100).toFixed(1);
		volume > 1 && (volume = 1);
		volume < 0 && (volume = 0);		
		
		Media.volume=volume;
		
	}
	// 设置是否静音
	this.setMute = function (isMute) {		
		if (typeof isMute != "boolean"){return;}
		Media.muted=isMute;
	}
    
  var _i = 0;
	//移动端弹幕
	this.sendbarrage = function(word, font, color, speed,typeface){
        _i++;
         var p_id = "dan" + _i;
         var div='<span id="'+p_id+'" style="display:block;white-space:nowrap;position:absolute; font-family:'+ typeface +'; font-size:'+ font +'px;">'+ word +'</span>';
             $("#mps-danmu").append(div);
         var _top=0;
            $("#mps-danmu").find("#"+p_id).show().each(function(){  
                if($('#mps-danmu').width() > $('#'+p_id).width()){
                     var left_ = $('#mps-danmu').width();
                 }else{
                    var left_ = $('#'+p_id).width();
                 }

                var _left = $('#mps-danmu').width();
                var _height = $('#mps-danmu').height() - $('#'+p_id).height();

                _top =   Math.floor(Math.random()* _height );
                $("#"+p_id).css({left:_left,top:_top,color:color});
                
                var s = _left / (speed*100);
                var t = ($('#mps-danmu').width() + $('#'+p_id).width()) / s;

                $("#"+p_id).animate({left:"-"+left_+"px"},t,"linear",function(){  $(this).remove();});

            });
	}

    //移动端弹幕2
  this.sendbarrage2 = function(word, font, color, pcspeed, mobilespeed, typeface){
        _i++;
         var p_id = "dan" + _i;
         var div='<span id="'+p_id+'" style="display:block;white-space:nowrap;position:absolute; font-family:'+ typeface +'; font-size:'+ font +'px;">'+ word +'</span>';
             $("#mps-danmu").append(div);
         var _top=0;
            $("#mps-danmu").find("#"+p_id).show().each(function(){
              
                
                if($('#mps-danmu').width() > $('#'+p_id).width()){
                     var left_ = $('#mps-danmu').width();
                 }else{
                    var left_ = $('#'+p_id).width();
                 }

                var _left = $('#mps-danmu').width();
                var _height = $('#mps-danmu').height() - $('#'+p_id).height();

                _top =   Math.floor(Math.random()* _height );
                $("#"+p_id).css({left:_left,top:_top,color:color});
                
                var s = _left / (mobilespeed*100);
                var t = ($('#mps-danmu').width() + $('#'+p_id).width()) / s;

                $("#"+p_id).animate({left:"-"+left_+"px"},t,"linear",function(){  $(this).remove();});

            });
  }
  
  this.removelement = function(){
      $("#mps-danmu").empty();
  }
  //销毁
  this.destroy = function(){
  		this.mode?$(".videoBox").remove():$(Media).remove();
  		$(this.switchContainer+",.lineload,.player_btn,.video_load").hide();
  		clearInterval(sendtimer);
  		sendtimer = null;
  }
        //流切换
    this.changePlayer = function(url){
    	$(conf.container).find(".change_load").show();
  		Media.src = url;
  		alert("切换了")
    	if(!isIOS){
    		$(conf.container).find(".video-js").css("opacity","1");
//  		if(!this.isfullscreen && !isWeixin && !isqq)
//  			$(conf.container).find(".videoBox").css("background","url('"+ this.adveDeAddr +"') 50% 50% / cover no-repeat rgb(0, 0, 0);");
    	}
    	$(conf.container).find(".mps-advDeAddr").show();
    	$(conf.container).find(".video-action-play").show();
    	$(conf.container).find(".change_load").hide();
    	_playstarttime = new Date().getTime();
    	if(isIOS){
    		videoplay();
    	}
    }
    var setCookie = function (cname,cvalue,exdays){
		var d = new Date();
		d.setTime(d.getTime()+(exdays*24*60*60*1000));
		var expires = "expires="+d.toGMTString();
		document.cookie = cname+"="+cvalue+"; "+expires;
	}

	var  getCookie = function (cname){
		var name = cname + "=";
		var ca = document.cookie.split(';');
		for(var i=0; i<ca.length; i++) {
			var c = ca[i].trim();
			if (c.indexOf(name)==0) return c.substring(name.length,c.length);
		}
		return "";
	}
	//视频开始卡的时间
    var _emptyTime = 0;
    //视频加载好了开始播放的时间
    var _fullTime = 0;

	//回放
    Media.addEventListener("playing",function(){
    	this.hasPlaying = true;
    	if(isIOS){
    		$(conf.container).find(".mps-advDeAddr").hide()
    		$(".player_btn").hide();	
    	}
    	$(".video_load").hide();
        _iosstatus = true;
        _playendtime = new Date().getTime();
       if(_emptyTime){
       	  _fullTime = new Date().getTime();
          var pretime = _fullTime - _emptyTime;
          _totalTime += pretime;
          _emptyTime = 0;
       }
    }.bind(this),false);
	//等待数据
    Media.addEventListener("waiting",function(){
      _emptyTime = new Date().getTime();
      _fullTime = 0;
    },false);
    
    var _sendtime = conf.sendtime * 1000;//发送时间
    var _playTotalTime = 0;              //播放总时间
    var _totalTime = 0;                  //_sendtime时间内卡顿总时间
    var _settime = 0,sendtimer = null;
	 if(_sendtime){
		sendtimer = setInterval(function(){
	       _playTotalTime += _sendtime;
	       var userAgent = navigator.userAgent;
	       _settime = new Date().getTime();
           if(_emptyTime>0 && _fullTime ==0){
            	_totalTime = _settime - _emptyTime;
            	_emptyTime = _settime;
           }
		   _totalTime = 0;
		}.bind(this),_sendtime);
	 }   
    this.addPlayerCallback = function(events, callback){
		if (events == 'play')
			this.playCallback = callback;
		else if (events == 'pause')
			this.pauseCallback = callback;
		else if(events == 'Play.Stop')
		    this.stopPlayCallback = callback;
	    else if(events == 'enterFullScreen')//全屏时
		    this.enterFullScreenCallback = callback;
		else if(events == 'exitFullScreen')//退出全屏时
		    this.exitFullScreenCallback = callback;
	}
	
    var self = this;
    Media.addEventListener("ended",function(){

        if(typeof self.stopPlayCallback == 'function'){
		   self.stopPlayCallback();
		}
    }, false);


    var _enterfull = true;
    if($(".mpstitle-name").html()){
       var _title = $(".mpstitle-name").html().split('?')[1];
    }

    if(_title == "true"){

        $(".mpstitle-name").html($(".mpstitle-name").html().split('?')[0]);       
	    Media.addEventListener('x5videoenterfullscreen', function() {

	        _enterfull = false;
	        $(".m-carousel-dvertising").css("display","none");
	        $(".mpstitle-name").css("display","block");
		});
	    
	    Media.addEventListener('x5videoexitfullscreen', function() {
	        	_enterfull = true;
				$(conf).find(".mps-advDeAddr").css("top",0+"px");
				$(conf).find(".mps-advDeAddr").css("height",_weiWidth+"px");

              	$(".m-carousel-dvertising").css("display","block");
		        $(".mpstitle-name").css("display","none");
		        $(conf.container).find(".video-action-play").css("top",(_weiWidth/2-25)+"px");
		    	$("#video-adveDeAddr").css("top",20+"px");
		        $(".videoBox").height(_weiWidth);
		    	$(Media).css('object-position', 0+'px'+' '+0+'px');
		    	
		}, false);
    }
    if(self.mode){
    	var _move = true;
	    var _notplay = true;
	    Media.addEventListener("pause",function(){
	      if(_notplay){
		        if(_move){
			        if(!isIOS){
			        	
			              //$(".videoBox").css("background-image","url()");
			              $(conf.container).find(".video-action").fadeIn();
			              $(conf.container).find(".video-play").attr("src","./static/images/play3.png");
			              //   var videoBoxHeight = $(document).width() * 480 / 852; //4:3 PC852 : 480
			              document.getElementById(_this.container).style.height = _weiWidth;
			              
			              if(!_enterfull){
			                 $(".videoBox").height(_weiWidth+50);//设置视频高度
			              }
			              else{
			              	 $(".videoBox").height(_weiWidth);//设置视频高度
			              }
							this.hasPlaying = false;
					      if(typeof conf.pauseCallback == 'function')
					         conf.pauseCallback();
	
			        }
			        else{
			              $(conf.container).find(".video-action").fadeIn();
			              $(conf.container).find(".video-play").attr("src","./static/images/play3.png");
			        }
		        }
	       }
	    }.bind(this),false);
	    	
	
	    Media.addEventListener("play",function(){     
	        var _systemtime =null;
	        setInterval(function(){
		 	  var duration =  Media.duration.toFixed(0);
	          if(duration == Infinity || duration == 'NaN' || duration == 0){
	            
	          	if(!_systemtime)
	          	   _systemtime=setInterval(function(){$(conf.container).find(".current_left").text(getSystemTime());},1000);
	          	$("#progressBar").hide();
	            $("#current_right").hide();
	          }
		  	  else{
		  	  	   clearInterval(_systemtime);
		  	  	   $("#progressBar").show();
	               $("#current_right").show();
		  	   	   $(conf.container).find(".current_left").text(parseTime(Media.currentTime.toFixed(0)));
		  	   	   $('#current_right').text(parseTime(duration));
		  	   	
		  	  }
		    
		    },1500);
	
	
	       if(!isIOS){
	
	    	  var playwidth = setInterval(function () {
	            if(Media.videoWidth && Media.videoHeight){
	              var videoBoxHeight = $(document).width() * 9/16;
	              self.mode?$(_this.container).height(videoBoxHeight):$(_this.container).height("100%");
	              $(conf.container).find(".mps-advDeAddr").hide();
	              _notplay = true;
	              if(!_enterfull){
	              	 $(Media).css('object-position', 0+'px'+' '+50+'px');
	              	 $(conf.container).find(".video-action-play").css("top",(videoBoxHeight/2+25)+"px");
	              	 $("#video-adveDeAddr").css("top",70+"px");
	                 $(".videoBox").height(videoBoxHeight+50);//设置视频高度
	              }
	              else {
	              	if(self.mode){
	              		$(".videoBox").height(videoBoxHeight);//设置视频高度
	              	 	$(".content-wrap").height($(window).height() - $(".video_box").height() - $(".nav_box").height() - $(".footer").height() - 1);
	              	}else{
	              		$(".videoBox").height("100%");
	              	}
	              }
	
	              $(conf.container).find(".video-action").fadeOut();
	              $(conf.container).find(".video-play").attr("src","./static/images/pause3.png");
	             //  if(typeof self.playCallback == 'function')
			           // self.playCallback();
			      if(typeof conf.playCallback == 'function')
			        conf.playCallback();
	              	clearInterval(playwidth);
	            }
	            else{
		            if(!_enterfull){
		            	_notplay = false;
		                $(conf.container).find(".video-action-play").css("top",125+"px");//加了50
		               	$("#video-adveDeAddr").css("top",70+"px");//水印
		                $(conf).find(".mps-advDeAddr").css("top",50+"px");//封面图片
		                $(conf).find(".mps-advDeAddr").css("height",_weiWidth+"px");//封面图片
		                $(".videoBox").height(_weiWidth+50);//设置视频高度//加了50
	                }
	            }
	          }, 500);
	        }
	        else{
	          $(conf.container).find(".video-action").fadeOut();
	          $(conf.container).find(".video-play").attr("src","./static/images/pause3.png");
	        }
	    },false);
    }
}
   function setMedia(video, scale = 0.8) {
        // 设置poster属性：（非本地视频资源会有跨域截图问题）
        video.addEventListener('loadedmetadata', function(e) {
            // 拿到图片
            let canvas = document.createElement('canvas');
            canvas.width = video.videoWidth * scale;
            canvas.height = video.videoHeight * scale;
            canvas.getContext('2d').drawImage(video, 0, 0, canvas.width, canvas.height);
            let src = canvas.toDataURL('image/png');
            // 显示在dom，测试用
            (function(flag = true) {
                if (!flag) {return;}
                let img = document.createElement('img');
                img.src = src;
                document.body.appendChild(img);
            })(0);
            // 设置属性
            video.setAttribute('poster', src);
        });
    }
function calculateSize(container,_this,Media) {
       var videoBoxHeight = $(document).width() * 9/16;
         _weiWidth = videoBoxHeight;
        if (Media.paused) {
        	$(container).find(".video-action").fadeIn();
        	$(container).find(".video-play").attr("src","./static/images/play3.png");
        }
        if(_this.mode){
        	$(container).height(videoBoxHeight);
        	$(".videoBox,.video-wrap").height(videoBoxHeight);
        }else{
        	$(container).height("100%");
        	$(".videoBox,.video-wrap").height("100%");//设置视频高度
        }
}
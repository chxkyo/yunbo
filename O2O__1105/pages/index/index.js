// pages/index/index.js
const app = getApp();
Page({
  data: {
    adList: [], //广告列表
    act: {},   //活动列表
    productList: [],  //积分产品列表
    indicatorDots: false,
    autoplay: true,
    interval: 3000,
    duration: 500,
    imgBaseUrl: '',  //图片的base路径 
    showPopupIndex: 0,   //显示第几个弹窗
    couponName: '', //优惠券名称
    formId: ''
  },
  onLoad: function (options) {
    this.setData({
      imgBaseUrl: app.globalData.imgBaseUrl,
      formId: options.formId
    })
    wx.showLoading({
      title: '加载中...',
      mask: true,
      success: function () {}
    })

    wx.login({
      success: (res) => {
        if(res.code){
          //加载首页信息
          wx.request({
            url: app.globalData.domain+'snail-portal/index.htm',
            data: {
              code: res.code
            },
            method: "GET",
            success: (res) => {
              wx.hideLoading();
              wx.setStorage({
                key: 'session_key',
                data: res.data.data.session_key,
              })
              wx.setStorage({
                key: 'unitId',
                data: res.data.data.unitId
              })
              wx.setStorage({
                key: 'openid',
                data: res.data.data.openid
              })
              this.setData({
                adList: res.data.data.adList,
                act: res.data.data.act,
                productList: res.data.data.productlist
              })
              //判断uersId是否存在
              if (wx.getStorageSync('userId')) {
                this.showRedPacket();
              }

            this.getWxUser(res);
            },
            fail: (err) => {
              wx.hideLoading();
            }
          })
 
     

        }

      }
    })
  },

  getWxUser(res){
    //获取用户信息
    wx.getUserInfo({
      lang: "zh_CN",
      success: function (userRes) {
        //发起网络请求
        var nickName = userRes.userInfo.nickName;
        //性别 1:男 2 女
        var gender = userRes.userInfo.gender;
        var headerImg = userRes.userInfo.avatarUrl;
       
        app.globalData.nickName = nickName;
        app.globalData.headerImg = headerImg;
 
        if (gender==1){
          app.globalData.userSex = 2;
        }else{
          app.globalData.userSex = 1; 
        }
      
     
      
      }
    })
     
    wx.getUserInfo({
      openIdList: [res.data.data.openid],
      lang: 'zh_CN',
      success: (resa) => {
        console.log( resa)
      },
      fail: (err) => {
        reject(res)
      }
    })


    
  },
  linkToDetail(e) {
    let activityId = e.currentTarget.dataset.activityid;
    let userId = wx.getStorageSync('userId');
    let unitId = wx.getStorageSync('unitId');
    wx.request({
      url: app.globalData.domain + 'snail-portal/act/actDetail.htm',
      method: "GET",
      data: {
        id: activityId,
        userId: userId,
        unitId: unitId
      },
      success: (res) => {
        if (res.data.success) {
          //type为: 0 大转盘  1调查问卷  2报名活动
          if (res.data.data.type == 0) {
            wx.navigateTo({
              url: '/pages/mallactivity/luckyrotate/luckyrotate'
            })
          } else if (res.data.data.type == 1) {
            wx.navigateTo({
              url: '/pages/mallactivity/questionnaire/questionnaire'
            })
          } else if (res.data.data.type == 2) {
            wx.navigateTo({
              url: '/pages/mallactivity/activitydetail/activitydetail?activityDetail=' + JSON.stringify(res.data.data)
            })
          }
        }
      },
      fail: (err) => {
        wx.hideLoading();
      }
    })
  },
  hidePopup(){
    this.setData({
      showPopupIndex: 0
    })
  },
  showRedPacket() { //显示红包
    let userId = wx.getStorageSync('userId');
    wx.request({
      url: app.globalData.domain + 'snail-portal/redPacket/showRedPacket.do',
      data: {
        userId: userId,
        form_id: this.data.formId
      },
      method: "GET",
      success: (res) => {
        wx.hideLoading();
        var code = res.data.code;
        //说明成功
        if (code == "0") {
          var redPacket = res.data.redPacket;
          if (redPacket != null) {
            if (redPacket.packetType == 1) { //优惠券
              this.setData({
                showPopupIndex: 3,
               // couponAmt: redPacket.couponAmt
                 couponName: redPacket.couponName
              })
            }
            if (redPacket.packetType == 2) { //积分
              this.setData({
                showPopupIndex: 1,
                jifen: redPacket.jiFen
              })
            }
            if (redPacket.packetType == 0) { //现金
              this.setData({
                showPopupIndex: 2,
                redAmt: redPacket.redAmt
              })
            }
          }
        }
      },
      fail: (err) => {
        wx.hideLoading();
      }
    })
  },
  onShareAppMessage: function () {
    return {
      title: '首页',
      path: '/pages/index/index'
    }
  },
})
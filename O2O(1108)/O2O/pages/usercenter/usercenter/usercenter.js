// pages/usercenter/usercenter.js
const app = getApp();
Page({
  data: {
    imgBaseUrl: '',
    qrcodeLgShow: false,   //大型二维码是否显示,
    username: '',
    points: '',
    carCode: '',
    qrcode:'',
    level: ''
  },
  onLoad: function (options) {
    //判断uersId是否存在
    // if (!wx.getStorageSync('userId')) {
    //   wx.redirectTo({
    //     url: '/pages/loginbefore/loginbefore'
    //   })
    //   return false;
    // }
    this.setData({
      imgBaseUrl: app.globalData.imgBaseUrl
    })
    this.userId = wx.getStorageSync('userId');
    wx.showLoading({
      title: '拼命加载中...',
    })
    app.fetch("user/userCenter.htm", { userId: this.userId }).then(res => {
      wx.hideLoading();
      if (res.data.success) {
        this.setData({
          username: res.data.data.user.name,
          points: res.data.data.user.points,
          cardCode: res.data.data.user.cardCode,
       //   headImgPath: res.data.data.user.headImgPath,
          qrcode: res.data.data.user.qrcodeImgPath,
          level: res.data.data.user.level
        });
      }
    });
  },
  linkToMySign(e) {
    wx.navigateTo({
      url: '/pages/usercenter/mysignin/mysignin?formid=' + e.detail.formId
    })
  },
  showQrcodeLg() {
    this.setData({
      qrcodeLgShow: true
    })
  },
  hideQrcodeLg() {
    this.setData({
      qrcodeLgShow: false
    })
  },
  logout(){
    wx.showLoading({
      title: '拼命加载中...'
    })
    wx.clearStorage({
      success: function(){
        wx.login({
          success: (res) => {
            if (res.code) {
              wx.request({
                url: app.globalData.domain + '/index.htm',
                data: {
                  code: res.code
                },
                method: "GET",
                success: (res) => {
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
                  wx.hideLoading();
                  wx.navigateTo({
                    url: '/pages/loginbefore/loginbefore'
                  })
                },
                fail: (err) => {
                  wx.hideLoading();
                }
              })
            }
          }
        })
      }
    });
  }
})
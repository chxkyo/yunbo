const fetch = require('./utils/fetch.js');
const util = require('./utils/util.js');
//app.js
App({
  onLaunch: function () {
    if (wx.getStorageSync('sessionid') && wx.getStorageSync('sessionid_gettime')){
      //超过24小时自动清除
      if ((new Date().getTime() - wx.getStorageSync('sessionid_gettime')) > 24*60*60*1000 ){
        wx.removeStorageSync('sessionid')
        wx.removeStorageSync('sessionid_gettime')
      }else{
        // wx.switchTab({
        //   url: 'pages/index/index'
        // })
        wx.navigateTo({
          url: 'pages/choosedate/choosedate',
        })
      }
    }
    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
  },
  globalData: {
    staticUrl: 'http://122.144.167.216:8080/cashier-admin/miniApp',
    userInfo: null
  },
  fetch: fetch,
  util:util
})
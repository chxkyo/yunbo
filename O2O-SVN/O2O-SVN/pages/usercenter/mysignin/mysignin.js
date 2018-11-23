// pages/mysignin/mysignin.js
const app = getApp()
Page({
  data: {
    userId: '',
    formid: '',
    domain: app.globalData.domain
  },
  onLoad: function (options) {
    if(options.formid){
      this.setData({
        formid: options.formid
      })
    }
    this.setData({
      userId: wx.getStorageSync('userId')
    })
  }
});
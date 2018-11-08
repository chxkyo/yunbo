// pages/mallactivity/questionnaire/questionnaire.js
const app = getApp();
Page({
  data: {
    activityId: null,
    userId: wx.getStorageSync('userId'),
    domain: ''
  },
  onLoad: function (options) {
    this.setData({
      domain: app.globalData.domain
    })
    //判断uersId是否存在
    if (!wx.getStorageSync('userId')) {
      wx.redirectTo({
        url: '/pages/loginbefore/loginbefore'
      })
      return false;
    }
    
  }
})
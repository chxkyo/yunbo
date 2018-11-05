// pages/mallactivity/questionnaire/questionnaire.js
const app = getApp();
Page({
  data: {
    activityId: null,
    userId: wx.getStorageSync('userId')
  },
  onLoad: function (options) {
    this.setData({
      activityId: options.activityId
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
// pages/mallactivity/luckyrotate/luckyrotate.js
const app = getApp();
Page({
  data: {
    id: '',
    activityId: null,
    userId: wx.getStorageSync('userId'),
    url: ''
  },
  onLoad: function (options) {
    console.log(options)
    this.setData({
      id: options.id,
      activityId: options.activityId,
      url: options.moreInfoUrl
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

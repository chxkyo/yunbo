// pages/follow/follow.js
const app = getApp()
Page({
  /**
   * 页面的初始数据
   */
  data: {
    followArr: [],
    imgBaseUrl: '',
    iconBaseUrl: app.globalData.iconBaseUrl
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      imgBaseUrl: app.globalData.imgBaseUrl
    })
    wx.showLoading({
      title: '拼命加载中...',
    })
    this.userId = wx.getStorageSync('userId');
    app.fetch("user/favoriteStoreList.htm", { userId: this.userId }).then(res => {
      wx.hideLoading();
      if (res.data.success) {
        this.setData({
          followArr: res.data.data.list
        })
      }
    });
  }
})
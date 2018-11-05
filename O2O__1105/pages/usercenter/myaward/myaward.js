// pages/myaward/myaward.js
const app = getApp()
Page({
  /**
   * 页面的初始数据
   */
  data: {
    lotteryResultList: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.showLoading({
      title: '拼命加载中',
    })
    app.fetch("snail-portal/user/lotteryCouponList.htm").then(res => {
      wx.hideLoading();
      if (res.data.success) {
        this.setData({
          lotteryResultList: res.data.data.lotteryResultList
        })
      }
    });
  }
})
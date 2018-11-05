// pages/pointsmall/record/record.js
const app = getApp();
Page({
  /**
   * 页面的初始数据
   */
  data: {
    list: []
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.showLoading({
      title: '拼命加载中....',
    })
    app.fetch("snail-portal/product/orderList.htm").then(res => {
      wx.hideLoading();
      if (res.data.success) {
        wx.hideLoading();
        res.data.data.list.forEach(function (val, index) {
          val.productImgPath = app.globalData.imgBaseUrl + val.productImgPath;
        })
        this.setData({
          list: res.data.data.list
        })
      } else {

      }
    })
  }
})
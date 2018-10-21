// pages/follow/follow.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    followArr:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.showLoading({
      title: '拼命加载中...',
    })
    this.userId = "628800148082";
    app.fetch("snail-portal/user/favoriteStoreList.htm", { userId: this.userId }).then(res => {
      wx.hideLoading();
      if (res.data.success) {
        res.data.data.list.forEach(function(val,index){
          val.photoImgPath = app.globalData.basrUrl + val.photoImgPath;
        })
        this.setData({
          followArr:res.data.data.list
        })
      }
    });
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})
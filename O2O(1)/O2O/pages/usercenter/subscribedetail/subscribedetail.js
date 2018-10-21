// pages/usercenter/subscribedetail/subscribedetail.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    name:"",
    actTimeStart:"",
    actTimeEnd:"",
    enrollTimeStart:"",
    enrollTimeEnd:"",
    actNote:"",
    actDetail:"",
    imgPath:"",
    erollCount:0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if(options.id){
      this.userId = "628800148082";
      wx.showLoading({
        title: '拼命加载中...',
      })
      app.fetch("snail-portal/act/actDetail.htm", { userId: this.userId, id: options.id, unitId: app.globalData.unitId }).then(res => {
        wx.hideLoading();
        if (res.data.success) {
          if (res.data.data.enrollCount){
            this.setData({
              erollCount: res.data.data.enrollCount
            })
          }
          this.setData({
            name: res.data.data.act.name,
            actTimeStart: res.data.data.act.actTimeStart,
            actTimeEnd: res.data.data.act.actTimeEnd,
            enrollTimeStart: res.data.data.act.enrollTimeStart,
            enrollTimeEnd: res.data.data.act.enrollTimeEnd,
            actNote: res.data.data.act.actNote,
            actDetail: res.data.data.act.actDetail,
            imgPath: app.globalData.baseUrl+ res.data.data.act.imgPath
          });
        }
      });
    }
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
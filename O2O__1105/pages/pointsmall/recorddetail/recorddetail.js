// pages/pointsmall/recorddetail/recorddetail.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    productImgPath:'',
    productName:'',
    exchangePoints:0,
    exchangeCount:0,
    receiveType:'',
    expressCompany:'',
    expressNo:'',
    receiveStatus:'',
    receiveAddress:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      productImgPath:options.productImgPath,
      productName: options.productName,
      exchangePoints: options.exchangePoints,
      exchangeCount: options.exchangeCount,
      receiveType: options.receiveType,
      expressCompany: options.expressCompany,
      expressNo: options.expressNo,
      receiveStatus: options.receiveStatus
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
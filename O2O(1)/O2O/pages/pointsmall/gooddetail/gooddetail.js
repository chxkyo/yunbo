// pages/pointsmall/gooddetail/gooddetail.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    productName:'',
    productImgPath:'',
    productDetail:'',
    productValue:'',
    exchangePoint:0,
    exchangeEndTime:'',
    exchangeCount:0,
    leftCount:0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    app.fetch("/snail-portal/product/productDetail.htm", { unitId: app.globalData.unitId,id:options.id}).then(res => {
      if (res.data.success) {
        wx.hideLoading();
        this.setData({
          productName: res.data.data.product.productName,
          productImgPath: app.globalData.baseUrl + res.data.data.product.productImgPath,
          productDetail: res.data.data.product.productDetail,
          productValue: res.data.data.product.productValue,
          exchangePoint: res.data.data.product.exchangePoint,
          exchangeEndTime: res.data.data.product.exchangeEndTime,
          exchangeCount: res.data.data.product.exchangeCount,
          leftCount: res.data.data.product.leftCount
        });
      }
    })
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
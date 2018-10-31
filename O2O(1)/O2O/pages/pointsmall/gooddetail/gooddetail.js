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
    leftCount:0,
    product:{},
    cardTypeCode:'',
    id:'',
    points:0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.showLoading({
      title: '拼命加载中...',
    })
    if (options.id){
      this.id = options.id;
      this.setData({
        id: options.id
      })
    }
    if (options.cardTypeCode){
      this.setData({
        cardTypeCode: options.cardTypeCode
      })
    }
    if (options.points){
      this.setData({
        points: options.points
      })
    }
    app.fetch("/snail-portal/product/productDetail.htm", { unitId: app.globalData.unitId, id: this.id}).then(res => {
      wx.hideLoading();
      if (res.data.success) {
        wx.hideLoading();
        this.setData({
          productName: res.data.data.product.productName,
          productImgPath: app.globalData.baseUrl + res.data.data.product.productImgPath,
          productDetail: res.data.data.product.productDetail,
          productValue: res.data.data.product.productValue,
          exchangeEndTime: res.data.data.product.exchangeEndTime,
          exchangeCount: res.data.data.product.exchangeCount,
          leftCount: res.data.data.product.leftCount,
          product: res.data.data.product
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

  },
  exhange(){
    let that = this;
    wx.showLoading({
      title: '兑换中...',
    })
    app.fetch("/snail-portal/park/orderConfirm.htm", { productId: this.id }).then(res => {
      wx.hideLoading();
      if (res.data.success) {
        wx.showToast({
          title: '兑换成功!',
          success:function(){
            that.onLoad();
          }
        });
      }else{
        wx.showToast({
          title: res.data.message,
          icon:'none'
        })
      }
    })
  }
})
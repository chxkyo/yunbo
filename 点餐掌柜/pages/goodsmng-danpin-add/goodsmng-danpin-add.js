// pages/editcuisine/editcuisine.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    productCategoryName:'',
    name:'',
    price:'',
    unit:'',
    discount:'',
    goodsClassifyList:[],
    classifyIndex:0,
    unitArr:[0,1,10,50,100,200,500,1000],
    unitIndex:0

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    getgoodsClassifyList(this);
    app.fetch('getUnits', {}, "POST").then(res => {
      this.setData({
        unitArr: res.data.units
      });
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

  },
  getName(e){
    this.setData({
      name:e.detail.value
    })
  },
  getPrice(e){
    this.setData({
      price: e.detail.value
    })
  },
  getUnit(e){
    this.setData({
      unit: e.detail.value
    })
  },
  getDiscount(e){
    this.setData({
      discount: e.detail.value
    })
  },
  bindClassifyChange(e){
    this.setData({
      classifyIndex: e.detail.value
    })
  },
  bindUnitChange(e) {
    this.setData({
      unitIndex: e.detail.value
    })
  },
  saveDanPin() {
    let pages = getCurrentPages();
    let prevPage = pages[pages.length - 2];  //上一个页面
    if (this.data.name == '') {
      wx.showModal({
        title: '提示',
        content: '请输入单品名称',
        showCancel: false
      })
    }else if (this.data.price == ''){
      wx.showModal({
        title: '提示',
        content: '请输入商品单价',
        showCancel: false
      })
    } else if (this.data.discount == ''){
      wx.showModal({
        title: '提示',
        content: '请输入商品折扣',
        showCancel: false
      })
    } else {
      app.fetch('product/save', { name: this.data.name, productCategoryId: parseInt(this.data.goodsClassifyList[this.data.classifyIndex].id), discount: parseFloat(this.data.discount), price: parseFloat(this.data.price), unit: parseInt(this.data.unitArr[this.data.unitIndex].code)}, "POST").then(res => {
        if (res.data.code === 0) {
          wx.showToast({
            title: '添加单品成功！',
            success: function () {
              prevPage.onLoad();
              wx.navigateBack({
                delta: 1
              })
            }
          })
        }
      })
    }
  }
})
function getgoodsClassifyList(that) {
  return app.fetch('productCategory/list', {}, "POST").then(res => {
    if (res.data.code === 0) {
      that.setData({
        goodsClassifyList: res.data.productCategoryList
      })
      return res.data.productCategoryList;
    }
  })
}
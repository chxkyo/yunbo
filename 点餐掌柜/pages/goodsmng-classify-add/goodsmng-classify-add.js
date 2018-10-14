// pages/editcuisine/editcuisine.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    goodsClassifyName: '',
    goodsClassifyDiscount: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
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
  getGoodsClassifyName(e){
    this.setData({
      goodsClassifyName:e.detail.value
    })
  },
  getGoodsClassifyDiscount(e){
    this.setData({
      goodsClassifyDiscount: e.detail.value
    })
  },
  saveClassify(){
    let pages = getCurrentPages();
    let prevPage = pages[pages.length - 2];  //上一个页面
    if (!this.data.goodsClassifyName) {
      wx.showModal({
        title: '提示',
        content: '请输入商品类名称',
        showCancel: false
      })
    } else if (!this.data.goodsClassifyDiscount){
      wx.showModal({
        title: '提示',
        content: '请输入商品类折扣',
        showCancel: false
      })
      }else{
      app.fetch('productCategory/save', { name: this.data.goodsClassifyName, discount: this.data.goodsClassifyDiscount,pid:0}, "POST").then(res => {
        if (res.data.code === 0) {
          wx.showToast({
            title: '添加商品分类成功！',
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
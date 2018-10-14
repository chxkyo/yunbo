// pages/wy-goodsmng-classifymng/wy-goodsmng-classifymng.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    showModal:false,
    shopCashierList: [],
    areaName:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    getShopCashierList(this);
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
  modalShow(){
    this.setData({
      showModal:true
    })
  },
  saveArea(){
    if(!this.data.areaName){
      wx.showModal({
        title: '提示',
        content: '请输入区域名称',
        showCancel: false
      })
    }else{
      this.data.areaListArr.push({ name: this.data.areaName,type:1});
      this.setData({
        areaListArr: this.data.areaListArr,
        showModal:false
      })
    }
  },
  getAreaName(e){
    this.setData({
      areaName:e.detail.value
    })
  }
})
function getShopCashierList(that) {
  return app.fetch('shopCashier/list', {}, "POST").then(res => {
    if (res.data.code === 0) {
      that.setData({
        shopCashierList: res.data.shopCashierList
      })
    }
  })
}
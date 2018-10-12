// pages/wy-goodsmng-classifymng/wy-goodsmng-classifymng.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    showModal:false,
    goodsClassifyList: [],
    goodsClassifyName:'',
    goodsClassifyDiscount:'',
    switchChecked:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    getgoodsClassifyList(this);
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
  saveGoodsClassify(){
    let that = this;
    if (!this.data.goodsClassifyName){
      wx.showModal({
        title: '提示',
        content: '请输入商品类名称',
        showCancel: false
      })
    }else{
      let flag;
      if (this.switchChecked){
        flag = 0;
      }else{
        flag = 1;
      }
      app.fetch('productCategory/save', { name: this.data.goodsClassifyName, discount: this.data.goodsClassifyDiscount, custPriceFlag: flag}, "POST").then(res => {
        if (res.data.code === 0) {
          getgoodsClassifyList(that);
          this.setData({
            showModal: false
          })
          wx.showToast({
            title: '添加成功'
          })
        }
      })
    }
  },
  getAreaName(e){
    this.setData({
      areaName:e.detail.value
    })
  },
  getGoodsClassifyName(e){
    this.setData({
      goodsClassifyName: e.detail.value
    })
  },
  getGoodsClassifyDiscount(e){
    this.setData({
      goodsClassifyDiscount: e.detail.value
    })
  },
  switchChange(e){
    console.log(e.detail.value);
  }
})
function getgoodsClassifyList(that) {
  app.fetch('productCategory/list', {}, "POST").then(res => {
    if (res.data.code === 0) {
      that.setData({
        goodsClassifyList: res.data.productCategoryList
      })
    } else if (res.data.code === 2) {
      wx.removeStorageSync('sessionid');
      wx.removeStorageSync('sessionid_gettime');
      wx.switchTab({
        url: 'pages/index/index'
      })
    }
  })
}
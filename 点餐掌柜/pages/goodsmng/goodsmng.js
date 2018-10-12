// pages/wy-goodsmng/wy-goodsmng.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    goodsName:'',
    goodsCategoryArr:["单点","套餐"],
    goodsCategoryIndex:"",
    goodsCategoryFlag:false,
    goodsUnitArr:["元","百元","千元"],
    goodsUnitIndex:"",
    goodsUnitFlag: false,
    goodsName:'',
    goodsPrice:'',
    goodsDiscount:''
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
  bindCategoryPickerChange(e){
    this.setData({
      goodsCategoryIndex: e.detail.value,
      goodsCategoryFlag:true
    })
  },
  bindUnitPickerChange(e){
    this.setData({
      goodsUnitIndex: e.detail.value,
      goodsUnitFlag:true
    })
  },
  getGoodsName(e){
    this.setData({
      goodsName:e.detail.value
    });
  },
  getGoodsDiscount(e){
    this.setData({
      goodsDiscount: e.detail.value
    });
  },
  getGoodsPrice(e){
    this.setData({
      goodsPrice: e.detail.value,
    });
  },
  saveGood(){
    if (!this.data.goodsName){
      wx.showModal({
        title: '提示',
        content: '请输入单品名称',
        showCancel: false
      })
    } else if (!this.data.goodsCategoryFlag){
      wx.showModal({
        title: '提示',
        content: '请选择所属类别',
        showCancel: false
      })
    } else if (!this.data.goodsPrice){
      wx.showModal({
        title: '提示',
        content: '请输入单价',
        showCancel: false
      })
    } else if (!this.data.goodsUnitFlag){
      wx.showModal({
        title: '提示',
        content: '请选择单位',
        showCancel: false
      })
    } else if (!this.data.goodsDiscount){
      wx.showModal({
        title: '提示',
        content: '请选择折扣',
        showCancel: false
      })
    }
  }
})
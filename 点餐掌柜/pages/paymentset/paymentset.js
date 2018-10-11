// pages/paymentset/paymentset.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    showModal: false,
    otherPayMethod:'',
    methodArr: [{ name: "美团50抵100券", status:1 },{ name: "美团50抵100券", status: 0 }],
    method:'',
    methodFlag:false,
    method_index:0,
    method_arr: ["美团50抵100券", "美团10抵20券", "美团10抵50券"]
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
  modalShow(){
    this.setData({
      showModal:true
    })
  },
  getPayMethod(e){
    this.setData({
      otherPayMethod: e.detail.value
    })
  },
  bindMethodChange(e){
    this.setData({
      methodFlag: true,
      method_index: e.detail.value
    })
  },
  saveMethod(){
    if (!this.data.methodFlag) {
      wx.showModal({
        title: '提示',
        content: '请填写支付方式！',
        showCancel: false
      })
    }else{
      this.data.methodArr.push({ name: "美团50抵100券", status: 0 });
      this.setData({
        methodArr: this.data.methodArr,
        showModal: false
      });
      wx.showToast({
        title: '添加成功'
      })
    }
  }
})
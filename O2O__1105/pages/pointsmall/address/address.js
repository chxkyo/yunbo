// pages/pointsmall/address/address.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userName:'',
    receiveAddress:'',
    mobile:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.showLoading({
      title: '拼命加载中...',
    })
    app.fetch("snail-portal/user/toChangeAddress.do",{}).then(res => {
      if (res.data.success) {
        wx.hideLoading();
        this.setData({
          userName: res.data.data.userName,
          receiveAddress: res.data.data.receiveAddress,
          mobile: res.data.data.mobile
        })
      }
    })
  },
  getUserName(e){
    this.setData({
      userName:e.detail.value
    })
  },
  getMobile(e){
    this.setData({
      mobile: e.detail.value
    })
  },
  getAddress(e){
    this.setData({
      receiveAddress: e.detail.value
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
  saveAddress(){
    let pages = getCurrentPages();
    let prevPage = pages[pages.length - 2];  //上一个页面
    if (this.data.receiveAddress == '') {
      wx.showModal({
        title: '提示',
        content: '请输入详细地址',
        showCancel: false
      })
    } else{
      app.fetch('snail-portal/user/updateAddress.do', { receiveAddress: this.data.receiveAddress }, "POST").then(res => {
        if (res.data.success) {
          wx.showToast({
            title: '保存成功！',
            success: function () {
            }
          })
          setTimeout(function () {
            prevPage.onLoad();
            wx.navigateBack({
              delta: 1
            })
          }, 1500);
        } else {
          wx.showToast({
            title: res.data.msg,
            icon: 'none'
          })
        }
      })
    }
  }
})
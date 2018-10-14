// pages/editcuisine/editcuisine.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    originalPwd: '',
    newPwd: '',
    confirmNewPwd: ''
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
  getOriginalPwd(e) {
    this.setData({
      originalPwd: e.detail.value
    })
  },
  getNewPwd(e) {
    this.setData({
      newPwd: e.detail.value
    })
  },
  getConfirmNewPwd(e) {
    this.setData({
      confirmNewPwd: e.detail.value
    })
  },
  savePwd() {
    if (!this.data.originalPwd) {
      wx.showModal({
        title: '提示',
        content: '请输入原密码',
        showCancel: false
      })
    } else if (!this.data.newPwd) {
      wx.showModal({
        title: '提示',
        content: '请输入新密码',
        showCancel: false
      })
    } else if (!this.data.confirmNewPwd) {
      wx.showModal({
        title: '提示',
        content: '请确认新密码',
        showCancel: false
      })
    } else {
      if (this.data.newPwd != this.data.confirmNewPwd) {
        wx.showModal({
          title: '提示',
          content: '新密码两次输入不一致!',
          showCancel: false
        })
      } else {
        app.fetch('config/refundPwd', { originalPwd: this.data.originalPwd, newPwd: this.data.newPwd }, "POST").then(res => {
          if (res.data.code === 0) {
            wx.showToast({
              title: '打折密码修改成功！',
              success: function () {
              }
            })
          }
        })
      }
    }
  }
})
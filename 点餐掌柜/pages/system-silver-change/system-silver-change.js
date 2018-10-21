// pages/system-silver-change/system-silver-change.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    changeHandlerList:[],
    changeIndex: 0
  },
  bindchange(e) {
    this.setData({
      changeIndex: e.detail.value
    })
  },
  saveAccount() {
    app.fetch('generalHandler', { value: this.data.changeHandlerList[this.data.changeIndex].value }, "POST").then(res => {
      if (res.data.code === 0) {
        wx.showToast({
          title: '设置成功！',
          success: function () {
          }
        })
      } else {
        wx.showToast({
          title: res.data.msg,
          icon: 'none'
        })
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    getChangeHandleList(this)
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
function getChangeHandleList(that) {
  return app.fetch('changeHandleList', {}, "POST").then(res => {
    if (res.data.code === 0) {
      that.setData({
        changeHandlerList: res.data.changeHandlerList
      })
    }
  })
}
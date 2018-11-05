// pages/editcuisine/editcuisine.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    discountFlag:false,
    refundFlag:false,
    accountName:'',
    accountPassword:''
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
  getAccountName(e){
    this.setData({
      accountName:e.detail.value
    })
  },
  getPassWord(e){
    this.setData({
      accountPassword: e.detail.value
    })
  },
  switchDiscount(e){
    this.setData({
      discountFlag:e.detail.value
    })
  },
  switchRefund(e){
    this.setData({
      refundFlag: e.detail.value
    })
  },
  saveAccount() {
    let pages = getCurrentPages();
    let prevPage = pages[pages.length - 2];  //上一个页面
    if (!this.data.accountName) {
      wx.showModal({
        title: '提示',
        content: '请输入账号名称',
        showCancel: false
      })
    }else {
      let discount = this.data.discountFlag ? 1 : 0;
      let refund = this.data.refundFlag ? 1 : 0;
      app.fetch('shopCashier/save', { loginNo: this.data.accountName, password: this.data.accountPassword, discountAuthority: discount, refundAuthority: refund  }, "POST").then(res => {
        if (res.data.code === 0) {
          wx.showToast({
            title: '添加账号成功！',
            success: function () {
            }
          })
          setTimeout(function () {
            prevPage.onLoad();
            wx.navigateBack({
              delta: 1
            })
          }, 1500)
        }else{
          wx.showToast({
            title:res.data.msg,
            icon:'none'
          })
        }
      })
    }
  },
  delThisMeal() {
    let pages = getCurrentPages();
    let prevPage = pages[pages.length - 2];  //上一个页面
    let that = this;
    wx.showModal({
      title: "确认删除该套餐吗?",
      success: function (res) {
        if (res.confirm) {
          prevPage.data.cuisineListArr.splice(that.data.thisIndex, 1);
          prevPage.setData({
            cuisineListArr: prevPage.data.cuisineListArr
          });
          wx.showToast({
            title: '删除套餐成功',
            success() {
              wx.navigateBack({
                delta: 1
              })
            }
          })
        }
      }
    });
  }
})
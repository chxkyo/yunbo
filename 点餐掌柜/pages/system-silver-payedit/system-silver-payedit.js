// pages/system-silver-payeadd/system-silver-payeadd.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    name: '',
    freeTypeIndex: 0,
    freeTypeArr: ["代金券", "打折券"],
    freePrice: '',
    limitPrice: 0,
    actPrice: '',
    backFeeIndex: 0,
    backFeeArr: ["不返款", "返款"],
    des:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if(options.id){
      this.id = options.id;
      app.fetch('promotion/info/' + this.id, {
        methodName: 'info',
        id: this.id
      }, "POST").then(res => {
        if (res.data.code === 0) {
          this.setData({
            freeTypeIndex:res.data.shopPromotion.promoteType,
            freePrice: res.data.shopPromotion.promoteValue,
            limitPrice: res.data.shopPromotion.limitFee,
            actPrice: res.data.shopPromotion.actFee,
            backFeeIndex: res.data.shopPromotion.backFeeFlag,
            name: res.data.shopPromotion.name
          })
        }
      })
    }
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
  getName(e) {
    this.setData({
      name: e.detail.value
    })
  },
  bindFreeTypeChange(e) {
    this.setData({
      freeTypeIndex: e.detail.value
    })
  },
  getFreePrice(e) {
    this.setData({
      freePrice: e.detail.value
    })
  },
  getLimitPrice(e) {
    this.setData({
      limitPrice: e.detail.value
    })
  },
  getActPrice(e) {
    this.setData({
      actPrice: e.detail.value
    })
  },
  bindBackFeeChange(e) {
    this.setData({
      backFeeIndex: e.detail.value
    })
  },
  getDes(e){
    this.setData({
      des: e.detail.value
    })
  },
  savePay() {
    let pages = getCurrentPages();
    let prevPage = pages[pages.length - 2];  //上一个页面
    if (this.data.name === '') {
      wx.showModal({
        title: '提示',
        content: '请输入优惠名称',
        showCancel: false
      })
    } else if (this.data.freePrice === '') {
      wx.showModal({
        title: '提示',
        content: '请输入折扣金额',
        showCancel: false
      })
    } else if (this.data.actPrice === ''
    ) {
      wx.showModal({
        title: '提示',
        content: '请输入实收金额',
        showCancel: false
      })
    } else {
      app.fetch('promotion/update', { id: parseInt(this.id), name: this.data.name, promoteType: parseInt(this.data.freeTypeIndex), promoteValue: parseFloat(this.data.freePrice), limitFee: parseFloat(this.data.limitPrice), actFee: parseFloat(this.data.actPrice), backFeeFlag: parseInt(this.data.backFeeIndex) }, "POST").then(res => {
        if (res.data.code === 0) {
          wx.showToast({
            title: '其他支付编辑成功！',
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
  },
  delPay(){
    let pages = getCurrentPages();
    let prevPage = pages[pages.length - 2];  //上一个页面
    let that = this;
    wx.showModal({
      title: "确认删除该支付方式吗?",
      success: function (res) {
        if (res.confirm) {
          app.fetch('promotion/delete/' + that.id, { id: that.id, methodName: 'delete' }, "POST").then(res => {
            if (res.data.code === 0) {
              wx.showToast({
                title: '删除成功！',
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
    });
  }
})
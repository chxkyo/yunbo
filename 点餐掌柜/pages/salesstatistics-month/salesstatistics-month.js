// pages/salesstatistics/salesstatistics.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    index: 0,
    startDate: '',
    chooseStartDate: false,
    endDate: '',
    chooseEndDate: false,
    showModal: false,
    nosroll: false,
    customFlag: false,
    reportData: '',
    orderCount: '',
    income: '',
    categoryList: [],
    receipts: [],
    nonReceipts: [],
    startDate: '',
    endDate: '',
    showMonth:'',
    backFee: [],
    shopName:'',
    duty:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let month = app.util.formatNumber(new Date().getMonth() + 1);
    let year = app.util.formatNumber(new Date().getFullYear());
    this.setData({
      showMonth: year + "-" + month,
      shopName: app.globalData.shopInfo.name
    })
    getReport(this, 'monthlyReport', year, month, '', '', '');
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
      showModal:true,
      noscroll: true
    })
  },
  modalClose() {
    this.setData({
      noscroll: false
    })
  },
  bindMonthChange(e){
    this.setData({
      chooseEndDate: true,
      endDate: e.detail.value
    })
  },
  saveDate(e){
    if (!this.data.chooseEndDate) {
        wx.showModal({
          title: '提示',
          content: '请选择年月',
          showCancel: false
        })
      }else{
        let year = this.data.endDate.split("-")[0];
        let month = this.data.endDate.split("-")[1];
        getReport(this, 'monthlyReport', year, month, '', '', '').then(res=>{
          this.setData({
            showModal: false,
            noscroll: false,
            showMonth: this.data.endDate
          })
        })
      }
  }
})
function getReport(that, method, year, month, day, startDate, endDate) {
  wx.showLoading({ title: '拼命加载中...' });
 return app.fetch('report/' + method, { year: year, month: month, day: day, startDate: startDate, endDate: endDate }, "POST").then(res => {
    wx.hideLoading();
    if (res.data.code === 0) {
      res.data.reportData.receipts.forEach(function (val, index) {
        val.rate = parseFloat(val.rate * 100).toFixed(2);
      });
      res.data.reportData.categoryList.forEach(function (val, index) {
        val.amountRate = parseFloat(val.amountRate * 100).toFixed(2);
      });
      that.setData({
        orderCount: res.data.reportData.orderCount,
        income: res.data.reportData.inCome,
        categoryList: res.data.reportData.categoryList,
        receipts: res.data.reportData.receipts,
        nonReceipts: res.data.reportData.nonReceipts,
        backFee: res.data.reportData.backFee,
        duty: res.data.reportData.duty
      })
    }else{
      wx.showToast({
        title: res.data.msg,
        icon:'none'
      })
    }
    return res
  })
}
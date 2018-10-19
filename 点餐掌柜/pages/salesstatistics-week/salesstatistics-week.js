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
    chooseEndDate: false,
    showModal: false,
    nosroll: false,
    reportData: '',
    orderCount: '',
    income: '',
    categoryList: [],
    receipts: [],
    nonReceipts: [],
    startDate: '',
    endDate: '',
    showWeekDate:'',
    noscroll:false,
    chooseDate:'',
    backFee: [],
    shopName:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
      let month = app.util.formatNumber(new Date().getMonth() + 1);
      let year = app.util.formatNumber(new Date().getFullYear());

      this.setData({
        startDate: year + month + "01",
        endDate: year + month + "07",
        showWeekDate: year + "-" + month + "-" + "01" + "~" + year + "-" + month + "-" + "07",
        shopName: app.globalData.shopInfo.name
      })
      getReport(this, 'weeklyReport', '', '', this.data.startDate, '', '');
  },
  modalShow(){
    this.setData({
      showModal:true,
      noscroll:true
    });
  },
  saveDate(){
    let that = this;
    if(this.data.chooseDate === ''){
      wx.showModal({
        title: '提示',
        content: '请选择查询日期!',
        showCancel: false
      })
    }else{
      this.data.startDate = this.data.chooseDate.split("~")[0].split("-").join("");
      getReport(this, 'weeklyReport', '', '', this.data.startDate, '', '').then(res => {
        this.setData({
          showModal: false,
          noscroll: false,
          showWeekDate: this.data.chooseDate
        });
      });
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
  modalClose() {
    this.setData({
      noscroll: false
    })
  }
})
function getReport(that, method, year, month, day, startDate, endDate) {
  wx.showLoading({ title: '拼命加载中...' });
  return app.fetch('report/' + method, { year: year, month: month, day: day, startDate: startDate, endDate: endDate }, "POST").then(res => {
    wx.hideLoading();
    if (res.data.code === 0) {
      that.setData({
        orderCount: res.data.reportData.orderCount,
        income: res.data.reportData.inCome,
        categoryList: res.data.reportData.categoryList,
        receipts: res.data.reportData.receipts,
        nonReceipts: res.data.reportData.nonReceipts,
        backFee: res.data.reportData.backFee
      })
    } else {
      wx.showToast({
        title: res.data.msg,
        icon: 'none'
      })
    }
    return res;
  })
}
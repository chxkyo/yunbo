// pages/salesstatistics/salesstatistics.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    index: 0,
    startDate: '',
    chooseStartDateFlag: false,
    chooseEndDateFlag: false,
    chooseStartDate:'',
    chooseEndDate:'',
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
    shopName:'',
    duty: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let {monday,sunday} = this.getWeek();
    this.setData({
      startDate: app.util.formatTime(new Date(monday)),
      endDate: app.util.formatTime(new Date(sunday)),
      showWeekDate: app.util.formatTime(new Date(monday), "-") + "~" + app.util.formatTime(new Date(sunday), "-"),
      shopName: app.globalData.shopInfo.name
    })
    getReport(this, 'weeklyReport', '', '', this.data.startDate, '', '');
  },
  getWeek(date = new Date()){
    let now = date;
    let nowTime = now.getTime();
    let day = now.getDay();
    let oneDayLong = 24 * 60 * 60 * 1000;
    let monday = nowTime - (day - 1) * oneDayLong;
    let sunday = nowTime + (7 - day) * oneDayLong;
    return { monday, sunday};
  },
  modalShow(){
    this.setData({
      showModal:true,
      noscroll:true
    });
  },
  saveDate(){
    let that = this;
    if (!this.data.chooseStartDateFlag){
      wx.showModal({
        title: '提示',
        content: '请选择日期!',
        showCancel: false
      })
    }else{
      let { monday, sunday } = this.getWeek(new Date(this.data.chooseStartDate));
      getReport(this, 'weeklyReport', '', '', app.util.formatTime(new Date(monday)),'','').then(res => {
        this.setData({
          showModal: false,
          noscroll: false,
          showWeekDate: app.util.formatTime(new Date(monday), "-") + "~" + app.util.formatTime(new Date(sunday), "-"),
          startDate: app.util.formatTime(new Date(monday)),
          endDate: app.util.formatTime(new Date(sunday)),
        });
      });
    }
  },
  bindStartDateChange(e) {
    this.setData({
      chooseStartDateFlag: true,
      chooseStartDate:e.detail.value
    });
  },
  bindEndDateChange(e) {
    this.setData({
      chooseEndDateFlag: true,
      chooseEndDate:e.detail.value
    });
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
    } else {
      wx.showToast({
        title: res.data.msg,
        icon: 'none'
      })
    }
    return res;
  })
}
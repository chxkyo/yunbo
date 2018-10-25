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
    shopName:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let {monday,sunday} = this.getWeek();

      this.setData({
        startDate: monday.split("/").join(""),
        endDate: sunday.split("/").join(""),
        showWeekDate:monday.replace(/\//g,"-")+"~"+sunday.replace(/\//g,"-"),
        shopName: app.globalData.shopInfo.name
      })
      getReport(this, 'weeklyReport', '', '', this.data.startDate, '', '');
  },
  getWeek(){
    let now = new Date();
    let nowTime = now.getTime();
    let day = now.getDay();
    let oneDayLong = 24 * 60 * 60 * 1000;
    let MondayTime = nowTime - (day - 1) * oneDayLong;
    let SundayTime = nowTime + (7 - day) * oneDayLong;
    let monday = new Date(MondayTime).toLocaleDateString();
    let sunday = new Date(SundayTime).toLocaleDateString();
    return {monday,sunday};
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
        content: '请选择开始日期!',
        showCancel: false
      })
    } else if (!this.data.chooseEndDateFlag){
      wx.showModal({
        title: '提示',
        content: '请选择结束日期!',
        showCancel: false
      })
    }else{
      getReport(this, 'weeklyReport', '', '', this.data.chooseStartDate.split("-").join(""),'','').then(res => {
        this.setData({
          showModal: false,
          noscroll: false,
          showWeekDate: this.data.chooseStartDate + "~" + this.data.chooseEndDate,
          startDate: this.data.chooseStartDate.split("-").join(""),
          endDate: this.data.chooseEndDate.split("-").join(""),
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
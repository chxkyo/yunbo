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
    reportData:'',
    orderCount:'',
    income:'',
    categoryList:[],
    receipts:[],
    nonReceipts:[],
    startDate:'',
    endDate:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.setData({
      startDate: app.util.formatTime(new Date),
      endDate: app.util.formatTime(new Date)
    })
    getReport(this, 'dailyReport', '', '', '', this.data.startDate,this.data.endDate)
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  },
  tabTap(e) {
    let index = e.currentTarget.dataset.index;
    this.setData({
      index: index
    });
    if (index == 1) {
      this.setData({
        showModal: true,
        noscroll: true
      })
    }else{
      getReport(this, 'dailyReport', '', '', '', this.data.startDate, this.data.endDate);
    }
  },
  bindStartDateChange(e) {
    this.setData({
      startDate: e.detail.value,
      chooseStartDate: true
    });
  },
  bindEndDateChange(e) {
    this.setData({
      endDate: e.detail.value,
      chooseEndDate: true
    });
  },
  saveDate() {
    if (!this.data.chooseStartDate) {
      wx.showModal({
        title: '提示',
        content: '请选择开始日期',
        showCancel: false
      })
    } else if (!this.data.chooseEndDate) {
      wx.showModal({
        title: '提示',
        content: '请选择结束日期',
        showCancel: false
      })
    } else {
      let month = app.util.formatNumber(new Date().getMonth() + 1);
      let year = app.util.formatNumber(new Date().getFullYear());
      getReport(this, 'dailyReport', year, month, this.data.startDate, this.data.startDate, this.data.endDate).then(res=>{
        this.setData({
          customFlag: true,
          showModal: false,
          noscroll: false
        });
      })
    }
},
modalClose() {
  this.setData({
    noscroll: false
  })
}
})
function getReport(that,method,year,month,day,startDate,endDate) {
  return app.fetch('report/' + method, { year: year, month: month, day: day, startDate: startDate, endDate: endDate}, "POST").then(res => {
      if (res.data.code === 0) {
        that.setData({
          orderCount: res.data.reportData.orderCount,
          income: res.data.reportData.inCome,
          categoryList: res.data.reportData.categoryList,
          receipts: res.data.reportData.receipts,
          nonReceipts: res.data.reportData.nonReceipts
        })
      }
      return res;
  })
}
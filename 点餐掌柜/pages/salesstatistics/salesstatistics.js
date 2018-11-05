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
    endDate:'',
    backFee:[],
    shopName:'',
    duty:[],
    startChooseDate:'',
    endChooseDate:'',
    cus_startChooseDate: '',
    cus_endChooseDate: '',
    showDate:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.setData({
      startDate: app.util.formatTime(new Date),
      endDate: app.util.formatTime(new Date),
      shopName: app.globalData.shopInfo.name,
      showDate: app.util.formatTime(new Date,"-")
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
      this.setData({
        startDate: app.util.formatTime(new Date),
        endDate: app.util.formatTime(new Date)
      })
      getReport(this, 'dailyReport', '', '', '', this.data.startDate, this.data.endDate);
    }
  },
  bindStartDateChange(e) {
    this.setData({
      startChooseDate: e.detail.value,
      chooseStartDate: true
    });
  },
  bindEndDateChange(e) {
    this.setData({
      endChooseDate: e.detail.value,
      chooseEndDate: true
    });
  },
  saveDate() {
    if (!this.data.chooseStartDate) {
      wx.showModal({
        title: '提示',
        content: '请选择自定义日期',
        showCancel: false
      })
    } else {
      getReport(this, 'dailyReport', '', '', '', this.data.startChooseDate.replace(/-/g, ''), this.data.startChooseDate.replace(/-/g, '')).then(res=>{
        this.setData({
          customFlag: true,
          showModal: false,
          noscroll: false,
          startDate: this.data.startChooseDate.replace(/-/g, ''),
          endDate: this.data.startChooseDate.replace(/-/g, ''),
          showDate: this.data.startChooseDate
        });
      })
    }
},
modalShow() {
  this.setData({
    showModal: true,
    noscroll: true
  });
},
modalClose() {
  this.setData({
    noscroll: false
  })
}
})
function getReport(that,method,year,month,day,startDate,endDate) {
  wx.showLoading({
    title: '拼命加载中...',
  })
  return app.fetch('report/' + method, { year: year, month: month, day: day, startDate: startDate, endDate: endDate}, "POST").then(res => {
      wx.hideLoading()
      if (res.data.code === 0) {
        res.data.reportData.receipts.forEach(function (val, index) {
          val.rate = parseInt(val.rate * 100);
        });
        res.data.reportData.categoryList.forEach(function (val, index) {
          val.amountRate = parseInt(val.amountRate * 100);
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
      }
      return res;
  })
}
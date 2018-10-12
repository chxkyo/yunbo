// pages/salesstatistics/salesstatistics.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    index:0,
    startDate:'',
    chooseStartDate:false,
    endDate: '',
    chooseEndDate: false,
    showModal:false,
    nosroll:false
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
  tabTap(e){
    let index = e.currentTarget.dataset.index;
    this.setData({
      index:index
    });
    if(index == 1){
      this.setData({
        showModal:true,
        noscroll:true
      })
    }
  },
  bindStartDateChange(e){
    this.setData({
      startDate: e.detail.value,
      chooseStartDate:true
    });
  },
  bindEndDateChange(e){
    this.setData({
      endDate: e.detail.value,
      chooseEndDate: true
    });
  },
  saveDate(){
    if (!this.data.startDate){
      wx.showModal({
        title: '提示',
        content: '请选择开始日期',
        showCancel:false
      })
    } else if (!this.data.endDate){
      wx.showModal({
        title: '提示',
        content: '请选择结束日期',
        showCancel: false
      })
    }else{
      wx.navigateTo({
        url: '../salesweekstatistics/salesweekstatistics?date='+this.data.startDate+"~"+this.data.endDate,
      })
    }
  },
  modalClose(){
    this.setData({
      noscroll: false
    })
  }
})
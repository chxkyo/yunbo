// pages/mysubscribe/mysubscribe.js
const app = getApp()
Page({
  data: {
    reservationlist:[]
  },
  onLoad: function (options) {
    wx.showLoading({
      title: '拼命加载中...',
    })
    app.fetch("snail-portal/user/myReservation.htm", {}).then(res => {
      wx.hideLoading();
      if (res.data.success) {
        res.data.data.reservationlist.forEach(function(val,index){
          val.actImgPath = app.globalData.baseUrl + val.actImgPath;
        })
        this.setData({
          reservationlist: res.data.data.reservationlist
        })
      }
    });
  }
})
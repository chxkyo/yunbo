// pages/mysubscribe/mysubscribe.js
const app = getApp()
Page({
  data: {

  },
  onLoad: function (options) {
    app.fetch("snail-portal/user/myReservation.htm", { userId: this.userId }).then(res => {
      wx.hideLoading();
      if (res.data.success) {

      }
    });
  }
})
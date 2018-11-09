// pages/mysubscribe/mysubscribe.js
const app = getApp()
Page({
  data: {
    reservationlist: []
  },
  onLoad: function (options) {
    wx.showLoading({
      title: '拼命加载中...',
    })
    app.fetch("user/myReservation.htm", {}).then(res => {
      wx.hideLoading();
      if (res.data.success) {
        res.data.data.reservationlist.forEach(function (val, index) {
          val.actImgPath = app.globalData.imgBaseUrl + val.actImgPath;
        })
        this.setData({
          reservationlist: res.data.data.reservationlist
        })
      }
    });
  },
  linkToDetail(e) {
    wx.showLoading({
      title: '拼命加载中...',
    })
    let activityId = e.currentTarget.dataset.activityid;
    let userId = wx.getStorageSync('userId');
    let unitId = wx.getStorageSync('unitId');
    wx.request({
      url: app.globalData.domain + '/act/actDetail.htm',
      method: "GET",
      data: {
        id: activityId,
        userId: userId,
        unitId: unitId
      },
      success: (res) => {
        wx.hideLoading();
        if (res.data.success) {         
          wx.navigateTo({
            url: '/pages/mallactivity/activitydetail/activitydetail?activityDetail=' + JSON.stringify(res.data.data)
          })
        }
      },
      fail: (err) => {
        wx.hideLoading();
      }
    })
  },
})
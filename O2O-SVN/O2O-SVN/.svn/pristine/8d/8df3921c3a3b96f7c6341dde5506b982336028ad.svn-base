// pages/selfhelppoints/selfhelppoints.js
const app = getApp();
Page({
  data: {
    showIndex: 0,
    reviewedList: [],
    unreviewedList: []
  },
  onLoad: function (options) {
    app.fetch("user/points/list.htm").then(res => {
      wx.hideLoading();
      if (res.data.success) {
        if (res.data.data.reviewedList) {
          this.setData({
            reviewedList: res.data.data.reviewedList
          })
        }
        if (res.data.data.unreviewedList) {
          this.setData({
            unreviewedList: res.data.data.unreviewedList
          })
        }
      }
    });
  },
  changeshowIndex(e) {
    let index = e.currentTarget.dataset.index;
    this.setData({
      showIndex: index
    })
  },
  addSelfhelpPoints() {
    wx.navigateTo({
      url: '/pages/usercenter/addselfhelppoints/addselfhelppoints'
    })
  }
})
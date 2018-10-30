// pages/fullsubcoupon/fullsubcoupon.js
const app = getApp()
Page({
  data: {
    showIndex: 0, //第几个分类显示
    unUsedList: [
    ],
    usedList: [
    ],
    timeoutList: [
    ]
  },
  onLoad: function (options) {
    wx.showLoading({
      title: '拼命加载中...',
    })
    let unused = app.fetch("snail-portal/user/couponInfoList.htm?couponType=11", { useStatus: 0}).then(res => {
      wx.hideLoading();
      if (res.data.success) {
        this.data.unUsedList.push(res.data.data);
        this.setData({
          unUsedList: this.data.unUsedList
        });
      }
      return res.data.data;
    });
    let used = app.fetch("snail-portal/user/couponInfoList.htm?couponType=11", { useStatus: 1}).then(res => {
      wx.hideLoading();
      if (res.data.success) {
        this.data.usedList.push(res.data.data);
        this.setData({
          usedList: this.data.usedList
        });
      }
      return res.data.data;
    });
    let timeout = app.fetch("snail-portal/user/couponInfoList.htm?couponType=11", {
      userId: this.userId, useStatus: 2
    }).then(res => {
      wx.hideLoading();
      if (res.data.success) {
        this.data.timeoutList.push(res.data.data);
        this.setData({
          timeoutList: this.data.timeoutList
        });
      }
      return res.data.data;
    });
    Promise.all([unused, used, timeout]).then(results => {
      wx.hideLoading();
    });
  },
  //更改显示的index
  changeShowIndex(e) {
    let index = e.currentTarget.dataset.index;
    this.setData({
      showIndex: index
    })
  }
})
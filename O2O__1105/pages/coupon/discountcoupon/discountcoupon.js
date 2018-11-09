// pages/discountcoupon/discountcoupon.js
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
    //判断uersId是否存在
    if (!wx.getStorageSync('userId')) {
      wx.redirectTo({
        url: '/pages/loginbefore/loginbefore'
      })
      return false;
    }
    wx.showLoading({
      title: '拼命加载中...',
    })
    this.userId = wx.getStorageSync('userId');
    let unused = app.fetch("user/couponInfoList.htm?couponType=12", {
      userId: this.userId, useStatus: 0
    }).then(res => {
      wx.hideLoading();
      if (res.data.success) {
        // this.data.unUsedList.push(res.data.data);
        this.setData({
          unUsedList: res.data.data.list
        });
      }
      return res.data.data;
    });
    let used = app.fetch("user/couponInfoList.htm?couponType=12", {
      userId: this.userId, useStatus: 1
    }).then(res => {
      wx.hideLoading();
      if (res.data.success) {
        // this.data.usedList.push(res.data.data);
        this.setData({
          usedList: res.data.data.list
        });
      }
      return res.data.data;
    });
    let timeout = app.fetch("user/couponInfoList.htm?couponType=12", {
      userId: this.userId, useStatus: 2
    }).then(res => {
      wx.hideLoading();
      if (res.data.success) {
        // this.data.timeoutList.push(res.data.data);
        this.setData({
          timeoutList: res.data.data.list
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
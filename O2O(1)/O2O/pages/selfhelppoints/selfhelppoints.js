// pages/selfhelppoints/selfhelppoints.js
Page({
  data: {
    showIndex: 0,
  },
  onLoad: function (options) {
    app.fetch("snail-portal/user/points/list.htm", {
      userId: this.userId
    }).then(res => {
      wx.hideLoading();
      if (res.data.success) {
      }
    });
  },
  changeshowIndex(e) {
    let index = e.currentTarget.dataset.index;
    this.setData({
      showIndex: index
    })
  }
})
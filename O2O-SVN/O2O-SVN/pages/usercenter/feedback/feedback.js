// pages/usercenter/feedback/feedback.js
const app = getApp()
Page({
  data: {
    showIndex: 0,
    hasFeedBackList: [],
    toFeedBackList: [],
    telephoneNumber: "07986345566"
  },
  onLoad: function (options) {
    wx.showLoading({
      title: '拼命加载中...',
    })
    Promise.all([this.getHasFeedBackList(), this.getToFeedBackList()]).then(results => {
      wx.hideLoading();
      this.setData({
        hasFeedBackList: results[0],
        toFeedBackList: results[1]
      })
    });
  },
  changeshowIndex(e) {
    let index = e.currentTarget.dataset.index;
    this.setData({
      showIndex: index
    })
  },
  getHasFeedBackList() {
    return app.fetch("user/listFeed.do", { status: 1 }).then(res => {
      wx.hideLoading();
      if (res.data.success) {
        return res.data.data.feedList
      }
    });
  },
  getToFeedBackList() {
    return app.fetch("user/listFeed.do", { status: 0 }).then(res => {
      wx.hideLoading();
      if (res.data.success) {
        return res.data.data.feedList
      }
    });
  },
  addFeedback() {
    wx.navigateTo({
      url: '/pages/usercenter/addfeedback/addfeedback'
    })
  },
  makePhone(){
    let that = this;
    wx.makePhoneCall({
      phoneNumber: that.data.telephoneNumber
    });
  }
})
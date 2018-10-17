// pages/feedback/feedback.js
const app = getApp()
Page({
  data: {
    showIndex: 0,
    hasFeedBackList:[],
    toFeedBackList:[]
  },
  onLoad: function (options) {
    Promise.all([this.getHasFeedBackList(), this.getToFeedBackList()]).then(results=>{
      this.setData({
        hasFeedBackList:results[0],
        toFeedBackList:results[1]
      })
    });
  },
  changeshowIndex(e){
    let index = e.currentTarget.dataset.index;
    this.setData({
      showIndex: index
    })
  },
  getHasFeedBackList(){
    return app.fetch("snail-portal/user/listFeed.do", { status:1 }).then(res => {
      wx.hideLoading();
      if (res.data.success) {
        return res.data.data.feedList
      }
    });
  },
  getToFeedBackList(){
    return app.fetch("snail-portal/user/listFeed.do", { status:0 }).then(res => {
      wx.hideLoading();
      if (res.data.success) {
        return res.data.data.feedList
      }
    });
  },
  addFeedback(){
    wx.navigateTo({
      url: '/pages/addfeedback/addfeedback',
    })
  }
})
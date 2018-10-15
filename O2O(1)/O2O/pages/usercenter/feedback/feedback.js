// pages/feedback/feedback.js
Page({
  data: {
    showIndex: 0,
  },
  onLoad: function (options) {

  },
  changeshowIndex(e){
    let index = e.currentTarget.dataset.index;
    this.setData({
      showIndex: index
    })
  },
  addFeedback(){
    wx.navigateTo({
      url: '/pages/addfeedback/addfeedback',
    })
  }
})
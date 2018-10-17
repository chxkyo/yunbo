// pages/addfeedback/addfeedback.js
const app = getApp()
Page({
  data: {
    addFeedBackSuccShow: false, //提交成功弹窗是否显示,
    content:''
  },
  onLoad: function (options) {

  },
  getFeedbackContent(e){
    this.setData({
      content:e.detail.value
    })
  },
  submit(){
    wx.showLoading({
      title: '提交反馈中....',
    })
    app.fetch("snail-portal/user/addFeed.do?content="+this.data.content, { },"GET").then(res => {
      wx.hideLoading();
      if (res.data.success) {
        this.setData({
          addFeedBackSuccShow: true
        })
      }
    });
  }
})
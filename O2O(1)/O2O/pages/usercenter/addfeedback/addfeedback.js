// pages/addfeedback/addfeedback.js
const app = getApp()
Page({
  data: {
    addFeedBackSuccShow: false, //提交成功弹窗是否显示,
    content:'',
    length:100
  },
  onLoad: function (options) {

  },
  getFeedbackContent(e){
    this.setData({
      content:e.detail.value,
      length: 100 - e.detail.value.length
    })
  },
  submit(){
    let pages = getCurrentPages();
    let prevPage = pages[pages.length - 2];  //上一个页面
    if(this.data.content === ''){
      wx.showModal({
        title: '提示',
        content: '请填写提交意见!',
        showCancel: false
      })
    }else{
      wx.showLoading({
        title: '提交反馈中....',
      })
      app.fetch("snail-portal/user/addFeed.do?content=" + this.data.content, {}, "GET").then(res => {
        wx.hideLoading();
        if (res.data.success) {
          this.setData({
            addFeedBackSuccShow: true
          })
          wx.showToast({
            title: '提交反馈成功！',
            success: function () {
              prevPage.onLoad();
              wx.navigateBack({
                delta: 1
              })
            }
          })
        }
      });
    }

  }
})
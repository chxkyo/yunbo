// pages/addfeedback/addfeedback.js
Page({
  data: {
    addFeedBackSuccShow: false //提交成功弹窗是否显示
  },
  onLoad: function (options) {

  },
  submit(){
    this.setData({
      addFeedBackSuccShow: true
    })
  }
})
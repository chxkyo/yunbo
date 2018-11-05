// pages/addfeedback/addfeedback.js
const app = getApp()
Page({
  data: {
    addFeedBackSuccShow: false, //提交成功弹窗是否显示,
    content: '',
    tips: '剩余可输入100字'
  },
  onLoad: function (options) {

  },
  getFeedbackContent(e) {
    let length = e.detail.value.replace(/(^\s*)|(\s*$)/g, "").length;
    if(length>100){
      this.setData({
        tips: '超出字数限制，请删除多余字数',
        content: e.detail.value
      })
    }else{
      this.setData({
        tips: '剩余可输入'+(100 - length)+'字',
        content: e.detail.value
      })
    }
  },
  submit() {
    if (this.data.content == ''){
      return false;
    }
    wx.showLoading({
      title: '提交反馈中....',
    })
    wx.request({
      url: app.globalData.domain + 'snail-portal/user/addFeed.do?content',
      data: {
        userId: wx.getStorageSync('userId'),
        content: this.data.content
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      method: "POST",
      success: res => {
        wx.hideLoading();
        if (res.data.success) {
          wx.redirectTo({
            url: '/pages/usercenter/addfeedbacksucc/addfeedbacksucc'
          })
        }
      },
      fail: (err) => {
        wx.hideLoading();
      }
    })
  }
})
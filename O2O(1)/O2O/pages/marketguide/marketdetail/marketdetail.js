// pages/marketdetail/marketdetail.js
Page({
  data: {
    follow: false   //关注的状态
  },
  onLoad: function (options) {

  },
  changeFollow(){
    if (this.data.follow == false){
      wx.showToast({
        title: '已关注',
        icon: 'none'
      })
      this.setData({
        follow: !this.data.follow
      })
    }else{
      this.setData({
        follow: !this.data.follow
      })
    }
  }
})
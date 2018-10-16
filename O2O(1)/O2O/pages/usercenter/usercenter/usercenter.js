// pages/usercenter/usercenter.js
const app = getApp()
Page({
  data: {
    qrcodeLgShow: false,   //大型二维码是否显示,
    username:'',
    points:'',
    carCode:'',
    level:''
  },
  onLoad: function (options) {
    this.userId = "628800148082";
    wx.showLoading({
      title: '拼命加载中...',
    })
    app.fetch("snail-portal/user/userCenter.htm", { userId: this.userId}).then(res=>{
      console.log(res)
      wx.hideLoading();
      if(res.data.success){
        this.setData({
          username: res.data.data.user.name,
          points: res.data.data.user.points,
          cardCode:res.data.data.user.cardCode,
          headImgPath: app.globalData.basrUrl + res.data.data.user.headImgPath,
          level: res.data.data.user.level
        });
      }

    });
  },
  showQrcodeLg(){
    this.setData({
      qrcodeLgShow: true
    })
  },
  hideQrcodeLg(){
    this.setData({
      qrcodeLgShow: false
    })
  }
})
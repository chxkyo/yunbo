// pages/usercenter/usercenter.js
const app = getApp();
Page({
  data: {
    qrcodeLgShow: false   //大型二维码是否显示
  },
  onLoad: function (options) {
    app.fetch("snail-portal/user/userCenter.htm", { userId:'628800148082'}).then(res=>{
      
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
// pages/usercenter/usercenter.js
Page({
  data: {
    qrcodeLgShow: false   //大型二维码是否显示
  },
  onLoad: function (options) {

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
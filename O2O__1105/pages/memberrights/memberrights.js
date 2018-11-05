// pages/memberrights/memberrights.js
const app = getApp();
Page({
  data: {
    imgUrl: '',
    moreNote: '',
    typeFlag: null,  //0表示第三方链接，1表示图片
    imgBaseUrl: ''
  },
  onLoad: function (options) {
    this.setData({
      imgBaseUrl: app.globalData.imgBaseUrl
    })
    wx.request({
      url: app.globalData.domain + 'snail-portal/vipcardIndex.htm',
      method: "GET",
      success: (res) => {
        wx.hideLoading();
        if (res.data.success) {
          this.setData({
            imgUrl: res.data.data.vipCard.imgUrl,
            moreNote: res.data.data.vipCard.moreNote,
            typeFlag: res.data.data.vipCard.typeFlag
          })
        }
      },
      fail: (err) => {
        wx.hideLoading();
      }
    })
  }
})
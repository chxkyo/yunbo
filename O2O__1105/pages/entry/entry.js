// pages/entry/entry.js
const app = getApp();
Page({
  data: {
    openid: ''
  },
  onLoad: function (options) {
    //调用登录loading提示框
    wx.showLoading({
      title: '登录中...',
      mask: true,
      success: function(){}
    })
    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        if (res.code) {
          wx.request({
            url: app.globalData.domain+'snail-portal/index.htm',
            data: {
              code: res.code
            },
            method: "GET",
            success: (res) => {
              wx.hideLoading();
              wx.setStorage({
                key: 'unitId',
                data: res.data.data.unitId
              })
              wx.setStorage({
                key: 'openid',
                data: res.data.data.openid
              })
              this.setData({
                openid: res.data.data.openid
              })
            },
            fail: (err) => {
              wx.hideLoading();
            }
          })
        } else {
          console.log('获取用户登录态失败！' + res.errMsg)
        }
      }
    })
  }
})
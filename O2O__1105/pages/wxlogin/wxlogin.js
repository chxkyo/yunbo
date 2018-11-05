// pages/wxlogin/wxlogin.js
const app = getApp();
Page({
  data: {
    telephone: '',  //手机号
    getCodeAble: true, //获取验证码按钮是否可用
    telErrorShow: false, //手机号错误显示
    loginAble: true, //登录按钮是否可用
  },
  onLoad: function (options) {
    if (options.telephone) {
      this.setData({
        telephone: options.telephone
      })
    }
  },
  //登录
  login() {
    if (this.data.telephone == '' || !/(^1[3|4|5|7|8]\d{9}$)|(^09\d{8}$)/.test(this.data.telephone)) {
      this.setData({
        telErrorShow: true
      })
    }
    if (this.data.telephone != '' && /(^1[3|4|5|7|8]\d{9}$)|(^09\d{8}$)/.test(this.data.telephone)) {
      if (this.data.loginAble == false) {
        return false;
      } else {
        //设置登录按钮不可点击
        this.setData({
          loginAble: false
        })
        //提交给接口数据
        /*TODO*/
        let openid = wx.getStorageSync('openid');
        wx.request({
          url: app.globalData.domain + 'snail-portal/login/doLogin.htm',
          data: {
            loginId: this.data.telephone,
            openid: openid
          },
          method: "GET",
          success: (res) => {
            wx.hideLoading();
            if (res.data.success) {
              this.setData({
                loginAble: true
              })
              wx.setStorage({
                key: 'userId',
                data: res.data.data.userId
              })
              wx.redirectTo({
                url: '/pages/index/index'
              })
            } else {
              wx.request({
                url: app.globalData.domain + 'snail-portal/login/async/register.htm',
                data: {
                  loginId: this.data.telephone,
                  openid: openid,
                  nickName: ''
                },
                header: {
                  'content-type': 'application/x-www-form-urlencoded'
                },
                method: "POST",
                success: (response) => {
                  wx.hideLoading();
                  if (response.data.success) {
                    this.setData({
                      registerAble: true
                    })
                    wx.showToast({
                      title: '注册成功',
                      icon: 'none'
                    })
                    wx.setStorage({
                      key: 'loginId',
                      data: response.data.data.loginId,
                    })
                    wx.setStorage({
                      key: 'userId',
                      data: response.data.data.userId,
                    })
                    wx.redirectTo({
                      url: '/pages/index/index',
                    })
                  } else {
                    this.setData({
                      registerAble: true
                    })
                    wx.showToast({
                      title: response.data.message,
                      icon: 'none'
                    })
                  }
                },
                fail: (err) => {
                  wx.hideLoading();
                  wx.showToast({
                    title: '注册失败',
                    icon: 'none'
                  })
                  this.setData({
                    registerAble: true
                  })
                }
              })
            }
          },
          fail: (err) => {
            wx.hideLoading();
          }
        })
      }
    }
  }
})
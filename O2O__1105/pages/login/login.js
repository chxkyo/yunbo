// pages/login/login.js
const app = getApp();
Page({
  data: {
    telephone: '',  //手机号
    code: '', //验证码
    virifyCode: '', //短信获取到的验证码
    getCodeText: '获取验证码',  //获取验证码文本
    getCodeAble: true, //获取验证码按钮是否可用
    telErrorShow: false, //手机号错误显示
    codeErrorShow: false, //验证码错误显示 
    loginAble: true, //登录按钮是否可用
    isWechatTelephone: false,  //是否是微信手机号登录
    formId:''
  },
  onLoad: function (options) {
    if(options.telephone){
      this.setData({
        telephone: options.telephone
      })
    }
  },
  //获取验证码
  getCode() {
    //验证手机号
    if (this.data.telephone == '' || !/(^1[3|4|5|7|8]\d{9}$)|(^09\d{8}$)/.test(this.data.telephone)) {
      this.setData({
        telErrorShow: true
      })
    } else {
      if (this.data.getCodeAble == false) {
        return false;
      } else {
        //设置获取按钮不可点击
        this.setData({
          getCodeAble: false
        })
        //这里是获取验证码的接口
        /*TODO*/
        wx.request({
          url: app.globalData.domain + 'snail-portal/login/sendSmsCode.htm',
          data: {
            mobile: this.data.telephone
          },
          method: "GET",
          success: (res) => {
            wx.hideLoading();
            if (res.data.success) {
              this.setData({
                virifyCode: res.data.data.code
              })
            }
          },
          fail: (err) => {
            wx.hideLoading();
          }
        })
        //点击获取验证码之后的倒计时效果
        let second = 60;
        let timer = setInterval(() => {
          if (second == 1) {
            clearInterval(timer);
            this.setData({
              getCodeText: '获取验证码',
              getCodeAble: true
            })
          } else {
            second--;
            this.setData({
              getCodeText: second + 'S'
            })
          }
        }, 1000) 
      }
    }
  },
  //更改手机号码
  changeTelephone(e) {
    this.setData({
      telephone: e.detail.value
    })

    if (this.data.telephone == '' || !/(^1[3|4|5|7|8]\d{9}$)|(^09\d{8}$)/.test(this.data.telephone)) {
      this.setData({
        telErrorShow: true
      })
    } else {
      this.setData({
        telErrorShow: false
      })
    }
  },
  //更改验证码
  changeCode(e) {
    this.setData({
      code: e.detail.value
    })

    if (this.data.code == '') {
      this.setData({
        codeErrorShow: true
      })
    } else {
      this.setData({
        codeErrorShow: false
      })
    }
  },
  getFormId(e){
    this.setData({
      formId: e.detail.formId
    })   
  },
  //注册
  login() {
    setTimeout(() => { 
      if (this.data.telephone == '' || !/(^1[3|4|5|7|8]\d{9}$)|(^09\d{8}$)/.test(this.data.telephone)) {
        this.setData({
          telErrorShow: true
        })
      }
      if (this.data.code == '') {
        this.setData({
          codeErrorShow: true
        })
      }

      if (this.data.code != this.data.virifyCode) {
        wx.showToast({
          title: '验证码错误',
          icon: 'none'
        })
      }

      if (this.data.telephone != '' && /(^1[3|4|5|7|8]\d{9}$)|(^09\d{8}$)/.test(this.data.telephone) && this.data.code != '' && this.data.code == this.data.virifyCode) {
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
          wx.showLoading({
            title: '拼命加载中...'
          })
          console.log("login.js---" + wx.getStorageSync("nickName"));

          wx.request({
            url: app.globalData.domain + 'snail-portal/login/doLogin.htm',
            data: {
              loginId: this.data.telephone,
              openid: openid,
              nickName: app.globalData.nickName,
              sex: app.globalData.userSex,
              headerImg: app.globalData.headerImg
            },
            header: {
              'content-type': 'application/x-www-form-urlencoded;charset=utf-8' // 默认值
            },
            method: "post",
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
                  url: '/pages/index/index?formId=' + this.data.formId,
                })
              } else {
                wx.request({
                  url: app.globalData.domain + 'snail-portal/login/async/register.htm',
                  data: {
                    loginId: this.data.telephone,
                    openid: openid,
                    nickName: wx.getStorageSync("nickName"),
                    sex: wx.getStorageSync("userSex"),
                    headerImg: wx.getStorageSync("headerImg")
                  },
                  header: {
                    'content-type': 'application/x-www-form-urlencoded'
                  },
                  method: "POST",
                  success: (response) => {
                    wx.hideLoading();
                    if (response.data.success) {
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
                        url: '/pages/index/index?formId=' + this.data.formId,
                      })
                      this.setData({
                        registerAble: true
                      })
                    } else {
                      wx.showToast({
                        title: response.data.message,
                        icon: 'none'
                      })
                      this.setData({
                        registerAble: true
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
    }, 500);
  }
})
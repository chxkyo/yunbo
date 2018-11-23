// pages/register/register.js
const app = getApp();
Page({
  data: {
    openid: '',
    name: '', //用户名
    telephone: '',  //手机号
    virifyCode: '', //后端传过来的验证码
    code: '', //输入的验证码
    getCodeText: '获取验证码',  //获取验证码文本
    getCodeAble: true, //获取验证码按钮是否可用
    nameErrorShow: false, //姓名错误显示
    telErrorShow: false, //手机号错误显示
    codeErrorShow: false, //验证码错误显示 
    registerAble: true //注册按钮是否可用
  },
  onLoad: function (options) {
    this.setData({
      openid: options.openid
    })
  },
  //获取验证码
  getCode(){
    //验证手机号
    if (this.data.telephone == '' || !/(^1[3|4|5|7|8]\d{9}$)|(^09\d{8}$)/.test(this.data.telephone)) {
      this.setData({
        telErrorShow: true
      })
    } else {
      if (this.data.getCodeAble == false){
        return false;
      }else{
        //设置获取按钮不可点击
        this.setData({
          getCodeAble: false
        })
        //这里是获取验证码的接口
        /*TODO*/
        wx.request({
          url: app.globalData.domain+'/login/sendSmsCode.htm',
          data: {
            mobile: this.data.telephone
          },
          method: "GET",
          success: (res) => {
            wx.hideLoading();
            if(res.data.success){
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
  //更改姓名
  changeName(e){
    this.setData({
      name: e.detail.value
    })

    if (this.data.name == '') {
      this.setData({
        nameErrorShow: true
      })
    } else {
      this.setData({
        nameErrorShow: false
      })
    }
  },
  //更改手机号码
  changeTelephone(e) {
    this.setData({
      telephone: e.detail.value
    })

    if(this.data.telephone == '' || !/(^1[3|4|5|7|8]\d{9}$)|(^09\d{8}$)/.test(this.data.telephone)) {
      this.setData({
        telErrorShow: true
      })
    }else{
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
    }else {
      this.setData({
        codeErrorShow: false
      })
    }
  },
  //注册
  register(){
    if(this.data.name == ''){
      this.setData({
        nameErrorShow: true
      })
    }
    if (this.data.telephone == '' || !/(^1[3|4|5|7|8]\d{9}$)|(^09\d{8}$)/.test(this.data.telephone)) {
      this.setData({
        telErrorShow: true
      })
    }
    if (this.data.code == '' || this.data.virifyCode != this.data.code) {
      this.setData({
        codeErrorShow: true
      })
    }

    if (this.data.name != '' && this.data.telephone != '' && /(^1[3|4|5|7|8]\d{9}$)|(^09\d{8}$)/.test(this.data.telephone) && this.data.code != '' && this.data.virifyCode == this.data.code){
      if (this.data.registerAble == false) {
        return false;
      } else {
        //设置注册按钮不可点击
        this.setData({
          registerAble: false
        })
        //提交给接口数据
        /*TODO*/
        wx.showLoading({
          title: '加载中...',
          mask: true,
          success: function () {}
        })
        wx.request({
          url: app.globalData.domain+'/login/async/register.htm',
          data: {
            loginId: this.data.telephone,
            openid: this.data.openid,
            nickName: this.data.name 
          },
          header: {
            'content-type': 'application/x-www-form-urlencoded'
          },
          method: "POST",
          success: (res) => {
            wx.hideLoading();
            if(res.data.success){
              wx.showToast({
                title: '注册成功',
                icon: 'none'
              })
              wx.setStorage({
                key: 'loginId',
                data: res.data.data.loginId,
              })
              wx.setStorage({
                key: 'userId',
                data: res.data.data.userId,
              })
              wx.redirectTo({
                url: '/pages/index/index',
              })
              this.setData({
                registerAble: true
              })
            }else{
              wx.showToast({
                title: res.data.message,
                icon: 'none'
              })
              this.setData({
                registerAble: true
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
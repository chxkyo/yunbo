// pages/login/login.js
Page({
  data: {
    telephone: '',  //手机号
    code: '', //验证码
    getCodeText: '获取验证码',  //获取验证码文本
    getCodeAble: true, //获取验证码按钮是否可用
    telErrorShow: false, //手机号错误显示
    codeErrorShow: false, //验证码错误显示 
    loginAble: true //登录按钮是否可用
  },
  onLoad: function (options) {
  
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
  //注册
  login() {
    wx.redirectTo({
      url: '/pages/index/index'
    })

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

    if (this.data.telephone != '' && /(^1[3|4|5|7|8]\d{9}$)|(^09\d{8}$)/.test(this.data.telephone) && this.data.code != '') {
      if (this.data.loginAble == false) {
        return false;
      } else {
        //设置登录按钮不可点击
        this.setData({
          loginAble: false
        })
        //提交给接口数据
        /*TODO*/
      }
    }
  }
})
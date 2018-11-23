// pages/loginbefore/loginbefore.js
const app = getApp();
Page({
  data: {
    formId: ''
  },
  onLoad: function (options) {
    wx.login({
      success: function (res) {
        if (res.code) {
          //发起网络请求  
        //  console.log(res.code)
        } else {
       //   console.log('获取用户登录态失败！' + res.errMsg)
        }
      }
    }); 
  },
  getFormId(e){
    this.setData({
      formId: e.detail.formId
    })
  },
  getPhoneNumber(e){

    if(e.detail.errMsg == 'getPhoneNumber:fail user deny'){
      return false;
    }else if(e.detail.errMsg == 'getPhoneNumber:ok'){
      wx.request({
        url: app.globalData.domain +'/decrypt.htm',
        header: {
          'content-type': 'application/x-www-form-urlencoded;charset=utf-8' // 默认值
        },
        method: 'POST',
        dataType: 'json',
        data: {
          encrypted: e.detail.encryptedData,
          iv: e.detail.iv,
          session_key: wx.getStorageSync('session_key')
        },
        success: (res)=>{
          if(res.data.success){ 
            wx.request({
              url: app.globalData.domain + '/login/doLogin.htm',
              header: {
                'content-type': 'application/x-www-form-urlencoded;charset=utf-8' // 默认值
              },
              data: {
                loginId: res.data.data.phoneNumber,
                openid: wx.getStorageSync('openid'),
                nickName: app.globalData.nickName,
                sex: app.globalData.userSex,
                headerImg: app.globalData.headerImg
              },
              method: "post",
              success: (respon) => {
                wx.hideLoading();
                if (respon.data.success) {
                  wx.setStorage({
                    key: 'userId',
                    data: respon.data.data.userId
                  })
                  wx.redirectTo({
                    url: '/pages/index/index?formId=' + this.data.formId
                  })
                } else {
                  wx.request({
                    url: app.globalData.domain + '/login/async/register.htm',
                    data: {
                      loginId: res.data.data.phoneNumber,
                      openid: wx.getStorageSync('openid'),
                      nickName: app.globalData.nickName,
                      sex: app.globalData.userSex,
                      headerImg: app.globalData.headerImg
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
                          url: '/pages/index/index?formId='+this.data.formId,
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
                    }
                  })
                }
              },
              fail: (err) => {
                wx.hideLoading();
              }
            })
          }else{
            wx.showToast({
              title: res.data.message,
              icon: 'none'
            })
          }
        }
      })
    }
  }
})
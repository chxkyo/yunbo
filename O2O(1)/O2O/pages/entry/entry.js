// pages/entry/entry.js
const app = getApp();
Page({
  data: {
    openid: '',
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    showGetUserInfo: true,
    tips: ""
  },
  onLoad: function (options) {
    //调用登录loading提示框
    wx.showLoading({
      title: '登录中...',
      mask: true,
      success: function () {

      }
    })
    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        if (res.code) {
          wx.request({
            url: 'http://192.168.31.183:8080/snail-portal/index.htm',
            data: {
              code: res.code
            },
            method: "POST",
            success: res => {
              console.log(res);
              // this.setData({
              //   openid: res.data.openid
              // })
              // this.getUserInfo();
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

    if (this.data.userInfo) {
      this.setData({
        userInfo: this.data.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          this.data.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  getUserInfo() {
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (!res.authSetting['scope.userInfo']) {
          wx.hideLoading();
          this.setData({
            showGetUserInfo: false
          })
        } else {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: (res) => {
              wx.request({
                url: 'https://jhnh.njmydream.com/zcurd/api/Userlogin',
                method: 'POST',
                data: {
                  openid: this.data.openid,
                  headerImg: res.userInfo.avatarUrl,
                  nickName: res.userInfo.nickName
                },
                header: {
                  'content-type': 'application/json'
                },
                success: (res) => {
                  if (res.statusCode == 200) {
                    
                  } else {
                    wx.hideLoading();
                    wx.showModal({
                      title: '提示',
                      content: res.statusCode,
                      showCancel: false,
                      success: (res) => {
                        this.setData({
                          tips: "状态码：" + res.statusCode + "。下拉刷新页面。"
                        })
                        if (res.confirm) {
                          console.log('用户点击确定')
                        } else if (res.cancel) {
                          console.log('用户点击取消')
                        }
                      }
                    })
                  }
                },
                fail: (err) => {
                  wx.hideLoading();
                  wx.showModal({
                    title: '提示',
                    content: '请求登录失败，请检查服务器',
                    showCancel: false,
                    success: function (res) {
                      this.setData({
                        tips: "请求登录失败，请检查服务器。下拉刷新页面。"
                      })
                      if (res.confirm) {
                        console.log('用户点击确定')
                      } else if (res.cancel) {
                        console.log('用户点击取消')
                      }
                    }
                  })
                }
              })
            }
          })
        }
      }
    })
  },
  bindGetUserInfo: function (e) {
    if (e.detail.errMsg == 'getUserInfo:fail auth deny') {
      //用户禁止授权
      wx.showModal({
        title: '提示',
        content: '未获得您的授权，小程序不可使用',
        showCancel: false,
        success: (res) => {
          this.setData({
            tips: "未获得您的授权，小程序不可使用。下拉刷新页面。"
          })
          if (res.confirm) {
            console.log('用户点击确定')
          } else if (res.cancel) {
            console.log('用户点击取消')
          }
        }
      })
    } else if (e.detail.errMsg == 'getUserInfo:ok') {
      //用户允许授权
      this.setData({
        userInfo: e.detail.userInfo,
        showGetUserInfo: true
      })
      wx.request({
        url: 'https://jhnh.njmydream.com/zcurd/api/Userlogin',
        method: 'POST',
        data: {
          openid: this.data.openid,
          headerImg: this.data.userInfo.avatarUrl,
          nickName: this.data.userInfo.nickName
        },
        header: {
          'content-type': 'application/json'
        },
        success: (res) => {
          if (res.statusCode == 200) {
            if (res.data.userType == 1 || res.data.userType == 2) {
              let storeDetail = this.quickSort(res.data.storearray);
              storeDetail = JSON.stringify(storeDetail);
              // wx.redirectTo({
              //   url: '/pages/shop/shop?userType=' + res.data.userType + '&storeDetail=' + storeDetail + '&openid=' + this.data.openid + '&storeNotice=' + res.data.storeNotice
              // })
              wx.redirectTo({
                url: '/pages/enter/enter?userType=' + res.data.userType + '&storeDetail=' + storeDetail + '&openid=' + this.data.openid + '&storeNotice=' + res.data.storeNotice
              })
            } else {
              wx.hideLoading();
              wx.showModal({
                title: '提示',
                content: '目前您的身份是游客，请联系区域经理授权。',
                showCancel: false,
                success: (res) => {
                  this.setData({
                    tips: "目前您的身份是游客，请联系区域经理授权。下拉刷新页面。"
                  })
                  if (res.confirm) {
                    console.log('用户点击确定')
                  } else if (res.cancel) {
                    console.log('用户点击取消')
                  }
                }
              })
            }
          } else {
            wx.hideLoading();
            wx.showModal({
              title: '提示',
              content: res.statusCode,
              showCancel: false,
              success: (res) => {
                this.setData({
                  tips: "状态码：" + res.statusCode + "。下拉刷新页面。"
                })
                if (res.confirm) {
                  console.log('用户点击确定')
                } else if (res.cancel) {
                  console.log('用户点击取消')
                }
              }
            })
          }
        },
        fail: (err) => {
          wx.hideLoading();
          wx.showModal({
            title: '提示',
            content: '请求登录失败，请检查服务器',
            showCancel: false,
            success: (res) => {
              this.setData({
                tips: "请求登录失败，请检查服务器。下拉刷新页面。"
              })
              if (res.confirm) {
                console.log('用户点击确定')
              } else if (res.cancel) {
                console.log('用户点击取消')
              }
            }
          })
        }
      })
    }
  },
  onPullDownRefresh: function () {
    //调用登录loading提示框
    wx.showLoading({
      title: '登录中...',
      mask: true,
      success: function () {

      }
    })
    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        if (res.code) {
          wx.request({
            url: 'https://jhnh.njmydream.com/zcurd/api/getUserInfo',
            data: {
              wxUrl: res.code
            },
            method: "POST",
            success: res => {
              this.setData({
                openid: res.data.openid
              })
              this.getUserInfo();
            }
          })
        } else {
          console.log('获取用户登录态失败！' + res.errMsg)
        }
      }
    })
    wx.stopPullDownRefresh()
  },
  quickSort(arr) {
    if (arr.length <= 1) { return arr; }
    var pivotIndex = Math.floor(arr.length / 2);
    var pivot = arr.splice(pivotIndex, 1)[0];
    var left = [];
    var right = [];
    for (var i = 0; i < arr.length; i++) {
      if (arr[i].num < pivot.num) {
        left.push(arr[i]);
      } else {
        right.push(arr[i]);
      }
    }
    return this.quickSort(left).concat([pivot], this.quickSort(right));
  }
})
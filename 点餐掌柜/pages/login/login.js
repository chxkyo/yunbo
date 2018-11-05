const app = getApp();
Page({
  /**
   * 页面的初始数据
   */
  data: {
    userErrorTips:'',
    passErrorTips:'',
    userErrorTipsShow:false,
    passErrorTipsShow:false,
    userName:'',
    passWord:'',
    nameFocus:false,
    passFocus:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // if (wx.getStorageSync('sessionid') && wx.getStorageSync('sessionid_gettime')) {
    //   //超过24小时自动清除
    //   if ((new Date().getTime() - wx.getStorageSync('sessionid_gettime')) > 24 * 60 * 60 * 1000) {
    //     wx.removeStorageSync('sessionid');
    //     wx.removeStorageSync('sessionid_gettime');
    //   } else {
    //     debugger
    //     if (app.globalData.shopInfo.cashType){
    //       wx.switchTab({
    //         url: '../index/index'
    //       })
    //     }else{
    //       wx.switchTab({
    //         url: '../index/index'
    //       })
    //     }
    //   }
    // }
    
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    
  },
  userInput(e){
    this.setData({
      userName:e.detail.value
    })
  },
  passwordInput(e){
    this.setData({
      passWord: e.detail.value
    })
  },
  login(){
    if (this.data.userName.length == 0){
      this.setData({
        userErrorTipsShow:true,
        passErrorTipsShow:false,
        userErrorTips:"用户名不能为空!"
      })
    } else if (this.data.passWord.length == 0){
      this.setData({
        userErrorTipsShow: false,
        passErrorTipsShow: true,
        passErrorTips: "密码不能为空!"
      })
    }else{
      let that = this;
      wx.showLoading({
        title: '登录中...',
      })
      wx.request({
        url: app.globalData.staticUrl + "/login",
        data: { username: this.data.userName, password: this.data.passWord},
        method:"POST",
        success:function(res){
          if(res.data.code === 0){
            that.setData({
              userErrorTipsShow: false,
              passErrorTipsShow: false
            })
            app.globalData.userInfo = res.data.userInfo;
            app.globalData.shopInfo = res.data.shopInfo;
            wx.setStorageSync('sessionid', res.data.JSESSIONID);
            wx.setStorageSync('sessionid_gettime', new Date().getTime());
            wx.showToast({
              title: '登录成功',
              icon: 'success',
              duration: 2000,
              success() {
                if (res.data.shopInfo.cashType){
                  wx.reLaunch({
                    url: '../index/index'
                  })
                }else{
                  wx.redirectTo({
                    url: '../index-retail/index-retail',
                  })
                }
              }
            })
          }else{
            wx.showToast({
              title: res.data.msg,
              icon: 'none',
              duration: 2000,
            })
          }
        },
        fail:function(){

        }
      })

    }
  },
  namefocus(){
    this.setData({
      nameFocus:true
    })
  },
  nameblur(){
    this.setData({
      nameFocus: false
    })
  },
  passfocus(){
    this.setData({
      passFocus: true
    })
  },
  passblur() {
    this.setData({
      passFocus: false
    })
  }
})
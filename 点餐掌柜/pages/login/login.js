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
    passWord:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
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
      this.setData({
        userErrorTipsShow: false,
        passErrorTipsShow: false
      })
      wx.showToast({
        title: '登录成功',
        icon: 'success',
        duration: 2000,
        success(){
          wx.switchTab({
            url: '../index/index'
          })
        }
      })
    }
  }
})
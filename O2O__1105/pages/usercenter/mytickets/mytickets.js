// pages/mytickets/mytickets.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //判断uersId是否存在
    if (!wx.getStorageSync('userId')) {
      wx.redirectTo({
        url: '/pages/loginbefore/loginbefore'
      })
      return false;
    }
  }
 

   
})
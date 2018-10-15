// pages/index/index.js
Page({
  data: {
    adList: [], //广告列表
    activityList: [],   //活动列表
    indicatorDots: false,
    autoplay: true,
    interval: 3000,
    duration: 500,
    baseUrl: 'http://am.tdcheck.cn/image',  //图片的base路径 
  },
  onLoad: function (options) {
    wx.showLoading({
      title: '加载中...',
      mask: true,
      success: function () {}
    })

    wx.login({
      success: (res) => {
        if(res.code){
          wx.request({
            url: 'http://192.168.31.183:8080/snail-portal/index.htm',
            data: {
              code: res.code
            },
            method: "POST",
            success: res => {
              wx.hideLoading();
              console.log(res);
              let data = res.data.data;
              this.setData({
                adList: data.adList,
                activityList: data.unitList
              })
            },
            fail: (err) => {
              wx.hideLoading();
            }
          })
        }
      }
    })
  }
})
// pages/marketdetail/marketdetail.js
const app = getApp();
Page({
  data: {
    storeId: '',
    follow: false,   //关注的状态,
    store: [],
    unit: [],
    imgBaseUrl: '',  //图片的base路径 
  },
  onLoad: function (options) {
    console.log(options)
    //判断uersId是否存在
    if (!wx.getStorageSync('userId')) {
      wx.redirectTo({
        url: '/pages/loginbefore/loginbefore'
      })
      return false;
    }
    let userId = wx.getStorageSync('userId');
    this.setData({
      storeId: options.storeId,
      imgBaseUrl: app.globalData.imgBaseUrl
    })
    let formId = options.formId;
    this.showLoading();
    wx.request({
      url: app.globalData.domain + 'snail-portal/bizUnit/storeDetail.htm',
      method: "GET",
      data: {
        storeId: this.data.storeId,
        userId: userId,
        form_id: formId
      },
      success: (res) => {
        this.hideLoading();
        if (res.data.success) {
          this.setData({
            store: res.data.data.store,
            unit: res.data.data.unit,
            follow: res.data.data.store.favorite == 0 ? false : true
          })
        }
      },
      fail: (err) => {
        this.hideLoading();
      }
    })
  },
  changeFollow(){
    let userId = wx.getStorageSync('userId');
    wx.request({
      url: app.globalData.domain + 'snail-portal/bizUnit/favoriteStore.do',
      method: "GET",
      data: {
        storeId: this.data.storeId,
        userId: userId
      },
      success: (res) => {
        this.hideLoading();
        if (this.data.follow == false) {
          wx.showToast({
            title: '已关注',
            icon: 'none'
          })
          this.setData({
            follow: !this.data.follow
          })
        } else {
          wx.showToast({
            title: '已取关',
            icon: 'none'
          })
          this.setData({
            follow: !this.data.follow
          })
        }
      },
      fail: (err) => {
        this.hideLoading();
      }
    })
  },
  showLoading() {
    wx.showLoading({
      title: '加载中...',
      mask: true,
      success: function () { }
    })
  },
  hideLoading() {
    wx.hideLoading();
  }
})
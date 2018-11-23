// pages/marketsearch/marketsearch.js
const app = getApp();
Page({
  data: {
    storeName: '',  //商户名,
    imgBaseUrl: '',  //图片的base路径 
    shopList: [],
    iconBaseUrl: app.globalData.iconBaseUrl
  },
  onLoad: function (options) {
    this.setData({
      imgBaseUrl: app.globalData.imgBaseUrl
    })
  },
  changeStoreName(e){
    this.setData({
      storeName: e.detail.value
    })
  },
  search(){
    this.showLoading();
    wx.request({
      url: app.globalData.domain + '/bizUnit/storeList.htm',
      method: "GET",
      data: {
        storeName: this.data.storeName
      },
      success: (res) => {
        this.hideLoading();
        if (res.data.success) {
          this.setData({
            shopList: res.data.data.list
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
  },
})
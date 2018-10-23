// pages/pointsmall/goodconvert/goodconvert.js
const app = getApp();
Page({
  data: {
    date: '1970-01-01',
    time: '00:00',
    num: 0,
    productName: '',
    productImgPath: '',
    productDetail: '',
    productValue: '',
    exchangePoint: 0,
    exchangeEndTime: '',
    exchangeCount: 0,
    leftCount: 0,
    product: {}
  },
  onLoad: function (options) {
    wx.showLoading({
      title: '拼命加载中...',
    })
    if (options.id) {
      this.id = options.id;
    }
    app.fetch("/snail-portal/product/productDetail.htm", { unitId: app.globalData.unitId, id:this.id }).then(res => {
      wx.hideLoading();
      if (res.data.success) {
        wx.hideLoading();
        this.setData({
          productName: res.data.data.product.productName,
          productImgPath: app.globalData.baseUrl + res.data.data.product.productImgPath,
          productDetail: res.data.data.product.productDetail,
          productValue: res.data.data.product.productValue,
          exchangePoint: res.data.data.product.exchangePoint,
          exchangeEndTime: res.data.data.product.exchangeEndTime,
          num: res.data.data.product.exchangeCount,
          leftCount: res.data.data.product.leftCount,
          product: res.data.data.product,
          receiveType: res.data.data.product.receiveType,
          receiveSelfAddress: res.data.data.product.receiveSelfAddress
        });
      }
    })
  },
  //  点击时间组件确定事件  
  bindTimeChange: function (e) {
    this.setData({
      times: e.detail.value
    })
  },
  //  点击日期组件确定事件  
  bindDateChange: function (e) {
    this.setData({
      dates: e.detail.value
    })
  },
  add(){
    this.setData({
      num: this.data.num+1
    })
  },
  sub(){
    if(this.data.num <= 1){
      this.setData({
        num: 0
      })
    }else{
      this.setData({
        num: this.data.num - 1
      })
    }
  },
  //确认兑换
  confirmConvert(){
    let that = this;
    wx.showLoading({
      title: '兑换中...',
    })
    app.fetch("/snail-portal/park/orderConfirm.htm", { productId: this.id }).then(res => {
      wx.hideLoading();
      if (res.data.success) {
        wx.showToast({
          title: '兑换成功!',
          success: function () {
            wx.redirectTo({
              url: '/pages/pointsmall/convertsucc/convertsucc',
            })
          }
        });
      } else {
        wx.showToast({
          title: res.data.message,
          icon: 'none'
        })
      }
    })
  }
})
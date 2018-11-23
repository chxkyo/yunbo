// pages/pointsmall/goodconvert/goodconvert.js
const app = getApp();
Page({
  data: {
    date: '1970-01-01',
    time: '00:00',
    num: 1,
    productName: '',
    productImgPath: '',
    productDetail: '',
    productValue: '',
    exchangePoint: 0,
    exchangeEndTime: '',
    exchangeCount: 0,
    leftCount: 0,
    product: {},
    allPoint: 0,
    cardCodeType: '',
    points: 0,
    imgBaseUrl: '',
    receiveAddress:'',
    iconBaseUrl: app.globalData.iconBaseUrl
  },
  onLoad: function (options) {
    if (!wx.getStorageSync('userId')) {
      wx.redirectTo({
        url: '/pages/loginbefore/loginbefore'
      })
      return false;
    }
    this.setData({
      imgBaseUrl: app.globalData.imgBaseUrl
    })
    wx.showLoading({
      title: '拼命加载中...',
    })
    if (options.id) {
      this.id = options.id;
    }
    if (options.cardTypeCode) {
      this.setData({
        cardTypeCode: options.cardTypeCode
      })
    }
    if (options.points) {
      this.setData({
        points: options.points
      })
    }
    app.fetch("user/userCenter.htm", {}).then(res => {
      if (res.data.success) {
        this.setData({
          cardTypeCode: res.data.data.user.cardTypeCode,
          points: res.data.data.user.points
        })
        app.fetch("product/productDetail.htm", { unitId: wx.getStorageSync('unitId'), id: this.id }).then(res => {
          wx.hideLoading();
          if (res.data.success) {
            wx.hideLoading();
            if (this.data.cardTypeCode == '01') {
              this.data.exchangePoint = res.data.data.product.limit00Point;
            } else if (this.data.cardTypeCode == '02') {
              this.data.exchangePoint = res.data.data.product.limit66Point;
            } else {
              this.data.exchangePoint = res.data.data.product.limit88Point;
            }
            let allPoint = this.data.exchangePoint * this.data.num;
            this.setData({
              productName: res.data.data.product.productName,
              productImgPath: res.data.data.product.productImgPath,
              productDetail: res.data.data.product.productDetail,
              productValue: res.data.data.product.productValue,
              exchangePoint: this.data.exchangePoint,
              exchangeEndTime: res.data.data.product.exchangeEndTime,
              leftCount: res.data.data.product.leftCount,
              product: res.data.data.product,
              receiveType: res.data.data.product.receiveType,
              receiveSelfAddress: res.data.data.product.receiveSelfAddress,
              allPoint: allPoint
            });
          }
        })
      }
    });

    app.fetch("user/toChangeAddress.do", {}).then(res => {
      if (res.data.success) {
        this.setData({
          receiveAddress: res.data.data.receiveAddress
        })
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
  add() {
    this.data.num++
    if (this.data.num > this.data.leftCount) {
      wx.showModal({
        title: '提示',
        content: '已超过剩余数量！',
        showCancel: false
      })
      return false
    }
    let allPoint = this.data.num * this.data.exchangePoint;
    this.setData({
      num: this.data.num,
      allPoint: allPoint
    })
  },
  sub() {
    if (this.data.num <= 1) {
      this.setData({
        num: 1
      })
    } else {
      this.setData({
        num: this.data.num - 1
      })
    }
    let allPoint = this.data.num * this.data.exchangePoint;
    this.setData({
      allPoint: allPoint
    })
  },
  //确认兑换
  confirmConvert() {
    let that = this;
    wx.showLoading({
      title: '兑换中...',
    })
    app.fetch("product/createOrder.htm", { productId: this.id, num: this.data.num}).then(res => {
      wx.hideLoading();
      if (res.data.success) {
        wx.redirectTo({
          url: '/pages/pointsmall/convertsucc/convertsucc',
        })
      } else {
        wx.showToast({
          title: res.data.message,
          icon: 'none'
        })
      }
    })
  }
})
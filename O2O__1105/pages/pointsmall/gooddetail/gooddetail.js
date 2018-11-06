// pages/pointsmall/gooddetail/gooddetail.js
const app = getApp();
Page({
  data: {
    id: null,
    imgBaseUrl: '',  //图片的base路径 
    productName: '',
    productImgPath: '',
    productDetail: '',
    productValue: '',
    exchangePoint: 0,
    exchangeEndTime: '',
    exchangeCount: 0,
    leftCount: 0,
    product: {},
    cardTypeCode: '01',
    id: '',
    points: 0
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //判断uersId是否存在
    // if (!wx.getStorageSync('userId')) {
    //   wx.redirectTo({
    //     url: '/pages/loginbefore/loginbefore'
    //   })
    //   return false;
    // }
    this.setData({
      imgBaseUrl: app.globalData.imgBaseUrl
    })
    wx.showLoading({
      title: '拼命加载中...',
    })
    if (options.id) {
      this.id = options.id;
      this.setData({
        id: options.id
      })
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
    app.fetch("/snail-portal/product/productDetail.htm", { unitId: wx.getStorageSync('unitId'), id: this.id }).then(res => {
      wx.hideLoading();
      if (res.data.success) {
        wx.hideLoading();
        this.setData({
          productName: res.data.data.product.productName,
          productImgPath: res.data.data.product.productImgPath,
          productDetail: res.data.data.product.productDetail,
          productValue: res.data.data.product.productValue,
          exchangeEndTime: res.data.data.product.exchangeEndTime,
          exchangeCount: res.data.data.product.exchangeCount,
          leftCount: res.data.data.product.leftCount,
          product: res.data.data.product
        });
      }
    })
  },
  linkToConvert(){
    wx.showLoading({
      title: '拼命加载中...'
    })
    wx.request({
      url: app.globalData.domain + 'snail-portal/park/orderConfirm.htm',
      data: {
        productId: this.data.id,
        userId: wx.getStorageSync('userId')
      },
      method: "GET",
      success: (res) => {
        console.log(res)
        if(res.data.success){
          wx.hideLoading();
          wx.navigateTo({
            url: '/pages/pointsmall/goodconvert/goodconvert?id=' + this.data.id + '&cardTypeCode=' + this.data.cardTypeCode +'&points='+this.data.points
          })
        }else{
          wx.showToast({
            title: res.data.message,
            icon: 'none'
          })
        }
      },
      fail: (err) => {
        wx.hideLoading();
      }
    })
  }
})
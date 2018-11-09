// pages/pointsmall/recorddetail/recorddetail.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    productImgPath:'',
    productName:'',
    exchangePoints:0,
    exchangeCount:0,
    receiveType:'',
    expressCompany:'',
    expressNo:'',
    receiveStatus:'',
    receiveAddress:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      productImgPath:options.productImgPath,
      productName: options.productName,
      exchangePoints: options.exchangePoints,
      exchangeCount: options.exchangeCount,
      receiveType: options.receiveType,
      expressCompany: options.expressCompany,
      expressNo: options.expressNo,
      receiveStatus: options.receiveStatus
    });
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  }

   
})
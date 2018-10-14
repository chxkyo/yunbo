// pages/editcuisine/editcuisine.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    productCategoryName: '',
    name: '',
    price: '',
    unit: '',
    discount: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (options.id) {
      this.id = options.id;
      app.fetch('product/info/' + this.id, { methodName: 'info'}, "POST").then(res => {
        if (res.data.code === 0) {
          this.setData({
            name: res.data.product.name,
            price: res.data.product.price,
            unit: res.data.product.unit,
            discount: res.data.product.discount,
            productCategoryName: res.data.product.productCategoryName
          })
          this.productCategoryId = res.data.product.productCategoryId;
        }
      })
    }
    // if(options.productCategoryId){
    //   this.productCategoryId = options.productCategoryId;
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
  getName(e) {
    this.setData({
      name: e.detail.value
    })
  },
  getPrice(e) {
    this.setData({
      price: e.detail.value
    })
  },
  getUnit(e) {
    this.setData({
      unit: e.detail.value
    })
  },
  getDiscount(e) {
    this.setData({
      discount: e.detail.value
    })
  },
  saveDanPin() {
    let pages = getCurrentPages();
    let prevPage = pages[pages.length - 2];  //上一个页面
    if (!this.data.name) {
      wx.showModal({
        title: '提示',
        content: '请上输入单品名称',
        showCancel: false
      })
    } else if (!this.data.price) {
      wx.showModal({
        title: '提示',
        content: '请输入商品单价',
        showCancel: false
      })
    } else if (!this.data.unit) {
      wx.showModal({
        title: '提示',
        content: '请输入商品单位',
        showCancel: false
      })
    } else if (!this.data.discount) {
      wx.showModal({
        title: '提示',
        content: '请输入商品折扣',
        showCancel: false
      })
    } else {
      app.fetch('product/update', { id: this.id, productCategoryId: this.productCategoryId,name: this.data.name, discount: this.data.discount, unit: this.data.unit,price:this.data.price }, "POST").then(res => {
        if (res.data.code === 0) {
          wx.showToast({
            title: '编辑成功！',
            success: function () {
              prevPage.onLoad();
              wx.navigateBack({
                delta: 1
              })
            }
          })
        }
      })
    }
  },
  delThisMeal() {
    let pages = getCurrentPages();
    let prevPage = pages[pages.length - 2];  //上一个页面
    let that = this;
    wx.showModal({
      title: "确认删除该套餐吗?",
      success: function (res) {
        if (res.confirm) {
          app.fetch('product/delete/' + that.id, {methodName:'delete'}, "POST").then(res => {
            if (res.data.code === 0) {
              wx.showToast({
                title: '删除成功！',
                success: function () {
                  prevPage.onLoad();
                  wx.navigateBack({
                    delta: 1
                  })
                }
              })
            }
          })
        }
      }
    });
  },
})
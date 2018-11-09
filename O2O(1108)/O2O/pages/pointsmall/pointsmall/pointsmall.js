// pages/pointsmall/pointsmall/pointsmall.js
const app = getApp();
Page({
  data: {
    categoryIndex: 0,   //第一个分类选中
    sortIndex: 0, //默认排序index
    sortShow: false,  //排序弹窗是否显示
    sortList: [
      '默认排序',
      '积分降序',
      '积分升序'
    ],
    points: 0,
    list: [],
    categoryList: [],
    adList: [],
    user: {},
    autoplay: false,
    interval: 3000,
    duration: 500,
    imgBaseUrl: ''
  },
  onLoad: function (options) {
    //判断uersId是否存在
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
    let param = {};
    param.unitId = wx.getStorageSync('unitId');
    this.orderByType = 0;
    if (options.orderByType) {
      this.orderByType = options.orderByType;
    }
    param.orderByType = this.orderByType;
    app.fetch("product/productList.htm", param).then(res => {
      if (res.data.success) {
        wx.hideLoading();
        this.setData({
          points: res.data.data.user.points,
          categoryList: res.data.data.categoryList,
          user: res.data.data.user,
          adList: res.data.data.adList
        })
        return res.data.data.categoryList
      }
    }).then(categoryList => {
      this.categoryId = categoryList[0].id;
      let param = { unitId: wx.getStorageSync('unitId'), categoryId: this.categoryId }
      this.orderByType = 0;
      param.orderByType = this.orderByType;
      app.fetch("product/productList.htm", param).then(res => {
        wx.hideLoading();
        this.setData({
          list: res.data.data.list
        })
      })
    });
  },
  //更改分类的index
  changeCategoryIndex(e) {
    let index = e.currentTarget.dataset.index;
    let id = e.currentTarget.dataset.id;
    this.categoryId = id;
    this.setData({
      categoryIndex: index
    })
    wx.showLoading({
      title: '拼命加载中...',
    })
    let param = { unitId: wx.getStorageSync('unitId'), categoryId: id };
    param.orderByType = this.orderByType;
    app.fetch("product/productList.htm", param).then(res => {
      wx.hideLoading();
      this.setData({
        list: res.data.data.list
      })
    })

  },
  //更改排序弹窗显示状态
  changeSortShow() {
    this.setData({
      sortShow: !this.data.sortShow
    })
  },
  //更改排序文字
  changeSort(e) {
    let idx = e.currentTarget.dataset.idx;
    this.orderByType = idx;
    this.setData({
      sortIndex: idx,
      sortShow: !this.data.sortShow
    })
    let param = {};
    param.orderByType = idx;
    param.unitId = wx.getStorageSync('unitId');
    param.categoryId = this.categoryId;
    wx.showLoading({
      title: '拼命加载中...',
    })
    app.fetch("product/productList.htm", param).then(res => {
      wx.hideLoading();
      this.setData({
        list: res.data.data.list
      })
    })
  }
})
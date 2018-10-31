// pages/pointsmall/pointsmall/pointsmall.js
const app = getApp();
Page({
  data: {
    categoryIndex: 0,   //第一个分类选中
    sortIndex: 0, //默认排序index
    sortShow: false,  //排序弹窗是否显示
    sortList: [
      '销量排序',
      '积分降序',
      '积分升序'
    ],
    points:0,
    list:[],
    categoryList:[],
    user:{},
    adList:[],
    indicatorDots: false,
    autoplay: true,
    interval: 3000,
    duration: 500,
  },
  onLoad: function (options) {
    wx.showLoading({
      title: '拼命加载中...',
    })
    let param={};
    param.unitId = app.globalData.unitId;
    this.orderByType = 0;
    if(options.orderByType){
      this.orderByType = options.orderByType;   
    }
    param.orderByType = this.orderByType;
    app.fetch("/snail-portal/product/productList.htm", param).then(res => {
      if (res.data.success) {
          wx.hideLoading();
          this.setData({
            points: res.data.data.user.points,
            categoryList: res.data.data.categoryList,
            user:res.data.data.user,
            adList: res.data.data.adList
          })
        return res.data.data.categoryList
      }
    }).then(categoryList=>{
      this.categoryId = categoryList[0].id;
      let param = { unitId: app.globalData.unitId, categoryId: categoryList[0].id}
      this.orderByType = 0;
      param.orderByType = this.orderByType;
      app.fetch("/snail-portal/product/productList.htm",param).then(res=>{
        wx.hideLoading();
        this.setData({
          list: res.data.data.list
        })
      })
    });
    
  },
  //更改分类的index
  changeCategoryIndex(e){
    let index = e.currentTarget.dataset.index;
    let id = e.currentTarget.dataset.id;
    this.categoryId = id;
    this.setData({
      categoryIndex: index
    })
    let param = { unitId: app.globalData.unitId, categoryId: id};
    param.orderByType = this.orderByType;
    wx.showLoading({
      title: '拼命加载中...',
    })
    app.fetch("/snail-portal/product/productList.htm", param).then(res => {
      wx.hideLoading();
      this.setData({
        list: res.data.data.list
      })
    })

  },
  //更改排序弹窗显示状态
  changeSortShow(){
    this.setData({
      sortShow: !this.data.sortShow
    })
  },
  //更改排序文字
  changeSort(e){
    let idx = e.currentTarget.dataset.idx;
    this.orderByType = idx;
    this.setData({
      sortIndex: idx,
      sortShow: !this.data.sortShow
    })
    let param = {};
    param.orderByType = idx;
    param.unitId = app.globalData.unitId;
    param.categoryId = this.categoryId;
    wx.showLoading({
      title: '拼命加载中...',
    })
    app.fetch("/snail-portal/product/productList.htm", param).then(res => {
      wx.hideLoading();
      this.setData({
        list: res.data.data.list
      })
    })
  }
})
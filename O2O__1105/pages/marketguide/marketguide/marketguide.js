// pages/marketguide/marketguide.js
const app = getApp();
Page({
  data: {
    categoryList: [], //全部分类列表
    floorList: [],  //全部楼层列表
    shopList: [], //商户列表
    floorShow: false,  //楼层弹窗显示与否
    categoryShow: false,  //分类弹窗显示与否
    imgBaseUrl: '',  //图片的base路径 
    floorId: '',  
    categoryId: '',
    floorText: '全部楼层',
    categoryText: '全部分类'
  },
  onLoad: function (options) {
    this.setData({
      imgBaseUrl: app.globalData.imgBaseUrl
    })
    //调用loading提示框
    this.showLoading();
    wx.request({
      url: app.globalData.domain +'snail-portal/bizUnit/storeList.htm',
      method: "GET",
      success: (res) => {
        this.hideLoading();
        if(res.data.success){
          this.setData({
            categoryList: res.data.data.categoryList,
            floorList: res.data.data.floorList,
            shopList: res.data.data.list
          })
        }
      },
      fail: (err) => {
        this.hideLoading();
      }
    })
  },
  changeFloorShow(){
    this.setData({
      floorShow: !this.data.floorShow,
      categoryShow: false
    })
  },
  changeCategoryShow(){
    this.setData({
      floorsShow: false,
      categoryShow: !this.data.categoryShow
    })
  },
  changeFloor(e){
    let floorId = e.currentTarget.dataset.floorid;
    let idx = e.currentTarget.dataset.idx;
    if (idx === 'all'){
      this.setData({
        floorId: floorId,
        floorShow: false,
        floorText: '全部楼层'
      })
    }else{
      this.setData({
        floorId: floorId,
        floorShow: false,
        floorText: this.data.floorList[idx].floor + '楼'
      })
    }
    
    this.showLoading();
    wx.request({
      url: app.globalData.domain + 'snail-portal/bizUnit/storeList.htm',
      method: "GET",
      data: {
        floorId: this.data.floorId,
        categoryId: this.data.categoryId
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
  changeCategory(e) {
    let categoryId = e.currentTarget.dataset.categoryid;
    let idx = e.currentTarget.dataset.idx;
    if (idx === 'all'){
      this.setData({
        categoryId: categoryId,
        categoryShow: false,
        categoryText: '全部分类'
      })
    }else{
      console.log(this.data.categoryList[idx].name)
      this.setData({
        categoryId: categoryId,
        categoryShow: false,
        categoryText: this.data.categoryList[idx].name
      })
    }
    
    this.showLoading();
    wx.request({
      url: app.globalData.domain + 'snail-portal/bizUnit/storeList.htm',
      method: "GET",
      data: {
        floorId: this.data.floorId,
        categoryId: this.data.categoryId
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
  linkToDetail(e){
    console.log(e);
    let formId = e.detail.formId;
    let storeId = e.currentTarget.dataset.storeid;
    wx.navigateTo({
      url: '/pages/marketguide/marketdetail/marketdetail?storeId='+storeId+'&formId='+ formId,
    })
  },
  showLoading(){
    wx.showLoading({
      title: '加载中...',
      mask: true,
      success: function () { }
    })
  },
  hideLoading(){
    wx.hideLoading();
  },
  linkToSearch(){
    wx.navigateTo({
      url: '/pages/marketguide/marketsearch/marketsearch',
    })
  }
})
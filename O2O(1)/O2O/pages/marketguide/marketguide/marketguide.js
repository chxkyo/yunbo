// pages/marketguide/marketguide.js
Page({
  data: {
    floorsShow: false,  //楼层弹窗显示与否
    categoryShow: false,  //分类弹窗显示与否
  },
  onLoad: function (options) {

  },
  changeFloorsShow(){
    this.setData({
      floorsShow: !this.data.floorsShow,
      categoryShow: false
    })
  },
  changeCategoryShow(){
    this.setData({
      floorsShow: false,
      categoryShow: !this.data.categoryShow
    })
  }
})
// pages/pointsmall/pointsmall/pointsmall.js
Page({
  data: {
    categoryIndex: 0,   //第一个分类选中
    sortIndex: 0, //默认排序index
    sortShow: false,  //排序弹窗是否显示
    sortList: [
      '默认排序',
      '销量排序',
      '时间排序',
      '积分排序'
    ]
  },
  onLoad: function (options) {

  },
  //更改分类的index
  changeCategoryIndex(e){
    let index = e.currentTarget.dataset.index;
    this.setData({
      categoryIndex: index
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
    this.setData({
      sortIndex: idx,
      sortShow: !this.data.sortShow
    })
  }
})
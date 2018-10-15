// pages/mypoints/mypoints.js
Page({
  data: {
    pointsDetailShow: true, //积分明细显示
    pointsTasksShow: false, //积分任务隐藏
    tagShow: false, //全部等标签显示与否 
    defaultTag: '全部', //默认选项
    tagList: [
      {'name': '全部'},
      {'name': '选项一'},
      {'name': '选项二'}
    ]
  },
  onLoad: function (options) {

  },
  //更改积分明细显示
  changePointsDetailShow(){
    this.setData({
      pointsDetailShow: true,
      pointsTasksShow: false
    })
  },
  //更改积分任务显示
  changePointsTasksShow(){
    this.setData({
      pointsDetailShow: false,
      pointsTasksShow: true
    })
  },
  //更改全部选项
  changeTagShow(){
    this.setData({
      tagShow: !this.data.tagShow 
    })
  },
  //更改默认标签
  changeTag(e){
    let index = e.currentTarget.dataset.index;
    this.setData({
      defaultTag: this.data.tagList[index].name,
      tagShow: !this.data.tagShow 
    })
  }
})
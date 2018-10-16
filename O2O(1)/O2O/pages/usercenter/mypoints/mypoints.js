// pages/mypoints/mypoints.js
const app = getApp()
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
    ],
    rule:{},
    task:{}
  },
  onLoad: function (options) {
    wx.showLoading({
      title: '拼命加载中...',
    })
    this.userId = "628800148082";
    app.fetch("snail-portal/user/points/his.htm", { userId: this.userId }).then(res => {
      wx.hideLoading();
      if (res.data.success) {
        this.setData({
          rule:res.data.data.rule,
          task: res.data.data.task
        })
      }
    });
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
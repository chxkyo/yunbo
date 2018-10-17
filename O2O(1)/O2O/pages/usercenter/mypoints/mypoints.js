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
    task:{},
    pointsArr:[],
    totalPoints:0,
    fromIndex:0
  },
  loadMore(){
    this.data.fromIndex += 10;
    app.fetch("snail-portal/user/pointsDetail.htm", { fromIndex: this.data.fromIndex, type: 2, limit: 10 }).then(res=>{
      if(res.data.data.poinsDetail.length>0){
        this.data.pointsArr.push(...res.data.data.poinsDetail);
        this.setData({
          pointsArr: this.data.pointsArr
        })
      }
    })
  },
  onLoad: function (options) {
    wx.showLoading({
      title: '拼命加载中...',
    })
    this.userId = "628800148082";
    let task = app.fetch("snail-portal/user/points/his.htm", { userId: this.userId }).then(res => {
      return res.data.data;
    });
    let detail = app.fetch("snail-portal/user/pointsDetail.htm", { userId: this.userId, fromIndex: this.data.fromIndex,type:2,limit:10 }).then(res => {
      return res.data.data;

    });
    Promise.all([task, detail]).then(results=>{
      console.log(this.data.pointsArr)
      this.setData({
        rule: results[0].rule,
        task: results[0].task,
        pointsArr: results[1].poinsDetail,
        totalPoints: results[1].totalPoints
      })
      wx.hideLoading();
      console.log(results)
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
  },
  onReachBottom: function () {
    if(this.data.pointsDetailShow){
      this.loadMore();
    }
  }
})
// pages/mypoints/mypoints.js
const app = getApp()
Page({
  data: {
    pointsDetailShow: true, //积分明细显示
    pointsTasksShow: false, //积分任务隐藏
    tagShow: false, //全部等标签显示与否 
    defaultTag: '全部', //默认选项
    tagList: [
      { 'name': '全部', 'type': 2 },
      { 'name': '支出', 'type': 1 },
      { 'name': '收入', 'type': 0 }
    ],
    rule: {},
    task: {},
    pointsArr: [],
    totalPoints: 0,
    fromIndex: 0,
    activeIndex: 0
  },
  loadMore(type) {
    this.data.fromIndex += 10;
    app.fetch("snail-portal/user/pointsDetail.htm", { fromIndex: this.data.fromIndex, type: type, limit: 10 }).then(res => {
      if (res.data.data.poinsDetail.length > 0) {
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
    let task = app.fetch("snail-portal/user/points/his.htm", {}).then(res => {
      return res.data.data;
    });
    let detail = app.fetch("snail-portal/user/pointsDetail.htm", { fromIndex: this.data.fromIndex, type: this.data.tagList[this.data.activeIndex].type, limit: 10 }).then(res => {
      return res.data.data;

    });
    Promise.all([task, detail]).then(results => {
      this.setData({
        rule: results[0].rule,
        task: results[0].task,
        pointsArr: results[1].poinsDetail,
        totalPoints: results[1].totalPoints
      })
      wx.hideLoading();
    });
  },
  //更改积分明细显示
  changePointsDetailShow() {
    this.setData({
      pointsDetailShow: true,
      pointsTasksShow: false
    })
  },
  //更改积分任务显示
  changePointsTasksShow() {
    this.setData({
      pointsDetailShow: false,
      pointsTasksShow: true
    })
  },
  //更改全部选项
  changeTagShow() {
    this.setData({
      tagShow: !this.data.tagShow
    })
  },
  //更改默认标签
  changeTag(e) {
    wx.showLoading({
      title: '拼命加载中...',
    })
    let index = e.currentTarget.dataset.index;
    this.setData({
      defaultTag: this.data
      .tagList[index].name,
      tagShow: !this.data.tagShow,
      activeIndex: index
    })
    this.data.fromIndex = 0;
    app.fetch("snail-portal/user/pointsDetail.htm", { fromIndex: this.data.fromIndex, type: this.data.tagList[this.data.activeIndex].type, limit: 10 }).then(res => {
      wx.hideLoading();
      if (res.data.success) {
        this.setData({
          pointsArr: res.data.data.poinsDetail
        })
      } else {
        wx.showToast({
          title: res.data.message,
          icon: 'none'
        })
      }
    });
  },
  onReachBottom: function () {
    if (this.data.pointsDetailShow) {
      this.loadMore(this.data.tagList[this.data.activeIndex].type);
    }
  }
})
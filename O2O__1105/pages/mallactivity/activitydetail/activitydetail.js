// pages/mallactivity/activitydetail/activitydetail.js
const app = getApp();
Page({
  data: {
    imgBaseUrl: '',  //图片的base路径 ,
    activityDetail: [],
    btnAble: true,  //按钮状态，可报名
    activityId:'',
    userId: '',
    unitId: '',
    enrollCount: '',  //当前报名人数
    actTimeStart: '',
    actTimeEnd: '',
    enrollTimeStart: '',
    enrollTimeEnd: ''
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
    let activityDetail = JSON.parse(options.activityDetail).act;
    let enrollCount = JSON.parse(options.activityDetail).enrollCount;
    let userId = wx.getStorageSync('userId');
    let unitId = wx.getStorageSync('unitId');
    this.setData({
      activityDetail: activityDetail,
      activityId: activityDetail.id,
      userId: userId,
      unitId: unitId,
      actTimeStart: activityDetail.actTimeStart.split(' ')[0],
      actTimeEnd: activityDetail.actTimeEnd.split(' ')[0],
      enrollCount: enrollCount,
      enrollTimeStart: activityDetail.enrollTimeStart.split(' ')[0],
      enrollTimeEnd: activityDetail.enrollTimeEnd.split(' ')[0]
    });

    wx.request({
      url: app.globalData.domain + 'snail-portal/act/checkActUser.do',
      method: "GET",
      data: {
        actId: this.data.activityId,
        userId: this.data.userId
      },
      success: (res) => {
        this.hideLoading();
        if (res.data.success) {
          this.setData({
            btnAble: true
          })
        }else{
          this.setData({
            btnAble: false
          })
        }
      },
      fail: (err) => {
        this.hideLoading();
      }
    })
  },
  apply(){
    wx.request({
      url: app.globalData.domain + 'snail-portal/act/enrollAct.do',
      method: "GET",
      data: {
        actId: this.data.activityId,
        userId: this.data.userId
      },
      success: (res) => {
        this.hideLoading();
        if (res.data.success) {
          wx.navigateTo({
            url: '/pages/mallactivity/applysucc/applysucc',
          })
          this.setData({
            btnAble: false
          })
        }else{
          wx.showToast({
            title: res.data.message,
            icon: 'none'
          })
        }
      },
      fail: (err) => {
        this.hideLoading();
      }
    })
  },
  showLoading() {
    wx.showLoading({
      title: '加载中...',
      mask: true,
      success: function () { }
    })
  },
  hideLoading() {
    wx.hideLoading();
  }
})
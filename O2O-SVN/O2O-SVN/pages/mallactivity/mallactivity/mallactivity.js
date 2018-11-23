// pages/mallactivity/mallactivity/mallactivity.js
const app = getApp();
Page({
  data: {
    imgBaseUrl: '',  //图片的base路径 ,
    actList: [],  //活动状态： 0: 待发布 1: 已发布 2: 已取消 3: 已过期
    iconBaseUrl: app.globalData.iconBaseUrl
  },
  onLoad: function (options) {
    this.setData({
      imgBaseUrl: app.globalData.imgBaseUrl
    })
    this.showLoading();
    wx.request({
      url: app.globalData.domain + '/find.htm',
      method: "GET",
      success: (res) => {
        this.hideLoading();
        if (res.data.success) {
          this.setData({
            actList: res.data.data.actList
          })
        }
      },
      fail: (err) => {
        this.hideLoading();
      }
    })
  },
  linkToDetail(e){
    let formId = e.detail.formId;
    let type = e.currentTarget.dataset.type;
    let activityId = e.currentTarget.dataset.activityid;
    let userId = wx.getStorageSync('userId');
    let unitId = wx.getStorageSync('unitId');

    wx.request({
      url: app.globalData.domain + '/act/actDetail.htm',
      method: "GET",
      data: {
        id: activityId,
        userId: userId,
        unitId: unitId,
        form_id: formId
      },
      success: (res) => {
        this.hideLoading();
        let moreInfoUrl = res.data.data.act.moreInfoUrl;
        let id = this.GetUrlPara(moreInfoUrl);
        if (res.data.success) {
          //type为: 0 大转盘  1调查问卷  2报名活动
          if(res.data.data.type==0){
            wx.navigateTo({
              url: '/pages/mallactivity/luckyrotate/luckyrotate?activityId=' + activityId + '&id=' + id +'&moreInfoUrl=' + encodeURI(moreInfoUrl)
            })
          } else if (res.data.data.type == 1){
            wx.navigateTo({
              url: '/pages/mallactivity/questionnaire/questionnaire'
            })
          } else if (res.data.data.type == 2){
            wx.navigateTo({
              url: '/pages/mallactivity/activitydetail/activitydetail?activityDetail=' + JSON.stringify(res.data.data)
            })
          }
        }
      },
      fail: (err) => {
        this.hideLoading();
      }
    })
  },
  GetUrlPara(url){
　　var arrUrl = url.split("?");
　　var para = arrUrl[1];
    var result = para.split("=");
　　return result[1];
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
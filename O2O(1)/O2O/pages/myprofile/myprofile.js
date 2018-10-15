// pages/myprofile/myprofile.js
Page({
  data: {
    sexIndex: 0,
    sexArray: ['男', '女'],
    region: ['北京市', '北京市', '东城区']
  },
  onLoad: function (options) {

  },
  bindSexChange(e){
    this.setData({
      sexIndex: e.detail.value
    })
  },
  bindRegionChange: function (e) {
    this.setData({
      region: e.detail.value
    })
  }
})
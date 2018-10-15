// pages/pointsmall/goodconvert/goodconvert.js
Page({
  data: {
    date: '1970-01-01',
    time: '00:00',
    num: 0
  },
  onLoad: function (options) {

  },
  //  点击时间组件确定事件  
  bindTimeChange: function (e) {
    this.setData({
      times: e.detail.value
    })
  },
  //  点击日期组件确定事件  
  bindDateChange: function (e) {
    this.setData({
      dates: e.detail.value
    })
  },
  add(){
    this.setData({
      num: this.data.num+1
    })
  },
  sub(){
    if(this.data.num <= 1){
      this.setData({
        num: 0
      })
    }else{
      this.setData({
        num: this.data.num - 1
      })
    }
  },
  //确认兑换
  confirmConvert(){
    wx.redirectTo({
      url: '/pages/pointsmall/convertsucc/convertsucc',
    })
  }
})
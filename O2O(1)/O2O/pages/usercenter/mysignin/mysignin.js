// pages/mysignin/mysignin.js
const app = getApp()
Page({
  data: {
    coverShow: false, //弹窗是否显示
    selectDays: [
      // {
      //   month: 'current',
      //   day: 6,
      //   color: '#e73128',
      //   background: '#fad6d4'
      // }
    ]
  },
  onLoad: function (options) {
    wx.showLoading({
      title: '拼命加载中...',
    })
    app.fetch("snail-portal/user/signRecord.htm", {}).then(res => {
      this.list = getDate(res.data.data.list);
      wx.hideLoading();
      if (res.data.success) {
        this.setData({
          list: res.data.data.list
        });
      }
    });
  },
  next(e){
    this.selectDays = [];
    this.list.forEach((val,index)=>{
      if (val.signYear == e.detail.currentYear && val.signMonth == e.detail.currentMonth){
        this.selectDays.push({
          month: 'current',
          day: val.signDay,
          color: '#e73128',
          background: '#fad6d4'
        })
      }
    });
    this.setData({
      selectDays:this.selectDays
    })
  },
  prev(e){
    this.selectDays = [];
    this.list.forEach((val, index) => {
      if (val.signYear == e.detail.currentYear && val.signMonth == e.detail.currentMonth) {
        this.selectDays.push({
          month: 'current',
          day: val.signDay,
          color: '#e73128',
          background: '#fad6d4'
        })
      }
    });
    this.setData({
      selectDays: this.selectDays
    })
  },
  changeCoverShow(){
    this.setData({
      coverShow: !this.data.coverShow
    })
  }
});
function getDate(signlist){
  let arr = [];
  signlist.map(function(value,index){
    let year = parseInt(value.signTime.split(" ")[0].split("-")[0]);
    let month = parseInt(value.signTime.split(" ")[0].split("-")[1]);
    let day = parseInt(value.signTime.split(" ")[0].split("-")[2]);
    arr.push({signYear:year,signMonth:month,signDay:day});
  })
  return arr;
}
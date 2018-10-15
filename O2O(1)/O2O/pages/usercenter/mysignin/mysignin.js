// pages/mysignin/mysignin.js
Page({
  data: {
    coverShow: false, //弹窗是否显示
    selectDays: [
      {
        month: 'current',
        day: 29,
        color: '#e73128',
        background: '#fad6d4'
      }
    ]
  },
  onLoad: function (options) {
    
  },
  changeCoverShow(){
    this.setData({
      coverShow: !this.data.coverShow
    })
  }
})
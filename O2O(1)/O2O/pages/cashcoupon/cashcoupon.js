// pages/cashcoupon/cashcoupon.js
Page({
  data: {
    showIndex: 0, //第几个分类显示
    unUsedList: [
      
    ],
    usedList: [
      {
        'money': 20,
        'name': '代金券',
        'date': '2018.09.11~2018.09.30'
      }
    ],
    timeoutList: [
      {
        'money': 40,
        'name': '代金券',
        'date': '2018.09.11~2018.09.30'
      },
      {
        'money': 10,
        'name': '代金券',
        'date': '2018.09.11~2018.09.30'
      },
      {
        'money': 30,
        'name': '代金券',
        'date': '2018.09.11~2018.09.30'
      }
    ]
  },
  onLoad: function (options) {

  },
  //更改显示的index
  changeShowIndex(e){
    let index = e.currentTarget.dataset.index;
    this.setData({
      showIndex: index
    })
  }
})
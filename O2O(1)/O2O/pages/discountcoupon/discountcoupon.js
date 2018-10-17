// pages/discountcoupon/discountcoupon.js
const app = getApp()
Page({
  data: {
    showIndex: 0, //第几个分类显示
    unUsedList: [
      {
        'money': 20,
        'name': '满减券',
        'date': '2018.09.11~2018.09.30'
      },
      {
        'money': 40,
        'name': '满减券',
        'date': '2018.10.12~2018.10.30'
      }
    ],
    usedList: [
      {
        'money': 20,
        'name': '满减券',
        'date': '2018.09.11~2018.09.30'
      }
    ],
    timeoutList: [
      {
        'money': 40,
        'name': '满减券',
        'date': '2018.09.11~2018.09.30'
      },
      {
        'money': 10,
        'name': '满减券',
        'date': '2018.09.11~2018.09.30'
      },
      {
        'money': 30,
        'name': '满减券',
        'date': '2018.09.11~2018.09.30'
      }
    ]
  },
  onLoad: function (options) {
  },
  //更改显示的index
  changeShowIndex(e) {
    let index = e.currentTarget.dataset.index;
    this.setData({
      showIndex: index
    })
  }
})
// pages/addselfhelppoints/addselfhelppoints.js
const app = getApp();
Page({
  data: {
    date: '',
    shopName: '',
    fee: '',
    imgUrl: '',
    imgBaseUrl: ''
  },
  onLoad: function (options) {
    let now = new Date();
    let date = now.getFullYear() + "-" + (now.getMonth() + 1) + "-" + now.getDate();
    this.setData({
      date: date,
      imgBaseUrl: app.globalData.imgBaseUrl
    })
  },
  bindDateChange(e){
    this.setData({
      date: e.detail.value
    })
  },
  changeShopName(e){
    this.setData({
      shopName: e.detail.value
    })
  },
  changeFee(e){
    this.setData({
      fee: e.detail.value
    })
  },
  uploadTicket(){
    wx.chooseImage({
      count: 1, // 默认9
      sizeType: ['compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: (res) => {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        var tempFilePaths = res.tempFilePaths;
        wx.showLoading({
          title: '拼命加载中...'
        })
        wx.uploadFile({
          url: app.globalData.domain + 'snail-portal/user/points/addImg.do',      //此处换上你的接口地址
          filePath: tempFilePaths[0],
          name: 'file',
          header: {
            "Content-Type": "multipart/form-data"
          },
          success:(res) => {
            let result = JSON.parse(res.data);
            if(result.success){
              wx.hideLoading();
              this.setData({
                imgUrl: result.data.path
              })
            }else{
              wx.hideLoading();
            }
          },
          fail: function (err) {
            console.log(err);
          }
        })
      }
    })
  },
  submit(){
    if (this.data.shopName == '') {
      wx.showToast({
        title: '消费门店不能为空',
        icon: 'none'
      })
      return false;
    }
    if (this.data.fee == '') {
      wx.showToast({
        title: '消费金额不能为空',
        icon: 'none'
      })
      return false;
    }
    if (this.data.imgUrl == '') {
      wx.showToast({
        title: '请上传消费小票',
        icon: 'none'
      })
      return false;
    }
    wx.showLoading({
      title: '拼命加载中...'
    })
    wx.request({
      url: app.globalData.domain + 'snail-portal/user/points/addPoints.do', 
      method: "POST",
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      data: {
        consumeDate: this.data.date,
        shopName: this.data.shopName,
        fee: this.data.fee,
        path: this.data.imgUrl,
        userId: wx.getStorageSync('userId')
      },
      success: (res) => {
        if(res.data.success){
          wx.hideLoading();
          wx.showToast({
            title: '提交成功',
            icon: 'none'
          })
          setTimeout(function(){
            wx.redirectTo({
              url: '/pages/usercenter/selfhelppoints/selfhelppoints'
            })
          }, 1000)
        }else{
          wx.hideLoading();
          wx.showToast({
            title: '提交失败',
            icon: 'none'
          })
        }
      },
      fail: (err) => {
        wx.hideLoading();
      }
    })
  }
})
// pages/myprofile/myprofile.js
const app = getApp()
Page({
  data: {
    sexIndex: 0,
    sexArray: ['未知','女', '男'],
    birthday: '',
    starsIndex: 0,
    stars: ['水瓶座', '双鱼座', '白羊座', '金牛座', '双子座', '巨蟹座', '狮子座', '处女座', '天秤座', '天蝎座', '射手座', '魔羯座'],
    region: ['北京市', '北京市', '东城区'],
    name: '',
    sex: '',
    mobile: '',
    email: '',
    addrDetail: ''
  },
  onLoad: function (options) {
    //获取当前年月日
    let now = new Date();
    let date = now.getFullYear() + "-" + (now.getMonth() + 1) + "-" + now.getDate();
    this.setData({
      birthday: date
    })
    wx.showLoading({
      title: '拼命加载中...',
    })
    wx.request({
      url: app.globalData.domain + 'snail-portal/user/userInfo.htm',
      data: {
        userId: wx.getStorageSync('userId'),
      },
      method: "GET",
      success: (res) => {
        wx.hideLoading();
        if (res.data.success) {
          if (res.data.data.user.provinceName){
            if (res.data.data.user.provinceName.indexOf("省") === -1) {
              this.data.region[0] = res.data.data.user.provinceName + "省";
            } else {
              this.data.region[0] = res.data.data.user.provinceName;
            }
            if (res.data.data.user.cityName.indexOf("市") === -1) {
              this.data.region[1] = res.data.data.user.cityName + "市";
            } else {
              this.data.region[1] = res.data.data.user.cityName;
            }
          }

          //遍历获取星座
          this.data.stars.forEach((ele, idx) => {
            if (ele == res.data.data.user.sign){
              this.setData({
                starsIndex: idx
              })
            }
          })

          this.setData({
            name: res.data.data.user.name,
            sexIndex: res.data.data.user.sex,
            birthday: res.data.data.user.birthday,
            mobile: res.data.data.user.mobile,
            email: res.data.data.user.email,
            addrDetail: res.data.data.user.addrDetail,
            region: this.data.region
          });
        }
      },
      fail: (err) => {
        wx.hideLoading();
      }
    })
  },
  bindSexChange(e) {
    this.setData({
      sexIndex: e.detail.value
    })
  },
  bindDateChange(e){
    this.setData({
      birthday: e.detail.value
    })
  },
  bindStarsChange(e){
    this.setData({
      starsIndex: e.detail.value
    })
  },
  bindRegionChange: function (e) {
    this.setData({
      region: e.detail.value
    })
  },
  getName(e) {
    this.setData({
      name: e.detail.value
    })
  },
  getMobile(e) {
    this.setData({
      mobile: e.detail.value
    })
  },
  getEmail(e) {
    this.setData({
      email: e.detail.value
    })
  },
  getAddr(e) {
    this.setData({
      addrDetail: e.detail.value
    })
  },
  updateProfile() {
    wx.showLoading({
      title: '保存中...',
      mask: true
    })
    wx.request({
      url: app.globalData.domain + 'snail-portal/user/updateUserInfoAjax.do',
      data: {
        userId: wx.getStorageSync('userId'),
        name: this.data.name,
        sex: this.data.sexIndex,
        sign: this.data.stars[this.data.starsIndex],
        mobile: this.data.mobile,
        email: this.data.email,
        addrDetail: this.data.addrDetail,
        provinceName: this.data.region[0],
        cityName: this.data.region[1]
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      method: "POST",
      success: (res) => {
        wx.hideLoading();
        if (res.data.success) {
          wx.showToast({
            title: '更新资料成功!',
            icon: 'none'
          })
        }else{
          wx.showToast({
            title: '更新资料失败!',
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
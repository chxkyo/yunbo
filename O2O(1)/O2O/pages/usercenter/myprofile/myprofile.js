// pages/myprofile/myprofile.js
const app = getApp()
Page({
  data: {
    sexIndex: 1,
    sexArray: ['女', '男'],
    region: ['','',''],
    name:'',
    sex:'',
    birthday:'',
    sign:'',
    mobile:'',
    email:'',
    addrDetail:''
  },
  onLoad: function (options) {
    wx.showLoading({
      title: '拼命加载中...',
    })
    this.userId = "628800148082";
    app.fetch("snail-portal/user/userInfo.htm", { userId: this.userId }).then(res => {
      wx.hideLoading();
      if (res.data.success) {
        if (res.data.data.user.provinceName.indexOf("省") === -1){
          this.data.region[0] = res.data.data.user.provinceName + "省";
        }else{
          this.data.region[0] = res.data.data.user.provinceName;
        }
        if (res.data.data.user.cityName.indexOf("市") === -1){
          this.data.region[1] = res.data.data.user.cityName + "市";
        }else{
          this.data.region[1] = res.data.data.user.cityName;
        }
        this.setData({
          name:res.data.data.user.name,
          sexIndex: res.data.data.user.sex,
          birthday: res.data.data.user.birthday,
          sign: res.data.data.user.sign,
          mobile: res.data.data.user.mobile,
          email: res.data.data.user.email,
          addrDetail: res.data.data.user.addrDetail,
          region: this.data.region
        });
      }
    });
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
  },
  getName(e){
    this.setData({
      name:e.detail.value
    })
  },
  getBirthday(e){
    this.setData({
      birthday: e.detail.value
    })
  },
  getSign(e){
    this.setData({
      sign: e.detail.value
    })
  },
  getMobile(e){
    this.setData({
      mobile: e.detail.value
    })
  },
  getEmail(e){
    this.setData({
      email: e.detail.value
    })
  },
  getAddr(e){
    this.setData({
      addrDetail: e.detail.value
    })
  },
  updateProfile(){
    wx.showLoading({
      title: '保存中...',
      mask:true
    })
    this.userId = "628800148082";
    app.fetch("snail-portal/user/updateUserInfoAjax.do?userId=" + this.data.userId + "&name=" + this.data.name + "&sex=" + this.data.sexIndex + "&sign=" + this.data.sign + "&mobile=" + this.data.mobile + "&email=" + this.data.email + "&addrDetail=" + this.data.addrDetail + "&provinceName=" + this.data.region[0] + "&cityName=" + this.data.region[1]).then(res => {
      wx.hideLoading();
      if (res.data.success) {
        wx.showToast({
          title: '更新资料成功!',
        })
      }
    });
  }
})
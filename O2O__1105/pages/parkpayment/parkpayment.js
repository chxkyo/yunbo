// pages/parkpayment/parkpayment.js
const app = getApp();
Page({
  data: {
    index: 0,
    array: ['京', '津', '冀', '晋', '蒙', '辽', '吉', '黑', '沪', '苏', '浙', '皖', '闽', '赣', '鲁', '豫', '鄂', '湘', '粤', '桂', '琼', '渝', '川', '贵', '云', '藏', '陕', '甘', '青', '宁', '新', '台'],
    plateNumber: '',
    selectBtnAble: false, //查询按钮可不可用
    tipsShow: false, //提示不显示
    resultShow: false,
    tipsText: '车牌号格式错误'
  },
  onLoad: function (options) {

  },
  bindPickerChange: function (e) {
    this.setData({
      index: e.detail.value
    })
  },
  changeSelectBtnAble(e){
    if (e.detail.value !== ''){
      this.setData({
        plateNumber: e.detail.value,
        selectBtnAble: true
      })
    }else{
      this.setData({
        plateNumber: e.detail.value,
        selectBtnAble: false
      })
    }
  },
  //查询
  query(){
    if(this.data.selectBtnAble){
      if (/(^[\u4E00-\u9FA5]{1}[A-Z0-9]{6}$)|(^[A-Z]{2}[A-Z0-9]{2}[A-Z0-9\u4E00-\u9FA5]{1}[A-Z0-9]{4}$)|(^[\u4E00-\u9FA5]{1}[A-Z0-9]{5}[挂学警军港澳]{1}$)|(^[A-Z]{2}[0-9]{5}$)|(^(08|38){1}[A-Z0-9]{4}[A-Z0-9挂学警军港澳]{1}$)/.test(this.data.array[this.data.index]+this.data.plateNumber)){
        this.showLoading();
        let userId = wx.getStorageSync('userId');
        wx.request({
          url: app.globalData.domain + 'snail-portal/park/parkfee.htm',
          method: "GET",
          data: {
            carno: this.data.array[this.data.index] + this.data.plateNumber,
            userId: userId
          },
          success: (res) => {
            this.hideLoading();
            if (res.data.success) {
              console.log(res);
            } else {
              this.setData({
                tipsShow: true,
                tipsText: res.data.message
              })
            }
          },
          fail: (err) => {
            this.hideLoading();
          }
        })
      }else{
        this.setData({
          tipsShow: true,
          tipsText: '车牌号格式错误'
        })
      }
    }   
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
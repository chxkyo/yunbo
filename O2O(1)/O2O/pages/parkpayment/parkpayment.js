// pages/parkpayment/parkpayment.js
Page({
  data: {
    index: 0,
    array: ['苏', '皖', '浙', '赣'],
    plateNumber: '',
    selectBtnAble: false, //查询按钮可不可用
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
  }
})
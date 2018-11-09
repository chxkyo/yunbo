// pages/coupondetail/coupondetail.js
const app = getApp();
Page({
  data: {
    id: null, //优惠券id
    qrcodeLgShow: false,   //大型二维码是否显示,
    couponType: 12,  //优惠券类型
    useStatus: null,  //优惠券状态：0表示未使用，1表示已使用，2表示已过期
    storeList: [], //使用商户
    useRule: '',  //使用规则 
    couponName: '', //券名
    couponRate: '',
    couponUseRate: '',
    couponNo: '', //卡券编号
    useTimeStart: '', //使用开始时间
    useTimeEnd: '', //使用结束时间
    loginId: '',  //输入的商家账号
    couponAmt:'',
    zheKou:''
  },
  onLoad: function (options) {
    let id = options.id;
    this.setData({
      id: options.id
    })
    wx.request({
      url: app.globalData.domain+'/user/couponInfoDetail.htm',
      data: {
        id: this.data.id
      },
      success:(res)=>{
        if(res.data.success){
          this.setData({
            couponType: res.data.data.coupon.couponType,
            storeList: res.data.data.storeList,
            useStatus: res.data.data.coupon.useStatus,
            couponName: res.data.data.couponCate.couponName,
            useRule: res.data.data.couponCate.useRule,
            couponNo: res.data.data.coupon.couponNo,
            useTimeStart: res.data.data.coupon.useTimeStart,
            useTimeEnd: res.data.data.coupon.useTimeEnd,
            couponRate: res.data.data.couponCate.couponRate,
            couponUseRate: res.data.data.couponCate.couponUseRate,
            couponAmt: res.data.data.couponCate.couponAmt,
            zheKou: res.data.data.couponCate.zheKou
          })
        }
      }
    })
  },
  changeLoginId(e){
    this.setData({
      loginId: e.detail.value
    })
  },
  showQrcodeLg() {
    this.setData({
      qrcodeLgShow: true
    })
  },
  hideQrcodeLg() {
    this.setData({
      qrcodeLgShow: false
    })
  },
  check(){
    if(this.data.loginId == ''){
      wx.showToast({
        title: '请输入商家账号',
        icon: 'none'
      })
    }else{
      wx.request({
        url: app.globalData.domain + '/user/useCoupon.htm',
        data: {
          id: this.data.id,
          loginId: this.data.loginId
        },
        success: (res) => {
          wx.showToast({
            title: res.data.message,
            icon:'none'
          })
        }
      })
    }
  }
})
// pages/classesset/classesset.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    chooseStartTime:false,
    startTime:"",
    chooseEndTime: false,
    endTime:'',
    showModal:false,
    classesName:'',
    classesArr:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    getShopDutyList(this);
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  },
  bindStartTimeChange: function (e) {
    this.setData({
      chooseStartTime:true,
      startTime: e.detail.value
    })
  },
  bindEndTimeChange: function (e) {
    this.setData({
      chooseEndTime: true,
      endTime: e.detail.value
    })
  },
  modalShow(){
    this.setData({
      showModal:true
    })
  },
  saveClasses(){
    let that = this;
    if (!this.data.classesName) {
      wx.showModal({
        title: '提示',
        content: '请填写班次！',
        showCancel: false
      })
    } else if (!this.data.chooseStartTime) {
      wx.showModal({
        title: '提示',
        content: '请选择开始时间',
        showCancel: false
      })
    } else if (!this.data.chooseEndTime){
      wx.showModal({
        title: '提示',
        content: '请选择结束时间',
        showCancel: false
      })
    }else{
      app.fetch('shopDutyConfig/save', { name: this.data.classesName, startTime: this.data.startTime, endTime: this.data.endTime}, "POST").then(res => {
        if(res.data.code === 0){
          getShopDutyList(that);
          this.setData({
            showModal:false
          })
          wx.showToast({
            title: '添加成功'
          })
        }else{
          wx.showToast({
            title: res.data.msg,
            icon:'none'
          })
        }
      })
    }
  },
  getClassesName(e){
    this.setData({
      classesName:e.detail.value
    });
  },
  delClasses(e){
    let id = e.currentTarget.dataset.id;
    let that = this;
    wx.showModal({
      title: "确认删除班次吗?",
      success: function (res) {
        if (res.confirm) {
          app.fetch('shopDutyConfig/delete/' + id, { methodName:'delete',id:id}, "POST").then(res => {
            if (res.data.code === 0) {
              let index = that.data.classesArr.findIndex((value,index)=>{
                return value.id == id;
              });
              that.data.classesArr.splice(index,1);
              that.setData({
                classesArr: that.data.classesArr
              })
              wx.showToast({
                title: '删除成功'
              })
            }
          })
        }
      }
    });
  }
})
function getShopDutyList(that){
  wx.showLoading({
    title: '加载中...',
  })
  app.fetch('shopDutyConfig/list', {}, "POST").then(res => {
    wx.hideLoading();
    if (res.data.code === 0) {
      that.setData({
        classesArr: res.data.shiftList
      })
    } else if (res.data.code === 2) {
      wx.removeStorageSync('sessionid');
      wx.removeStorageSync('sessionid_gettime');
      wx.switchTab({
        url: '../index/index'
      })
    }
  })
}
// pages/classesset/classesset.js
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
    classesArr:[{name:"早班",time:"08:00~12:00"}]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
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
      this.data.classesArr.push({ name: this.data.classesName, time: this.data.startTime + "~" + this.data.endTime});
      this.setData({
        classesArr: this.data.classesArr,
        showModal:false
      });
      wx.showToast({
        title: '添加成功'
      })
    }
  },
  getClassesName(e){
    this.setData({
      classesName:e.detail.value
    });
  },
  delClasses(e){
    let index = e.currentTarget.dataset.index;
    let that = this;
    wx.showModal({
      title: "确认删除班次吗?",
      success: function (res) {
        if (res.confirm) {
          that.data.classesArr.splice(index, 1);
          that.setData({
            classesArr: that.data.classesArr
          })
          wx.showToast({
            title: '删除成功'
          })
        }
      }
    });
  }
})
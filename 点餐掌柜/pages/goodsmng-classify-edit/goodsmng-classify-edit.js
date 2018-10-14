const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    classifyName:'',
    classifyDiscount:'',
    id:'',
    pid:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if(options.id){
      this.data.id = options.id;
      app.fetch('productCategory/info/' + this.data.id, {
        methodName:'info'}, "POST").then(res => {
        if (res.data.code === 0) {
            this.setData({
              classifyName: res.data.productCategory.name,
              classifyDiscount: res.data.productCategory.discount,
              pid: res.data.productCategory.pid
            })
        }
      })
    }
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
  getClassifyName(e){
    this.setData({
      classifyName:e.detail.value
    })
  },
  getClassifyDiscount(e){
    this.setData({
      classifyDiscount: e.detail.value
    })
  },
  saveClassify() {
    let pages = getCurrentPages();
    let prevPage = pages[pages.length - 2];  //上一个页面
    if (!this.data.classifyName) {
      wx.showModal({
        title: '提示',
        content: '请填写分类名称',
        showCancel: false
      })
    } else if (!this.data.classifyDiscount){
      wx.showModal({
        title: '提示',
        content: '请填写分类折扣',
        showCancel: false
      })
    } else{
      app.fetch('productCategory/update', {id:this.data.id,name:this.data.classifyName,discount:this.data.classifyDiscount,pid:this.data.pid}, "POST").then(res => {
        if (res.data.code === 0) {
          wx.showToast({
            title: '编辑成功！',
            success:function(){
              prevPage.onLoad();
              wx.navigateBack({
                delta: 1
              })
            }
          })
        }
      })
    }
  },
  delClassify() {
    let pages = getCurrentPages();
    let prevPage = pages[pages.length - 2];  //上一个页面
    let that = this;
    wx.showModal({
      title: "确认删除该商品分类吗?",
      success: function (res) {
        if (res.confirm) {
          app.fetch('productCategory/delete/' + that.data.id, { id: that.data.id, methodName:'delete'}, "POST").then(res => {
            if (res.data.code === 0) {
              wx.showToast({
                title: '删除成功！',
                success: function () {
                  prevPage.onLoad();
                  wx.navigateBack({
                    delta: 1
                  })
                }
              })
            }
          })
        }
      }
    });
  }
})
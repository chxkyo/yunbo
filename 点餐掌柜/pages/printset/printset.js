// pages/printset/printset.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    printName:'',
    printModeIndex:0,
    printModeArr: ["一菜一单", "一菜两单","一菜三单"],
    printModeFlag:false,
    printWidthIndex: 0,
    printWidthArr: [60, 80,100],
    printWidthFlag: false,
    connectTypeIndex:0,
    connectTypeArr:["以太网","xx网","xx网"],
    connectTypeFlag:false,
    ipAddress:'',
    printPort:''
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
  getPrintName(e){
    this.setData({
      printName:e.detail.value
    })
  },
  bindPrintModeChange(e){
    this.setData({
      printModeIndex:e.detail.value,
      printModeFlag:true
    })
  },
  bindPrintWidthChange(e){
    this.setData({
      printWidthIndex: e.detail.value,
      printWidthFlag: true
    })
  },
  bindConnectTypeChange(e){
    this.setData({
      connectTypeIndex: e.detail.value,
      connectTypeFlag: true
    })
  },
  getIpAddress(e){
    this.setData({
      ipAddress:e.detail.value
    })
  },
  getPrintPort(e){
    this.setData({
      printPort: e.detail.value
    })
  },
  savePrint(){
    if (!this.data.printName){
      wx.showModal({
        title: '提示',
        content: '请输入打印机名称!',
        showCancel:false
      })
      return false;
    } else if (!this.data.ipAddress){
      wx.showModal({
        title: '提示',
        content: '请输入IP地址!',
        showCancel: false
      })
      return false
    } else if (!this.data.printPort){
      wx.showModal({
        title: '提示',
        content: '请输入端口!',
        showCancel: false
      })
      return false
    }else{

    }
  }
})
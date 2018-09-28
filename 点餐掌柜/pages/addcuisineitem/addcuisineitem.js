// pages/addcuisineitem/addcuisineitem.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    showModal:false,
    cai_category:["粤菜","上海菜","川菜","无"],
    choose_cai:false,
    cai_index:0,
    name_category:["鱼香肉丝","宫保鸡丁","糖醋排骨"],
    choose_name:false,
    name_index:0,
    cai_list:["菜品名称"]
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
  bindCaiPickerChange(e){
    this.setData({
      choose_cai:true,
      cai_index: e.detail.value
    })
  },
  bindNamePickerChange(e){
    this.setData({
      choose_name: true,
      name_index: e.detail.value
    })
  },
  modalShow(){
    this.setData({
      showModal:true
    })
  },
  chooseCuisine(){
    this.data.cai_list.push(this.data.name_category[this.data.name_index])
    this.setData({
      cai_list: this.data.cai_list,
      showModal:false
    })
  },
  delCuisine(e){
    console.log(e)
  }
})
// pages/arealist/arealist.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    boxList: [],
    hallList: [],
    areaName:"包厢",
    showModal:false,
    areaItemName:'',
    boxIndex:'',
    hallIndex:'',
    areaType:'',
    areaInputName:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (options.type){
      this.setData({
        areaType: options.type
      })
      if (options.type == 1){
        this.setData({
          boxList: ["包厢一", "包厢二", "包厢三", "包厢四", "包厢五"],
          areaName: "包厢"
        })
      } else if (options.type == 2 ){
        this.setData({
          hallList: ["桌号一", "桌号二", "桌号三", "桌号四", "桌号五"],
          areaName: '大厅'
        })
      }else{
        this.setData({
          boxList: ["包厢一", "包厢二", "包厢三", "包厢四", "包厢五"],
          hallList: ["桌号一", "桌号二", "桌号三", "桌号四", "桌号五"]
        })
      }
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
  modalShow(){
    this.setData({
      areaItemName:'',
      showModal:true
    })
  },
  showBoxModal(e){
    let index = e.currentTarget.dataset.index;
    this.data.boxIndex = index;
    this.setData({
      areaItemName:this.data.boxList[index],
      showModal: true,
      areaInputName: this.data.boxList[index]
    })
  },
  showHallModal(e){
    let index = e.currentTarget.dataset.index;
    this.data.hallIndex = index;
    this.setData({
      areaItemName: this.data.hallList[index],
      showModal: true,
      areaInputName: this.data.hallList[index]
    })
  },
  getAreaName(e){
    this.setData({
      areaInputName: e.detail.value
    })
  },
  saveArea(){
    if (!this.data.areaInputName){
      wx.showModal({
        title: '提示',
        content: '请输入区域名称',
        showCancel: false
      })
    }else{
      //编辑
      if (this.data.areaItemName){
        if(this.data.areaType == 1){
          let index = this.data.boxList.indexOf(this.data.areaItemName);
          this.data.boxList[index] = this.data.areaInputName;
          this.setData({
            boxList: this.data.boxList,
            showModal:false
          })
        } else if (this.data.areaType == 2){
          let index = this.data.hallList.indexOf(this.data.areaItemName);
          this.data.hallList[index] = this.data.areaInputName;
          this.setData({
            hallList: this.data.hallList,
            showModal: false
          })
        }
      }else{
        if (this.data.areaType == 1) {
          this.data.boxList.push(this.data.areaInputName);
          this.setData({
            boxList: this.data.boxList,
            showModal: false
          })
        } else if (this.data.areaType == 2){
          this.data.hallList.push(this.data.areaInputName);
          this.setData({
            hallList: this.data.hallList,
            showModal: false
          })
        }
      }
    }
  },
  delArea(){
    let that =this;
    wx.showModal({
      title: "确认删除吗?",
      success: function (res) {
        if (res.confirm) {
          if (that.data.areaType == 1){
            that.data.boxList.splice(that.data.boxIndex,1);
            that.setData({
              boxList: that.data.boxList,
              showModal: false
            })
          } else if (that.data.areaType == 2){
            that.data.hallList.splice(that.data.hallIndex, 1);
            that.setData({
              hallList: that.data.hallList,
              showModal: false
            })
          }
          wx.showToast({
            title: '删除成功'
          })
        }
      }
    });
  }
})
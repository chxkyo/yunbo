// pages/editcuisine/editcuisine.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    src: "../../images/img/cpgl.png",
    mealName: "妈妈红烧肉套餐",
    mealPrice: "288.00",
    mealMaxnum: "20",
    allCuisine: '妈妈红烧肉、妈妈红烧鱼',
    mealDiscount:'6',
    thisIndex:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if(options.index){
      this.thisIndex = options.index;
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
  jumpAddCuisine() {
    wx.navigateTo({
      url: '../addcuisineitem/addcuisineitem?allcuisine=' + this.data.allCuisine
    })
  },
  saveMeal(){
    if (!this.data.src) {
      wx.showModal({
        title: '提示',
        content: '请上传图片',
        showCancel: false
      })
    } else if (!this.data.mealName) {
      wx.showModal({
        title: '提示',
        content: '请输入套餐名称',
        showCancel: false
      })
    } else if (!this.data.mealPrice) {
      wx.showModal({
        title: '提示',
        content: '请输入价格名称',
        showCancel: false
      })
    } else if (!this.data.mealMaxnum) {
      wx.showModal({
        title: '提示',
        content: '请输入最大允许数量',
        showCancel: false
      })
    } else if (!this.data.allCuisine) {
      wx.showModal({
        title: '提示',
        content: '请选择套餐菜品',
        showCancel: false
      })
    }else{

    }
  },
  delThisMeal(){
    let pages = getCurrentPages();
    let prevPage = pages[pages.length - 2];  //上一个页面
    let that = this;
    wx.showModal({
      title:"确认删除该套餐吗?",
      success:function(res){
        if(res.confirm){
          prevPage.data.cuisineListArr.splice(that.data.thisIndex,1);
          prevPage.setData({
            cuisineListArr: prevPage.data.cuisineListArr
          });
          wx.showToast({
            title: '删除套餐成功',
            success(){
              wx.navigateBack({
                delta: 1
              })
            }
          })
        }
      }
    });
  },
  joinPicture: function (e) {
    let that = this;
    wx.showActionSheet({
      itemList: ["从相册中选择", "拍照"],
      itemColor: "#f7982a",
      success: function (res) {
        if (!res.cancel) {
          if (res.tapIndex == 0) {
            that.chooseWxImage("album");
          } else if (res.tapIndex == 1) {
            that.chooseWxImage("camera");
          }
        }
      }
    })
  },
  chooseWxImage: function (type) {
    var that = this;
    var evalList = this.data.evalList;
    wx.chooseImage({
      count: 1,
      sizeType: ["original", "compressed"],
      sourceType: [type],
      success: function (res) {
        var addImg = res.tempFilePaths;
        var addLen = addImg.length;
        that.upLoadImg(addImg);
      },
    })
  },
  upLoadImg: function (img) {
    var that = this;
    this.upload(that, img);
  },
  //多张图片上传
  upload: function (page, path) {
    var that = this;
    var curImgList = [];
    that.setData({
      src: path[0]
    })
    // wx.showToast({
    //   icon: "loading",
    //   title: "正在上传"
    // });
    // for (var i = 0; i < path.length; i++) {
    //   wx.showToast({
    //     icon: "loading",
    //     title: "正在上传"
    //   });
    // wx.uploadFile({
    //   url: '',//接口处理在下面有写
    //   filePath: path[i].pic,
    //   name: 'file',
    //   header: { "Content-Type": "multipart/form-data" },
    //   formData: {
    //     douploadpic: '1'
    //   },
    //   success: function (res) {
    //     curImgList.push(res.data);
    //     var evalList = that.data.evalList;
    //     evalList[0].imgList = curImgList;
    //     that.setData({
    //       evalList: evalList
    //     })
    //     if (res.statusCode != 200) {
    //       wx.showModal({
    //         title: '提示',
    //         content: '上传失败',
    //         showCancel: false
    //       })
    //       return;
    //     }
    //     var data = res.data
    //     page.setData({  //上传成功修改显示头像
    //       src: path[0]
    //     })
    //   },
    //   fail: function (e) {
    //     wx.showModal({
    //       title: '提示',
    //       content: '上传失败',
    //       showCancel: false
    //     })
    //   },
    //   complete: function () {
    //     wx.hideToast();  //隐藏Toast
    //   }
    // })
    // }
  },
})
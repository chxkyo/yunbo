const app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    year: new Date().getFullYear(),      // 年份
    month: app.util.formatNumber(new Date().getMonth() + 1),    // 月份
    day: new Date().getDate(),
    demo4_days_style: [],
    startDate: '',
    endDate: '',

  },
  dayClick: function (event) {//监听点击日历具体某一天的事件:dayClick
    let index = this.data.demo4_days_style.findIndex(function(val,index){
      return val.day == event.detail.day;
    });
    console.log(event);
    if (this.data.demo4_days_style[index].active){
      this.data.demo4_days_style[index].color = '#000';
      this.data.demo4_days_style[index].background = '#fff';
      this.data.demo4_days_style[index].active = false;
    }else{
      this.data.demo4_days_style[index].color = '#fff';
      this.data.demo4_days_style[index].background = '#1da5fc';
      this.data.demo4_days_style[index].active = true;
    }

    this.setData({
      demo4_days_style: this.data.demo4_days_style
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let month = app.util.formatNumber(new Date().getMonth() + 1);
    let year = app.util.formatNumber(new Date().getFullYear());
    this.setData({
      startDate: year + month + "01",
      endDate: year + month + "07"
    })
    const days_count = new Date(this.data.year, this.data.month, 0).getDate();
    let demo4_days_style = new Array;
    for (let i = 1; i <= days_count; i++) {
        if(i<=7){
          demo4_days_style.push({
            month: 'current', day: i, color: '#fff', background: '#1da5fc',active:true
          });
        }else{
          demo4_days_style.push({
            month: 'current', day: i, color: '#000', background: '#fff',active:false
          });
        }
    }
    this.setData({
      demo4_days_style
    });
  },
  choosedate(e){
    let pages = getCurrentPages();
    let prevPage = pages[pages.length - 2];
    let index = this.data.demo4_days_style.findIndex(function (val, index) {
      return val.active;
    });
    let endIndex;
    this.data.demo4_days_style.findIndex(function (val, index) {
      if (val.active){
        endIndex = index;
      }
    })
    let startDate = this.data.year +"-"+ this.data.month + "-" +app.util.formatNumber(this.data.demo4_days_style[index].day);
    let endDate = this.data.year + "-" + this.data.month + "-" + app.util.formatNumber(this.data.demo4_days_style[endIndex].day);
    this.setData({
      startDate: startDate,
      endDate: endDate
    });
    prevPage.setData({
      chooseDate: startDate + "~" + endDate,
      startDate: startDate.split("-").join(""),
      endDate: endDate.split("-").join("")
    })
    wx.navigateBack({
      delta:1
    })
  }
})
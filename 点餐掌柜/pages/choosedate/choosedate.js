

Page({

  /**
   * 页面的初始数据
   */
  data: {
    year: new Date().getFullYear(),      // 年份
    month: new Date().getMonth() + 1,    // 月份
    day: new Date().getDate(),
    demo4_days_style: [],

  },
  next: function (event) {//监听点击下个月事件:nextMonth
    console.log(event.detail);
  },
  prev: function (event) {//监听点击上个月事件:prevMonth
    console.log(event.detail);
  },
  dateChange: function (event) {//监听点击日历标题日期选择器事
    console.log(event.detail);
  },
  dayClick: function (event) {//监听点击日历具体某一天的事件:dayClick
    let index = this.data.demo4_days_style.findIndex(function(val,index){
      return val.day == event.detail.day;
    });
    this.data.demo4_days_style[index].color = '#fff';
    this.data.demo4_days_style[index].background = 'red';
    this.setData({
      demo4_days_style: this.data.demo4_days_style
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const days_count = new Date(this.data.year, this.data.month, 0).getDate();
    let demo4_days_style = new Array;
    for (let i = 1; i <= days_count; i++) {
        demo4_days_style.push({
          month: 'current', day: i, color: '#000',background:'#fff'
        });
    }
    this.setData({
      demo4_days_style
    });
  },
})
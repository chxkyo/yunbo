
import * as echarts from '../../components/ec-canvas/echarts';
const app = getApp()

Page({
  data: {
    today: '',
    dailySale: 0,
    monthSale: 0,
    weekSale: 0,
    dailySaleArr: [],
    monthSaleArr: [],
    weekSaleArr: [],
    hasLogined: false,
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    dayopendata: {
      lazyLoad: true,
      disableTouch: true
    },
    weekopendata: {
      pie: {
        lazyLoad: true,
        disableTouch: true
      },
      bar: {
        lazyLoad: true,
        disableTouch: true
      }
    },
    monthopendata: {
      pie: {
        lazyLoad: true,
        disableTouch: true
      },
      bar: {
        lazyLoad: true,
        disableTouch: true
      }
    },
    totalAmount: '',
    totalCount: '',
    peopleNumber: '',
    avgAmount: '',
    shopName: '',
    colorArr: [],
    dailyColorArr: [],
    weekColorArr: [],
    monthColorArr: []

  },
  onLoad: function () {
    let that = this;
    const year = new Date().getFullYear();
    const month = new Date().getMonth() + 1;
    const day = new Date().getDate();
    this.setData({
      today: [year, month, day].map(app.util.formatNumber).join('-'),
      shopName: app.globalData.shopInfo.name
    })
    this.ecComponent1 = this.selectComponent('#mychart-dom-multi-pie1');
    this.ecComponent2 = this.selectComponent('#mychart-dom-multi-bar1');
    this.ecComponent3 = this.selectComponent('#mychart-dom-multi-pie2');
    this.ecComponent4 = this.selectComponent('#mychart-dom-multi-bar2');
    this.ecComponent5 = this.selectComponent('#mychart-dom-multi-pie3');
    wx.showLoading({ title: '拼命加载中...' });
    app.fetch('getPayment', {}, 'POST').then(res => {
      this.setData({
        colorArr: res.data.payment
      })
      app.fetch('data', { deptId: '', shopId: '' }, 'POST').then(res => {
        wx.hideLoading();
        if (res.data.code === 0) {
          res.data.dailyData.payTypeList.forEach(function (val, index) {
            val.rate = parseFloat(val.rate * 100).toFixed(2);
          });
          res.data.weekData.payTypeList.forEach(function (val, index) {
            val.rate = parseFloat(val.rate * 100).toFixed(2);
          });
          res.data.monthData.payTypeList.forEach(function (val, index) {
            val.rate = parseFloat(val.rate * 100).toFixed(2);
          });
          this.setData({
            totalAmount: res.data.totalAmount,
            totalCount: res.data.totalCount,
            peopleNumber: res.data.peopleNumber,
            avgAmount: res.data.avgAmount,
            dailySale: res.data.dailyData.dailySale,
            monthSale: res.data.monthData.monthSale,
            weekSale: res.data.weekData.weekSale,
            dailySaleArr: res.data.dailyData.payTypeList,
            weekSaleArr: res.data.weekData.payTypeList,
            monthSaleArr: res.data.monthData.payTypeList
          })
          this.setData({
            dailyColorArr: getColorArr(res.data.dailyData.payTypeList, that.data.colorArr)
          })
          this.ecComponent1.init((canvas, width, height) => {
            const chart = echarts.init(canvas, null, {
              width: width,
              height: height
            });
            chart.setOption(getDayOption(that.data.dailyColorArr, getData(res.data.dailyData.payTypeList)));
            this.daily_pie_chart = chart;
            return chart;
          });

          this.ecComponent2.init((canvas, width, height) => {
            const chart = echarts.init(canvas, null, {
              width: width,
              height: height
            });
            chart.setOption(getBarOption(getBarDate(res.data.weekData.weekDetail), getBarSale(res.data.weekData.weekDetail), getBarSaleMax(res.data.weekData.weekDetail)));
            this.week_bar_chart = chart;
            return chart;
          });
          this.setData({
            weekColorArr: getColorArr(res.data.weekData.payTypeList, that.data.colorArr)
          })
          this.ecComponent3.init((canvas, width, height) => {
            const chart = echarts.init(canvas, null, {
              width: width,
              height: height
            });
            chart.setOption(getDayOption(that.data.weekColorArr, getData(res.data.weekData.payTypeList)));
            this.week_pie_chart = chart;
            return chart;
          });
          this.ecComponent4.init((canvas, width, height) => {
            const chart = echarts.init(canvas, null, {
              width: width,
              height: height
            });
            chart.setOption(getBarOption(getBarDate(res.data.monthData.monthDetail), getBarSale(res.data.monthData.monthDetail), getBarSaleMax(res.data.monthData.monthDetail)));
            this.month_bar_chart = chart;
            return chart;
          });
          this.setData({
            monthColorArr: getColorArr(res.data.monthData.payTypeList, that.data.colorArr)
          })
          this.ecComponent5.init((canvas, width, height) => {
            const chart = echarts.init(canvas, null, {
              width: width,
              height: height
            });
            chart.setOption(getDayOption(that.data.monthColorArr, getData(res.data.monthData.payTypeList)));
            this.week_pie_chart = chart;
            return chart;
          });
        } else if (res.data.code === 2) {
          wx.removeStorageSync('sessionid');
          wx.removeStorageSync('sessionid_gettime');
          wx.switchTab({
            url: '../index/index'
          })
        }
      })
    })

  },
  getUserInfo: function (e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  }
})
function getDayOption(colorArr, data) {
  var option = {
    backgroundColor: "#ffffff",
    color: colorArr,
    tooltip: {
      show: true,
      trigger: 'item',
      formatter: "{b} : {d}%",
      textStyle: {
        color: "#fff"
      },
      position:'bottom'
    },
    series: [{
      label: {
        normal: {
          fontSize: 14
        }
      },
      type: 'pie',
      center: ['50%', '50%'],
      radius: ["35%", "50%"],

      data: data,
      itemStyle: {
        emphasis: {
          shadowBlur: 10,
          shadowOffsetX: 0,
          shadowColor: 'rgba(0, 2, 2, 0.3)'
        }
      }
    }]
  };
  return option;
}
function getBarOption(date, saleArr, saleMaxArr) {
  var option = {
    //--------------   提示框 -----------------
    tooltip: {
      show: true,                  //---是否显示提示框,默认为true
      trigger: 'item',             //---数据项图形触发
      position: "top",
      padding: 5,
      textStyle: {                 //---提示框内容样式
        color: "#fff",
      },
    },
    //-------------   x轴   -------------------
    xAxis: {
      show: true,                  //---是否显示
      position: 'bottom',          //---x轴位置
      offset: 0,                   //---x轴相对于默认位置的偏移
      type: 'category',            //---轴类型，默认'category'             //---坐标轴名称与轴线之间的距离
      axisLine: {
        show: false
      },
      axisTick: {
        show: false
      },
      axisLabel: {                 //---坐标轴 标签
        show: true,                  //---是否显示
        inside: false,               //---是否朝内
        rotate: 0,                   //---旋转角度   
        margin: 5,                  //---刻度标签与轴线之间的距离
        color: '#b3b3b3',
      },
      data: date,//内容
    },

    //----------------------  y轴  ------------------------
    yAxis: {
      show: false,                  //---是否显示
    },
    //------------ 内容数据  -----------------
    series: [
      {
        type: 'bar',
        itemStyle: {
          normal: {
            color: '#eee'
          }
        },
        silent: true,
        barGap: '-100%', // Make series be overlap
        data: saleMaxArr,
        barWidth: 20
      },
      {
        name: '销量',             //---系列名称
        type: 'bar',                //---类型
        itemStyle: {                 //---图形形状
          color: new echarts.graphic.LinearGradient(
            0, 0, 0, 1, [{
              offset: 0,
              color: '#1da5fc'
            },
            {
              offset: 1,
              color: '#8379fb'
            }
            ]
          )
        },
        data: saleArr,
        barWidth: 20,
        barMinHeight:10
      }
    ]
  };
  return option;
}
function getColorArr(arr, colorArr) {
  let dailyColorArr = [];
  arr.forEach(function (value, index) {
    let colorIndex;
    colorIndex = colorArr.findIndex(function (colorValue, colorIndex) {
      return colorValue.code == value.payType
    })
    if (colorIndex !== -1) {
      dailyColorArr.push('#' + colorArr[colorIndex].staticsColor);
    }
  })
  return dailyColorArr;
}
function getData(arr) {
  let dataArr = [];
  arr.forEach(function (value, index) {
    dataArr.push({ name: value.payName, value: value.rate });
  })
  return dataArr;
}
function getBarDate(arr) {
  let date = [];
  arr.forEach((value, index) => {
    date.push(value.dTime);
  })
  return date
}
function getBarSale(arr) {
  let sale = [];
  arr.forEach((value, index) => {
    sale.push(value.totalFee);
  })
  return sale;
}
function getBarSaleMax(arr) {
  let sale = [];
  arr.forEach((value, index) => {
    sale.push(value.totalFee);
  })
  let maxSale = Math.max(...sale);
  sale.forEach((value, index) => {
    sale[index] = maxSale + 10000;
  })
  return sale;
}
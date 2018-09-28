
import * as echarts from '../../components/ec-canvas/echarts';
const app = getApp()

Page({
  data: {
    hasLogined:false,
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    dayopendata:{
      onInit: function (canvas, width, height) {
        const barChart = echarts.init(canvas, null, {
          width: width,
          height: height
        });
        canvas.setChart(barChart);
        barChart.setOption(getDayOption());

        return barChart;
      }
    },
    weekopendata:{
      pie:{
        onInit: function (canvas, width, height) {
          const barChart = echarts.init(canvas, null, {
            width: width,
            height: height
          });
          canvas.setChart(barChart);
          barChart.setOption(getDayOption());
          return barChart;
        }
      },
      bar:{
        onInit: function (canvas, width, height) {
          const barChart = echarts.init(canvas, null, {
            width: width,
            height: height
          });
          canvas.setChart(barChart);
          barChart.setOption(getBarOption(["周一", "周二", "周三", "周四", "周五", "周六", "周日"], [3020, 4800, 3600, 6050, 4320, 6200, 5050]));
          return barChart;
        }
      }
    },
    monthopendata:{
      pie: {
        onInit: function (canvas, width, height) {
          const barChart = echarts.init(canvas, null, {
            width: width,
            height: height
          });
          canvas.setChart(barChart);
          barChart.setOption(getDayOption());
          return barChart;
        },
        disableTouch:true,
      },
      bar: {
        onInit: function (canvas, width, height) {
          const barChart = echarts.init(canvas, null, {
            width: width,
            height: height
          });
          canvas.setChart(barChart);
          barChart.setOption(getBarOption(createMonthDay().date, createMonthDay().data));
          return barChart;
        },
        disableTouch: true,
      }
    }
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  }
})
function getDayOption(){
  var option = {
    backgroundColor: "#ffffff",
    color: ["#21d3a3", "#fb8b5d", "#fb5db0", "#5f8ffe"],
    tooltip : {
      trigger: 'item',
      formatter: "{b} : {d}%"
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
      
      data: [{
        value: 21,
        name: '微信支付'
      }, {
        value: 29,
        name: '支付宝支付'
      }, {
        value: 25,
        name: '银行卡支付'
      }, {
        value: 25,
        name: '其他支付'
      }
      ],
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
function getBarOption(date,saleArr) {
  var option = {
    //--------------   提示框 -----------------
    tooltip: {
      show: true,                  //---是否显示提示框,默认为true
      trigger: 'item',             //---数据项图形触发
      position:"top",
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
      axisLine:{
        show:false
      },
      axisTick: {
        show: false
      },
      axisLabel: {                 //---坐标轴 标签
        show: true,                  //---是否显示
        inside: false,               //---是否朝内
        rotate: 0,                   //---旋转角度   
        margin: 5,                  //---刻度标签与轴线之间的距离
        color:'#b3b3b3',
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
        name: '销量',             //---系列名称
        type: 'bar',                //---类型
        itemStyle: {                 //---图形形状
          color: '#3e9cfe'
        },
        data: saleArr
      }
    ]
  };
  return option;
}
function createMonthDay() {
  let daysOfMonth = [],data = [];
  let fullYear = new Date().getFullYear();
  let month = new Date().getMonth() + 1;
  let lastDayOfMonth = new Date(fullYear, month, 0).getDate();
  for (var i = 1; i <= lastDayOfMonth; i++) {
    daysOfMonth.push(month + '-' + i);
    data.push(3030);
  };
  return {date:daysOfMonth,data:data};
}
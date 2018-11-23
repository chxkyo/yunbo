const fetch = require('./utils/fetch.js');
App({
  onLaunch: function () {

  },
  fetch: fetch,
  globalData: { 
    userInfo: null,
    domain: 'https://am.tdcheck.cn/leping-portal',
    imgBaseUrl: 'https://am.tdcheck.cn/imageleping',
    iconBaseUrl:'https://ceshi.daheiniu.info/o2o/images',
    nickName:"",
    userSex:1,
    headerImg:""
  }
})
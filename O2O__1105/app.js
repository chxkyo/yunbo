
const fetch = require('./utils/fetch.js');
App({
  onLaunch: function () {

  },
  fetch: fetch,
  globalData: {
    userInfo: null,
    //domain: 'http://gw.tunnel.qydev.com/',
    domain: 'https://ceshi.daheiniu.info/snail-portal',
    imgBaseUrl: 'https://ceshi.daheiniu.info/image',
    iconBaseUrl:'https://ceshi.daheiniu.info/o2o/images',
    nickName:"",
    userSex:1,
    headerImg:""
  }
})
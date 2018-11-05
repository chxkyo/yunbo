
const fetch = require('./utils/fetch.js');
App({
  onLaunch: function () {

  },
  fetch: fetch,
  globalData: {
    userInfo: null,
    //domain: 'http://gw.tunnel.qydev.com/',
    domain: 'https://ceshi.daheiniu.info/',
    imgBaseUrl: 'https://ceshi.daheiniu.info/image',
    nickName:"",
    userSex:1,
    headerImg:""
  }
})
module.exports = function (path, params={},method = "GET") {
  let api = 'http://tdlbs.daheiniu.info/cashier-admin/miniApp';
  return new Promise((resolve, reject) => {
    wx.request({
      url: `${api}/${path}`,
      data: Object.assign({}, params),
      header: { 'Content-Type': 'application/json;charset=UTF-8', "cookie": "JSESSIONID=" + wx.getStorageSync('sessionid') },
      method:`${method}`,
      success: resolve,
      fail: reject
    })
  })
}
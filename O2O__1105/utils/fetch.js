module.exports = function (path, params={},method = "GET") {
  let api = 'https://ceshi.daheiniu.info';
  return new Promise((resolve, reject) => {
    wx.request({
      url: `${api}/${path}`,
      data: Object.assign({ userId: wx.getStorageSync('userId')}, params),
      header: { 'Content-Type':'application/json;charset=UTF-8'},
      method:`${method}`,
      success: resolve,
      fail: reject
    })
  })
}
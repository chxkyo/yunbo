module.exports = function (path, params={},method = "GET") {
  let api = 'http://pfccp6.natappfree.cc';
  return new Promise((resolve, reject) => {
    wx.request({
      url: `${api}/${path}`,
      data: Object.assign({ userId:'628800148082'}, params),
      header: { 'Content-Type':'application/json;charset=UTF-8'},
      method:`${method}`,
      success: resolve,
      fail: reject
    })
  })
}
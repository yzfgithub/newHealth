const baseUrl = 'http://182.92.230.159:81';
// const baseUrl = 'http://127.0.0.1:3001';

const handSuccess = (res, successCallback) => {
  if (res.statusCode == 200 || res.statusCode == 201) {
    successCallback(res);
  } else {
    // wx.showToast({
    //   title: '接口错误',
    // })
    successCallback(res);
  }
}

const combineRequest = (method, pathInUrl, params, successCallback) => {
  wx.showLoading({ mask: true });
  wx.request({
    url: `${baseUrl}${pathInUrl}`,
    data: params,
    header: {
      "Authorization": 'Bearer ' + wx.getStorageSync('token'),
    },
    method,
    success: (res) => {
      handSuccess(res, successCallback);
    },
    fail: (e) => {
      wx.showToast({
        title: '服务器请求错误',
      })
    },
    complete: (res) => {
      setTimeout(() => {
        wx.hideLoading();
      }, 500)
    }
  })
}

const get = (pathInUrl, params, successCallback) => {
  return combineRequest('GET', pathInUrl, params, successCallback)
}
const post = (pathInUrl, params, successCallback) => {
  return combineRequest('POST', pathInUrl, params, successCallback)
}
const put = (pathInUrl, params, successCallback) => {
  return combineRequest('PUT', pathInUrl, params, successCallback)
}

module.exports = {
  get, post, put
}
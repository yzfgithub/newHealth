//app.js
App({
  onLaunch: function () {
    wx.redirectTo({
      url: '/pages/login/login',
      // url: '/pages/report/report',
    })
  },
  globalData: {
    userInfo: null
  }
})
//app.js
App({
  onLaunch: function () {
    wx.redirectTo({
      // url: '/pages/login/login',
      url: '/pages/newReport/newReport',
    })
  },
  globalData: {
    userInfo: null
  }
})
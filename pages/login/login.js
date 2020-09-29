import api from '../../api/api.js'

Page({
  data: {
    canIUse: false,
  },
  onLoad: function (options) {
    var that = this;
    wx.getSetting({
      success: function (res) {
        if (res.authSetting['scope.userInfo']) {
          that.wxLogin();
        } else {
          that.setData({
            canIUse: true,
          })
        }
      }
    });
  },
  bindGetUserInfo: function (res) {
    if (res.detail.userInfo) {
      this.wxLogin();
    } else {
      wx.showModal({
        title: '警告',
        content: '您点击了拒绝授权，将无法进入小程序，请授权之后再进入!!!',
        showCancel: false,
        confirmText: '返回授权',
        success: function (res) {
        }
      });
    }
  },

  wxLogin() {
    let _this = this;
    wx.login({
      success: res => {
        api.login({ wxcode: res.code }, (res) => {
          wx.setStorageSync("token", res.data.data)
          setTimeout(() => {
            wx.switchTab({
              url: '../health/health',
            })
          }, 500)
        })
      },
      fail: res => {
      }
    })
  },

})
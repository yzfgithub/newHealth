//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
  },
  onLoad: function () {
  },
  showReport(){
    wx.redirectTo({
      url: '/pages/report/report',
    })
  },
})

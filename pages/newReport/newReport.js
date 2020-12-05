// pages/newReport/newReport.js
Page({

  data: {
    userName: 'yanzifeng',
  },

  onLoad: function (options) {
    const name = wx.getStorageSync('uName')
    console.log(name);
    this.setData({
      userName: name
    })
  },
})
// pages/report/report.js
import api from '../../api/api.js'

Page({

  /**
   * Page initial data
   */
  data: {
    reportDetail:[],
    name: '',
    date: '',

  },

  /**
   * Lifecycle function--Called when page load
   */
  onLoad: function (options) {
    const id = options.id || 22;
    this.getAnswerTopicsExplains(id);
    this.getAnswerTopicsDetail(id);
  },
  getAnswerTopicsExplains(id) {
    api.getAnswerTopicsExplains(id,{},(res) => {
      console.log(res)
      this.setData({
        reportDetail: res.data
      })
    })
  },
  getAnswerTopicsDetail(id) {
    api.getAnswerTopicsDetail(id,{},(res) => {
      this.setData({
          date: res.data.end_on,
          name: res.data.customer.name,
      })
    })
  },
  /**
   * Called when user click on the top right corner to share
   */
  onShareAppMessage: function () {

  }
})
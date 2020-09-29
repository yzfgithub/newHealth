// pages/report/report.js
import api from '../../api/api.js'

Page({

  /**
   * Page initial data
   */
  data: {

  },

  /**
   * Lifecycle function--Called when page load
   */
  onLoad: function (options) {
    const id = options.id || 22;
    this.getAnswerTopicsExplains(id);
  },
  getAnswerTopicsExplains(id) {
    api.getAnswerTopicsExplains(id,{},(res) => {
      console.log(res)
    })
  },
  /**
   * Called when user click on the top right corner to share
   */
  onShareAppMessage: function () {

  }
})
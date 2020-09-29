// pages/evaluationDesc/evaluationDesc.js
Page({

  /**
   * Page initial data
   */
  data: {
    titleList:[
      ['临床医⽣与功能医学专家都在使⽤的评估问卷'],
      ['只要7分钟，','六⼤系统深度评估'],
      ['系统性⽂献回顾与统合分析', '(systematic review & meta - analysis)','营养素品項推荐的有效标准'],
      ['依照美国国家科学院', '(National Academy of Sciences)', '发表的膳食营养素参考摄取量','(Dietary Reference Intakes，DRIs)'],
      ['根据健康照护研究5S理论,(Haynes, 2006),进⾏报告解读与谘询']
    ]
  },

  /**
   * Lifecycle function--Called when page load
   */
  onLoad: function (options) {

  },
  startEvaluate() {
    wx.redirectTo({
      url: '/pages/question/question',
    })
  },

  /**
   * Lifecycle function--Called when page is initially rendered
   */
  onReady: function () {

  },

  /**
   * Lifecycle function--Called when page show
   */
  onShow: function () {

  },

  /**
   * Lifecycle function--Called when page hide
   */
  onHide: function () {

  },

  /**
   * Lifecycle function--Called when page unload
   */
  onUnload: function () {

  },

  /**
   * Page event handler function--Called when user drop down
   */
  onPullDownRefresh: function () {

  },

  /**
   * Called when page reach bottom
   */
  onReachBottom: function () {

  },

  /**
   * Called when user click on the top right corner to share
   */
  onShareAppMessage: function () {

  }
})
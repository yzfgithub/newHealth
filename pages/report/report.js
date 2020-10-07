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
    const id = options.id || 23;
    // this.getAnswerTopicsExplains(id);
    this.getAnswerTopicsDetail(id);
    // this.getAnswerNutrientPromotions(id);
  },
  // getAnswerTopicsExplains(id) {
  //   api.getAnswerTopicsExplains(id,{},(res) => {
  //     console.log(res)
  //     this.setData({
  //       reportDetail: res.data
  //     })
  //   })
  // },
  getAnswerTopicsDetail(id) {
    api.getAnswerTopicsDetail(id,{},(res) => {
      console.log(res);
      this.setData({
        reportDetail: res.data.explains.map(item => {
          let arr = res.data.nutrient_promotions.filter(val => val.feature.id === item.feature.id);
          return Object.assign({},item,{
            nutrient: arr.length ? arr[0].nutrient_promotions[0] : [],
          });
        }),
        date: res.data.answer_topic.end_on || '占位abc',
        name: res.data.answer_topic.customer_name || '占位abc',
      })
      console.log(this.data.reportDetail);
    })
  },
  // getAnswerNutrientPromotions(id){
  //   api.getAnswerNutrientPromotions(id,{},(res) => {
  //     console.log(res);
  //   })
  // },
  /**
   * Called when user click on the top right corner to share
   */
  onShareAppMessage: function () {

  }
})
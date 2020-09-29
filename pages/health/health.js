//index.js
//获取应用实例
import api from '../../api/api.js'
const app = getApp()

Page({
  data: {
    productObj: [],
    healthList:[],

    // animationProgress: {},
    baseSyntaxNum: 18,
  },

  onLoad() {
    this.getTopics();
  },

  getTopics() {
    api.getProducts({}, (res) => {
      if (res.data.length) {
        this.setData({
          healthList: res.data
        })
      } else {
        wx.showToast({
          icon: 'none',
          title: '接口报错,联系客服',
        })
      }
    })
  },
  goExam(event) {
    wx.setStorageSync('questionId', event.currentTarget.dataset.id);
    wx.navigateTo({
      url: '../detail/detail',
    })
  },

  showDesc(e) {
    var bool = 'healthList[' + e.currentTarget.dataset.key + '].showDescBool';
    if(this.data.healthList[e.currentTarget.dataset.key].showDescBool) {
      this.setData({
        [bool]: false,
      })
      return;
    }
    // this.showCreateReport();
    this.setData({
      [bool]: true,
    })
  },
  //动画
  // showCreateReport() {
  //   var animation = wx.createAnimation({
  //     duration: 2000,
  //     timingFunction: 'ease'
  //   })
  //   this.animation = animation
  //   animation.height('auto').step();

  //   this.setData({
  //     animationProgress: animation.export()
  //   })
  // },

})

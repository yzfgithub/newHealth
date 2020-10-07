// pages/question/question.js
import api from '../../api/api.js'

Page({

  /**
   * Page initial data
   */
  data: {
    categoryList: [], //进度数组
    questionList: [], //题目数组
    currentCategoryNum: 0, // 当前第几套题
    currentQuestionIndex: 0, // 套题的第几道题

    isProgress: false, //进度控制器,

    isShowResult: false,

    isShowDescription: false,
    description: '',
    option: '',

    nickName: '',
    answerId: -1,
    showPrevQuestion: false,
  },

  /**
   * Lifecycle function--Called when page load
   */
  onLoad: function (options) {
    let name = wx.getStorageSync("nickname");
    let id = wx.getStorageSync('questionId');
    api.getTopicsQuestions(id,(res)=>{
      let detail = res.data;
      let questionObj = {};
      detail.forEach((item) => {
        if (questionObj[item.feature.id]) {
          questionObj[item.feature.id].list.push({
            id: item.id,
            question: item.question,
            options: item.options,
            answer: [],
            kind: item.kind,
          })
        } else {
          questionObj[item.feature.id] = {
            featureId: item.feature.id,
            featureName: item.feature.name,
            list:[
              {
                id: item.id,
                question: item.question,
                options: item.options,
                answer: [],
                kind: item.kind,
              }
            ]
          }
        }
      })
      let questionList = Object.values(questionObj);
      var list = questionList.map(item => ({ name: item.featureName, id: item.featureId }));
      this.setData({
        categoryList: list,
        questionList: questionList,
        nickName: name,
      });
    })
  },

  /**
   * Lifecycle function--Called when page is initially rendered
   */
  onReady: function () {
    this.showProgress();
    setTimeout(()=>{
      this.hideProgress();
    },3000)
  },
  showProgress(){
    this.setData({
      isProgress: true,
    })
  },
  hideProgress(){
    this.setData({
      isProgress: false,
    })
  },
  tapQuestionHandle(e) {
    var midArr = this.data.questionList[e.currentTarget.dataset.categoryNum].list[e.currentTarget.dataset.currentQuestionIndex].answer;

    if (e.currentTarget.dataset.kind === 0){
      midArr = [e.currentTarget.dataset.questionId];
    } else {
      if (midArr.includes(e.currentTarget.dataset.questionId)) {
        midArr = midArr.filter(i => i != e.currentTarget.dataset.questionId);
      } else {
        midArr.push(e.currentTarget.dataset.questionId);
      } 
    }

    var str = 'questionList[' + e.currentTarget.dataset.categoryNum + '].list[' + e.currentTarget.dataset.currentQuestionIndex + '].answer';
    this.setData({
      [str]: midArr.map(i => i),
    })
    

    if (e.currentTarget.dataset.kind === 0) {
      this.nextQuestion(e);
    }
  },
  nextQuestion(e) {
    setTimeout(() => {
      if (e.currentTarget.dataset.categoryNum === this.data.questionList.length - 1 && e.currentTarget.dataset.currentQuestionIndex === this.data.questionList[e.currentTarget.dataset.categoryNum].list.length - 1){
        this.setData({
          isShowResult: true,
        })
        this.postResultData();
        setTimeout(()=>{
          wx.redirectTo({
            url: '/pages/report/report?id=' + this.data.answerId,
          })
        },5000)
      } else if (e.currentTarget.dataset.currentQuestionIndex === this.data.questionList[e.currentTarget.dataset.categoryNum].list.length - 1) {
        // 下一个类, 过渡动画
        this.showProgress();
        setTimeout(()=>{
          this.setData({
            currentCategoryNum: this.data.currentCategoryNum + 1,
            currentQuestionIndex: 0,
            showPrevQuestion: false,
          })
        },1500)
        setTimeout(() => {
          this.hideProgress();
        }, 3000)
        this.goTop();
      } else {
        this.setData({
          currentQuestionIndex: this.data.currentQuestionIndex + 1,
          showPrevQuestion: true,
        })
        this.goTop();
      }
    },150)
  },
  postResultData() {
    //处理数据然后上报
    let result = [];
    this.data.questionList.forEach((item) => {
      item.list.forEach(val => {
        result.push({
          question_id: val.id,
          option_ids: val.answer,
        })
      })
    })
    let id = wx.getStorageSync('questionId');
    api.putTopicsAnswer(id, {answers: result},(res)=>{
      this.setData({
        answerId: res.data.id,
      })
      // console.log(res);
      // if(res.data.status === 0) {
      //   wx.redirectTo({
      //     url: '/pages/report/report?id='+res.data.id,
      //   })
      // }
    })
  },

  showDesc(e) {
    this.setData({
      isShowDescription: true,
      option: e.currentTarget.dataset.option,
      description: e.currentTarget.dataset.description,
    })
  },
  closeDesc() {
    this.setData({
      isShowDescription: false,
    })
  },
  goTop() {
    if (wx.pageScrollTo) {
      wx.pageScrollTo({
        scrollTop: 0
      })
    }
  },
  lastQuestion() {
    this.setData({
      showPrevQuestion: false,
      currentQuestionIndex: this.data.currentQuestionIndex - 1,
    })
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
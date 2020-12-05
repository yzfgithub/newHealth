import evalutionApi from '../../api/evalutionApi.js'

Page({

  /**
   * Page initial data
   */
  data: {
    isNotNewEvalute: false,
    gender: '', // 性别
    birthday: '', //日期
    height: 0,
    weight: 0,
    femaleStatus: null, // regnancy 女性怀孕...
    baseQuestion: ['gender', 'birthday', 'height', 'weight', 'regnancy'],
    currentQustion: '',
    currentIndex: 0,
    questionLength: 0,
    isProgress: false, //进度控制器,
    categoryList: [], //进度数组
    currentCategoryNum: 0, // 当前第几套题
    questionList: [], //题目数组
    currentQuestionIndex: 0, // 当前做到当前类型到第 x 道题
    progressAnimation: null, 
    tipAnimation: null,
    isShowDescription: false,
    description: '',
    option: '',
    isShowResult: false,
    postPending: false,
    currentPendingNum: 0,

      //old


    answerId: -1,
    showPrevQuestion: false,
  },

  /**
   * 初始化数据，接口根据qId判断是否完成题目..
   */
  onLoad: function (options) {
    let evalutionId = options.evalutionId;
    let isNotNewEvalute = false;
    if (evalutionId) {
      isNotNewEvalute = true;
      this.setData({
        isNotNewEvalute: isNotNewEvalute,
        evalutionId:  evalutionId,
      })
    } else {
      evalutionId = wx.getStorageSync('questionId');
      this.setData({
        evalutionId: evalutionId,
      })
    }
    this.getQuestionList(evalutionId, isNotNewEvalute);
  },

  // 单选
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
    
    if (e.currentTarget.dataset.kind === 0) { // 如果是单选，则直接下一个，否则就选择提交的时候下一个
      this.nextQuestion();
    }
  },
  // 主动触发多选  TODO 提交题目
  nextQuestion() {
    const current = this.data.questionList[e.currentTarget.dataset.categoryNum].list[this.data.currentQuestionIndex];
    const params = {
      question_id: current.id,
      answers: current.answer,
    }
    evalutionApi.updateTopicAnswer(this.data.evalutionId,params,(res) => {
      if(res.data.success) {
        const nextIndex = this.data.currentQuestionIndex + 1;
        if (e.currentTarget.dataset.categoryNum - 1 === this.data.questionLength - 1 && e.currentTarget.dataset.currentQuestionIndex === this.data.questionLength + 4){
          console.log('题目答完了...');
          this.setData({
            isShowResult: true,
          })
        } else if (!this.data.questionList[e.currentTarget.dataset.categoryNum].list[nextIndex]) {
          console.log('下一个类, 过渡动画');
          this.showProgress(this.data.currentCategoryNum);
          setTimeout(() => {
            this.setData({
              currentCategoryNum: this.data.currentCategoryNum + 1,
              currentQuestionIndex: 0,
              currentIndex: this.data.currentIndex + 1,
              showPrevQuestion: false,
            })
          }, 200)
          setTimeout(() => {
            this.hideProgress();
          }, 3000)
          this.goTop();
        } else {
          this.setData({
            currentQuestionIndex: this.data.currentQuestionIndex + 1,
            showPrevQuestion: true,
            currentIndex: this.data.currentIndex + 1,
          })
          this.goTop();
        }
      }
    })
    // setTimeout(() => {

    // },150)
  },


  // 生成报告
  finishExercise(e) {
    evalutionApi.finishTopicAnswer(this.data.evalutionId, (res) => {
      if(res.data.success) {
        this.setData({
          postPending: true,
        })
        let timer = setInterval(() => {
          if(this.data.currentPendingNum < 8) {
            this.setData({
              currentPendingNum: this.data.currentPendingNum + 1
            })
          } else {
            clearInterval(timer);
          }
        },350)
        setTimeout(() => {
          wx.redirectTo({
            url: '/pages/report/report?id=' + this.data.evalutionId,
          })
          this.waitFinish();
        },3000)
      } else {
        wx.showToast({
          icon: 'none',
          title: res.data.msg,
        })
      }
    })
  },
  waitFinish(e) {
    this.setData({
      isShowResult: false,
    })
  },


  // 上一道题
  prevQuestion() {
    this.setData({
      currentIndex: this.data.currentIndex - 1,
    })
    if(this.data.questionList[this.data.currentCategoryNum].list[this.data.currentQuestionIndex - 1].kind === 0){
      var str = 'questionList[' + this.data.currentCategoryNum + '].list[' + (this.data.currentQuestionIndex - 1) + '].answer';
      this.setData({
        [str]: [],
      })
    }
    if(this.data.currentQuestionIndex - 1 === 0) {
      this.setData({
        showPrevQuestion: false,
        currentQuestionIndex: this.data.currentQuestionIndex - 1,
      })
    } else {
      this.setData({
        currentQuestionIndex: this.data.currentQuestionIndex - 1,
      })
    }
  },


  // 显示提示说明
  showDesc(e) {
    this.setData({
      isShowDescription: true,
      option: e.currentTarget.dataset.option,
      description: e.currentTarget.dataset.description,
    })
    setTimeout(() => {
      var animation = wx.createAnimation({
        duration: 200,
      })
      animation.width(this.rpxTorpx(614)).step();
      this.setData({tipAnimation:animation.export()})
    },500)
  },
  closeDesc(e) {
    var animation = wx.createAnimation({
      duration: 200,
    })
    animation.width(this.rpxTorpx(0)).step();
    this.setData({tipAnimation:animation.export()})
    setTimeout(() => {
      this.setData({
        isShowDescription: false,
      })
    },500)
  },


  // 基本信息选择
  selectGender(e) {
    this.setData({
      gender: e.target.dataset.gender,
    })
    const params = {
      gender: e.target.dataset.gender === 'male' ? 0 : 1
    }
    setTimeout(() => {
      this.baseInfoNextFun(params);
    },200)
  },
  bindAgeChange(e) {
    this.setData({
      birthday: e.detail.value.replace(/\-/g, '/'),
    })
  },
  submitBirthday(e) {
    if(this.data.birthday === '') {
      wx.showToast({
        icon: 'none',
        title: '请选择出生日期',
      })
      return false;
    }
    const params = {
      birthday: this.data.birthday
    }
    this.baseInfoNextFun(params);
  },
  heightInput(e) {
    this.setData({
      height: e.detail.value,
    })
  },
  submitHeight() {
    if(this.data.height === 0) {
      wx.showToast({
        icon: 'none',
        title: '请填写身高',
      })
      return false;
    }
    const params = {
      height: parseInt(this.data.height)
    }
    this.baseInfoNextFun(params);
  },
  weightInput(e) {
    this.setData({
      weight: e.detail.value,
    })
  },
  submitWeight() {
    if(this.data.weight === 0) {
      wx.showToast({
        icon: 'none',
        title: '请填写体重',
      })
      return false;
    }
    const params = {
      weight: parseInt(this.data.weight)
    }
    this.baseInfoNextFun(params);
  },
  selectFemaleStatus(e) {
    this.setData({
      femaleStatus: e.currentTarget.dataset.status,
    })
    const params = {
      femaleStatus: parseInt(e.currentTarget.dataset.status)
    }
    setTimeout(() => {
      this.baseInfoNextFun(params);
    },200)
  },
  baseInfoNextFun(param) {
    evalutionApi.updateUserInfo(this.data.evalutionId,param,(res) => {
      if(res.data.success) {
        const currentIdx = this.data.currentIndex;
        if (this.data.gender === 'male' && currentIdx === 3) {
          this.showProgress(0);
          this.setData({
            currentQustion: "other",
            currentIndex: 5,
          })
          this.goTop();
          setTimeout(() => {
            this.setData({
              currentCategoryNum: 1
            })
          },1000)
          setTimeout(() => {
            this.hideProgress();
          },3000)
        } else {
          if(this.data.currentIdx === 4) {
            this.showProgress(0);
            setTimeout(() => {
              this.setData({
                currentCategoryNum: 1
              })
            },1000)
            setTimeout(() => {
              this.hideProgress();
            },3000)
          }
          this.setData({
            currentQustion: currentIdx + 1 <= 4 ? this.data.baseQuestion[currentIdx + 1] : 'other',
            currentIndex: currentIdx + 1,
          })
          this.goTop();
        }

      } else {
        wx.showToast({
          icon: 'none',
          title: res.data.msg,
        })
      }
    })
  },




  // 获取题目列表
  getQuestionList(id, isNotNewEvalute) {
    evalutionApi.getTopicsQuestions(id,(res)=>{
      if(!res.data.success) {
        wx.showToast({
          icon: 'none',
          title: '接口报错',
        })
        return false;
      }
      let detail = res.data.data;
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
      let questionLength = 0;
      questionList.forEach(val => {
        questionLength += val.list.length;
      })
      list.unshift({name: '基本信息', id: -2})
      this.setData({
        categoryList: list,
        questionList: questionList,
        questionLength: questionLength + 5,
      });
      console.log(this.data.questionList, 'TODO')

      if(isNotNewEvalute){
        let num = 0;
        let flag = false;
        questionList.forEach((item, key) => {
          if(flag) {
            return false;
          }
          item.forEach(val=> {
            if(val.isSelected) {
              num += 1;
            } else {
              flag = true;
              this.setData({
                currentCategoryNum: key + 1
              })
              return false;
            }
          })
        })
        this.setData({
          currentQustion: 'other',
          currentIndex: num + 5,
        })
      } else {
        this.setData({
          currentQustion: 'gender',
          currentIndex: 0,
        })
      }
    })
  },


  // 进度动画
  showProgress(n){
    this.setData({
      isProgress: true,
    })
    if(n == 0) {
      return false;
    }
    setTimeout(() => {
      var animation = wx.createAnimation({
        duration: 1000,
      })
      animation.translate(0, -1 * this.rpxTorpx(280 * (this.data.currentCategoryNum - 1) + 20)).step()
      this.setData({progressAnimation:animation.export()})
    },1000)
  },
  hideProgress(){
    this.setData({
      isProgress: false,
    })
  },


  // 滚动到顶部
  goTop() {
    if (wx.pageScrollTo) {
      wx.pageScrollTo({
        scrollTop: 0
      })
    }
  },
  // rpx => px
  rpxTorpx(rpx){
    let deviceWidth = wx.getSystemInfoSync().windowWidth;	//获取设备屏幕宽度
    let px = (deviceWidth/750)*Number(rpx);
    return px;
  },


})
import evalutionApi from '../../api/evalutionApi.js'

Page({

  data: {
    type: 'info',
    name: '',
    topic_id: 0,
  },
  onLoad: function (options) {
    let name = wx.getStorageSync("nickname");
    let topic_id = options.topic_id || 2;
    this.setData({
      name: name,
      topic_id: topic_id,
    })
  },
  beginExercise() {
    if(this.data.type === 'info') {
      this.setData({
        type: 'name',
      })
    } else {
      let nameStr = this.data.name.replace(/(^\s*)|(\s*$)/g, "");
      let filterBlank = nameStr.replace(/\s/g, "");
      let reg = /^([\u4e00-\u9fa5]+|[a-zA-Z0-9]+)$/
      if(!reg.test(filterBlank)) {
        wx.showToast({
          icon: 'none',
          title: '用户名不能包含特殊字符!',
        })
        return false;
      }
      wx.setStorage({
        key: "uName",
        data: nameStr,
      })
      evalutionApi.createEvalution({name:nameStr, topic_id: this.data.topic_id}, (res) => {
        console.log(res);
        if(res.data.success) { //?evalutionId=${res.data}
        wx.setStorage({
          key: 'questionId',
          data: res.data.data.id,
        });
          wx.navigateTo({
            url: '/pages/exerciseTopics/exerciseTopics',
          })
        } else {
          wx.showToast({
            title: res.msg,
          })
        }
      });
    }
  },
  userNameInput(e) {
    this.setData({
      name: e.detail.value
    })
  },

})
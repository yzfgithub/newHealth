import WxValidate from '../../utils/WxValidate.js';
import api from '../../api/api.js';


const app = getApp();

Page({
  data: {
    birth_date: undefined, // 默认不选择出生日期

    //init
    saveName: '',
    saveHeight: '',
    saveWeight: '',
    saveJob: '',
    saveGender: null,
    savePregnant: "0",
    showPregnant: false,

  },
  onLoad(options) {
    let isIphoneX = app.globalData.isIphoneX;
    this.setData({
      isIphoneX: isIphoneX
    })
    const that = this;
    const rules = {
      name: {
        required: true,
      },
      sex: {
        required: true,
      },
      birth: {
        required: true,
      },
      height:{
        required: true,
      },
      weight: {
        required: true,
      },
    };
    // 验证字段的提示信息，若不传则调用默认的信息
    const messages = {
      name: {
        required: "请输入姓名",
      },
      sex: {
        required: "请选择性别",
      },
      birth: {
        required: "请选择出生年月",
      },
      height: {
        required: "请输入身高",
      },
      weight: {
        required: "请输入体重",
      },
    };
    // 创建实例对象
    this.WxValidate = new WxValidate(rules, messages);

    this.getUserInfo();
  }, 

  getUserInfo() {
    api.getUserInfo({}, (res) => {
      //初始化
      console.log(res.data);
      let detail = res.data;
      this.setData({
        saveName: detail.name,
        saveHeight: detail.height,
        saveWeight: detail.weight,
        // saveJob: detail.job,
        saveGender: detail.sex,
        birth_date: detail.birth,
        savePregnant: detail.is_pregnant || null,
      })
      if (detail.sex == '2') {
        this.setData({
          showPregnant: true,
        })
      }
    })
  },
  genderChange(e) {
    console.log(e.detail.value)
    if (e.detail.value == 1) {
      // hide
      this.setData({
        showPregnant: false,
      })
    } else {
      // show
      this.setData({
        showPregnant: true,
        savePregnant: "0",
      })
    }
  },
  bindAgeChange(e) {
    this.setData({
      birth_date: e.detail.value,
    });
  },
  formSubmit(e) {
    if (!this.WxValidate.checkForm(e)) {
      const error = this.WxValidate.errorList[0];
      wx.showToast({
        title: `${error.msg} `,
        icon: 'none',
        duration: 1000,
      });
      return false;
    }
    let param = e.detail.value;
    if (param.sex == '2' && param.is_pregnant == '') {
      wx.showToast({
        title: '请选择是否怀孕',
        icon: 'none',
        duration: 1000,
      });
      return false;
    }
    api.updateUserInfo(param, (res) => {
      wx.setStorageSync("nickname", res.data.nickname);
      wx.redirectTo({
        url: '/pages/question/question',
      })
    })
  },

  onShareAppMessage() {
    return {
      title: '原来音乐系同学兼职这么容易？',
      imageUrl: '../../images/job.jpg',
    };
  },
});

// pages/newReport/newReport.js
import evalutionApi from '../../api/evalutionApi.js'

Page({

  data: {
    reportId: '',
    userName: 'yanzifeng',
    // grade 1: 轻， 2:中， 3:高
    reportDetail:{
      result: '您身体健康状态目前可能有严重肾上腺疲劳的迹象，可能处于在肾上腺失衡之第三期耗竭期、肠道中有中度小肠箘群过度生长与中度肠漏现象，轻度忧郁的情形，以及些许失眠的问题。 依据您身体健康结果，跟您的生活型态、饮食方式息息相关，您的核心营养素推荐主要以调节肾上腺疲劳 Adreset、改善肠道箘群，增强肠道健康 Ultra Flora Balance、维持雌激素正确代谢路径 DIM-EVAIL、改善睡眠品质 SeroSyn，为此，欢迎参考您的整体营养素推荐清单。',
      reportAnalytics:[
        {
          name:'壓力指數',
          subName:'小腸箘群過度生長',
          text:'您压力指数，目前可能有严重肾上腺疲劳迹象，可能处于在肾上腺失衡之第三期耗竭期，肾上腺的崩溃，此时您会时常有反复性的感冒（免疫系统严重损害）、感到即使以补眠仍然有很大的疲劳感、无精打采、心情郁闷、身体自由基大量产生，导致癌症与自体免疫疾病出现。目前因症状严重，对于您的整体健康非常不理想，请谘询医疗相关人士，协助您尽快找出压力来源。',
          grade: 1,
          total: 100,
          score: 50,
          nutrients:[
            {name:'血清素 Serotonin', text: '血清素除了帮助睡眠的效果，还有针对抵抗忧郁情绪的效果', desc:  '已有294人在小润的建议下服用并提升抗压能力'},
            {name:'血清素 Serotonin', text: '血清素除了帮助睡眠的效果，还有针对抵抗忧郁情绪的效果', desc:  '已有294人在小润的建议下服用并提升抗压能力'},
          ],
        },
      ],
      otherAnalytics:[
        {
          name: '提升免疫力',
          recommend: '您的蔬果摄取每日 0-1份，蔬果建议量每日至少3份以上',
          text: '植化素源自我们每日摄取的蔬果，不同颜色的蔬果会提供不同成份的植化素，植化素除了可以帮助调节肠道箘群外，还可以帮助身体提供抗发炎能力，除此之外，植化素也可以对抗以下疾病：肠躁症、大肠癌、发炎性结肠炎、肥胖以及代谢症候群（就是血糖血压高还有中广身材）。',
          nutrients:[
            {name:'血清素 Serotonin', text: '血清素除了帮助睡眠的效果，还有针对抵抗忧郁情绪的效果', desc:  '已有294人在小润的建议下服用并提升抗压能力'},
            {name:'血清素 Serotonin', text: '血清素除了帮助睡眠的效果，还有针对抵抗忧郁情绪的效果', desc:  '已有294人在小润的建议下服用并提升抗压能力'},
          ],
        },
        {
          name: '提升免疫力',
          recommend: '您的蔬果摄取每日 0-1份，蔬果建议量每日至少3份以上',
          text: '植化素源自我们每日摄取的蔬果，不同颜色的蔬果会提供不同成份的植化素，植化素除了可以帮助调节肠道箘群外，还可以帮助身体提供抗发炎能力，除此之外，植化素也可以对抗以下疾病：肠躁症、大肠癌、发炎性结肠炎、肥胖以及代谢症候群（就是血糖血压高还有中广身材）。',
          nutrients:[
            {name:'血清素 Serotonin', text: '血清素除了帮助睡眠的效果，还有针对抵抗忧郁情绪的效果', desc:  '已有294人在小润的建议下服用并提升抗压能力'},
          ],
        },
      ]
    },
  },

  onLoad: function (options) {
    const name = wx.getStorageSync('uName')
    console.log(name);
    this.setData({
      userName: name
    })
    this.getReport(options.reportId);
  },
  getReport(id) {
    // evalutionApi.getReport(id, (res) => {
    //   console.log(res);
    // })
  }
})
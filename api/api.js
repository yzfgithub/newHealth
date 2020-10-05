import { get, post, put } from './apiConfig.js'

export default {
  // 获取我的测评表
  getAnswerTopics(params, callback) {
    return get('/v1/answer_topics', params, callback);
  },
  // 获取某个评测的题目
  getAnswerTopicsQuestions(id, params, callback) {
    return get(`/v1/answer_topics/${id}/questions`, params, callback);
  },
  // 获取某个评测的回答
  getAnswerTopicsAnswers(id, params, callback) {
    return get(`/v1/answer_topics/${id}/answers`, params, callback);
  },
  // 某个评测回答某一项
  postAnswerTopicsAnswers(id, params, callback) {
    return post(`/v1/answer_topics/${id}/answer`, params, callback);
  },
  // 重置问卷
  updateAnswerTopicsReset(params, callback) {
    return put('/v1/answer_topics/reset', params, callback);
  },
  // get phone
  getPhoneByWechat(params, callback) {
    return put('/v1/customers/phone', params, callback);
  },
  // code
  putVerifyCode(params, callback) {
    return put('/v1/codes/verify', params, callback);
  },
  //pay
  postOrder(params, callback) {
    return post('/v1/orders', params, callback);
  },
  // produce
  getProducts(params, callback) {
    return get('/v1/topics', params, callback);
  },

  // new

  // 登录操作
  login(params, callback) {
    return post('/v1/logins/login', params, callback);
  },
  // 获取用户信息
  getUserInfo(params, callback) {
    return get('/v1/customers/info', params, callback);
  },
  // 更新用户信息
  updateUserInfo(params, callback) {
    return put('/v1/customers/update', params, callback);
  },
  // 获取问题列表
  getTopicsQuestions(id, callback) {
    return get(`/v1/topics/${id}/questions`, {}, callback);
  },
  // 提交选项
  putTopicsAnswer(id, params, callback) {
    return post(`/v1/topics/${id}/answer`, params, callback);
  },
  // 某个评测报告
  getAnswerTopicsExplains(id, params, callback) {
    return get(`/v1/answer_topics/${id}/explains`, params, callback);
  },
  // 某个评测报告
  getAnswerTopicsDetail(id, params, callback) {
    return get(`/v1/answer_topics/${id}`, params, callback);
  },
  // 某个评测报告推荐补品
  // getAnswerNutrientPromotions(id, params, callback) {
  //   return get(`/v1/answer_topic/${id}/nutrient_promotions`, params, callback);
  // },
}
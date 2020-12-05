import { get, post, put } from './apiConfig.js'

export default {
  createEvalution(params, callback) {
    return post('/v1/answer_topics', params, callback);
  },
  getTopicsQuestions(id, callback) {
    return get(`/v1/answer_topics/${id}/questions`, {}, callback);
  },
  // 更新用户信息
  updateUserInfo(id, params, callback) {
    return put(`/v1/answer_topics/${id}`, params, callback);
  },
  // 提交单个测评结果
  updateTopicAnswer(id, params, callback) {
    return put(`/v1/answer_topics/${id}/answer`, params, callback);
  },
  // 完成
  finishTopicAnswer(id, callback) {
    return put(`/v1/answer_topics/${id}/finish`, {}, callback);
  },
}
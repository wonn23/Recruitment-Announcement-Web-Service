import { db } from '../dbIndex.js';

const ApplicationModel = {
  // 해당 채용공고에 지원하기
  create: async ({ userId, postId, status, resume, dateApplied }) => {
    try {
      return await db.Application.create({ userId, postId, status, resume, dateApplied });
    } catch (error) {
      console.error(error)
    }
  },
  // postId에 해당하는 지원서 조회
  getPostById: async ({ postId }) => {
    try {
      return await db.Application.findOne({
        where: { postId }
      })
    } catch (error) {
      console.error(error)
    }
  }
};

export { ApplicationModel };

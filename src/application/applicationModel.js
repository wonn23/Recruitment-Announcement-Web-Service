import { db } from '../dbIndex.js';

const ApplicationModel = {
  // 해당 채용공고에 지원하기
  create: async ({ newApplicationData }) => {
    return await db.Application.create(newApplicationData);
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

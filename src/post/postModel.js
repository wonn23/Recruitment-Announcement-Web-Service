import { db } from '../dbIndex.js';
import { Op } from 'sequelize';

const PostModel = {
  // 채용공고 등록
  create: async ({ newPostData }) => {
    return await db.Post.create(newPostData);
  },
  // 채용공고 목록 가져오기, 제목, 채용내용, 채용포지션, 사용기술 검색 가능
  getAllPosts: async (search) => {
    const whereCondition = {
      // 여기에 검색 조건을 추가합니다.
      [Op.or]: [
        { title: { [Op.like]: `%${search}%` } },
        { description: { [Op.like]: `%${search}%` } },
        { position: { [Op.like]: `%${search}%` } },
        { skill: { [Op.like]: `%${search}%` } }
      ],
    };

    const posts = await db.Post.findAll({
      where: whereCondition
    });
    return posts
  },
  // 채용 상세페이지 가져오기, 해당 회사의 다른 채용공고 조회 가능
  getPostById: async (postId) => {
    try {
      return await db.Post.findByPk(postId, {
        include: [
          {
            model: db.Company,
            include: [
              {
                model: db.Post,
                attributes: ['id'],
                where: {
                  id: { [Op.ne]: postId }, // 현재 postId를 제외한 다른 채용공고 id
                },
              },
            ],
          },
        ],
      });
    } catch (error) {
      console.error(error)
    }
  },
  // 채용공고 삭제
  delete: async postId => {
    await db.Post.destroy({
      where: { id: postId },
    });
  },
  // 채용공고 수정
  update: async ({ postId, toUpdate }) => {
    return await db.Post.update(
      { toUpdate },
      {
        where: { id: postId },
      },
    );
  },
};

export { PostModel };

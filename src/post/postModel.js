import { db } from '../dbIndex.js';
import { Op } from 'sequelize';

const PostModel = {
  create: async ({ newPostData }) => {
    return await db.Post.create(newPostData);
  },
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
                  companyId: db.Sequelize.literal('`Company`.`id`'), // 현재 조회 중인 채용공고의 회사 ID
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
  delete: async postId => {
    await db.Post.destroy({
      where: { id: postId },
    });
  },
  update: async ({ transaction, postId, toUpdate }) => {
    return await db.Post.update(
      { toUpdate },
      {
        where: { id: postId },
        transaction,
      },
    );
  },
};

export { PostModel };

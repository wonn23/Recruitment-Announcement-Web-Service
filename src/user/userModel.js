import { db } from '../dbIndex.js';
const UserModel = {
  // email로 유저 찾아내기(email 중복 확인)
  findByEmail: async email => {
    const user = await db.User.findOne({
      where: {
        email,
        isDeleted: 0,
      },
    });
    return user;
  },
  findByNickname: async nickname => {
    const user = await db.User.findOne({
      where: {
        nickname,
        isDeleted: 0,
      },
    });
    return user;
  },
  // userId 검색해서 유저 찾기
  findById: async userId => {
    const user = await db.User.findOne({
      where: {
        userId,
      },
    });
    return user;
  },
  // 로그인한 유저가 작성한 게시글 찾기
  findMyPosts: async userId => {
    return await db.Post.findAll({
      where: {
        userId,
      },
      include: [
        {
          model: db.PostFile,
          attributes: ['postId', 'fileId'],
          include: [{ model: db.File, attributes: ['url'], where: { category: 'post' } }],
        },
      ],
    });
  },
};

export { UserModel };

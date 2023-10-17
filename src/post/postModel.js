import { db } from '../dbIndex.js';

const PostModel = {
  create: async ({ newPostData }) => {
    return await db.Post.create(newPostData);
  },
  getAllPosts: async () => {
    return await db.Post.findAll();
  },
  getPostById: async (postId) => {
    return await db.Post.findByPk(postId);
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

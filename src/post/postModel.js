import { db } from '../index.js';

const PostModel = {
  create: async ({ newPost }) => {
    return await db.Post.create(newPost);
  },
  getAllPosts: async () => {
    return await db.Post.findAndCountAll({
      order: [
        ['createdAt', 'DESC'],
        ['postId', 'DESC'],
      ],
    });

  },
  getPostById: async ({ postId }) => {
    return await db.Post.findOne({
      where: { postId },
    });
  },
  delete: async postId => {
    await db.Post.destroy({
      where: { postId },
    });
  },
  update: async ({ transaction, postId, fieldToUpdate, newValue }) => {
    return await db.Post.update(
      { [fieldToUpdate]: newValue },
      {
        where: { postId },
        transaction,
      },
    );
  },
};

export { PostModel };

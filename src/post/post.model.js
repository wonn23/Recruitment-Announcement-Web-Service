import { db } from '../index.js';

const PostModel = {
  create: async ({ newPost }) => {
    return await db.Post.create(newPost);
  },
  getAllPosts: async ({ offset, limit }) => {
    const { count, rows: posts } = await db.Post.findAndCountAll({
      offset,
      limit,
      distinct: true,
      order: [
        ['createdAt', 'DESC'],
        ['postId', 'DESC'],
      ],
    });
    return { total: count, posts };
  },
  getPostById: async postId => {
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
    const updatePost = await db.Post.update(
      { [fieldToUpdate]: newValue },
      {
        where: { postId },
        transaction,
      },
    );
    return updatePost;
  },
};

export { PostModel };

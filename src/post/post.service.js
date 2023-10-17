import { PostModel } from '../post/post.model'
import { UserModel } from '../user/users.model.js'
import { db } from '../db/index.js';
import {
  ConflictError,
  BadRequestError,
  InternalServerError,
  NotFoundError,
  UnauthorizedError,
} from '../middlewares/errorMiddleware.js';
import { checkAccess, throwNotFoundError } from '../utils/commonFunctions.js';
import { fieldsToUpdate } from '../utils/postFunctions.js';

const postService = {
  // 채용공고 생성
  createPost: async ({ userId, newPost }) => {
    try {
      const { ...postInfo } = newPost;
      const user = await UserModel.findById(userId);
      throwNotFoundError(user, '유저');

      const post = await PostModel.create({ newPost: { transaction, userId, ...postInfo } });

    } catch (error) {
      if (error instanceof UnauthorizedError) {
        throw error;
      } else {
        throw new InternalServerError('게시물 작성을 실패했습니다.');
      }
    }
  },
  getAllPosts: async ({ page, perPage, type }) => {
    try {
      const offset = (page - 1) * perPage;
      const limit = perPage;
      if (type) {
        // 카테고리별 게시글 조회
        const { total, posts } = await PostModel.getFilteredPosts({ offset, limit, type });
        return { message: '카테고리별 게시글 조회를 성공했습니다.', total, posts };
      } else {
        // 전체 게시글 조회
        const { total, posts } = await PostModel.getAllPosts({ offset, limit });
        return { message: '게시글 전체 조회를 성공했습니다.', total, posts };
      }
    } catch (error) {
      if (error) {
        throw new InternalServerError('게시물 전체 조회를 실패했습니다.');
      }
    }
  },
  getPost: async postId => {
    try {
      const post = await PostModel.getPostById(postId);
      throwNotFoundError(post, '게시글');

      return {
        message: '게시글 조회를 성공했습니다.',
        post,
      };
    } catch (error) {
      if (error instanceof NotFoundError) {
        throw error;
      } else {
        throw new InternalServerError('게시물 조회를 실패했습니다.');
      }
    }
  },
  deletePost: async ({ userId, postId }) => {
    try {
      const post = await PostModel.getPostById(postId);

      throwNotFoundError(post, '게시글');
      checkAccess(post.userId, userId, '삭제');

      await PostModel.delete(postId);
      return { message: '게시글 삭제를 성공했습니다.' };
    } catch (error) {
      if (error instanceof ConflictError || error instanceof NotFoundError) {
        throw error;
      } else {
        throw new InternalServerError('게시글 삭제를 실패했습니다.');
      }
    }
  },
  setPost: async ({ userId, postId, toUpdate }) => {
    const transaction = await db.sequelize.transaction({ autocommit: false });
    try {
      let post = await PostModel.getPostById(postId);
      throwNotFoundError(post, '게시글');
      checkAccess(userId, post.userId, '게시글 수정');

      const { postImage, ...updateValue } = toUpdate;
      compareTotalRecrutied(post, updateValue);

      for (const [field, fieldToUpdate] of Object.entries(fieldsToUpdate)) {
        if (toUpdate[field]) {
          const newValue = updateValue[field]; //{"title": "수정"}
          await PostModel.update({ postId, fieldToUpdate, newValue, transaction });
        }
      }

      if (post.PostFiles.length > 0 && postImage) {
        const fileExtension = extensionSplit(postImage[1]);
        await FileModel.updatePostImage(
          postImage[0], // category
          postImage[1], // url
          fileExtension,
          postId,
          transaction,
        );
      }

      if (post.PostFiles.length == 0 && postImage) {
        const fileExtension = extensionSplit(postImage[1]);
        await FileModel.createPostImage(
          postImage[0], // category
          postImage[1], // url
          fileExtension,
          postId,
          transaction,
        );
      }

      await transaction.commit();
      return { message: '게시글 수정을 성공했습니다.' };
    } catch (error) {
      if (transaction) {
        await transaction.rollback();
      }
      if (error instanceof ConflictError || error instanceof NotFoundError || error instanceof BadRequestError) {
        throw error;
      } else {
        throw new InternalServerError('게시글 수정을 실패했습니다.');
      }
    }
  },
};

export { postService };

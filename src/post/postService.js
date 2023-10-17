import { PostModel } from './postModel.js'
import { UserModel } from '../user/userModel.js'
import { db } from '../dbIndex.js';
import {
  ConflictError,
  BadRequestError,
  InternalServerError,
  NotFoundError,
  UnauthorizedError,
} from '../middlewares/errorMiddleware.js';
import { checkAccess, throwNotFoundError } from '../utils/commonFunctions.js';

const postService = {
  // 채용공고 생성
  createPost: async ({ newPostData }) => {
    try {
      const post = await PostModel.create({ newPostData });

      return { message: '게시글 생성에 성공했습니다.', post };
    } catch (error) {
      if (error instanceof UnauthorizedError) {
        throw error;
      } else {
        throw new InternalServerError('게시물 작성을 실패했습니다.');
      }
    }
  },
  // 모든 채용공고 조회
  getAllPosts: async () => {
    try {
      const posts = await PostModel.getAllPosts();
      return { message: '게시글 전체 조회를 성공했습니다.', posts };
    } catch (error) {
      if (error) {
        throw new InternalServerError('게시물 전체 조회를 실패했습니다.');
      }
    }
  },
  // 채용공고 하나 상세보기
  getPost: async ({ postId }) => {
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
  // 채용공고 삭제
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
  // 채용공고 수정
  updatePost: async ({ postId, toUpdate }) => {
    const transaction = await db.sequelize.transaction({
      autocommit: false,
      isolationLevel: db.Sequelize.Transaction.ISOLATION_LEVELS.READ_COMMITTED
    });
    try {
      let post = await PostModel.getPostById(postId);
      throwNotFoundError(post, '게시글');

      const updatedPost = await post.update(toUpdate, { transaction });

      await transaction.commit();

      return { message: '게시글 수정을 성공했습니다.', updatedPost };
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

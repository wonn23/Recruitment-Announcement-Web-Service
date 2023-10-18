import { PostModel } from './postModel.js'
import { ApplicationModel } from '../application/applicationModel.js';
import {
  ConflictError,
  InternalServerError,
  NotFoundError,
  UnauthorizedError
} from '../middlewares/errorMiddleware.js';
import { checkAccess, throwNotFoundError, throwFoundError } from '../utils/commonFunctions.js';
import { modifyPostObject } from './utils/postFunctions.js';

const postService = {
  // 채용공고 생성
  createPost: async ({ newPostData }) => {
    try {
      const post = await PostModel.create({ newPostData });

      return { message: '게시글 생성에 성공했습니다.', post };

    } catch (error) {
      throw new InternalServerError('게시물 작성을 실패했습니다.');
    }
  },
  // 해당 채용공고에 지원서 제출
  submitApplication: async ({ userId, postId, newApplicationData }) => {
    try {
      const post = await PostModel.getPostById(postId);
      throwNotFoundError(post, '게시글');

      let application = await ApplicationModel.getPostById(postId);
      throwFoundError(application, '지원서')

      const status = newApplicationData.status
      const resume = newApplicationData.resume
      const dateApplied = newApplicationData.dateApplied

      application = await ApplicationModel.create({ userId, postId, status, resume, dateApplied })

      return { message: '해당 채용공고에 지원하였습니다.', application }
    } catch (error) {
      if (error instanceof ConflictError || error instanceof UnauthorizedError || error instanceof NotFoundError) {
        throw error;
      } else {
        throw new InternalServerError('해당 채용공고에 지원을 실패했습니다.');
      }
    }
  },
  // 모든 채용공고 조회
  getAllPosts: async (search) => {
    try {
      const posts = await PostModel.getAllPosts(search);

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
      const modifiedPost = modifyPostObject(post)

      return {
        message: '게시글 조회를 성공했습니다.',
        post: modifiedPost,
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
      if (error instanceof UnauthorizedError || error instanceof NotFoundError) {
        throw error;
      } else {
        throw new InternalServerError('게시글 삭제를 실패했습니다.');
      }
    }
  },
  // 채용공고 수정
  updatePost: async ({ userId, postId, toUpdate }) => {
    try {
      const post = await PostModel.getPostById(postId);
      throwNotFoundError(post, '게시글');
      checkAccess(post.userId, userId, '수정');

      const updatedPost = await post.update(toUpdate);

      return { message: '게시글 수정을 성공했습니다.', updatedPost };
    } catch (error) {
      if (error instanceof UnauthorizedError || error instanceof NotFoundError) {
        throw error;
      } else {
        throw new InternalServerError('게시글 수정을 실패했습니다.');
      }
    }
  },
};

export { postService };

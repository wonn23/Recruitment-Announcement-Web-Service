import { Router } from 'express';
import { postController } from '../postController.js';
// import { getPostValidate, setPostValidationRules, setPostValidate, createPostValidate, createPostValidationRules, postParamsValidate } from '../validations/validations'

const postRouter = Router();

// 채용 공고 등록
postRouter.post('/', postController.createPost);

// 채용 공고 지원
postRouter.post('/:postId/application', postController.submitApplication);

// 채용 공고 목록 조회(검색 가능)
postRouter.get('/', postController.getAllPosts);

// 채용 공고 상세 페이지 조회(같은 회사의 다른 채용 공고 조회 가능)
postRouter.get('/:postId', postController.getPost);

// 채용 공고 수정
postRouter.put('/:postId', postController.updatePost);

// 채용 공고 삭제
postRouter.delete('/:postId', postController.deletePost);

export { postRouter };

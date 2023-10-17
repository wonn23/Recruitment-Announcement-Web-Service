import { Router } from 'express';
import { postController } from '../postController.js';
// import { getPostValidate, setPostValidationRules, setPostValidate, createPostValidate, createPostValidationRules, postParamsValidate } from '../validations/validations'

const postRouter = Router();

// 게시글 작성
postRouter.post('/', postController.createPost);

// 전체 게시글 조회
postRouter.get('/', postController.getAllPosts);

// 게시글 개별 조회
postRouter.get('/:postId', postController.getPost);

// 게시글 수정
postRouter.put('/:postId', postController.updatePost);

// 게시글 삭제
postRouter.delete('/:postId', postController.deletePost);

export { postRouter };

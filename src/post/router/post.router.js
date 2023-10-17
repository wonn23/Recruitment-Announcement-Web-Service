import { Router } from 'express';
import { postController } from '../post.controller';
import { getPostValidate, setPostValidationRules, setPostValidate, createPostValidate, createPostValidationRules, postParamsValidate } from '../validations/validations'


const postRouter = Router();

// 게시글 작성
postRouter.post('/', createPostValidationRules, createPostValidate, postController.createPost);

// 전체, 카테고리별 게시글 시간순 조회
postRouter.get('/', getPostValidate, postController.getAllPosts);

// 게시글 개별 조회
postRouter.get('/:postId', postParamsValidate, postController.getPost);

// 게시글 수정
postRouter.put('/:postId', postParamsValidate, setPostValidationRules, setPostValidate, postController.setPost);

// 게시글 삭제
postRouter.delete('/:postId', postParamsValidate, postController.deletePost);

export { postRouter };
// 포스트 테이블 -> 포스트의 id -> 신청하기
// -> 누른 유저의 id 이것을 테이블 저장해 -> 신청인원 리스트 테이블 -> 수락
// -> 모집 테이블 -> 모집인원 = 유저수 -> 모집완료 반환( true or false)

// 신청(전체 인원) 테이블 -> 수락 or 거절 -> 거절이면 신청 테이블에서 삭제
// 모집(완료) 테이블 -> 수락누른사람 여기에 쌓여 -> 모집인원 = 유저수 -> 모집완료 (true or false)

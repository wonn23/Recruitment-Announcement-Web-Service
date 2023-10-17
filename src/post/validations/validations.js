import { BadRequestError } from "../../middlewares/errorMiddleware"
import { validationResult, body } from 'express-validator';
import { BadRequestError } from './errorMiddleware.js';

const getPostValidate = (req, res, next) => {
  const page = parseInt(req.query.page || 1);
  const perPage = parseInt(req.query.perPage || 5);

  if (isNaN(perPage) || isNaN(page)) {
    throw new BadRequestError('유효한 페이지네이션 파라미터를 제공해주세요.');
  }

  next();
};

const setPostValidationRules = [
  body('post_title')
    .optional()
    .notEmpty()
    .withMessage('제목을 입력하세요.')
    .isLength({ max: 100 })
    .withMessage('게시글 제목은 100자 이내로 작성해주세요.'),
  body('post_content')
    .optional()
    .notEmpty()
    .withMessage('내용을 입력하세요.')
    .isLength({ max: 200 })
    .withMessage('게시글 내용은 200자 이내로 작성해주세요'),
  body('post_type')
    .optional()
    .notEmpty()
    .withMessage('모임의 목적을 입력하세요.')
    .custom(value => {
      if (!allowedPostTypes.includes(value)) {
        throw new BadRequestError('유효하지 않은 모임 목적입니다.');
      }
      return true;
    }),
  body('total_m').optional().notEmpty().withMessage('모임 인원을 입력하세요.'),
  body('total_f').optional().notEmpty().withMessage('모임 인원을 입력하세요.'),
  body('place').optional().notEmpty().withMessage('모임 장소를 입력하세요.'),
  body('meeting_time').optional().notEmpty().withMessage('모임 시간을 입력하세요.'),
];

const setPostValidate = (req, res, next) => {
  const errors = validationResult(req).errors;

  if (errors.length > 0) {
    throw new BadRequestError(errors[0].msg);
  }
  next();
};

export { setPostValidate, setPostValidationRules };


const createPostValidationRules = [
  body('title')
    .notEmpty()
    .withMessage('제목을 입력하세요.')
    .isLength({ max: 15 })
    .withMessage('게시글 제목은 15자 이내로 작성해주세요.'),
  body('content')
    .notEmpty()
    .withMessage('내용을 입력하세요.')
    .isLength({ max: 200 })
    .withMessage('게시글 내용은 200자 이내로 작성해주세요'),
  body('type')
    .notEmpty()
    .withMessage('모임의 목적을 입력하세요.')
    .custom(value => {
      if (!allowedPostTypes.includes(value)) {
        throw new BadRequestError('유효하지 않은 모임 목적입니다.');
      }
      return true;
    }),
  body('totalM').notEmpty().withMessage('모임 인원을 입력하세요.'),
  body('totalF').notEmpty().withMessage('모임 인원을 입력하세요.'),
  body('place').notEmpty().withMessage('모임 장소를 입력하세요.'),
  body('meetingTime').notEmpty().withMessage('모임 시간을 입력하세요.'),
];

const createPostValidate = (req, res, next) => {
  const errors = validationResult(req).errors;

  if (errors.length > 0) {
    throw new BadRequestError(errors[0].msg);
  }
  next();
};

const postParamsValidate = (req, res, next) => {
  const postId = req.params.postId;
  if (!postId || isNaN(postId)) {
    throw new BadRequestError('게시물의 ID를 확인해주세요.');
  }

  next();
};

export { getPostValidate, setPostValidationRules, setPostValidate, createPostValidate, createPostValidationRules, postParamsValidate }
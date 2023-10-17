import { logger } from '../utils/logger.js';

class BadRequestError extends Error {
  constructor(message = 'Bad Request') {
    super(message);
    this.name = 'BadRequestError';
    this.statusCode = 400;
  }
}

class UnauthorizedError extends Error {
  constructor(message = 'Unauthorized') {
    super(message);
    this.name = 'UnauthorizedError';
    this.statusCode = 401;
  }
}

class NotFoundError extends Error {
  constructor(message = 'Not Found') {
    super(message);
    this.name = 'NotFoundError';
    this.statusCode = 404;
  }
}

class ConflictError extends Error {
  constructor(message = 'Conflict') {
    super(message);
    this.name = 'ConflictError';
    this.statusCode = 409;
  }
}

class InternalServerError extends Error {
  constructor(message = 'Internal Server Error') {
    super(message);
    this.name = 'InternalServerError';
    this.statusCode = 500;
  }
}

function errorMiddleware(error, req, res, next) {
  // 터미널에 노란색으로 출력됨.
  logger.error('\x1b[33m%s\x1b[0m', error);

  let message = 'Internal Server Error';
  if (
    error instanceof BadRequestError ||
    error instanceof UnauthorizedError ||
    error instanceof NotFoundError ||
    error instanceof ConflictError
  ) {
    message = error.message;
  } else {
    message = error.message;
  }

  const { statusCode = 500 } = error; // 위 에러를 모두 통과했으면 500 에러

  res.status(statusCode).send({ message });
}

export { BadRequestError, UnauthorizedError, NotFoundError, ConflictError, InternalServerError, errorMiddleware };

import express from 'express';
import cors from 'cors';
import { db } from './db.index.js';
import { logger } from '../src/utils/logger.js';
import { morganMiddleware } from './utils/morgan.js';

const app = express();

// CORS 에러 방지
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(morganMiddleware);

// app.use('/users', userRouter);
// app.use('/posts', postRouter);
// app.use('/applications', applicationRouter);
// app.use('/companies', companyRouter);

db.sequelize
  .sync({ force: true }) // true이면 테이블 모두 삭제 후 생성, false이면 테이블 그대로 유지
  .then(() => {
    logger.info('데이터베이스 연결 성공');
  })
  .catch(err => {
    logger.error(err);
  });

// 기본 페이지
app.get('/', (req, res) => {
  res.send('안녕하세요, 원티드 채용공고 API 입니다.');
});

// app.use(errorMiddleware);

export { app };

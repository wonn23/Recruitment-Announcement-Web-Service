import dotenv from 'dotenv';

dotenv.config();

const config = {
  username: process.env.DB_USER, // MySQL 사용자명
  password: process.env.DB_PW, // MySQL 비밀번호
  database: process.env.DB_NAME, // 사용할 데이터베이스
  host: process.env.DB_HOST, // MySQL 호스트
  port: process.env.DB_PORT,
  dialect: 'mysql',
};

export { config };

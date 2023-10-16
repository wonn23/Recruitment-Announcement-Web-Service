import Sequelize from 'sequelize';
import { config } from './config/config.js';
import User from './user/entities/users.entity.js'
import Post from './post/entities/post.entity.js'
import Company from './company/entities/company.entity.js';
import Application from './application/entities/application.entity.js'

const db = {};

const sequelize = new Sequelize(config.database, config.username, config.password, {
  host: config.host,
  port: config.port,
  dialect: config.dialect,
  logging: false,
});

db.User = User(sequelize, Sequelize);
db.Post = Post(sequelize, Sequelize);
db.Company = Company(sequelize, Sequelize);
db.Application = Application(sequelize, Sequelize);


// 각 모델들을 돌면서 모델간의 관계를 정의하는 함수를 동작시킴.
Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db); // 관계를 정의하기 위해선 다른 모델을 참고해야하기 때문에 모델들이 담긴 db를 파라미터로 넘긴다.
  }
});

db.sequelize = sequelize; // 세션과
db.Sequelize = Sequelize; // Class를 db에 추가

export { db, sequelize };

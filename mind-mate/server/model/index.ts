import { Sequelize, DataTypes } from 'sequelize';
import dotenv from 'dotenv';
dotenv.config();
import { development as config } from '../config/config';

if (!config.database || !config.username || !config.password) {
  throw new Error('Database configuration is incomplete');
}

const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  {
    ...config,
    dialect: 'mysql', // specify your database dialect
  }
);

import { UserModel } from './User';
import { AdjectiveModel } from './Adjective';
import { NounModel } from './Noun';
import { PostModel } from './Post';

const User = UserModel(sequelize, Sequelize);
const Adjective = AdjectiveModel(sequelize, Sequelize);
const Noun = NounModel(sequelize, Sequelize);
const Post = PostModel(sequelize, Sequelize);

//User가 작성한 Post들 (1:N)
User.hasMany(
  Post,
  
)


///User가 작성한 댓글들 (1:N)


//User가 작성한 답변들 (1:N)


//Post에 달린 댓글들 (1:N)


//Post에 달린 답변들(1:N)




export const db = {
  User,
  Adjective,
  Noun,
  Post,
  sequelize,
  Sequelize,
};

db.Sequelize = Sequelize;
db.sequelize = sequelize; 

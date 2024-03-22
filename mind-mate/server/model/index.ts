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
import { CommentModel } from './Comment';
import { ChatroomModel } from './Chatroom';

const User = UserModel(sequelize, Sequelize);
const Adjective = AdjectiveModel(sequelize, Sequelize);
const Noun = NounModel(sequelize, Sequelize);
const Post = PostModel(sequelize, Sequelize);
const Comment = CommentModel(sequelize, Sequelize);
const Chatroom = ChatroomModel(sequelize, Sequelize);

//User가 작성한 Post들 (1:N)
User.hasMany(
  Post, {
    foreignKey: 'userid',
    sourceKey: 'userid',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
  }
)

Post.belongsTo(
  User, {
    foreignKey: 'userid',
    targetKey: 'userid'
  }
)

//Post에 달린 댓글들 (1:N)
Post.hasMany(
  Comment, {
    foreignKey: 'postid',
    sourceKey: 'postid',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
  }
)

Comment.belongsTo(
  Post, {
    foreignKey: 'postid',
    targetKey: 'postid'
  }
)


//Post에 달린 답변들(1:N)




export const db = {
  User,
  Adjective,
  Noun,
  Post,
  Comment,
  Chatroom,
  sequelize,
  Sequelize,
};

db.Sequelize = Sequelize;
db.sequelize = sequelize; 

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
import { ChatMessageModel } from './ChatMessage';
import { ExpertAnswerModel } from './ExpertAnswers';
import { GeneralAnswerModel } from './GeneralAnswers';

const User = UserModel(sequelize, Sequelize);
const Adjective = AdjectiveModel(sequelize, Sequelize);
const Noun = NounModel(sequelize, Sequelize);
const Post = PostModel(sequelize, Sequelize);
const Comment = CommentModel(sequelize, Sequelize);
const Chatroom = ChatroomModel(sequelize, Sequelize);
const ChatMessage = ChatMessageModel(sequelize, Sequelize);
const ExpertAnswer = ExpertAnswerModel(sequelize, Sequelize);
const GeneralAnswer = GeneralAnswerModel(sequelize, Sequelize);

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
  }
)

//User가 작성한 댓글들(1:N)
User.hasMany(
  Comment, {
    foreignKey: 'userid',
    sourceKey: 'userid',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
  }
)

Comment.belongsTo(
  User, {
    foreignKey: 'userid',
  }
)


//Post에 달린 전문답변들(1:N)
Post.hasMany(
  ExpertAnswer, {
    foreignKey: 'postid',
    sourceKey: 'postid',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
  }
)

ExpertAnswer.belongsTo(
  Post, {
    foreignKey: 'postid'
  }
)

//Post에 달린 일반답변들(1:N)
Post.hasMany(
  GeneralAnswer, {
    foreignKey: 'postid',
    sourceKey: 'postid',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
  }
)

GeneralAnswer.hasMany(
  Post, {
    foreignKey: 'postid'
  }
)

//User가 작성한 전문답변들(1:N)
User.hasMany(
  ExpertAnswer, {
    foreignKey: 'userid',
    sourceKey: 'userid',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
  }
)

ExpertAnswer.belongsTo(
  User, {
    foreignKey: 'userid'
  }
)

//User가 작성한 일반답변들(1:N)
User.hasMany(
  GeneralAnswer, {
    foreignKey: 'userid',
    sourceKey: 'userid',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
  }
)

GeneralAnswer.belongsTo(
  User, {
    foreignKey: 'userid'
  }
)

export const db = {
  User,
  Adjective,
  Noun,
  Post,
  Comment,
  Chatroom,
  ChatMessage,
  sequelize,
  Sequelize,
};

db.Sequelize = Sequelize;
db.sequelize = sequelize; 

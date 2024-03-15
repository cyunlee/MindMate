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

const User = UserModel(sequelize, Sequelize);
const Adjective = AdjectiveModel(sequelize, Sequelize);
const Noun = NounModel(sequelize, Sequelize);

export const db = {
    User,
    Adjective,
    Noun,
    sequelize,
    Sequelize,
};

db.Sequelize = Sequelize;
db.sequelize = sequelize; 

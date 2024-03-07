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

// Define the User model using sequelize.define
const User = sequelize.define(
  'user',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    timestamps: false,
  }
);

// Sync the model with the database (optional but may be necessary depending on your application)
// This ensures that the table is created if it doesn't exist
sequelize.sync();

export { sequelize, User };

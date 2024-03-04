const { Sequelize, DataTypes } = require('sequelize');
const dotenv = require('dotenv');
dotenv.config();
const db = {};

const config = require('../config/config')['development'];
const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  {
    ...config,
  }
);

const TestDB = sequelize.define(
  'testDB',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    number: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    data: {
      type: DataTypes.JSON,
      allowNull: false,
    },
  },
  {
    timestamps: false,
  }
);

db.TestDB = TestDB;

// Export db, sequelize, and Sequelize
module.exports = { db, sequelize, Sequelize };

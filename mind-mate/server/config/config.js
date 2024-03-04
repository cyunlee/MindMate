const Sequelize = require('sequelize');
const mysql = require('mysql2');
const dotenv = require('dotenv');
dotenv.config();
const env = process.env;

/*const development = {
  username: env.DB_USERNAME,
  password: env.DB_PASSWORD,
  database: env.DB_DATABASE,
  host: env.DB_HOST,
  dialect: 'mysql',
  timezone: '+09:00',
};

module.exports = { development };*/

const development = {
  username: 'root',
  password: 'Cslikea%d10',
  database: 'junsu_game_db',
  host: 'localhost',
  dialect: 'mysql',
  port: 3306, // MySQL이 다른 포트에서 실행 중이면 이 부분을 수정하세요.
  timezone: '+09:00',
};

module.exports = { development };

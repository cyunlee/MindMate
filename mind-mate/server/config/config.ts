import { Options as SequelizeOptions } from 'sequelize';
import { config as dotenvConfig } from 'dotenv';

dotenvConfig();
const env = process.env;

const development: SequelizeOptions = {
  username: 'admin',
  password: 'Cslikea%d10',
  database: 'mind_mate_db',
  host: 'database-1.czmooi4c4wg8.ap-northeast-2.rds.amazonaws.com',
  dialect: 'mysql',
  port: 3306, // Provide a default value for env.DB_PORT
  timezone: '+09:00',
};

export { development };

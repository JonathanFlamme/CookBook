import { DataSourceOptions } from 'typeorm';
import { entities } from './entities';
import { migrations } from './migrations';

export const config: DataSourceOptions = {
  type: 'postgres',
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  entities,
  migrations,
};

export default config;

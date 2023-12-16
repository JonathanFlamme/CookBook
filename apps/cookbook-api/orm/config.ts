import { DataSourceOptions } from 'typeorm';
import { entities } from './entities';
import { migrations } from './migrations';

export const config: DataSourceOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'cookbook',
  password: 'cookbook',
  database: 'cookbook',
  entities,
  migrations,
};

export default config;

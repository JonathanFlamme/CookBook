import { DataSourceOptions } from 'typeorm';
import { entities } from './entities';
import { migrations } from './migrations';
import { ConfigService } from '@nestjs/config';

const configService = new ConfigService();

export const config: DataSourceOptions = {
  type: 'postgres',
  host: configService.get<string>('DB_HOST'),
  port: configService.get<number>('DB_PORT'),
  username: configService.get<string>('DB_USERNAME'),
  password: configService.get<string>('DB_PASSWORD'),
  database: configService.get<string>('DB_DATABASE'),
  entities,
  migrations,
};

export default config;

import { DataSourceOptions } from 'typeorm';
import { entities } from './entities';
import { migrations } from './migrations';
import { ConfigService } from '@nestjs/config';

const configService = new ConfigService();

export const config: DataSourceOptions = {
  type: 'postgres',
  host: configService.get<string>('DATABASE_HOST'),
  port: configService.get<number>('DATABASE_PORT'),
  username: configService.get<string>('DATABASE_USER'),
  password: configService.get<string>('DATABASE_PASSWORD'),
  database: configService.get<string>('DATABASE_DATABASE'),
  entities,
  migrations,
  ssl: {
    rejectUnauthorized: false,
  },
};

export default config;

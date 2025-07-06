import { DataSource, DataSourceOptions } from 'typeorm';
import { config as dotenvConfig } from 'dotenv';
import { registerAs } from '@nestjs/config';

dotenvConfig({ path: '.env.development.local' });

const isProd = process.env.ENVIRONMENT === 'PROD';

const dataSourceConfig: DataSourceOptions = {
  type: 'postgres',
  host: isProd
    ? process.env.DB_HOST_PROD
    : process.env.DB_HOST_LOCAL,
  port: parseInt(
    isProd ? process.env.DB_PORT_PROD! : process.env.DB_PORT_LOCAL!,
  ),
  username: isProd
    ? process.env.DB_USERNAME_PROD
    : process.env.DB_USERNAME_LOCAL,
  password: isProd
    ? process.env.DB_PASSWORD_PROD
    : process.env.DB_PASSWORD_LOCAL,
  database: isProd ? process.env.DB_NAME_PROD : process.env.DB_NAME_LOCAL,
  synchronize: false,
  dropSchema: false,
  logging: ['error'],
  ssl: process.env.DB_SSL === 'true' ? { rejectUnauthorized: false } : false,
  entities: ['dist/**/*.entity{.ts,.js}'],
  migrations: ['dist/migrations/*{.js,.ts}'],
};

export const dbConfig = registerAs('postgres', () => dataSourceConfig);

export const appDataSource = new DataSource(dataSourceConfig);
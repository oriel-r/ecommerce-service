import { DataSource, DataSourceOptions } from 'typeorm';
import { config as dotenvConfig } from 'dotenv';
import { registerAs } from '@nestjs/config';

dotenvConfig({ path: '.env.development.local' });

const isProduction = process.env.ENVIRONMENT === 'PRODUCTION';

const dataSourceConfig: DataSourceOptions = {
  type: 'postgres',
  host: isProduction ? `/cloudsql/${process.env.INSTANCE_CONNECTION_NAME}` : process.env.DB_HOST_LOCAL,
  port: parseInt(
    isProduction ? process.env.DB_PORT_PRODUCTION! : process.env.DB_PORT_LOCAL!,
  ),
  username: isProduction
    ? process.env.DB_USERNAME_PRODUCTION
    : process.env.DB_USERNAME_LOCAL,
  password: isProduction
    ? process.env.DB_PASSWORD_PRODUCTION as string
    : process.env.DB_PASSWORD_LOCAL as string,
  database: isProduction ? process.env.DB_NAME_PRODUCTION : process.env.DB_NAME_LOCAL,
  synchronize: false,
  dropSchema: false,  
  logging: ['error'],
  ssl: isProduction ? { rejectUnauthorized: false } : false,
  entities: ['dist/**/*.entity{.ts,.js}'],
  migrations: ['dist/database/migrations/*{.js,.ts}'],
};

export const dbConfig = registerAs('postgres', () => dataSourceConfig);

export const appDataSource = new DataSource(dataSourceConfig);

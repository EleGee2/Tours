import * as dotenv from 'dotenv';
import { DataSource, DataSourceOptions } from 'typeorm';
import * as fs from 'fs';

const data: any = dotenv.parse(fs.readFileSync('.env'));

export const dataSourceOptions: DataSourceOptions = {
  type: 'postgres',
  host: data.DB_HOST,
  username: data.DB_USERNAME,
  password: data.DB_PASSWORD,
  database: data.DB_NAME,
  entities: ['dist/**/*.entity.js'],
  migrations: ['dist/db/migrations/*.js'],
  logging: true,
};

const dataSource = new DataSource(dataSourceOptions);
export default dataSource;

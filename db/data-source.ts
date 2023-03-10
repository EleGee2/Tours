import * as dotenv from 'dotenv';
import { DataSource, DataSourceOptions } from 'typeorm';
import * as fs from 'fs';
import { User } from "../src/modules/user/user.entity";
import { Review } from "../src/modules/tour/entities/review.entity";
import { Booking } from "../src/modules/tour/entities/booking.entity";
import { Tour } from "../src/modules/tour/entities/tour.entity";
import { Location } from "../src/modules/tour/entities/location.entity";

const data: any = dotenv.parse(fs.readFileSync('.env'));

export const dataSourceOptions: DataSourceOptions = {
  type: 'postgres',
  host: data.DB_HOST,
  username: data.DB_USERNAME,
  password: data.DB_PASSWORD,
  database: data.DB_NAME,
  // entities: ['dist/**/*.entity.js'],
  entities: [User, Review, Booking, Tour, Location],
  migrations: ['dist/db/migrations/*.js'],
  logging: true,
};

const dataSource = new DataSource(dataSourceOptions);
export default dataSource;

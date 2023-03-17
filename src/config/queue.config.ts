import * as dotenv from 'dotenv';
import * as fs from 'fs';
import { BullRootModuleOptions } from '@nestjs/bull';
const data: any = dotenv.parse(fs.readFileSync('.env'));

export const bullRootConfigOptions: BullRootModuleOptions = {
  url: 'redis://default:redispw@localhost:55000',
};

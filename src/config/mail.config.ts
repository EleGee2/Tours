import * as dotenv from 'dotenv';
import { MailerOptions } from '@nestjs-modules/mailer';
import * as fs from 'fs';
const data: any = dotenv.parse(fs.readFileSync('.env'));
import { join } from 'path';
import { PugAdapter } from '@nestjs-modules/mailer/dist/adapters/pug.adapter';

export const mailHost = () => {
  return data.APPLICATION_HOST;
};
export const mailConfigOptions: MailerOptions = {
  transport: {
    host: data.EMAIL_HOST,
    secure: false,
    auth: {
      user: data.EMAIL_USERNAME,
      pass: data.EMAIL_PASSWORD,
    },
    port: 587,
    tls: {
      rejectUnauthorized: false,
    },
  },
  defaults: {
    from: '"No reply" <noreply@example.com>',
  },
  template: {
    dir: join(__dirname, '../../mail/templates'),
    adapter: new PugAdapter(),
    options: {
      strict: true,
    },
  },
};

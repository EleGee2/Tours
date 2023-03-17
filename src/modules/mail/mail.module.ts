import { Module } from '@nestjs/common';
import { MailService } from './mail.service';
import { MailerModule } from '@nestjs-modules/mailer';
import { mailConfigOptions } from '../../config/mail.config';

@Module({
  imports: [MailerModule.forRoot(mailConfigOptions)],
  providers: [MailService],
  exports: [MailService],
})
export class MailModule {}

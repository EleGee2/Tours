import { Logger } from '@nestjs/common';
import { Process, Processor } from '@nestjs/bull';
import { MailService } from '../mail/mail.service';

@Processor('email')
export class AuthProcessor {
  constructor(private readonly mailService: MailService) {}
  private readonly logger = new Logger(AuthProcessor.name);

  @Process('sendUserConfirmation')
  async handleSendUserEmailConfirmation(job: any) {
    const { user, token } = job.data;
    this.logger.debug('Sending user email...');

    await this.mailService.sendUserConfirmation(user, token);

    this.logger.debug('Sent confirmation email...');
  }

  @Process('sendPasswordResetLink')
  async handleSendUserPasswordResetLink(job: any) {
    const { user, token } = job.data;
    this.logger.debug('Sending password reset email....');

    await this.mailService.sendPasswordResetLink(user, token);

    this.logger.debug('Sent password reset link email...');
  }
}

import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { User } from '../user/user.entity';
import { mailHost } from '../../config/mail.config';

@Injectable()
export class MailService {
  constructor(private mailerService: MailerService) {}

  async sendUserConfirmation(user: User, token: string) {
    // const url = `http://localhost:3000/api/v1/auth/confirm?token=${token}`;
    const url = `${mailHost}/auth/confirm?token=${token}`

    try {
      await this.mailerService.sendMail({
        to: user.email,
        subject: 'Welcome to Tour App! Confirm your email',
        template: './confirmEmail',
        context: {
          firstName: user.name.split(' ')[0],
          url,
        },
      });
    } catch (e) {
      console.error(e);
    }
  }

  async sendPasswordResetLink(user: User, token: string) {
    const url = `http://localhost:3000/api/v1/auth/reset-password?token=${token}`;

    try {
      await this.mailerService.sendMail({
        to: user.email,
        subject: 'Password reset link',
        template: './passwordReset',
        context: {
          firstName: user.name.split(' ')[0],
          url,
        },
      });
    } catch (e) {
      console.error(e);
    }
  }
}

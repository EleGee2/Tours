import * as bcrypt from 'bcrypt';
import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
  PreconditionFailedException,
  UnauthorizedException,
} from '@nestjs/common';
import { UserService } from '../user/user.service';
import { User } from '../user/user.entity';
import { JwtService } from '@nestjs/jwt';
import { UserRegisterDto } from '../user/dto/user-register.req.dto';
import { MailService } from '../mail/mail.service';
import { InjectQueue } from '@nestjs/bull';
import { Queue } from 'bull';
import { PasswordresetService } from '../passwordreset/passwordreset.service';
import { randomStringGenerator } from '@nestjs/common/utils/random-string-generator.util';
import { CreateForgetPasswordDto } from './dto/forgot-password.dto';
import { ResetPasswordDto } from './dto/reset-password.dto';
import { userUpdateDto } from '../user/dto/user-update.req.dto';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
    private mailService: MailService,
    private passwordResetService: PasswordresetService,
    @InjectQueue('email') private emailQueue: Queue,
  ) {}

  async validateUser(email: string, password: string): Promise<User> {
    const user = await this.userService.findUser(email);

    if (!user) {
      throw new BadRequestException();
    }

    if (!(await bcrypt.compare(password, user.password)))
      throw new UnauthorizedException();

    return user;
  }

  async loginUser(user: any) {
    const payload = { username: user.email, sub: user.id };

    const _user = await this.userService.findUserById(user.id);
    if (_user.confirmed === false) {
      throw new UnauthorizedException('Please confirm your email to Login');
    }

    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async registerUser(userDto: UserRegisterDto) {
    const user = await this.userService.createUser(userDto);
    const token = this.jwtService.sign({ id: user.id }, { expiresIn: '1h' });

    await this.emailQueue.add('sendUserConfirmation', { user, token });

    delete user.password;
    return user;
  }

  async confirmUser(token: string) {
    const decoded = await this.jwtService.decode(token);

    const user = await this.userService.findUserById(decoded['id']);
    if (!user) {
      throw new BadRequestException();
    }

    if (user.confirmed === false) {
      user.confirmed = true;
      return await user.save();
    } else {
      return 'You are already confirmed';
    }
  }

  async forgotPassword(createForgetPasswordDto: CreateForgetPasswordDto) {
    const email = createForgetPasswordDto.email;
    const user = await this.userService.findUser(createForgetPasswordDto.email);
    if (!user) {
      throw new NotFoundException('User not found');
    }

    if (user.role === 'admin') {
      throw new PreconditionFailedException(
        'Password reset is not allowed, please contact support',
      );
    }

    const resetToken = await this.passwordResetService.getPasswordResetByQuery({
      email,
    });

    let token;
    if (resetToken && !resetToken.used) {
      token = resetToken.token;
      await this.emailQueue.add('sendPasswordResetLink', { user, token });
    } else {
      token = randomStringGenerator();
      const now = new Date().toISOString();
      token += now;

      token = this.jwtService.sign({ token }, { expiresIn: '1h' });
      await this.passwordResetService.createPasswordReset({
        email,
        token,
        owner: user.id,
      });
      await this.emailQueue.add('sendPasswordResetLink', { user, token });
    }

    return {
      message: 'Reset link has been sent to your registered email address',
    };
  }

  async resetPassword(token: string, resetPasswordDto: ResetPasswordDto) {
    const reset = await this.passwordResetService.getPasswordResetByQuery({
      token: token,
    });
    if (!reset) {
      throw new PreconditionFailedException('Password reset failed');
    }

    if (reset.used) {
      throw new PreconditionFailedException('This reset link has been used');
    }

    const user = await this.userService.findUserById(reset.owner);
    if (!user) {
      throw new PreconditionFailedException('Token is invalid or expired');
    }

    user.password = resetPasswordDto.password;
    await user.save();
    await this.passwordResetService.updatePasswordReset(
      { id: reset.id },
      { used: true },
    );

    return {
      message: 'Password has been set successfully',
    };
  }

  async updatePassword(user: User, updatePasswordDto: userUpdateDto) {
    if (
      String(updatePasswordDto.password) !==
      String(updatePasswordDto.confirmPassword)
    ) {
      throw new HttpException(
        'Passwords do not match',
        HttpStatus.PRECONDITION_FAILED,
      );
    }
    await this.userService.updateUser(user.id, updatePasswordDto);

    return { message: 'Password has been updated successfully' };
  }
}

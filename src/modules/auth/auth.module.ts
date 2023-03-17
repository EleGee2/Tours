import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { LocalStrategy } from './strategies/local.strategy';
import { UserModule } from '../user/user.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './strategies/jwt.strategy';
import { jwtConfig } from '../../config/jwt.config';
import { MailModule } from '../mail/mail.module';
import { BullModule } from '@nestjs/bull';
import { AuthProcessor } from './auth.processor';
import { PasswordresetModule } from '../passwordreset/passwordreset.module';

@Module({
  imports: [
    UserModule,
    PassportModule,
    JwtModule.registerAsync(jwtConfig),
    MailModule,
    BullModule.registerQueue({
      name: 'email',
    }),
    PasswordresetModule,
  ],
  providers: [AuthService, LocalStrategy, JwtStrategy, AuthProcessor],
  controllers: [AuthController],
})
export class AuthModule {}

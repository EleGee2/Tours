import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { TourModule } from './modules/tour/tour.module';
import { routes } from './routes';
import { RouterModule } from 'nest-router';
import { UserModule } from './modules/user/user.module';
import { dataSourceOptions } from '../db/data-source';
import { AuthModule } from './modules/auth/auth.module';
import { ApiTokenCheckMiddleware } from './common/middleware/api-token-check.middleware';
import { MailModule } from './modules/mail/mail.module';
import { BullModule } from '@nestjs/bull';
import { bullRootConfigOptions } from './config/queue.config';
import { PasswordresetModule } from './modules/passwordreset/passwordreset.module';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { throttleConfig } from './config/throttle.config';
import { APP_GUARD } from '@nestjs/core';

@Module({
  imports: [
    TypeOrmModule.forRoot(dataSourceOptions),
    ConfigModule.forRoot({ isGlobal: true, envFilePath: '.env' }),
    RouterModule.forRoutes(routes),
    TourModule,
    UserModule,
    AuthModule,
    MailModule,
    BullModule.forRoot(bullRootConfigOptions),
    PasswordresetModule,
    ThrottlerModule.forRoot(throttleConfig),
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer): any {
    consumer
      .apply(ApiTokenCheckMiddleware)
      .forRoutes({ path: '/', method: RequestMethod.ALL });
  }
}

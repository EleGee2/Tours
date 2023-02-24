import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { typeOrmConfig } from './config/typeorm.config';
import { TourModule } from './modules/tour/tour.module';
import { routes } from './routes';
import { RouterModule } from 'nest-router';

@Module({
  imports: [
    TourModule,
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot(typeOrmConfig),
    RouterModule.forRoutes(routes),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

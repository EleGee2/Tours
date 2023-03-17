import { Module } from '@nestjs/common';
import { PasswordresetService } from './passwordreset.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PasswordReset } from './passwordreset.entity';

@Module({
  imports: [TypeOrmModule.forFeature([PasswordReset])],
  providers: [PasswordresetService],
  exports: [PasswordresetService],
})
export class PasswordresetModule {}

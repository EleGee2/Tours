import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PasswordReset } from './passwordreset.entity';
import { Repository } from 'typeorm';
import { createPasswordResetDto } from './dto/create-passwordreset.dto';
import { updatePasswordResetDto } from './dto/update-passwordreset.dto';

@Injectable()
export class PasswordresetService {
  constructor(
    @InjectRepository(PasswordReset)
    private readonly passwordResetRepository: Repository<PasswordReset>,
  ) {}

  async getPasswordResetById(id: string): Promise<PasswordReset> {
    return this.passwordResetRepository.findOne({
      where: { id },
    });
  }

  async getPasswordResetByQuery(query: object): Promise<PasswordReset> {
    return this.passwordResetRepository.findOne({ where: { ...query } });
  }

  async createPasswordReset(values: createPasswordResetDto) {
    return this.passwordResetRepository.create(values).save();
  }

  async updatePasswordReset(query, values: updatePasswordResetDto) {
    return this.passwordResetRepository.update({ ...query }, { ...values });
  }
}

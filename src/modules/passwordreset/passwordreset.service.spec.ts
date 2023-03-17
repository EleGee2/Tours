import { Test, TestingModule } from '@nestjs/testing';
import { PasswordresetService } from './passwordreset.service';

describe('PasswordresetService', () => {
  let service: PasswordresetService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PasswordresetService],
    }).compile();

    service = module.get<PasswordresetService>(PasswordresetService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

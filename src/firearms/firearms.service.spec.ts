import { Test, TestingModule } from '@nestjs/testing';
import { FirearmsService } from './firearms.service';

describe('FirearmsService', () => {
  let service: FirearmsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FirearmsService],
    }).compile();

    service = module.get<FirearmsService>(FirearmsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

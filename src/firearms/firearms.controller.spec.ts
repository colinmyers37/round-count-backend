import { Test, TestingModule } from '@nestjs/testing';
import { FirearmsController } from './firearms.controller';

describe('FirearmsController', () => {
  let controller: FirearmsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FirearmsController],
    }).compile();

    controller = module.get<FirearmsController>(FirearmsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

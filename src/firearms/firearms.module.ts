import { Module } from '@nestjs/common';
import { FirearmsController } from './firearms.controller';

@Module({
  controllers: [FirearmsController],
})
export class FirearmsModule {}

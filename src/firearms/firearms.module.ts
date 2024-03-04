import { Module } from '@nestjs/common';
import { FirearmsController } from './firearms.controller';
import { FirearmsService } from './firearms.service';
import { FirearmSchema } from './schema/firearm.schema';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Firearm', schema: FirearmSchema }]),
  ],
  controllers: [FirearmsController],
  providers: [FirearmsService],
})
export class FirearmsModule {}

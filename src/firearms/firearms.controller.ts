import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { FirearmsService } from './firearms.service';
import { FirearmDto } from './dto/firearm.dto';
import { ObjectId } from 'mongoose';

@Controller('firearm')
export class FirearmsController {
  constructor(private firearmsService: FirearmsService) {}

  @Post('/create')
  createFirearm(@Body() firearmDto: FirearmDto): Promise<string> {
    return this.firearmsService.createFirearm(firearmDto);
  }

  @Get('/userId')
  getFirearm(@Query('userId') userId: ObjectId): Promise<FirearmDto[]> {
    return this.firearmsService.getFirearmsByUserId(userId);
  }
}

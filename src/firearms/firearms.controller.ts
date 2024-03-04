import { Body, Controller, Post } from '@nestjs/common';
import { FirearmsService } from './firearms.service';
import { FirearmDto } from './dto/firearm.dto';

@Controller('firearm')
export class FirearmsController {
  constructor(private firearmsService: FirearmsService) {}

  @Post('/create')
  createFirearm(@Body() firearmDto: FirearmDto): Promise<string> {
    return this.firearmsService.createFirearm(firearmDto);
  }
}

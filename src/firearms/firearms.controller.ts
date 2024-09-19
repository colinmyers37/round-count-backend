import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { FirearmsService } from './firearms.service';
import { FirearmDto } from './dto/firearm.dto';
import { ObjectId, Types } from 'mongoose';

@Controller('firearm')
export class FirearmsController {
  constructor(private firearmsService: FirearmsService) {}

  @Post('/create')
  createFirearm(@Body() firearmDto: FirearmDto): Promise<string> {
    return this.firearmsService.createFirearm(firearmDto);
  }

  @Get('/userId')
  getFirearm(
    @Query('userId') userId: ObjectId,
  ): Promise<{ firearms: FirearmDto[]; total: number }> {
    return this.firearmsService.getFirearmsByUserId(userId);
  }

  @Delete(':firearmId')
  async deleteFirearm(@Param('firearmId') firearmId: string): Promise<string> {
    let objectId: Types.ObjectId;
    try {
      objectId = new Types.ObjectId(firearmId); // Correctly convert string to ObjectId
    } catch (error) {
      throw new HttpException(
        'Invalid firearm ID format',
        HttpStatus.BAD_REQUEST,
      );
    }

    const result = await this.firearmsService.deleteFirearmById(objectId);

    if (!result) {
      throw new HttpException('Firearm not found', HttpStatus.NOT_FOUND);
    }

    return 'Firearm successfully deleted';
  }

  @Put(':firearmId')
  async updateFirearm(
    @Param('firearmId') firearmId: string,
    @Body() firearmDto: FirearmDto,
  ): Promise<string> {
    const objectId = new Types.ObjectId(firearmId);
    return this.firearmsService.updateFirearm(objectId, firearmDto);
  }
}

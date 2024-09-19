import {
  Injectable,
  Logger,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { FirearmDto } from './dto/firearm.dto';
import { Firearm } from './schema/firearm.schema';
import { Model, ObjectId, Types } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class FirearmsService {
  private readonly logger = new Logger(FirearmsService.name);

  constructor(
    @InjectModel(Firearm.name)
    private firearmModel: Model<Firearm>,
  ) {}

  async createFirearm(firearmDto: FirearmDto): Promise<string> {
    try {
      const newFirearm = new this.firearmModel(firearmDto);
      await newFirearm.save();
      this.logger.log(`Firearm created: ${newFirearm._id}`);
      return 'Firearm created successfully';
    } catch (error) {
      this.logger.error(`Failed to create firearm: ${error.message}`);
      throw new BadRequestException('Failed to create firearm');
    }
  }

  async getFirearmsByUserId(
    userId: ObjectId,
    page = 1,
    limit = 10,
  ): Promise<{ firearms: FirearmDto[]; total: number }> {
    try {
      const [firearms, total] = await Promise.all([
        this.firearmModel
          .find({ userId })
          .lean()
          .skip((page - 1) * limit)
          .limit(limit)
          .exec(),
        this.firearmModel.countDocuments({ userId }),
      ]);

      return {
        firearms: firearms.map((firearm) => ({
          ...firearm,
          _id: firearm._id.toString(),
          userId: userId.toString(),
        })),
        total,
      };
    } catch (error) {
      this.logger.error(`Failed to get firearms: ${error.message}`);
      throw new BadRequestException('Failed to get firearms');
    }
  }

  async deleteFirearmById(firearmId: Types.ObjectId): Promise<string> {
    try {
      const result = await this.firearmModel.findByIdAndDelete(firearmId);
      if (!result) {
        throw new NotFoundException('Firearm not found');
      }
      this.logger.log(`Firearm deleted: ${firearmId}`);
      return 'Firearm deleted successfully';
    } catch (error) {
      this.logger.error(`Failed to delete firearm: ${error.message}`);
      throw new BadRequestException('Failed to delete firearm');
    }
  }

  async updateFirearm(
    firearmId: Types.ObjectId,
    firearmDto: FirearmDto,
  ): Promise<string> {
    try {
      const updatedFirearm = await this.firearmModel.findByIdAndUpdate(
        firearmId,
        { $set: firearmDto },
        { new: true },
      );

      if (!updatedFirearm) {
        throw new NotFoundException('Firearm not found');
      }

      this.logger.log(`Firearm updated: ${firearmId}`);
      return 'Firearm updated successfully';
    } catch (error) {
      this.logger.error(`Failed to update firearm: ${error.message}`);
      throw new BadRequestException('Failed to update firearm');
    }
  }
}

import { Injectable } from '@nestjs/common';
import { FirearmDto } from './dto/firearm.dto';
import { Firearm } from './schema/firearm.schema';
import { Model, ObjectId, Types } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class FirearmsService {
  constructor(
    @InjectModel(Firearm.name)
    private firearmModel: Model<Firearm>,
  ) {}

  async createFirearm(firearmDto: FirearmDto): Promise<string> {
    try {
      const {
        make,
        model,
        type,
        caliber,
        action,
        roundCount,
        userId,
        lastCleanedDate,
        reminderInterval,
      } = firearmDto;

      await this.firearmModel.create({
        make,
        model,
        userId,
        ...(action && { action }),
        roundCount: roundCount || 0,
        ...(type && { type }),
        ...(caliber && { caliber }),
        ...(lastCleanedDate && { lastCleanedDate }),
        ...(reminderInterval && { reminderInterval }),
      });

      return 'Firearm created successfully';
    } catch (error) {
      throw new Error('Failed to create firearm');
    }
  }

  async getFirearmsByUserId(userId: ObjectId): Promise<FirearmDto[]> {
    try {
      const firearms = await this.firearmModel.find({ userId });

      return firearms.map((firearm) => {
        const {
          _id,
          make,
          model,
          type,
          caliber,
          action,
          roundCount,
          lastCleanedDate,
          reminderInterval,
        } = firearm;

        return {
          _id: _id.toString(),
          make,
          model,
          type,
          caliber,
          action,
          roundCount,
          reminderInterval,
          lastCleanedDate,
          userId: userId.toString(),
        };
      });
    } catch (error) {
      throw new Error('Failed to get firearms');
    }
  }

  async deleteFirearmById(firearmId: Types.ObjectId): Promise<string> {
    try {
      await this.firearmModel.findByIdAndDelete(firearmId);

      return 'Firearm deleted successfully';
    } catch (error) {
      throw new Error('Failed to delete firearm');
    }
  }
}

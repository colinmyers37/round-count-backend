import { Injectable } from '@nestjs/common';
import { FirearmDto } from './dto/firearm.dto';
import { Firearm } from './schema/firearm.schema';
import { Model, ObjectId } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class FirearmsService {
  constructor(
    @InjectModel(Firearm.name)
    private firearmModel: Model<Firearm>,
  ) {}

  async createFirearm(firearmDto: FirearmDto): Promise<string> {
    try {
      const { make, model, type, caliber, action, roundCount, userId } =
        firearmDto;

      await this.firearmModel.create({
        make,
        model,
        userId,
        ...(action && { action }),
        roundCount: roundCount || 0,
        ...(type && { type }),
        ...(caliber && { caliber }),
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
        const { make, model, type, caliber, action, roundCount } = firearm;

        return {
          make,
          model,
          type,
          caliber,
          action,
          roundCount,
          userId: userId.toString(), // Convert ObjectId to string
        };
      });
    } catch (error) {
      throw new Error('Failed to get firearms');
    }
  }
}

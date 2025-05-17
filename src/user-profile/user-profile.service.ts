import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { UserProfile } from './schema/user-profile.schema';

@Injectable()
export class UserProfileService {
  constructor(
    @InjectModel(UserProfile.name)
    private userProfileModel: Model<UserProfile>,
  ) {}

  async createProfile(userId: string): Promise<UserProfile> {
    const profile = await this.userProfileModel.create({
      userId: new Types.ObjectId(userId),
    });
    return profile;
  }

  async getProfile(userId: string): Promise<UserProfile> {
    const profile = await this.userProfileModel.findOne({
      userId: new Types.ObjectId(userId),
    });
    if (!profile) {
      throw new NotFoundException('Profile not found');
    }
    return profile;
  }

  async updateProfile(
    userId: string,
    updateData: Partial<UserProfile>,
  ): Promise<UserProfile> {
    const profile = await this.userProfileModel.findOneAndUpdate(
      { userId: new Types.ObjectId(userId) },
      { $set: updateData },
      { new: true },
    );
    if (!profile) {
      throw new NotFoundException('Profile not found');
    }
    return profile;
  }

  async updateStatistics(
    userId: Types.ObjectId,
    statistics: Partial<UserProfile['statistics']>,
  ): Promise<UserProfile> {
    return this.userProfileModel
      .findOneAndUpdate({ userId }, { $set: { statistics } }, { new: true })
      .exec();
  }

  async updatePreferences(
    userId: string,
    preferences: any,
  ): Promise<UserProfile> {
    const profile = await this.userProfileModel.findOneAndUpdate(
      { userId: new Types.ObjectId(userId) },
      { $set: { preferences } },
      { new: true },
    );
    if (!profile) {
      throw new NotFoundException('Profile not found');
    }
    return profile;
  }
}

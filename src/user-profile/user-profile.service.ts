import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { UserProfile } from './schema/user-profile.schema';

@Injectable()
export class UserProfileService {
  constructor(
    @InjectModel(UserProfile.name)
    private userProfileModel: Model<UserProfile>,
  ) {}

  async createProfile(userId: Types.ObjectId): Promise<UserProfile> {
    const profile = new this.userProfileModel({
      userId,
      // All other fields will use their default values
    });
    return profile.save();
  }

  async getProfile(userId: Types.ObjectId): Promise<UserProfile> {
    return this.userProfileModel.findOne({ userId }).exec();
  }

  async updateProfile(
    userId: Types.ObjectId,
    updateData: Partial<UserProfile>,
  ): Promise<UserProfile> {
    return this.userProfileModel
      .findOneAndUpdate({ userId }, updateData, { new: true })
      .exec();
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
    userId: Types.ObjectId,
    preferences: Partial<UserProfile['preferences']>,
  ): Promise<UserProfile> {
    return this.userProfileModel
      .findOneAndUpdate({ userId }, { $set: { preferences } }, { new: true })
      .exec();
  }
}

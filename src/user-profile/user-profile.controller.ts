import {
  Controller,
  Get,
  Post,
  Put,
  Body,
  UseGuards,
  BadRequestException,
} from '@nestjs/common';
import { UserProfileService } from './user-profile.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('profile')
@UseGuards(JwtAuthGuard)
export class UserProfileController {
  constructor(private readonly userProfileService: UserProfileService) {}

  @Get()
  async getProfile(@Body('userId') userId: string) {
    try {
      if (!userId) {
        throw new BadRequestException('userId is required');
      }
      return await this.userProfileService.getProfile(userId);
    } catch (error) {
      throw new BadRequestException('Failed to get profile');
    }
  }

  @Post()
  async createProfile(@Body('userId') userId: string) {
    try {
      if (!userId) {
        throw new BadRequestException('userId is required');
      }
      return await this.userProfileService.createProfile(userId);
    } catch (error) {
      throw new BadRequestException('Failed to create profile');
    }
  }

  @Put()
  async updateProfile(@Body() updateData: any) {
    try {
      const { userId, ...data } = updateData;
      if (!userId) {
        throw new BadRequestException('userId is required');
      }
      return await this.userProfileService.updateProfile(userId, data);
    } catch (error) {
      throw new BadRequestException('Failed to update profile');
    }
  }

  @Get('stats')
  async getStatistics(@Body('userId') userId: string) {
    try {
      if (!userId) {
        throw new BadRequestException('userId is required');
      }
      const profile = await this.userProfileService.getProfile(userId);
      return profile.statistics;
    } catch (error) {
      throw new BadRequestException('Failed to get statistics');
    }
  }

  @Get('preferences')
  async getPreferences(@Body('userId') userId: string) {
    try {
      if (!userId) {
        throw new BadRequestException('userId is required');
      }
      const profile = await this.userProfileService.getProfile(userId);
      return profile.preferences;
    } catch (error) {
      throw new BadRequestException('Failed to get preferences');
    }
  }

  @Put('preferences')
  async updatePreferences(@Body() data: any) {
    try {
      const { userId, ...preferences } = data;
      if (!userId) {
        throw new BadRequestException('userId is required');
      }
      return await this.userProfileService.updatePreferences(
        userId,
        preferences,
      );
    } catch (error) {
      throw new BadRequestException('Failed to update preferences');
    }
  }
}

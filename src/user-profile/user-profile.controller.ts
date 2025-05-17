import {
  Controller,
  Get,
  Post,
  Put,
  Body,
  UseGuards,
  Request,
  BadRequestException,
} from '@nestjs/common';
import { UserProfileService } from './user-profile.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('profile')
@UseGuards(JwtAuthGuard)
export class UserProfileController {
  constructor(private readonly userProfileService: UserProfileService) {}

  @Get()
  async getProfile(@Request() req) {
    try {
      return await this.userProfileService.getProfile(req.user.id);
    } catch (error) {
      throw new BadRequestException('Failed to get profile');
    }
  }

  @Post()
  async createProfile(@Request() req) {
    try {
      return await this.userProfileService.createProfile(req.user.id);
    } catch (error) {
      throw new BadRequestException('Failed to create profile');
    }
  }

  @Put()
  async updateProfile(@Request() req, @Body() updateData: any) {
    try {
      return await this.userProfileService.updateProfile(
        req.user.id,
        updateData,
      );
    } catch (error) {
      throw new BadRequestException('Failed to update profile');
    }
  }

  @Get('stats')
  async getStatistics(@Request() req) {
    try {
      const profile = await this.userProfileService.getProfile(req.user.id);
      return profile.statistics;
    } catch (error) {
      throw new BadRequestException('Failed to get statistics');
    }
  }

  @Get('preferences')
  async getPreferences(@Request() req) {
    try {
      const profile = await this.userProfileService.getProfile(req.user.id);
      return profile.preferences;
    } catch (error) {
      throw new BadRequestException('Failed to get preferences');
    }
  }

  @Put('preferences')
  async updatePreferences(@Request() req, @Body() preferences: any) {
    try {
      return await this.userProfileService.updatePreferences(
        req.user.id,
        preferences,
      );
    } catch (error) {
      throw new BadRequestException('Failed to update preferences');
    }
  }
}

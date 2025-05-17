import {
  Controller,
  Get,
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

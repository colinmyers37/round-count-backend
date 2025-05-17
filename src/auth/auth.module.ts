import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from './schema/user.schema';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { config } from 'dotenv';
import { AuthService } from './auth.service';
import { EmailModule } from '../email/email.module';
import { UserProfileModule } from '../user-profile/user-profile.module';
import { JwtStrategy } from './strategies/jwt.strategy';

config();

@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'your-secret-key', // Use environment variable in production
      signOptions: { expiresIn: '1d' },
    }),
    MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]),
    EmailModule,
    UserProfileModule,
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
  exports: [AuthService],
})
export class AuthModule {}

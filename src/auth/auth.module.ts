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

config();

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.registerAsync({
      useFactory: () => ({
        secret: process.env.JWT_SECRET,
        signOptions: { expiresIn: process.env.JWT_EXPIRE },
      }),
    }),
    MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]),
    EmailModule,
    UserProfileModule,
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}

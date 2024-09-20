import {
  Injectable,
  UnauthorizedException,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { Model } from 'mongoose';
import { User } from './schema/user.schema';
import { InjectModel } from '@nestjs/mongoose';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { SignUpDto } from './dto/signup.dto';
import { LoginDto } from './dto/login.dto';
import * as crypto from 'crypto';
import { EmailService } from '../email/email.service';

@Injectable()
/**
 * Service responsible for handling authentication operations.
 */
export class AuthService {
  constructor(
    @InjectModel(User.name)
    private userModel: Model<User>,
    private jwtService: JwtService,
    private emailService: EmailService,
  ) {}

  async signUp(signUpDto: SignUpDto): Promise<{ token: string }> {
    const { firstName, lastName, email, password } = signUpDto;

    // Validate input
    if (!firstName || !lastName || !email || !password) {
      throw new BadRequestException('All fields are required');
    }

    // Check if email already exists
    const existingUser = await this.userModel.findOne({ email });
    if (existingUser) {
      throw new BadRequestException('Email already exists');
    }

    const hashedPassword = await this.hashPassword(password);

    const user = await this.userModel.create({
      firstName,
      lastName,
      email,
      password: hashedPassword,
    });

    return this.generateToken(user._id.toString());
  }

  async login(loginDto: LoginDto): Promise<{ token: string }> {
    const { email, password } = loginDto;
    // Validate input
    if (!email || !password) {
      throw new BadRequestException('Email and password are required');
    }

    const user = await this.userModel.findOne({ email });

    if (!user || !(await this.verifyPassword(password, user.password))) {
      throw new UnauthorizedException('Invalid email or password');
    }

    return this.generateToken(user._id.toString());
  }

  async deleteUser(userId: string): Promise<{ message: string }> {
    if (!userId || typeof userId !== 'string') {
      throw new BadRequestException('Valid user ID is required');
    }

    const result = await this.userModel.findByIdAndDelete(userId).exec();

    if (!result) {
      throw new NotFoundException(`User with ID ${userId} not found`);
    }

    return { message: 'User deleted successfully' };
  }

  async forgotPassword(email: string): Promise<{ message: string }> {
    const user = await this.userModel.findOne({ email });
    if (!user) {
      throw new NotFoundException('User not found');
    }

    const resetToken = crypto.randomBytes(32).toString('hex');
    const hashedResetToken = await bcrypt.hash(resetToken, 10);

    const expirationTime = new Date();
    expirationTime.setHours(expirationTime.getHours() + 1);

    user.resetPasswordToken = hashedResetToken;
    user.resetPasswordExpires = expirationTime;
    await user.save();

    console.log(
      `Sending reset token for email: ${email}, token: ${resetToken}`,
    );
    // Use EmailService to send the reset email
    // await this.emailService.sendPasswordResetEmail(email, resetToken);

    return { message: 'Password reset instructions sent to your email' };
  }

  private async hashPassword(password: string): Promise<string> {
    return bcrypt.hash(password, 10);
  }

  private async verifyPassword(
    plainTextPassword: string,
    hashedPassword: string,
  ): Promise<boolean> {
    return bcrypt.compare(plainTextPassword, hashedPassword);
  }

  private generateToken(userId: string): { token: string } {
    const token = this.jwtService.sign({ id: userId });
    return { token };
  }
}

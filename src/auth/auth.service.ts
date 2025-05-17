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
import { UserProfileService } from '../user-profile/user-profile.service';

//test commit
@Injectable()
/**
 * Service responsible for handling authentication operations.
 */
export class AuthService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    private jwtService: JwtService,
    private emailService: EmailService,
    private userProfileService: UserProfileService,
  ) {}

  async signUp(signUpDto: SignUpDto): Promise<{ token: string }> {
    const { firstName, lastName, email, password } = signUpDto;

    this.validateSignUpInput(firstName, lastName, email, password);
    await this.checkExistingUser(email);

    const hashedPassword = await this.hashPassword(password);
    const user = await this.createUser(
      firstName,
      lastName,
      email,
      hashedPassword,
    );

    // Create user profile after successful user creation
    await this.userProfileService.createProfile(user._id);

    return this.generateToken(user._id.toString());
  }

  async login(loginDto: LoginDto): Promise<{ token: string }> {
    const { email, password } = loginDto;
    this.validateLoginInput(email, password);

    const user = await this.findUserByEmail(email);
    await this.verifyUserPassword(password, user.password);

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
    const user = await this.findUserByEmail(email);
    const resetToken = this.generateResetToken();
    await this.saveResetToken(user, resetToken);

    console.log(
      `Sending reset token for email: ${email}, token: ${resetToken}`,
    );
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

  private validateSignUpInput(
    firstName: string,
    lastName: string,
    email: string,
    password: string,
  ): void {
    if (!firstName || !lastName || !email || !password) {
      throw new BadRequestException('All fields are required');
    }
  }

  private async checkExistingUser(email: string): Promise<void> {
    const existingUser = await this.userModel.findOne({ email });
    if (existingUser) {
      throw new BadRequestException('Email already exists');
    }
  }

  private async createUser(
    firstName: string,
    lastName: string,
    email: string,
    hashedPassword: string,
  ): Promise<User> {
    return this.userModel.create({
      firstName,
      lastName,
      email,
      password: hashedPassword,
    });
  }

  private validateLoginInput(email: string, password: string): void {
    if (!email || !password) {
      throw new BadRequestException('Email and password are required');
    }
  }

  private async findUserByEmail(email: string): Promise<User> {
    const user = await this.userModel.findOne({ email });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  private async verifyUserPassword(
    plainTextPassword: string,
    hashedPassword: string,
  ): Promise<void> {
    if (!(await this.verifyPassword(plainTextPassword, hashedPassword))) {
      throw new UnauthorizedException('Invalid email or password');
    }
  }

  private generateResetToken(): string {
    return crypto.randomBytes(32).toString('hex');
  }

  private async saveResetToken(user: User, resetToken: string): Promise<void> {
    const hashedResetToken = await bcrypt.hash(resetToken, 10);
    const expirationTime = new Date();
    expirationTime.setHours(expirationTime.getHours() + 1);

    user.resetPasswordToken = hashedResetToken;
    user.resetPasswordExpires = expirationTime;
    await user.save();
  }
}

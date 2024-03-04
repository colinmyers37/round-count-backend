import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class FirearmDto {
  @IsNotEmpty({ message: 'Make cannot be empty' })
  @IsString({ message: 'Make must be a string' })
  make: string;

  @IsNotEmpty({ message: 'Model cannot be empty' })
  @IsString({ message: 'Model must be a string' })
  model: string;

  @IsString()
  @IsOptional()
  type?: string;

  @IsString()
  @IsOptional()
  caliber?: string;

  @IsString()
  @IsOptional()
  action?: string;

  @IsNumber()
  roundCount: number;

  @IsNotEmpty({ message: 'User ID cannot be empty' })
  @IsString()
  userId: string;
}

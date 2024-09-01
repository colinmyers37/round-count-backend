import {
  IsNotEmpty,
  IsString,
  IsOptional,
  IsNumber,
  IsDate,
  Min,
} from 'class-validator';

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

  @IsNumber({}, { message: 'Round count must be a number' })
  @Min(0, { message: 'Round count must be at least 0' })
  roundCount: number;

  @IsNotEmpty({ message: 'User ID cannot be empty' })
  @IsString()
  userId: string;

  // New fields for cleaning reminders
  @IsOptional()
  @IsDate({ message: 'Last cleaned date must be a valid date' })
  lastCleanedDate?: Date; // Optional field for the last cleaned date

  @IsOptional()
  @IsNumber({}, { message: 'Reminder interval must be a number' })
  @Min(1, { message: 'Reminder interval must be at least 1 day' })
  reminderInterval?: number; // Optional field for reminder interval in days
}

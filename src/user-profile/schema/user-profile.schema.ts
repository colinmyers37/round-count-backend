import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema({
  timestamps: true,
})
export class UserProfile extends Document {
  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  userId: Types.ObjectId;

  @Prop({ type: Number, default: 0 })
  totalRoundsFired: number;

  @Prop({ type: Number, default: 0 })
  totalFirearms: number;

  @Prop({ type: Date })
  lastRangeVisit: Date;

  @Prop({ type: String })
  preferredRange: string;

  @Prop({ type: [{ type: Types.ObjectId, ref: 'Firearm' }] })
  favoriteFirearms: Types.ObjectId[];

  @Prop({ type: [{ type: String }] })
  recentActivities: string[];

  @Prop({
    type: {
      monthlyRounds: { type: Number, default: 0 },
      yearlyRounds: { type: Number, default: 0 },
      maintenanceDue: { type: Number, default: 0 },
    },
  })
  statistics: {
    monthlyRounds: number;
    yearlyRounds: number;
    maintenanceDue: number;
  };

  @Prop({
    type: {
      defaultView: { type: String, default: 'dashboard' },
      notifications: { type: Boolean, default: true },
      theme: { type: String, default: 'light' },
    },
  })
  preferences: {
    defaultView: string;
    notifications: boolean;
    theme: string;
  };
}

export const UserProfileSchema = SchemaFactory.createForClass(UserProfile);

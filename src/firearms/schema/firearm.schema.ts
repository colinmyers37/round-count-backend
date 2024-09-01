import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';

@Schema({
  timestamps: true,
})
export class Firearm {
  @Prop({ required: true })
  make: string;

  @Prop({ required: true })
  model: string;

  @Prop()
  type: string;

  @Prop()
  caliber: string;

  @Prop()
  action: string;

  @Prop()
  roundCount: number;

  @Prop({ type: Date, default: Date.now })
  lastCleanedDate: Date;

  @Prop({ type: Number, default: 30 })
  reminderInterval: number;

  @Prop({ type: 'ObjectId', ref: 'User' })
  userId: Types.ObjectId;
}

export const FirearmSchema = SchemaFactory.createForClass(Firearm);

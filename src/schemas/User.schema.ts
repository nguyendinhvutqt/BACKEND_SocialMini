import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class User extends Document {
  @Prop({ required: true })
  displayName: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop({ required: false })
  avatarUrl?: string;

  @Prop({ required: true })
  sex: string;

  @Prop({ required: true })
  birthDay: Date;

  @Prop({ required: false })
  bio?: string;

  @Prop({ required: false, default: false })
  emailVerified: boolean;

  @Prop({ required: false })
  emailVerificationToken: string;

  @Prop({ required: false })
  refreshToken: string;
}

export const UserSchema = SchemaFactory.createForClass(User);

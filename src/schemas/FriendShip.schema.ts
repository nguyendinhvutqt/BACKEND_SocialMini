import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { User } from './user.schema';

@Schema({ timestamps: true })
export class Friendship extends Document {
  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  requester: User;

  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  receiver: User;

  @Prop({ default: false })
  isAccepted: boolean;
}

export const FriendshipSchema = SchemaFactory.createForClass(Friendship);

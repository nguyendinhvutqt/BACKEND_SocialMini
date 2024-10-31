import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { User } from './user.schema';
import { Post } from './Post.schema';

@Schema({ timestamps: true })
export class Like extends Document {
  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  userId: User;

  @Prop({ type: Types.ObjectId, ref: 'Post', required: true })
  postId: Post;
}

export const LikeSchema = SchemaFactory.createForClass(Like);

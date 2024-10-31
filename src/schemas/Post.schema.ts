import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { User } from './user.schema';
import { Comment } from './comment.schema';
import { Like } from './like.schema';

@Schema({ timestamps: true })
export class Post extends Document {
  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  userId: User;

  @Prop({ required: true })
  content: string;

  @Prop({ type: [String], default: [] })
  images: string[];

  @Prop({ default: 0 })
  commentCount: number;

  @Prop({ default: 0 })
  likeCount: number;

  // Thêm mối quan hệ 1-N với Like
  @Prop({ type: [{ type: Types.ObjectId, ref: 'Like' }] })
  likes: Like[];

  // Thêm mối quan hệ 1-N với Comment
  @Prop({ type: [{ type: Types.ObjectId, ref: 'Comment' }] })
  comments: Comment[];
}

export const PostSchema = SchemaFactory.createForClass(Post);

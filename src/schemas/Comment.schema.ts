import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document, Types } from 'mongoose';
import { User } from './user.schema';
import { Post } from './post.schema';

@Schema({ timestamps: true })
export class Comment extends Document {
  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  userId: User;

  @Prop({ type: Types.ObjectId, ref: 'Post', required: true })
  postId: Post;

  @Prop({ required: true })
  content: string;

  @Prop({ type: Types.ObjectId, ref: 'Comment' })
  parentCommentId?: Comment; // Để hỗ trợ reply
}

export const CommentSchema = SchemaFactory.createForClass(Comment);

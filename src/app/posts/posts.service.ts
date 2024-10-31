import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreatePostDto } from 'src/dtos/posts/create-post.dto';
import { Post } from 'src/schemas/Post.schema';
import { UsersService } from '../users/users.service';

@Injectable()
export class PostsService {
  constructor(
    @InjectModel(Post.name) private postModel: Model<Post>,
    private readonly userService: UsersService,
  ) {}

  async findPosts() {
    return await this.postModel.find().exec();
  }

  async createPost(createPostDto: CreatePostDto) {
    const findUser = await this.userService.findById(createPostDto.userId);
    if (!findUser) {
      throw new HttpException('userId không hợp lệ', HttpStatus.BAD_REQUEST);
    }
    const newPost = new this.postModel(createPostDto);
    await newPost.save();
    await findUser.updateOne({
      $push: {
        posts: newPost._id,
      },
    });
    return newPost;
  }
}

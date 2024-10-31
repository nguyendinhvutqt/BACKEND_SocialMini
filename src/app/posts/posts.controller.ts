import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Post,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { PostsService } from './posts.service';
import { CloudinaryService } from '../cloudinary/cloudinary.service';
import { CreatePostDto } from 'src/dtos/posts/create-post.dto';
import { FilesInterceptor } from '@nestjs/platform-express';
import { Public } from '../auth/route-public';
import { UsersService } from '../users/users.service';

@Controller('posts')
export class PostsController {
  constructor(
    private readonly postsService: PostsService,
    private readonly usersService: UsersService,
    private readonly cloudinaryService: CloudinaryService,
  ) {}

  @Public()
  @Get()
  async findPosts() {
    return this.postsService.findPosts();
  }

  @Public()
  @Post()
  @UseInterceptors(FilesInterceptor('images', 10))
  async createPost(
    @UploadedFiles() files: Express.Multer.File[],
    @Body() createPostDto: CreatePostDto,
  ) {
    if (!files)
      throw new HttpException(
        'Hình ảnh không được để trống',
        HttpStatus.BAD_REQUEST,
      );

    const uploadResults = await Promise.all(
      files.map((file) => this.cloudinaryService.uploadImage(file)),
    );

    let imagesArr = uploadResults.map((result) => result.secure_url);
    return this.postsService.createPost({
      ...createPostDto,
      images: imagesArr,
    });
  }
}

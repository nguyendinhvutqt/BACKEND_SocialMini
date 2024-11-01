import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';

import { User } from 'src/schemas/user.schema';
import { CreateUserDto } from 'src/dtos/users/create-user.dto';
import { randomBytes } from 'crypto';
import { MailService } from '../mail/mail.service';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    private readonly mailService: MailService,
  ) {}

  async findById(id: string) {
    return this.userModel
      .findById(id)
      .select('_id displayName avatarUrl sex birthDay email friends posts');
  }

  async getAllUser() {
    return this.userModel.find().exec();
  }

  async getUserByEmail(email: string): Promise<User | undefined> {
    return this.userModel.findOne({ email: email }).exec();
  }

  async findByVerificationToken(token: string): Promise<User | null> {
    return await this.userModel.findOne({ emailVerificationToken: token });
  }

  async userAddPost(postId: string) {}

  async createUser(createUserDto: CreateUserDto) {
    // Tạo token xác thực
    const verificationToken = randomBytes(32).toString('hex');

    // Create displayName and hash the password
    const displayName = `${createUserDto.firstName} ${createUserDto.lastName}`;
    const saltOrRounds = 10;
    const hashPassword = await bcrypt.hash(
      createUserDto.password,
      saltOrRounds,
    );

    // Create new user with hashed password
    const newUser = new this.userModel({
      ...createUserDto,
      avatarUrl:
        'https://wallpapers.com/images/hd/cool-xbox-profile-pictures-9dtcc745il694rjs.jpg',
      displayName: displayName.trim(),
      password: hashPassword,
      confirmPassword: undefined, // Optional: Exclude confirmPassword from being saved
      emailVerificationToken: verificationToken,
      emailVerified: false,
    });
    await newUser.save();

    // Gửi email xác thực
    await this.mailService.sendVerificationEmail(
      newUser.email,
      verificationToken,
    );

    return newUser;
  }

  async verifyEmail(userId: any): Promise<User | null> {
    return this.userModel.findByIdAndUpdate(
      userId,
      { emailVerified: true, emailVerificationToken: null },
      { new: true },
    );
  }

  async searchUsers(query: string) {
    // Tìm kiếm theo displayName hoặc email
    return this.userModel
      .find({
        $or: [
          { displayName: { $regex: query, $options: 'i' } },
          { email: { $regex: query, $options: 'i' } },
        ],
      })
      .select('_id displayName avatarUrl')
      .exec();
  }
}

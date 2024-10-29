import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Post,
  Query,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './local-auth.guard';
import { CreateUserDto } from 'src/dtos/users/create-user.dto';
import { Public } from './route-public';
import { UsersService } from '../users/users.service';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly usersService: UsersService,
  ) {}

  @Public()
  @UseGuards(LocalAuthGuard)
  @Post('sign-in')
  async signIn(@Request() req) {
    return this.authService.signIn(req.user._doc);
  }

  @Public()
  @Post('sign-up')
  async singUp(@Body() createUserDto: CreateUserDto) {
    // check email exist
    const isEmailExist = await this.usersService.getUserByEmail(
      createUserDto.email,
    );

    if (isEmailExist) {
      throw new HttpException('Email đã tồn tại', HttpStatus.BAD_REQUEST);
    }

    // check password equal confirmPassword
    if (createUserDto.password !== createUserDto.confirmPassword) {
      throw new HttpException(
        'Xác nhận mật khẩu không khớp với mật khẩu',
        HttpStatus.BAD_REQUEST,
      );
    }
    return this.usersService.createUser(createUserDto);
  }

  @Public()
  @Get('verify-email')
  async verifyEmail(@Query('token') token: string) {
    const user = await this.usersService.findByVerificationToken(token);
    if (!user) {
      throw new HttpException('Token không hợp lệ', HttpStatus.BAD_REQUEST);
    }

    await this.usersService.verifyEmail(user._id);

    return { status: 'ok', message: 'Email đã được xác thực thành công' };
  }

  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }

  @Public()
  @Get('test')
  async test() {
    return 'tesst';
  }
}

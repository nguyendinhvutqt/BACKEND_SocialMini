import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
  Query,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { Public } from '../auth/route-public';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  async findAllUser() {
    return this.usersService.getAllUser();
  }

  @Post('user')
  async getUser(@Body() dto: { email: string }) {
    return this.usersService.getUserByEmail(dto.email);
  }

  @Public()
  @Get('search')
  async searchUsers(@Query('q') query: string) {
    return this.usersService.searchUsers(query);
  }

  @Public()
  @Get('profile-user')
  async getUserById(@Query('id') id: string) {
    return await this.usersService.findById(id);
  }
}

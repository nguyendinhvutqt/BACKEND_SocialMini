import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
} from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  async findAllUser() {
    return this.usersService.getAllUser();
  }

  @Post('/user')
  async getUser(@Body() dto: { email: string }) {
    return this.usersService.getUserByEmail(dto.email);
  }
}

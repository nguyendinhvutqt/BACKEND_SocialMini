import { ApiProperty } from '@nestjs/swagger';
import {
  IsDateString,
  IsNotEmpty,
  IsString,
  Matches,
  MinLength,
} from 'class-validator';

export class CreateUserDto {
  @ApiProperty({
    description: 'Tên đầu tiên của người dùng',
    example: 'Nguyễn',
  })
  @IsNotEmpty({ message: 'FirstName không được để trống' })
  @IsString({ message: 'FirstName phải là chuỗi ký tự' })
  firstName: string;

  @ApiProperty({
    description: 'Tên cuối của người dùng',
    example: 'Văn A',
  })
  @IsNotEmpty({ message: 'LastName không được để trống' })
  @IsString({ message: 'LastName phải là chuỗi ký tự' })
  lastName: string;

  @ApiProperty({
    description: 'Email của người dùng',
    example: 'example@example.com',
  })
  @IsString()
  @Matches(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/, {
    message: 'Email không hợp lệ',
  })
  email: string;

  @ApiProperty({
    description: 'Mật khẩu của người dùng',
    example: 'password123',
    minLength: 6,
  })
  @IsNotEmpty({ message: 'Mật khẩu không được để trống' })
  @MinLength(6, { message: 'Mật khẩu phải lớn hơn 5 kí tự' })
  password: string;

  @ApiProperty({
    description: 'Xác nhận mật khẩu',
    example: 'password123',
    minLength: 6,
  })
  @IsNotEmpty({ message: 'Xác nhận mật khẩu không được để trống' })
  @MinLength(6, { message: 'Mật khẩu phải lớn hơn 5 kí tự' })
  confirmPassword: string;

  @ApiProperty({
    description: 'Giới tính của người dùng',
    example: 'Nam',
  })
  @IsNotEmpty({ message: 'Giới tính không được để trống' })
  @IsString()
  sex: string;

  @ApiProperty({
    description: 'Ngày sinh của người dùng',
    example: '2001-01-01',
  })
  @IsNotEmpty({ message: 'Ngày sinh không được để trống' })
  @IsDateString()
  birthDay: string;
}

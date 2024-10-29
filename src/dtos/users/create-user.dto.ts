import {
    IsDateString,
    IsNotEmpty,
    IsString,
    Matches,
    MinLength,
  } from 'class-validator';
  
  export class CreateUserDto {
    @IsNotEmpty({ message: 'FirstName không được để trống' })
    @IsString({ message: 'FirstName phải là chuổi ký tự' })
    firstName: string;
  
    @IsNotEmpty({ message: 'LastName không được để trống' })
    @IsString({ message: 'LastName phải là chuổi ký tự' })
    lastName: string;
  
    @IsString()
    @Matches(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/, {
      message: 'Email không hợp lệ',
    })
    email: string;
  
    @IsNotEmpty({ message: 'Mật khẩu không được để trống' })
    @MinLength(6, { message: 'Mật khẩu phải lớn hơn 5 kí tự' })
    password: string;
  
    @IsNotEmpty({ message: 'Xác nhận mật khẩu không được để trống' })
    @MinLength(6, { message: 'Mật khẩu phải lớn hơn 5 kí tự' })
    confirmPassword: string;
  
    @IsNotEmpty({ message: 'Giới tính không được để trống' })
    @IsString()
    sex: string;
  
    @IsNotEmpty({ message: 'Ngày sinh không được để trống' })
    @IsDateString()
    birthDay: string;
  }
  
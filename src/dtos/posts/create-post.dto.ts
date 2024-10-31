import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsArray,
  IsMongoId,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreatePostDto {
  @ApiProperty({ description: 'ID của người dùng đăng bài', type: String })
  @IsNotEmpty({ message: 'userId không hợp lệ' })
  @IsMongoId({ message: 'userId không hợp lệ' })
  userId: string;

  @ApiProperty({ description: 'Nội dung của bài đăng', type: String })
  @IsNotEmpty({ message: 'Nội dung không được để trống' })
  content: string;

  @ApiProperty({
    description: 'Danh sách tệp hình ảnh của bài đăng',
    type: 'array',
    items: { type: 'string', format: 'binary' },
    required: false,
  })
  @IsOptional()
  @IsArray()
  @Type(() => String)
  images: string[];
}

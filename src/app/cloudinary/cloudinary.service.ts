import { Injectable } from '@nestjs/common';
import { UploadApiResponse } from 'cloudinary';
import cloudinary from './cloudinary.config';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class CloudinaryService {
  constructor(private readonly configService: ConfigService) {}

  async uploadImage(file: Express.Multer.File): Promise<UploadApiResponse> {
    return new Promise((resolve, reject) => {
      cloudinary.uploader
        .upload_stream(
          {
            folder:
              this.configService.get<string>('FOLDER_NAME_UPLOAD') ||
              'social_mini',
          },
          (error, result) => {
            if (error) reject(error);
            else resolve(result);
          },
        )
        .end(file.buffer);
    });
  }
}

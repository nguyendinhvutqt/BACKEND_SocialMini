import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './app/users/users.module';
import { AuthModule } from './app/auth/auth.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtAuthGuard } from './app/auth/jwt-auth.guard';
import { APP_GUARD } from '@nestjs/core';
import { MailModule } from './app/mail/mail.module';
import { PostsModule } from './app/posts/posts.module';
import { CloudinaryService } from './app/cloudinary/cloudinary.service';
import { configureCloudinary } from './app/cloudinary/cloudinary.config';
import { FriendshipModule } from './app/friendship/friendship.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>('MONGODB_URI'),
      }),
    }),
    UsersModule,
    AuthModule,
    MailModule,
    PostsModule,
    FriendshipModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
    CloudinaryService,
    {
      provide: 'CLOUDINARY_CONFIG',
      useFactory: (configService: ConfigService) => {
        configureCloudinary(configService);
      },
      inject: [ConfigService],
    },
  ],
})
export class AppModule {}

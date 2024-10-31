import { Module } from '@nestjs/common';
import { FriendshipService } from './friendship.service';
import { FriendshipGateway } from './friendship.gateway';
import { MongooseModule } from '@nestjs/mongoose';
import { Friendship, FriendshipSchema } from 'src/schemas/FriendShip.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Friendship.name, schema: FriendshipSchema },
    ]),
  ],
  providers: [FriendshipGateway, FriendshipService],
})
export class FriendshipModule {}

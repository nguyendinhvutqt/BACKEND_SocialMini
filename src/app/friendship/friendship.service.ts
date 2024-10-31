import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Friendship } from 'src/schemas/FriendShip.schema';

@Injectable()
export class FriendshipService {
  constructor(
    @InjectModel(Friendship.name) private friendshipModel: Model<Friendship>,
  ) {}

  async sendFriendRequest(data: { requesterId: string; receiverId: string }) {
    const friendRequest = new this.friendshipModel({
      requester: data.requesterId,
      receiver: data.receiverId,
    });
    return friendRequest.save();
  }

  async acceptFriendRequest(friendshipId: string) {
    return this.friendshipModel.findByIdAndUpdate(
      friendshipId,
      {
        isAccepted: true,
      },
      { new: true },
    );
  }
}

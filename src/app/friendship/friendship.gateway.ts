import {
  ConnectedSocket,
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { FriendshipService } from './friendship.service';
import { Server, Socket } from 'socket.io';

@WebSocketGateway({ cors: true })
export class FriendshipGateway {
  @WebSocketServer()
  server: Server;

  constructor(private readonly friendshipService: FriendshipService) {}

  // Lắng nghe sự kiện gửi yêu cầu kết bạn
  @SubscribeMessage('sendFriendRequest')
  async handleSendFriendRequest(
    @MessageBody() data: { requesterId: string; receiverId: string },
    @ConnectedSocket() client: Socket,
  ) {
    const freindRequest = await this.friendshipService.sendFriendRequest(data);

    // Thông báo tới người nhận về yêu cầu kết bạn mới
    this.server
      .to(data.receiverId)
      .emit('friendRequestReceived', freindRequest);
  }

  // Lắng nghe sự kiện chấp nhận yêu cầu kết bạn
  @SubscribeMessage('acceptFreindRequest')
  async handleAcceptFriendRequest(
    @MessageBody() data: { friendshipId: string },
  ) {
    const updateFriendship = await this.friendshipService.acceptFriendRequest(
      data.friendshipId,
    );

    // Thông báo tới cả hai người dùng rằng yêu cầu đã được chấp nhận
    this.server
      .to(updateFriendship.requester._id as string)
      .emit('friendRequestAccepted', updateFriendship);
    this.server
      .to(updateFriendship.receiver._id as string)
      .emit('freindRequestAccepted', updateFriendship);
  }

  // Gửi thông báo tới client ngay khi kết nối
  handleConnection(client: Socket) {
    const userId = client.handshake.query.userId; // Lấy userId từ query params khi kết nối
    client.join(userId); // Kết nối vào phòng của chính user đó
    console.log(`User with ID ${userId} joined their room.`);
  }

  // Xử lý khi client ngắt kết nối
  handleDisconnect(client: Socket) {
    console.log('Client disconnected: ', client.id);
  }
}

import { ConnectedSocket, MessageBody, SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server } from 'socket.io';
import { ChatService } from './chat.service';

@WebSocketGateway({
    cors: {
        origin: '*',
    },
})
export class ChatGateway {
    @WebSocketServer()
    server: Server;

    constructor(private chatService: ChatService) {}

    @SubscribeMessage('join')
    async join(
        @ConnectedSocket() client,
        @MessageBody()
        { users, joinedUserId }: { users: number[]; joinedUserId: number }
    ) {
        const chat = await this.chatService.getChatByUserIds(users);

        if (!chat) {
            return;
        }

        await this.chatService.readChatMessages({ chatId: chat.id, userId: joinedUserId });

        const room = chat.id.toString();

        client.join(room);
        this.server.to(room).emit('room', room);
    }

    @SubscribeMessage('message')
    async findAll(@MessageBody() { chatId, message, userId }: { chatId: string; message: string; userId: number }) {
        const createdSMS = await this.chatService.createMessage({ chatId: Number(chatId), message, userId });

        this.server.to(chatId).emit('message', createdSMS);
    }
}

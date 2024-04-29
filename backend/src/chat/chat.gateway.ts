import { MessageBody, SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
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
        // @ConnectedSocket() client,
        @MessageBody()
        {}: { clientId: number; apartmentId: number }
    ) {
        // const founded = await this.apartmentService.getOne(apartmentId);
        //
        // if (!apartmentId || !clientId) {
        //     return;
        // }
        //
        // const foundedChat = founded.chats.find((chat) => {
        //     return chat.apartmentId === apartmentId && chat.clientId === clientId;
        // });
        //
        // this.answerWithRoom(client, foundedChat.id);
    }

    @SubscribeMessage('message')
    async findAll(@MessageBody() { chatRoom, message, userId }: { chatRoom: string; message: string; userId: number }) {
        const createdSMS = await this.chatService.createMessage({ chatId: Number(chatRoom), message, userId });

        this.server.to(chatRoom).emit('message', createdSMS);
    }

    private answerWithRoom(socket: any, roomId: number) {
        const room = roomId.toString();

        socket.join(room);
        this.server.to(room).emit('room', room);
    }
}

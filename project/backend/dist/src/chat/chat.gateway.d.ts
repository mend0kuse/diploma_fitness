import { Server } from 'socket.io';
import { ChatService } from './chat.service';
export declare class ChatGateway {
    private chatService;
    server: Server;
    constructor(chatService: ChatService);
    join(client: any, { users }: {
        users: number[];
    }): Promise<void>;
    findAll({ chatId, message, userId }: {
        chatId: string;
        message: string;
        userId: number;
    }): Promise<void>;
    private answerWithRoom;
}

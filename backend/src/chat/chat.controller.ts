import { Body, Controller, Post } from '@nestjs/common';
import { ChatService } from './chat.service';

@Controller('chat')
export class ChatController {
    constructor(private chatService: ChatService) {}

    @Post()
    createChat(@Body() { userIds }: { userIds: number[] }) {
        const founded = this.chatService.getChatByUserIds(userIds);

        if (founded) {
            return founded;
        }

        return this.chatService.createChat(userIds);
    }
}

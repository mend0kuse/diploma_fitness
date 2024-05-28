import { Body, Controller, Post } from '@nestjs/common';
import { ChatService } from './chat.service';
import { UserService } from 'src/user/user.service';

@Controller('chat')
export class ChatController {
    constructor(
        private chatService: ChatService,
        private userService: UserService
    ) {}

    @Post()
    async createChat(@Body() { userIds }: { userIds: number[] }) {
        const founded = await this.chatService.getChatByUserIds(userIds);

        if (founded) {
            return founded;
        }

        return this.chatService.createChat(userIds);
    }

    @Post('admin')
    async createChatWithAdmin(@Body() { userIds }: { userIds: number[] }) {
        const admin = await this.userService.findAdmin();
        const ids = [...userIds, admin?.id];

        const foundedChat = await this.chatService.getChatByUserIds(ids);
        if (foundedChat) {
            return foundedChat;
        }

        return this.chatService.createChat(ids);
    }
}

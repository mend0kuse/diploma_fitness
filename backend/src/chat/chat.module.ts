import { Module } from '@nestjs/common';
import { ChatGateway } from './chat.gateway';
import { ChatService } from './chat.service';
import { PrismaService } from '../prisma/prisma.service';
import { UserService } from '../user/user.service';
import { ChatController } from './chat.controller';

@Module({
    providers: [ChatGateway, ChatService, PrismaService, UserService],
    controllers: [ChatController],
})
export class ChatModule {}

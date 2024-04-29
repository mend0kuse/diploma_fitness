import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ChatService {
    constructor(private prismaService: PrismaService) {}

    createMessage({ userId, message }: { chatId: number; userId: number; message: string }) {
        return this.prismaService.chatMessage.create({
            data: {
                user: {
                    connect: {
                        id: userId,
                    },
                },
                message,
            },
            include: {
                user: {
                    include: {
                        profile: true,
                    },
                },
            },
        });
    }
}

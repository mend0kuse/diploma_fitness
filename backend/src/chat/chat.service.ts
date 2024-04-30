import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { ChatMessage, User } from '@prisma/client';

@Injectable()
export class ChatService {
    constructor(private prismaService: PrismaService) {}

    createMessage({ userId, message, chatId }: { chatId: number; userId: number; message: string }) {
        return this.prismaService.chatMessage.create({
            data: {
                user: {
                    connect: {
                        id: userId,
                    },
                },
                chat: {
                    connect: {
                        id: chatId,
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

    createChat(userIds: number[]) {
        return this.prismaService.chat.create({
            data: {
                users: {
                    create: userIds.map((id) => {
                        return { user: { connect: { id } } };
                    }),
                },
            },
        });
    }

    getChatByUserIds(userIds: number[]) {
        return this.prismaService.chat.findFirst({
            where: {
                users: {
                    every: {
                        user: {
                            id: {
                                in: userIds,
                            },
                        },
                    },
                },
            },
        });
    }
}

import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ChatService {
    constructor(private prismaService: PrismaService) {}

    private chatInclude = {
        users: {
            include: {
                user: { include: { profile: true } },
            },
        },
        messages: true,
    };

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
            include: this.chatInclude,
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
            include: this.chatInclude,
        });
    }

    readChatMessages({ chatId, userId }: { chatId: number; userId: number }) {
        return this.prismaService.chatMessage.updateMany({
            where: {
                AND: [{ chatId }, { seenAt: null }, { userId: { not: userId } }],
            },
            data: {
                seenAt: new Date(),
            },
        });
    }
}

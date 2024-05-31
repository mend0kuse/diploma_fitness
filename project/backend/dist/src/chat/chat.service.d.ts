import { PrismaService } from '../prisma/prisma.service';
export declare class ChatService {
    private prismaService;
    constructor(prismaService: PrismaService);
    private chatInclude;
    createMessage({ userId, message, chatId }: {
        chatId: number;
        userId: number;
        message: string;
    }): import(".prisma/client").Prisma.Prisma__ChatMessageClient<{
        user: {
            profile: {
                id: number;
                userId: number;
                name: string;
                status: string;
                avatar: string;
            };
        } & {
            id: number;
            email: string;
            role: string;
            password: string;
        };
    } & {
        id: number;
        createdAt: Date;
        message: string;
        userId: number;
        chatId: number;
    }, never, import("@prisma/client/runtime/library").DefaultArgs>;
    createChat(userIds: number[]): import(".prisma/client").Prisma.Prisma__ChatClient<{
        messages: {
            id: number;
            createdAt: Date;
            message: string;
            userId: number;
            chatId: number;
        }[];
        users: ({
            user: {
                profile: {
                    id: number;
                    userId: number;
                    name: string;
                    status: string;
                    avatar: string;
                };
            } & {
                id: number;
                email: string;
                role: string;
                password: string;
            };
        } & {
            userId: number;
            chatId: number;
        })[];
    } & {
        id: number;
    }, never, import("@prisma/client/runtime/library").DefaultArgs>;
    getChatByUserIds(userIds: number[]): import(".prisma/client").Prisma.Prisma__ChatClient<{
        messages: {
            id: number;
            createdAt: Date;
            message: string;
            userId: number;
            chatId: number;
        }[];
        users: ({
            user: {
                profile: {
                    id: number;
                    userId: number;
                    name: string;
                    status: string;
                    avatar: string;
                };
            } & {
                id: number;
                email: string;
                role: string;
                password: string;
            };
        } & {
            userId: number;
            chatId: number;
        })[];
    } & {
        id: number;
    }, null, import("@prisma/client/runtime/library").DefaultArgs>;
}

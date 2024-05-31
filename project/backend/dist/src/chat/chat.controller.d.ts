import { ChatService } from './chat.service';
import { UserService } from 'src/user/user.service';
export declare class ChatController {
    private chatService;
    private userService;
    constructor(chatService: ChatService, userService: UserService);
    createChat({ userIds }: {
        userIds: number[];
    }): Promise<{
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
    }>;
    createChatWithAdmin({ userIds }: {
        userIds: number[];
    }): Promise<{
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
    }>;
}

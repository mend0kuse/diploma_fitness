import { Chat, ChatMessage, ChatOnUser, Profile, User } from '@prisma/client';
type TChatOnUser = ChatOnUser & {
    chat: Chat & {
        messages: ChatMessage[];
    } & {
        users: (TChatOnUser & {
            user: User & {
                profile: Profile;
            };
        })[];
    };
};
export declare const mapUserChat: (user: User & {
    chats: TChatOnUser[];
}) => {
    chats: {
        id: number;
        messages: {
            id: number;
            createdAt: Date;
            message: string;
            userId: number;
            chatId: number;
        }[];
        users: ({
            id: number;
            email: string;
            role: string;
            password: string;
        } & {
            profile: Profile;
        })[];
    }[];
    id: number;
    email: string;
    role: string;
    password: string;
};
export {};

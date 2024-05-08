import { TUser } from '../user';

export type TChat = {
    id: number;
    users: TUser[];
    messages: TMessage[];
};

export type TMessage = {
    id: number;
    message: string;
    chatId: number;
    createdAt: string;
    userId: number;
    user: TUser;
};

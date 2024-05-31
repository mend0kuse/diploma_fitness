import { Chat, ChatMessage, ChatOnUser, Profile, User } from '@prisma/client';

// xd

type TChatOnUser = ChatOnUser & {
    chat: Chat & { messages: ChatMessage[] } & { users: (TChatOnUser & { user: User & { profile: Profile } })[] };
};

export const mapUserChat = (user: User & { chats: TChatOnUser[] }) => {
    return {
        ...user,
        chats: user.chats.map((chatOnUser) => {
            return {
                id: chatOnUser.chatId,
                messages: chatOnUser.chat.messages,
                users: chatOnUser.chat.users.map((userOnChat) => userOnChat.user),
            };
        }),
    };
};

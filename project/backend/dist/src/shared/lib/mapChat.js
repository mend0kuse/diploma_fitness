"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mapUserChat = void 0;
const mapUserChat = (user) => {
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
exports.mapUserChat = mapUserChat;
//# sourceMappingURL=mapChat.js.map
import {
    ChatContainer,
    ConversationHeader,
    MessageList,
    MessageInput,
    Message,
    Avatar,
    MessageSeparator,
} from '@chatscope/chat-ui-kit-react';
import { user } from '../user';
import { TChat } from './chat-model';
import { observer } from 'mobx-react-lite';
import { useChat } from './useChat';
import dayjs from 'dayjs';

export const Chat = observer(({ chat }: { chat: TChat }) => {
    const { users } = chat;

    const ownIndex = users.findIndex((chatUser) => chatUser.id === user.id);
    const oppositeUser = users[ownIndex === 0 ? 1 : 0];

    const { messages, sendMessage } = useChat({ chat, users });

    return (
        <ChatContainer>
            <ConversationHeader>
                <Avatar size={'md'} src={oppositeUser?.profile.avatar} />
                <ConversationHeader.Content userName={oppositeUser?.profile.name ?? oppositeUser.email} />
            </ConversationHeader>
            <MessageList>
                {messages.length > 0 &&
                    messages.map((message, index) => {
                        const showSeparator = (() => {
                            if (index === 0) {
                                return true;
                            }

                            const nextMessage = messages[index + 1];
                            if (!nextMessage) {
                                return false;
                            }

                            return !dayjs(nextMessage.createdAt).isSame(message.createdAt, 'day');
                        })();

                        return (
                            <>
                                {showSeparator && (
                                    <MessageSeparator
                                        as='h2'
                                        content={new Date(message.createdAt).toLocaleDateString()}
                                    />
                                )}

                                <Message
                                    key={message.id}
                                    model={{
                                        direction: message.user.id === user.id ? 'outgoing' : 'incoming',
                                        position: 'single',
                                        message: message.message,
                                        sentTime: message.createdAt,
                                        sender: message.user.profile.name,
                                    }}
                                >
                                    <Message.Header sentTime={new Date(message.createdAt).toLocaleTimeString()} />
                                    <Avatar src={message.user.profile.avatar} />
                                </Message>
                            </>
                        );
                    })}
            </MessageList>
            <MessageInput onSend={sendMessage} attachButton={false} placeholder='...' />
        </ChatContainer>
    );
});

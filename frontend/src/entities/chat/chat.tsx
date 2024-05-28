import {
    ChatContainer,
    ConversationHeader,
    MessageList,
    MessageInput,
    Message,
    Avatar,
} from '@chatscope/chat-ui-kit-react';
import { user } from '../user';
import { TChat } from './chat-model';
import { observer } from 'mobx-react-lite';
import { useChat } from './useChat';

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
                    messages.map((message) => {
                        return (
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
                                <Avatar src={message.user.profile.avatar} />
                            </Message>
                        );
                    })}
            </MessageList>
            <MessageInput onSend={sendMessage} attachButton={false} placeholder='...' />
        </ChatContainer>
    );
});

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

export const Chat = observer(({ chat: { messages, users, id } }: { chat: TChat }) => {
    const ownIndex = users.findIndex((chatUser) => chatUser.id === user.id);
    const oppositeUser = users[ownIndex === 0 ? 1 : 0];

    return (
        <ChatContainer>
            <ConversationHeader>
                <Avatar size={'md'} src={oppositeUser.profile.avatar} />
                <ConversationHeader.Content userName={oppositeUser.profile.name} />
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
            <MessageInput autoFocus onSend={() => {}} attachButton={false} placeholder='Type message here' />
        </ChatContainer>
    );
});

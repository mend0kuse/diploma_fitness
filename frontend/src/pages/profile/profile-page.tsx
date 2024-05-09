import { useEditProfile, useGetActiveChat, useGetUser } from '@/pages/profile/profile-hooks';
import { Group, Loader, LoadingOverlay, Tabs, Text } from '@mantine/core';
import { CenteredLayout, Layout } from '@/layout';
import { ProfileForm } from '@/entities/user';
import { ProfileInput, user } from '@/entities/user/user-model';
import { transformAxiosError } from '@/shared/lib/axios/transformAxiosError';
import { convertToFormData } from '@/shared/lib/form/convertToFormData';
import { observer } from 'mobx-react-lite';
import { UserInfoAction } from '@/pages/profile/ui/profile-card/profile-card';
import { AiOutlineHeart, AiOutlineProfile, AiOutlineWechat } from 'react-icons/ai';
import { OrdersList } from './ui/orders-list';
import { Chat } from '@/entities/chat/chat';
import { ConversationList, Conversation, Avatar, MainContainer, Sidebar } from '@chatscope/chat-ui-kit-react';
import { TChat } from '@/entities/chat/chat-model';
import { useEffect, useState } from 'react';

const TABS_SECTION = {
    PROFILE: 'profile',
    CHAT: 'chat',
    HISTORY: 'history',
    STATS: 'stats',
} as const;

export const ProfilePage = observer(() => {
    const activeChatId = useGetActiveChat();
    const [selectedChat, setSelectedChat] = useState<null | TChat>(null);

    const { data, isError, isLoading } = useGetUser();

    const { editProfile, isPending: isPendingEdit, error: errorEdit } = useEditProfile({});

    const onSubmit = (profile: ProfileInput) => {
        editProfile(convertToFormData(profile, 'avatar'));
    };

    const isHomeProfile = user.id === data?.id;
    const chats = data?.chats;

    useEffect(() => {
        if (data && activeChatId) {
            setSelectedChat(data.chats.find((ch) => ch.id === Number(activeChatId)) ?? null);
        }
    }, [data]);

    if (isLoading) {
        return (
            <CenteredLayout>
                <Loader />
            </CenteredLayout>
        );
    }

    if (isError || !data) {
        return (
            <CenteredLayout>
                <Text c={'red'} size='lg'>
                    Пользователь не найден
                </Text>
            </CenteredLayout>
        );
    }

    return (
        <Layout>
            <Group justify={'center'}>
                <UserInfoAction user={data} />
            </Group>

            {isHomeProfile && (
                <Tabs
                    styles={{
                        root: { height: 600 },
                        panel: { paddingTop: 30, position: 'relative', height: '100%' },
                    }}
                    defaultValue={activeChatId ? TABS_SECTION.CHAT : TABS_SECTION.PROFILE}
                >
                    <Tabs.List>
                        <Tabs.Tab value={TABS_SECTION.PROFILE} leftSection={<AiOutlineProfile />}>
                            Профиль
                        </Tabs.Tab>
                        <Tabs.Tab value={TABS_SECTION.CHAT} leftSection={<AiOutlineWechat />}>
                            Чаты
                        </Tabs.Tab>
                        <Tabs.Tab value={TABS_SECTION.HISTORY} leftSection={<AiOutlineHeart />}>
                            Тренировки
                        </Tabs.Tab>
                    </Tabs.List>

                    <Tabs.Panel value={TABS_SECTION.PROFILE}>
                        <LoadingOverlay
                            visible={isPendingEdit}
                            zIndex={1000}
                            overlayProps={{ radius: 'sm', blur: 2 }}
                        />
                        <ProfileForm onSubmit={onSubmit} profile={data.profile} />
                        {errorEdit && <Text c={'red'}>{transformAxiosError(errorEdit)}</Text>}
                    </Tabs.Panel>

                    <Tabs.Panel value={TABS_SECTION.CHAT}>
                        {!chats && <Text c={'red'}>Ошибка при загрузке чатов</Text>}

                        {chats && (
                            <MainContainer>
                                <Sidebar position='left'>
                                    <ConversationList>
                                        {chats.length === 0 && <Text>Пока пусто</Text>}
                                        {chats.map((chat) => {
                                            const { messages, users, id } = chat;

                                            const ownIndex = users.findIndex((chatUser) => chatUser.id === user.id);
                                            const oppositeUser = users[ownIndex === 0 ? 1 : 0];
                                            const lastMessage = messages.at(-1);

                                            return (
                                                <Conversation
                                                    active={selectedChat?.id === id}
                                                    onClick={() => setSelectedChat(chat)}
                                                    key={`conversation-${id}`}
                                                    info={lastMessage?.message ?? 'Сообщений нет'}
                                                    lastSenderName={
                                                        lastMessage?.user.profile.name ?? lastMessage?.user.email
                                                    }
                                                    name={oppositeUser.profile.name ?? oppositeUser.email}
                                                >
                                                    <Avatar src={oppositeUser.profile.avatar} />
                                                </Conversation>
                                            );
                                        })}
                                    </ConversationList>
                                </Sidebar>

                                {selectedChat && <Chat key={selectedChat.id} chat={selectedChat} />}
                            </MainContainer>
                        )}
                    </Tabs.Panel>

                    <Tabs.Panel value={TABS_SECTION.HISTORY}>
                        <OrdersList orders={data.orders ?? []} />
                    </Tabs.Panel>
                </Tabs>
            )}
        </Layout>
    );
});

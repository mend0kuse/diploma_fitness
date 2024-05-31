import {
    useEditProfile,
    useGetActiveChat,
    useGetUser,
    useGetUserOrders,
    useGetUserStats,
} from '@/pages/profile/profile-hooks';
import { Container, Group, Loader, LoadingOverlay, Stack, Tabs, Text, Title } from '@mantine/core';
import { CenteredLayout, Layout } from '@/layout';
import { ProfileForm } from '@/entities/user';
import { ProfileInput, user } from '@/entities/user/user-model';
import { transformAxiosError } from '@/shared/lib/axios/transformAxiosError';
import { convertToFormData } from '@/shared/lib/form/convertToFormData';
import { observer } from 'mobx-react-lite';
import { ProfileCard } from '@/pages/profile/ui/profile-card';
import {
    AiFillDollarCircle,
    AiFillMessage,
    AiFillPieChart,
    AiFillProfile,
    AiFillSchedule,
    AiOutlineWechat,
} from 'react-icons/ai';
import { OrdersList } from './ui/orders-list';
import { Chat } from '@/entities/chat/chat';
import { ConversationList, Conversation, Avatar, MainContainer, Sidebar } from '@chatscope/chat-ui-kit-react';
import { TChat } from '@/entities/chat/chat-model';
import { useEffect, useState } from 'react';
import { ReviewsList } from './ui/reviews-list';
import { PaymentsList } from './ui/payments-list';
import { WorkoutsList } from './ui/workouts-list';
import { Stats } from './ui/stats';

const TABS_SECTION = {
    PROFILE: 'profile',
    CHAT: 'chat',
    HISTORY: 'history',
    REVIEWS: 'reviews',
    PAYMENTS: 'payments',
    STATS: 'stats',
} as const;

export const ProfilePage = observer(() => {
    const activeChatId = useGetActiveChat();
    const [selectedChat, setSelectedChat] = useState<null | TChat>(null);

    const { data, isError, isLoading } = useGetUser();
    const { data: userOrders, isLoading: isLoadingOrders } = useGetUserOrders();
    const { data: userStats, isLoading: isLoadingStats } = useGetUserStats();

    const { editProfile, isPending: isPendingEdit, error: errorEdit } = useEditProfile({});

    const onSubmit = (profile: ProfileInput) => {
        editProfile(convertToFormData(profile, 'avatar'));
    };

    const isHomeProfile = user.id === data?.id;
    const isGuestProfile = !isHomeProfile;
    const isTrainerProfile = data?.role === 'trainer';

    useEffect(() => {
        if (data && activeChatId) {
            setSelectedChat(data.chats.find((ch) => ch.id === Number(activeChatId)) ?? null);
        }
    }, [data]);

    if (isLoading || isLoadingOrders || isLoadingStats) {
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

    const chats = data.chats;

    return (
        <Layout>
            <Container size={'xl'}>
                <Group justify={'center'}>
                    <ProfileCard user={data} />
                </Group>

                {isGuestProfile && isTrainerProfile && !!data.myReviews && (
                    <Stack>
                        <Title>Отзывы</Title>
                        <ReviewsList reviews={data.myReviews} />
                    </Stack>
                )}

                {isHomeProfile && (
                    <Tabs
                        styles={{
                            root: { height: 600 },
                            panel: { paddingTop: 30, position: 'relative', height: '100%' },
                        }}
                        defaultValue={activeChatId ? TABS_SECTION.CHAT : TABS_SECTION.PROFILE}
                    >
                        <Tabs.List>
                            {user.isClient && (
                                <Tabs.Tab value={TABS_SECTION.PAYMENTS} leftSection={<AiFillDollarCircle size={25} />}>
                                    Покупки
                                </Tabs.Tab>
                            )}
                            <Tabs.Tab value={TABS_SECTION.PROFILE} leftSection={<AiFillProfile size={25} />}>
                                Профиль
                            </Tabs.Tab>
                            <Tabs.Tab value={TABS_SECTION.CHAT} leftSection={<AiOutlineWechat size={25} />}>
                                Чаты
                            </Tabs.Tab>
                            {!user.isTrainer && (
                                <Tabs.Tab value={TABS_SECTION.HISTORY} leftSection={<AiFillSchedule size={25} />}>
                                    Тренировки
                                </Tabs.Tab>
                            )}
                            {isTrainerProfile && (
                                <Tabs.Tab value={TABS_SECTION.REVIEWS} leftSection={<AiFillMessage size={25} />}>
                                    Отзывы
                                </Tabs.Tab>
                            )}
                            {user.isClient && (
                                <Tabs.Tab value={TABS_SECTION.STATS} leftSection={<AiFillPieChart size={25} />}>
                                    Статистика
                                </Tabs.Tab>
                            )}
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

                        <Tabs.Panel value={TABS_SECTION.PAYMENTS}>
                            {data.payments.length > 0 ? (
                                <PaymentsList payments={data.payments} />
                            ) : (
                                <Text>Покупок нет</Text>
                            )}
                        </Tabs.Panel>

                        <Tabs.Panel value={TABS_SECTION.REVIEWS}>
                            {data.myReviews.length > 0 ? (
                                <ReviewsList reviews={data.myReviews} />
                            ) : (
                                <Text>Отзывов нет</Text>
                            )}
                        </Tabs.Panel>

                        <Tabs.Panel value={TABS_SECTION.CHAT}>
                            {chats.length > 0 ? (
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
                                                        name={oppositeUser?.profile.name ?? oppositeUser?.email}
                                                    >
                                                        <Avatar src={oppositeUser?.profile.avatar} />
                                                    </Conversation>
                                                );
                                            })}
                                        </ConversationList>
                                    </Sidebar>

                                    {selectedChat && <Chat key={selectedChat.id} chat={selectedChat} />}
                                </MainContainer>
                            ) : (
                                <Text>Пока пусто</Text>
                            )}
                        </Tabs.Panel>

                        {!user.isTrainer && (
                            <Tabs.Panel value={TABS_SECTION.HISTORY}>
                                {user.isAdmin ? (
                                    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                                    // @ts-ignore
                                    <WorkoutsList workouts={userOrders ?? []} />
                                ) : (
                                    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                                    // @ts-ignore
                                    <OrdersList orders={userOrders ?? []} />
                                )}
                            </Tabs.Panel>
                        )}

                        <Tabs.Panel value={TABS_SECTION.STATS}>{userStats && <Stats stats={userStats} />}</Tabs.Panel>
                    </Tabs>
                )}
            </Container>
        </Layout>
    );
});

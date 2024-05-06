import { useEditProfile, useGetUser } from '@/pages/profile/profile';
import { Group, Loader, LoadingOverlay, Tabs, Text } from '@mantine/core';
import { CenteredLayout, Layout } from '@/layout';
import { ProfileForm } from '@/entities/user';
import { ProfileInput, user } from '@/entities/user/user-model';
import { transformAxiosError } from '@/shared/lib/axios/transformAxiosError';
import { convertToFormData } from '@/shared/lib/form/convertToFormData';
import { observer } from 'mobx-react-lite';
import { UserInfoAction } from '@/pages/profile/ui/profile-card/profile-card';
import { AiOutlineHeart, AiOutlinePieChart, AiOutlineProfile, AiOutlineWechat } from 'react-icons/ai';
import { OrdersList } from './ui/orders-list';

const TABS_SECTION = {
    PROFILE: 'profile',
    CHAT: 'chat',
    HISTORY: 'history',
    STATS: 'stats',
} as const;

export const ProfilePage = observer(() => {
    const { data, isError, isLoading } = useGetUser();

    const { editProfile, isPending: isPendingEdit, error: errorEdit } = useEditProfile({});

    const onSubmit = (profile: ProfileInput) => {
        editProfile(convertToFormData(profile, 'avatar'));
    };

    const isHomeProfile = user.id === data?.id;

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

    // TODO: STATS
    // TODO: CHAT

    return (
        <Layout>
            <Group justify={'center'}>
                <UserInfoAction user={data} />
            </Group>

            {isHomeProfile && (
                <Tabs styles={{ panel: { paddingTop: 30, position: 'relative' } }} defaultValue={TABS_SECTION.PROFILE}>
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
                        <Tabs.Tab value={TABS_SECTION.STATS} leftSection={<AiOutlinePieChart />}>
                            Статистика
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

                    <Tabs.Panel value={TABS_SECTION.CHAT}>CHAT</Tabs.Panel>

                    <Tabs.Panel value={TABS_SECTION.STATS}>STATS</Tabs.Panel>

                    <Tabs.Panel value={TABS_SECTION.HISTORY}>
                        <OrdersList orders={data.orders ?? []} />
                    </Tabs.Panel>
                </Tabs>
            )}
        </Layout>
    );
});

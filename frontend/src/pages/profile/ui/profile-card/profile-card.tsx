import { Avatar, Text, Button, Paper, LoadingOverlay } from '@mantine/core';
import { TUser, user as userStore } from '@/entities/user';
import { observer } from 'mobx-react-lite';
import { useCreateChat } from '../../profile-hooks';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '@/shared/routing/routes';

export const UserInfoAction = observer(({ user: { profile, email, role, id } }: { user: TUser }) => {
    const isOwnProfile = userStore.id === id;
    const router = useNavigate();

    const redirectToChat = (chatId: number) => {
        if (!userStore.id) {
            return;
        }

        router(`${ROUTES.PROFILE(userStore.id)}?chatId=${chatId}`);
    };

    const { createChat, isPending } = useCreateChat({ onSuccess: redirectToChat });

    return (
        <Paper pos={'relative'} radius='md' withBorder p='lg' bg='var(--mantine-color-body)'>
            <LoadingOverlay visible={isPending} zIndex={1000} overlayProps={{ radius: 'sm', blur: 2 }} />

            <Avatar src={profile.avatar} size={120} radius={120} mx='auto' />

            <Text ta='center' fz='lg' fw={500} mt='md'>
                {profile.name}
            </Text>

            <Text ta='center' c='dimmed' fz='sm'>
                {email} • {role === 'user' ? 'Спортсмен' : 'Тренер'}
            </Text>

            <Text ta='center'>{profile.status}</Text>

            {!isOwnProfile && userStore.isAuthorized && userStore.id && (
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore
                <Button onClick={() => createChat({ userIds: [id, userStore.id] })} variant='default' fullWidth mt='md'>
                    Написать
                </Button>
            )}
        </Paper>
    );
});

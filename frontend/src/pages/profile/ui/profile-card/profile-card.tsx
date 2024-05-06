import { Avatar, Text, Button, Paper } from '@mantine/core';
import { TUser, user } from '@/entities/user';
import { observer } from 'mobx-react-lite';

export const UserInfoAction = observer(({ user: { profile, email, role, id } }: { user: TUser }) => {
    const isOwnProfile = user.id === id;

    return (
        <Paper pos={'relative'} radius='md' withBorder p='lg' bg='var(--mantine-color-body)'>
            <Avatar src={profile.avatar} size={120} radius={120} mx='auto' />

            <Text ta='center' fz='lg' fw={500} mt='md'>
                {profile.name}
            </Text>

            <Text ta='center' c='dimmed' fz='sm'>
                {email} • {role === 'user' ? 'Спортсмен' : 'Тренер'}
            </Text>

            <Text ta='center'>{profile.status}</Text>

            {!isOwnProfile && user.isAuthorized && (
                <Button variant='default' fullWidth mt='md'>
                    Написать
                </Button>
            )}
        </Paper>
    );
});

import { Avatar, Text, Button, Paper, Tooltip, ActionIcon } from '@mantine/core';
import { TUser, user } from '@/entities/user';
import { AiOutlineEdit } from 'react-icons/ai';
import { observer } from 'mobx-react-lite';

export const UserInfoAction = observer(
    ({
        user: { profile, email, role, id },
        onEditClick,
        isWithEdit,
    }: {
        user: TUser;
        onEditClick?: () => void;
        isWithEdit?: boolean;
    }) => {
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

                {!isOwnProfile && user.isAuthorized && (
                    <Button variant='default' fullWidth mt='md'>
                        Написать
                    </Button>
                )}

                {isOwnProfile && isWithEdit && (
                    <Tooltip label='Редактировать'>
                        <ActionIcon right={-10} top={-10} radius={'xl'} pos={'absolute'} onClick={onEditClick}>
                            <AiOutlineEdit />
                        </ActionIcon>
                    </Tooltip>
                )}
            </Paper>
        );
    }
);

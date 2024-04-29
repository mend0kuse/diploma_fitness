import { Avatar, Text, Group, rem, Box } from '@mantine/core';
import { MdOutlineAlternateEmail } from 'react-icons/md';
import classes from './profile-card.module.css';
import { TUser } from '@/entities/user';

export const ProfileCard = ({ user: { profile, email, role } }: { user: TUser }) => {
    const avatar = profile?.avatar;

    return (
        <Group wrap='nowrap'>
            <Avatar src={avatar} size={100} radius='md' />
            <Box>
                <Text fz='xs' tt='uppercase' fw={700} c='dimmed'>
                    {role === 'user' ? 'Пользователь' : 'Менеджер'}
                </Text>

                <Text fz='lg' fw={500}>
                    {profile?.name ?? 'Anonymous'}
                </Text>

                <Group wrap='nowrap' gap={2} mt={3}>
                    <MdOutlineAlternateEmail stroke={rem(1.5)} size='1rem' className={classes.icon} />
                    <Text fz='xs' c='dimmed'>
                        {email}
                    </Text>
                </Group>
            </Box>
        </Group>
    );
};

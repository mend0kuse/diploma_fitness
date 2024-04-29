import { Group, Avatar, Text, rem, Anchor, Box } from '@mantine/core';
import { BsChevronRight } from 'react-icons/bs';
import classes from './user-preview.module.css';
import { TUser } from '@/entities/user';
import { Link } from 'react-router-dom';
import { ROUTES } from '@/shared/routing/routes';

export const UserPreview = ({ user: { profile, id, email } }: { user: TUser }) => {
    return (
        <Anchor component={Link} my={'sm'} p={'sm'} to={ROUTES.PROFILE(id)} className={classes.user}>
            <Group>
                <Avatar src={profile.avatar} radius='xl' />

                <Box style={{ flex: 1 }}>
                    <Text size='sm' fw={500}>
                        {profile.name}
                    </Text>

                    <Text c='dimmed' size='xs'>
                        {email}
                    </Text>
                </Box>

                <BsChevronRight style={{ width: rem(14), height: rem(14) }} stroke={rem(1.5)} />
            </Group>
        </Anchor>
    );
};

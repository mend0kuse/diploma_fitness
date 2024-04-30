import { Menu, rem, Avatar, ActionIcon } from '@mantine/core';
import { user } from '../../user-model';
import { IoIosLogOut } from 'react-icons/io';
import { Link } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import { AiOutlineLogin } from 'react-icons/ai';
import { ROUTES } from '@/shared/routing/routes';

export const UserMenu = observer(() => {
    if (!user.isAuthorized) {
        return (
            <ActionIcon to={ROUTES.AUTHORIZATION} component={Link} variant='filled' aria-label='Authorization'>
                <AiOutlineLogin />
            </ActionIcon>
        );
    }

    return (
        <Menu shadow='md' width={200}>
            <Menu.Target>
                <Avatar style={{ cursor: 'pointer' }} radius='md' size='1.8rem' src={user.avatar} />
            </Menu.Target>

            <Menu.Dropdown>
                {/* eslint-disable-next-line @typescript-eslint/no-non-null-assertion */}
                <Menu.Item component={Link} to={ROUTES.PROFILE(user.id!)}>
                    Профиль
                </Menu.Item>
                <Menu.Divider />
                <Menu.Item
                    color='red'
                    onClick={() => user.logout()}
                    leftSection={<IoIosLogOut style={{ width: rem(14), height: rem(14) }} />}
                >
                    Выйти
                </Menu.Item>
            </Menu.Dropdown>
        </Menu>
    );
});

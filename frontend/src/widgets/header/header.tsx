import { user } from '@/entities/user';
import { ROUTES } from '@/shared/routing/routes';
import { Group, UnstyledButton } from '@mantine/core';
import { observer } from 'mobx-react-lite';
import { Link } from 'react-router-dom';
import classes from './header.module.css';
import { AppLogo } from '@/shared/ui/logo';

export const Header = observer(({ inverted }: { inverted: boolean }) => {
    const linkClassName = [classes.link, inverted ? classes.linkInverted : ''].join(' ');

    return (
        <Group className={classes.header} justify='space-between' px={50} py={10}>
            <AppLogo />

            <Group wrap='nowrap' gap={30}>
                <Link className={linkClassName} to={ROUTES.MAIN}>
                    Главная
                </Link>
                <Link className={linkClassName} to={ROUTES.SCHEDULE}>
                    Расписание
                </Link>
                {user.id && user.isAuthorized && (
                    <Link className={linkClassName} to={ROUTES.PROFILE(user.id)}>
                        Профиль
                    </Link>
                )}
                {user.isAuthorized ? (
                    <UnstyledButton className={linkClassName} onClick={() => user.logout()}>
                        Выход
                    </UnstyledButton>
                ) : (
                    <Link className={linkClassName} to={ROUTES.AUTHORIZATION}>
                        Вход
                    </Link>
                )}
            </Group>
        </Group>
    );
});

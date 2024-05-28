import { user } from '@/entities/user';
import { ROUTES } from '@/shared/routing/routes';
import { Group, UnstyledButton } from '@mantine/core';
import { observer } from 'mobx-react-lite';
import { Link, useNavigate } from 'react-router-dom';
import classes from './header.module.css';
import { AppLogo } from '@/shared/ui/logo';
import { useCreateChat } from '@/pages/profile/profile-hooks';

export const Header = observer(({ inverted }: { inverted: boolean }) => {
    const router = useNavigate();
    const linkClassName = [classes.link, inverted ? classes.linkInverted : ''].join(' ');

    const redirectToChat = (chatId: number) => {
        if (!user.id) {
            return;
        }

        router(`${ROUTES.PROFILE(user.id)}?chatId=${chatId}`);
    };

    const { createChat } = useCreateChat({ onSuccess: redirectToChat, type: 'admin' });

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

                {user.isAdmin && (
                    <Link className={linkClassName} to={ROUTES.CREATE_WORKOUT}>
                        Создать тренировку
                    </Link>
                )}

                {user.id && user.isAuthorized && (
                    <>
                        {!user.hasAccessToTraining && user.isClient && (
                            <a className={linkClassName} href={'/#tariffs'}>
                                Купить абонемент
                            </a>
                        )}
                        <Link className={linkClassName} to={ROUTES.PROFILE(user.id)}>
                            Профиль
                        </Link>
                        {user.isClient && (
                            <UnstyledButton
                                className={linkClassName}
                                onClick={() => createChat({ userIds: [user.id ?? -1] })}
                            >
                                Поддержка
                            </UnstyledButton>
                        )}
                    </>
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

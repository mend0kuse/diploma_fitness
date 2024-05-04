import { Center, Stack } from '@mantine/core';
import classes from './navbar.module.css';
import { NavbarLink } from '@/widgets/navbar/navbarLink';
import { AiOutlineCalendar, AiOutlineHome, AiOutlineLogin, AiOutlineLogout, AiOutlineUser } from 'react-icons/ai';
import { user } from '@/entities/user';
import { ROUTES } from '@/shared/routing/routes';
import { observer } from 'mobx-react-lite';

export const Navbar = observer(() => {
    return (
        <Stack className={classes.navbar}>
            <Center>
                <svg width='28' height='35' viewBox='0 0 28 35' xmlns='http://www.w3.org/2000/svg'>
                    <path
                        d='M9.90234 8.67871H14.0918C15.3516 8.67871 16.5088 8.88867 17.5635 9.30859C18.6279 9.72852 19.5557 10.3242 20.3467 11.0957C21.1377 11.8574 21.7529 12.7754 22.1924 13.8496C22.6318 14.9141 22.8516 16.1006 22.8516 17.4092C22.8516 18.6982 22.6318 19.875 22.1924 20.9395C21.7529 22.0039 21.1377 22.9219 20.3467 23.6934C19.5557 24.4551 18.6279 25.041 17.5635 25.4512C16.5088 25.8613 15.3516 26.0664 14.0918 26.0664H9.90234C8.65234 26.0664 7.49512 25.8613 6.43066 25.4512C5.36621 25.041 4.43359 24.4551 3.63281 23.6934C2.8418 22.9316 2.22656 22.0234 1.78711 20.9688C1.35742 19.9043 1.14258 18.7275 1.14258 17.4385C1.14258 16.1299 1.35742 14.9434 1.78711 13.8789C2.22656 12.8047 2.8418 11.8818 3.63281 11.1104C4.43359 10.3291 5.36621 9.72852 6.43066 9.30859C7.49512 8.88867 8.65234 8.67871 9.90234 8.67871ZM9.90234 11.6084C8.80859 11.6084 7.86621 11.8428 7.0752 12.3115C6.28418 12.7705 5.67383 13.4346 5.24414 14.3037C4.82422 15.1729 4.61426 16.2178 4.61426 17.4385C4.61426 18.3369 4.73633 19.1377 4.98047 19.8408C5.22461 20.5439 5.57617 21.1396 6.03516 21.6279C6.49414 22.1162 7.05078 22.4922 7.70508 22.7559C8.35938 23.0195 9.0918 23.1514 9.90234 23.1514H14.1211C15.2051 23.1514 16.1377 22.9219 16.9189 22.4629C17.7002 21.9941 18.3008 21.3301 18.7207 20.4707C19.1504 19.6113 19.3652 18.5908 19.3652 17.4092C19.3652 16.501 19.2432 15.6904 18.999 14.9775C18.7646 14.2549 18.418 13.6445 17.959 13.1465C17.5098 12.6484 16.9629 12.2676 16.3184 12.0039C15.6738 11.7402 14.9414 11.6084 14.1211 11.6084H9.90234ZM13.7695 5.79297V28.8789H10.2393V5.79297H13.7695Z'
                        fill='#15aabf'
                    />
                    <path
                        d='M13.9033 6.67188V28H10.2412V6.67188H13.9033ZM26.7354 6.67188L18.0635 18.8301H12.8633L12.3652 15.6367H16.0273L22.2383 6.67188H26.7354ZM22.9854 28L16.0859 18.2734L18.459 15.4463L27.3945 28H22.9854Z'
                        fill='#15aabf'
                    />
                </svg>
            </Center>

            <Stack className={classes.navbarMain} gap={0}>
                <NavbarLink route={ROUTES.MAIN} icon={AiOutlineHome} label={'Главная'} />
                <NavbarLink route={ROUTES.SCHEDULE} icon={AiOutlineCalendar} label={'Расписание'} />
                {user.id && user.isAuthorized && (
                    <NavbarLink route={ROUTES.PROFILE(user.id)} icon={AiOutlineUser} label={'Профиль'} />
                )}
            </Stack>

            {user.isAuthorized ? (
                <NavbarLink onClick={() => user.logout()} icon={AiOutlineLogout} label='Выход' />
            ) : (
                <NavbarLink route={ROUTES.AUTHORIZATION} icon={AiOutlineLogin} label='Вход' />
            )}
        </Stack>
    );
});

import { createBrowserRouter } from 'react-router-dom';
import { MainPage } from '@/pages/main';
import { NothingFound } from '@/pages/error';
import { ProfilePage } from '@/pages/profile/profile-page';
import { ROUTES } from '@/shared/routing/routes';
import { AuthorizationPage } from '@/pages/authorization/authorization';

export const router = createBrowserRouter([
    {
        path: '/profile/:id',
        element: <ProfilePage />,
    },
    {
        path: ROUTES.MAIN,
        element: <MainPage />,
        errorElement: <NothingFound />,
    },
    {
        path: ROUTES.AUTHORIZATION,
        element: <AuthorizationPage />,
    },
]);

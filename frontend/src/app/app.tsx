import { RouterProvider } from 'react-router-dom';
import { router } from '@/app/router';
import { useSavedLogin } from '@/entities/user/hooks/useSavedLogin';

export const App = () => {
    useSavedLogin();

    return <RouterProvider router={router} />;
};

import { RouterProvider } from 'react-router-dom';
import { router } from '@/app/router';
import { useSavedLogin } from '@/entities/user/hooks/useSavedLogin';
import { Center, Loader } from '@mantine/core';

export const App = () => {
    const { isLoading } = useSavedLogin();

    if (isLoading) {
        return (
            <Center h={'100%'}>
                <Loader size={100} type={'bars'} />
            </Center>
        );
    }

    return <RouterProvider router={router} />;
};

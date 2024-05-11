import { useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import { LOCAL_STORAGE_TOKEN, TUser, user, UserInput } from '@/entities/user';
import { $api } from '@/shared/api/api';
import { API_ENDPOINTS, QUERY_KEYS } from '@/shared/api/config';
import { decodeToken } from '@/entities/user/user-lib';
import { ROUTES } from '@/shared/routing/routes';
import { notifications } from '@mantine/notifications';
import { transformAxiosError } from '@/shared/lib/axios/transformAxiosError';

export const useLogin = ({ withRedirect }: { withRedirect?: boolean }) => {
    const navigate = useNavigate();

    const mutation = useMutation({
        mutationFn: (user: UserInput) => {
            return $api.post<{ access_token: string }>(API_ENDPOINTS.LOGIN, user);
        },

        mutationKey: [QUERY_KEYS.USER],

        onSuccess: (data) => {
            const token = data.data.access_token;
            const userDecoded = decodeToken(token);

            if (!userDecoded) {
                return;
            }

            localStorage.setItem(LOCAL_STORAGE_TOKEN, `Bearer ${token}`);
            user.setUser(userDecoded);

            if (withRedirect) {
                navigate(ROUTES.PROFILE(userDecoded.id));
            }
        },
        onError: (error) => {
            notifications.show({
                withCloseButton: true,
                autoClose: 5000,
                color: 'red',
                title: 'Ошибка при авторизации',
                message: transformAxiosError(error),
            });
        },
    });

    return { login: mutation.mutate, ...mutation };
};

export const useRegistration = () => {
    const navigate = useNavigate();

    const mutation = useMutation({
        mutationFn: (user: UserInput) => {
            return $api.post<TUser>(API_ENDPOINTS.REGISTRATION, user);
        },
        mutationKey: [QUERY_KEYS.USER],
        onSuccess: (data) => {
            const userData = data.data;
            user.setUser(userData);
            navigate(ROUTES.PROFILE(userData.id));
        },
        onError: (error) => {
            notifications.show({
                withCloseButton: true,
                autoClose: 5000,
                color: 'red',
                title: 'Ошибка при авторизации',
                message: transformAxiosError(error),
            });
        },
    });

    return { register: mutation.mutate, ...mutation };
};

import { useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import { LOCAL_STORAGE_TOKEN, user, UserInput } from '@/entities/user';
import { $api } from '@/shared/api/api';
import { API_ENDPOINTS, QUERY_KEYS } from '@/shared/api/config';
import { decodeToken } from '@/entities/user/user-lib';
import { ROUTES } from '@/shared/routing/routes';

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
    });

    return { login: mutation.mutate, ...mutation };
};

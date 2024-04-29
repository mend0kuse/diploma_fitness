import { useMutation } from '@tanstack/react-query';
import { $api } from '@/shared/api/api';
import { useNavigate } from 'react-router-dom';
import { TUser, user, UserInput } from '@/entities/user/user-model';
import { API_ENDPOINTS, QUERY_KEYS } from '@/shared/api/config';
import { ROUTES } from '@/shared/routing/routes';

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
    });

    return { register: mutation.mutate, ...mutation };
};

import { LOCAL_STORAGE_TOKEN, TUser, user } from '@/entities/user';
import { decodeToken } from '@/entities/user/user-lib';
import { $api } from '@/shared/api/api';
import { API_ENDPOINTS, QUERY_KEYS } from '@/shared/api/config';
import { useQuery } from '@tanstack/react-query';

export const useSavedLogin = () => {
    const savedToken = localStorage.getItem(LOCAL_STORAGE_TOKEN);
    if (!savedToken) {
        return { isLoading: false };
    }

    const savedUser = decodeToken(savedToken);
    if (!savedUser) {
        return { isLoading: false };
    }

    return useQuery({
        queryKey: [QUERY_KEYS.USER, savedUser.id],
        queryFn: async () => {
            const response = await $api.get<TUser>(API_ENDPOINTS.USER(savedUser.id));
            user.setUser(response.data);

            return response.data;
        },
    });
};

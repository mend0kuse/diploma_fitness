import { LOCAL_STORAGE_TOKEN, TUser, user } from '@/entities/user';
import { decodeToken } from '@/entities/user/user-lib';
import { $api } from '@/shared/api/api';
import { API_ENDPOINTS } from '@/shared/api/config';
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
        queryKey: [`user_${savedUser.id}`],
        queryFn: async () => {
            try {
                const response = await $api.get<TUser>(API_ENDPOINTS.USER(savedUser.id));
                user.setUser(response.data);

                return response.data;
            } catch (error) {
                localStorage.removeItem(LOCAL_STORAGE_TOKEN);
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore
                throw new Error(error);
            }
        },
    });
};

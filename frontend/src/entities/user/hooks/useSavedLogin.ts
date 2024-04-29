import { useEffect } from 'react';
import { LOCAL_STORAGE_TOKEN, TUser, user } from '@/entities/user';
import { decodeToken } from '@/entities/user/user-lib';
import { $api } from '@/shared/api/api';
import { API_ENDPOINTS } from '@/shared/api/config';

export const useSavedLogin = () => {
    useEffect(() => {
        (async () => {
            const savedToken = localStorage.getItem(LOCAL_STORAGE_TOKEN);

            if (!savedToken) {
                return;
            }

            const savedUser = decodeToken(savedToken);

            if (!savedUser) {
                return;
            }

            try {
                const response = await $api.get<TUser>(API_ENDPOINTS.USER(savedUser?.id));
                user.setUser(response.data);
            } catch (error) {
                console.log(error);
            }
        })();
    }, []);
};

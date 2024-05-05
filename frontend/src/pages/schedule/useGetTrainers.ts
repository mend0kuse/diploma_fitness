import { $api } from '@/shared/api/api';
import { useQuery } from '@tanstack/react-query';
import { API_ENDPOINTS, QUERY_KEYS } from './../../shared/api/config';
import { TUser } from '@/entities/user';

export const useGetTrainers = () => {
    return useQuery({
        queryKey: [QUERY_KEYS.TRAINER],
        queryFn: async () => {
            const response = await $api.get<TUser[]>(API_ENDPOINTS.TRAINER);

            return response.data;
        },
    });
};

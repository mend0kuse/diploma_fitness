import { useQuery } from '@tanstack/react-query';
import { API_ENDPOINTS, QUERY_KEYS } from '@/shared/api/config';
import { $api } from '@/shared/api/api';
import { TWorkout } from '@/entities/workout/workout-types';

export const useGetWorkoutById = (id: string | undefined) => {
    return useQuery({
        queryFn: async () => {
            if (!id) {
                throw new Error('Workout not found');
            }

            return (await $api.get<TWorkout>(API_ENDPOINTS.WORKOUT_BY_ID(Number(id)))).data;
        },
        queryKey: [QUERY_KEYS.WORKOUT, QUERY_KEYS.WORKOUT_BY_ID(id ?? '')],
    });
};

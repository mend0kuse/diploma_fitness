import { useMutation, useQueryClient } from '@tanstack/react-query';
import { API_ENDPOINTS, QUERY_KEYS } from '@/shared/api/config';
import { notifications } from '@mantine/notifications';
import { transformAxiosError } from '@/shared/lib/axios/transformAxiosError';
import { $api } from '@/shared/api/api';
import { TWorkout } from '@/entities/workout/workout-types';

export const useCancelWorkout = (id: undefined | string) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: () => {
            if (!id) {
                throw new Error('Workout not found');
            }

            return $api.put<TWorkout>(API_ENDPOINTS.WORKOUT_CANCEL_BY_ID(id));
        },
        onSuccess: async ({ data: workout }) => {
            await queryClient.invalidateQueries({
                queryKey: [QUERY_KEYS.WORKOUT, QUERY_KEYS.WORKOUT_BY_ID(workout.id)],
            });

            notifications.show({
                withCloseButton: true,
                autoClose: 5000,
                message: `Успешно`,
            });
        },
        onError: (error) => {
            notifications.show({
                withCloseButton: true,
                autoClose: 5000,
                color: 'red',
                title: 'Ошибка',
                message: transformAxiosError(error),
            });
        },
    });
};

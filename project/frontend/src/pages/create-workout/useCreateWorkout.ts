import { $api } from '@/shared/api/api';
import { API_ENDPOINTS, QUERY_KEYS } from '@/shared/api/config';
import { TWorkout, TWorkoutInput } from '@/entities/workout/workout-types';
import { useMutation } from '@tanstack/react-query';
import { notifications } from '@mantine/notifications';
import { transformAxiosError } from '@/shared/lib/axios/transformAxiosError';

export const useCreateWorkout = ({ onSuccess }: { onSuccess: (workout?: TWorkout) => void }) => {
    const mutation = useMutation({
        mutationFn: (workout: TWorkoutInput) => {
            return $api.post<TWorkout>(API_ENDPOINTS.WORKOUT, workout);
        },

        mutationKey: [QUERY_KEYS.WORKOUT],

        onSuccess: (data) => {
            onSuccess(data.data);
        },

        onError: (error) => {
            notifications.show({
                withCloseButton: true,
                autoClose: 5000,
                color: 'red',
                title: 'Ошибка при создании',
                message: transformAxiosError(error),
            });
        },
    });

    return { createWorkout: mutation.mutate, ...mutation };
};

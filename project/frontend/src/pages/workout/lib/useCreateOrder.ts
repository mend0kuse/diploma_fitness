import { useMutation, useQueryClient } from '@tanstack/react-query';
import { API_ENDPOINTS, QUERY_KEYS } from '@/shared/api/config';
import { notifications } from '@mantine/notifications';
import { transformAxiosError } from '@/shared/lib/axios/transformAxiosError';
import { $api } from '@/shared/api/api';
import { TOrder } from '@/entities/order/order-types';

export const useCreateOrder = (id: undefined | string) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: () => {
            if (!id) {
                throw new Error('Workout not found');
            }

            return $api.post<TOrder>(API_ENDPOINTS.ORDER_BY_WORKOUT_ID(id));
        },
        onSuccess: async ({ data: order }) => {
            await queryClient.invalidateQueries({
                queryKey: [QUERY_KEYS.WORKOUT, QUERY_KEYS.WORKOUT_BY_ID(order.workoutId)],
            });

            notifications.show({
                withCloseButton: true,
                autoClose: 5000,
                title: 'Заявка создана успешно',
                message: `Ждем вас на тренировке`,
            });
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
};

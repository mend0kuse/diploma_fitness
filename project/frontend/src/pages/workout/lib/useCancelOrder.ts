import { useMutation, useQueryClient } from '@tanstack/react-query';
import { $api } from '@/shared/api/api';
import { TOrder } from '@/entities/order/order-types';
import { API_ENDPOINTS, QUERY_KEYS } from '@/shared/api/config';
import { transformAxiosError } from '@/shared/lib/axios/transformAxiosError';
import { notifications } from '@mantine/notifications';

export const useCancelOrder = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (id: string) => {
            return $api.put<TOrder>(API_ENDPOINTS.CANCEL_ORDER_BY_ID(id));
        },
        onSuccess: async ({ data: order }) => {
            await queryClient.invalidateQueries({
                queryKey: [QUERY_KEYS.WORKOUT, QUERY_KEYS.WORKOUT_BY_ID(order.workoutId)],
            });

            notifications.show({
                withCloseButton: true,
                autoClose: 5000,
                title: 'Заявка отменена',
                message: ``,
            });
        },
        onError: (error) => {
            notifications.show({
                withCloseButton: true,
                autoClose: 5000,
                color: 'red',
                title: 'Ошибка при отмене',
                message: transformAxiosError(error),
            });
        },
    });
};

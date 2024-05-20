import { $api } from '@/shared/api/api';
import { API_ENDPOINTS } from '@/shared/api/config';
import { useMutation, useQuery } from '@tanstack/react-query';
import { TPayment } from './payments';

export const useCreatePayment = () => {
    return useMutation({
        mutationFn: ({ ticketId }: { ticketId: number }) => {
            return $api.post<TPayment>(API_ENDPOINTS.PAYMENT_BY_TICKET_ID(ticketId));
        },
        onSuccess({ data }) {
            window.open(data.confirmation);
        },
    });
};

export const useGetOrderInfo = (orderId: string) => {
    return useQuery({
        queryKey: [],
        queryFn: async () => {
            return (await $api.get(API_ENDPOINTS.PAYMENT_BY_ORDER_ID(orderId))).data;
        },
    });
};

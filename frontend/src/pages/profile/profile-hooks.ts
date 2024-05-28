import { $api } from '@/shared/api/api';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { TUser } from '@/entities/user';
import { useParams, useSearchParams } from 'react-router-dom';
import { API_ENDPOINTS } from '@/shared/api/config';
import { user } from '@/entities/user/user-model';
import { TChat } from '@/entities/chat/chat-model';
import { TWorkout } from '@/entities/workout/workout-types';
import { notifications } from '@mantine/notifications';
import { TPayment } from '@/entities/payment/payments';

export const useGetUser = () => {
    const { id } = useParams<{ id: string }>();
    const idToNumber = Number(id);

    return useQuery({
        queryKey: [`user_${id}`],
        queryFn: async () => {
            const response = await $api.get<TUser>(API_ENDPOINTS.USER(idToNumber));

            return response.data;
        },
    });
};

export const useEditProfile = ({ onSuccess }: { onSuccess?: () => void }) => {
    const queryClient = useQueryClient();

    const editProfile = useMutation({
        mutationFn: (profile: FormData) => {
            return $api.patch<TUser>(API_ENDPOINTS.EDIT_PROFILE, profile);
        },

        onSuccess: async ({ data }) => {
            user.setUser(data);
            await queryClient.invalidateQueries({ queryKey: [`user_${data.id}`] });

            onSuccess?.();
        },
    });

    return { editProfile: editProfile.mutate, ...editProfile };
};

export const useCreateChat = ({
    onSuccess,
    type = 'default',
}: {
    onSuccess?: (chatId: number) => void;
    type?: 'default' | 'admin';
}) => {
    const createChat = useMutation({
        mutationFn: ({ userIds }: { userIds: number[] }) => {
            const url = type === 'default' ? API_ENDPOINTS.CHAT : `${API_ENDPOINTS.CHAT}/admin`;

            return $api.post<TChat>(url, { userIds });
        },
        mutationKey: [`user_${user.id}`],
        onSuccess: ({ data }) => {
            onSuccess?.(data.id);
        },
    });

    return { createChat: createChat.mutate, ...createChat };
};

export const useGetActiveChat = () => {
    const [searchParams] = useSearchParams();

    const activeChatId = searchParams.get('chatId');

    return activeChatId ?? null;
};

export const useCompleteWorkout = () => {
    return useMutation({
        mutationFn: ({ workoutId, visitedUserIds }: { workoutId: number; visitedUserIds: number[] }) => {
            return $api.put<TWorkout>(API_ENDPOINTS.COMPLETE_WORKOUT_BY_ID(workoutId), { visitedUserIds });
        },
        mutationKey: [`user_${user.id}`],
        onError: () => {
            notifications.show({
                withCloseButton: true,
                autoClose: 5000,
                color: 'red',
                message: 'Ошибка при завершении',
            });
        },
        onSuccess: () => {
            notifications.show({
                withCloseButton: true,
                autoClose: 5000,
                message: 'Успешно',
            });
        },
    });
};

export const useFreezePayment = () => {
    return useMutation({
        mutationFn: ({ paymentId }: { paymentId: string }) => {
            return $api.put<TPayment>(API_ENDPOINTS.PAYMENT_FREEZE_BY_PAYMENT_ID(paymentId));
        },
        mutationKey: [`user_${user.id}`],
        onError: () => {
            notifications.show({
                withCloseButton: true,
                autoClose: 5000,
                color: 'red',
                message: 'Ошибка при заморозке',
            });
        },
    });
};

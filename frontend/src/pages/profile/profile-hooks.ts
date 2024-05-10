import { $api } from '@/shared/api/api';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { TUser } from '@/entities/user';
import { useParams, useSearchParams } from 'react-router-dom';
import { API_ENDPOINTS } from '@/shared/api/config';
import { user } from '@/entities/user/user-model';
import { TChat } from '@/entities/chat/chat-model';

export const useGetUser = () => {
    const { id } = useParams<{ id: string }>();
    const idToNumber = Number(id);

    return useQuery({
        queryKey: [`user_${idToNumber}`],
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

export const useCreateChat = ({ onSuccess }: { onSuccess?: (chatId: number) => void }) => {
    const createChat = useMutation({
        mutationFn: ({ userIds }: { userIds: number[] }) => {
            return $api.post<TChat>(API_ENDPOINTS.CHAT, { userIds });
        },

        onSuccess: async ({ data }) => {
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

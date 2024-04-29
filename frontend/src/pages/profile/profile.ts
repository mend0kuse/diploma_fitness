import { $api } from '@/shared/api/api';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { TUser } from '@/entities/user';
import { useParams } from 'react-router-dom';
import { API_ENDPOINTS, QUERY_KEYS } from '@/shared/api/config';
import { user } from '@/entities/user/user-model';
import { isNumber } from 'lodash';

export const useGetUser = () => {
    const { id } = useParams<{ id: string }>();
    const idToNumber = Number(id);

    const response = useQuery({
        queryKey: [QUERY_KEYS.USER, idToNumber],
        queryFn: () => $api.get<TUser>(API_ENDPOINTS.USER(idToNumber)),
        enabled: !!id && isNumber(idToNumber),
    });

    return { ...response, user: response.data?.data };
};

export const useEditProfile = ({ onSuccess }: { onSuccess: () => void }) => {
    const queryClient = useQueryClient();

    const editProfile = useMutation({
        mutationFn: (profile: FormData) => {
            return $api.patch<TUser>(API_ENDPOINTS.EDIT_PROFILE, profile);
        },

        onSuccess: async (response) => {
            const updatedUser = response.data;
            user.setUser(updatedUser);
            await queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.USER] });

            onSuccess();
        },
    });

    return { editProfile: editProfile.mutate, ...editProfile };
};

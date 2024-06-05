import { $api } from '@/shared/api/api';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { TReview, TReviewCreate } from './review-types';
import { API_ENDPOINTS } from '@/shared/api/config';

export const useCreateReview = ({ onSuccess }: { onSuccess?: (data: TReview) => void }) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (review: TReviewCreate) => {
            return $api.post<TReview>(API_ENDPOINTS.REVIEW, review);
        },
        onSuccess: async ({ data }) => {
            await queryClient.invalidateQueries({ queryKey: [`user_${data.userId}`] });
            onSuccess?.(data);
        },
    });
};

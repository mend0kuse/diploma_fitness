import { $api } from '@/shared/api/api';
import { useMutation } from '@tanstack/react-query';
import { TReview, TReviewCreate } from './review-types';
import { API_ENDPOINTS, QUERY_KEYS } from '@/shared/api/config';

export const useCreateReview = ({ onSuccess }: { onSuccess?: (data: TReview) => void }) => {
    return useMutation({
        mutationFn: (review: TReviewCreate) => {
            return $api.post<TReview>(API_ENDPOINTS.REVIEW, review);
        },
        onSuccess: ({ data }) => {
            onSuccess?.(data);
        },
        mutationKey: [QUERY_KEYS.REVIEW],
    });
};

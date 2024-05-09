export type TReview = {
    id: number;
    text: string;
    rating: number;
    userId: number;
    isHiddenUser: boolean;
};

export type TReviewCreate = Omit<TReview, 'id'>;

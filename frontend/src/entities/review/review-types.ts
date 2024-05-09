import { TUser } from '../user';

export type TReview = {
    id: number;

    text: string;
    rating: number;
    isHiddenUser: boolean;

    user: TUser;
    userId: number;

    author: TUser;
    authorId: number;
};

export type TReviewCreate = Omit<TReview, 'id' | 'author' | 'user'>;
